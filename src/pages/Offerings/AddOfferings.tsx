import {
  Input,
  Space,
  Typography,
  Form,
  Select,
  Transfer,
  Button,
  message,
} from "antd";
import React, { FunctionComponent, useEffect, useState } from "react";

import api from "../../services/api/api";
import { Department } from "../../types/Department";
import { Course } from "../../types/User";
import catchAsync from "../../utils/ErrorHandler";

const { Title } = Typography;
const { OptGroup, Option } = Select;

interface AddOfferingsProps {}

const AddOfferings: FunctionComponent<AddOfferingsProps> = () => {
  const [degreeWithDepartments, setDegreeWithDepartments] = useState<
    Department[]
  >([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDegreeByDepartment = catchAsync(async () => {
      const { data: response } = await api.get("departments");

      setDegreeWithDepartments(response.data.docs);
    });

    fetchDegreeByDepartment();
  }, []);

  useEffect(() => {
    const fetchCourse = catchAsync(async () => {
      const { data: response } = await api.get("courses");

      setCourses(response.data.docs.map((doc) => ({ ...doc, key: doc._id })));
    });

    fetchCourse();
  }, []);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onFinish = catchAsync(async (values) => {
    console.log(values);
    await api.post(`degrees/${values.degree}/offerings`, values);

    message.success("Joining Successfully saved");
    form.resetFields();
  });

  return (
    <Space direction="vertical">
      <Title level={2}>Create New Offering</Title>

      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          label="Batch"
          name="batch"
          rules={[{ required: true, message: "Please enter the batch" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Semester"
          name="semester"
          rules={[
            { required: true, message: "Please enter the semester name" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Degree"
          name="degree"
          rules={[{ required: true, message: "Please Select degree" }]}
        >
          <Select placeholder="Please select degree">
            {degreeWithDepartments?.map((department) => (
              <OptGroup key={department._id} label={department.name}>
                {department.degrees.map((degree) => (
                  <Option key={degree._id} value={degree._id}>
                    {degree.title}
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Select Courses"
          name="courses"
          rules={[
            {
              required: true,
              message: "Please Select at least one course",
              min: 1,
              type: "array",
            },
          ]}
        >
          <Transfer
            listStyle={{ flexBasis: "calc(50% - 20px)" }}
            dataSource={courses}
            titles={["Target", "Selected"]}
            targetKeys={targetKeys}
            onChange={onChange}
            render={(item) => {
              return <span key={item._id}>{item.title}</span>;
            }}
            oneWay
          />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button htmlType="submit">Submit</Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default AddOfferings;
