import { Space, Typography, Form, Input, Transfer, Button } from "antd";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import api from "../../services/api/api";
import { Degree } from "../../types/Degree";
import catchAsync from "../../utils/ErrorHandler";

const { Title } = Typography;

interface AddNewDepartmentProps {}

const AddNewDepartment: FunctionComponent<AddNewDepartmentProps> = () => {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDegrees = catchAsync(async () => {
      const { data: response } = await api.get("/degrees");

      if (response.status === "Success") {
        const { docs } = response.data;

        setDegrees(docs.map((doc: Degree) => ({ ...doc, key: doc._id })));
      }
    });

    fetchDegrees();
  }, []);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onFinsih = catchAsync(async ({ name, faculty, degrees }) => {
    await api.post("departments", {
      name,
      faculty,
      degrees,
    });

    form.resetFields();
    navigate("/departments");
  });

  return (
    <Fragment>
      <Space style={{ width: "100%" }} direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={2}>
          Add New Department
        </Title>
        <Form form={form} onFinish={onFinsih} layout="vertical">
          <Form.Item
            name="name"
            label="Department Name"
            rules={[{ required: true, message: "Department Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="faculty"
            label="Faculty"
            rules={[{ required: true, message: "Faculty Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="degrees"
            label="Degrees"
            rules={[
              {
                required: true,
                message: "Please select atleast 1 degree for department",
                type: "array",
                min: 1,
              },
            ]}
          >
            <Transfer
              listStyle={{ flexBasis: "calc(50% - 20px)" }}
              dataSource={degrees}
              titles={["Target", "Selected"]}
              targetKeys={targetKeys}
              onChange={onChange}
              render={(item) => {
                return <span key={item.key}>{item.title}</span>;
              }}
              oneWay
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Fragment>
  );
};

export default AddNewDepartment;
