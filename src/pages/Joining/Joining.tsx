import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Layout,
  message,
  Typography,
  Form,
  Input,
  Button,
  Transfer,
  Upload,
} from "antd";
import { AuthContext } from "../../App";
import api from "../../services/api/api";
import { Offerings } from "../../types/Offerings";
import { calculateCreditHours } from "../CreateDegree/CreateNewDegree";
import catchAsync from "../../utils/ErrorHandler";

import { InboxOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;
const { Dragger } = Upload;

interface JoiningProps {}

const Joining: FunctionComponent<JoiningProps> = () => {
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [offerings, setOfferings] = useState<Offerings>(undefined);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const CURRENTDATE = new Date();
  const CURRENTSEMESTER =
    CURRENTDATE.getMonth() >= 1 && CURRENTDATE.getMonth() < 3
      ? "SPR"
      : CURRENTDATE.getMonth() > 6 && CURRENTDATE.getMonth() <= 9
      ? "FALL"
      : undefined;

  const onChange = (nextTargetKeys) => {
    form.setFieldsValue({
      creditHours: calculateCreditHours(
        offerings.courses.map((course) => ({ ...course, key: course._id })),
        nextTargetKeys
      ),
    });

    setTargetKeys(nextTargetKeys);
  };

  const onFinish = catchAsync(
    async ({ courses, degree, semester, batch, challanPhoto }) => {
      console.log(courses, degree, semester, batch, challanPhoto);
      // const { data: response } = await api.post(`/degrees/${degree}/joinings`);
    }
  );

  useEffect(() => {
    const abort = new AbortController();
    const fetchOfferingForDegree = async () => {
      if (user?.data?.type === "student") {
        try {
          const { data: response } = await api.get(
            `/degrees/${user?.data?.degree?._id}/offerings`
          );

          const { offerings } = response.data;

          const batchOffering = offerings.find((offering: Offerings) => {
            return (
              offering.semester.toUpperCase().includes(CURRENTSEMESTER) &&
              offering.semester.includes(`${CURRENTDATE.getFullYear()}`) &&
              user?.data?.type === "student" &&
              offering?.batch === user?.data?.batch
            );
          });

          setOfferings(batchOffering);

          form.setFieldsValue({
            batch: batchOffering.batch,
            semester: batchOffering.semester,
          });
        } catch (err) {
          message.error(err.message);
        }
      }
    };

    fetchOfferingForDegree();

    return () => {
      abort.abort();
    };
  }, [CURRENTSEMESTER, user]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Layout>
      <Content>
        <Title level={2}>Join Courses</Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="degree"
            label="Degree"
            initialValue={
              user.data.type === "student" && user.data.degree.title
            }
            rules={[{ required: true, message: "Degree is required" }]}
          >
            <Input
              value={user.data.type === "student" && user.data.degree._id}
              disabled
            />
          </Form.Item>

          <Form.Item
            name="semester"
            label="Semester"
            initialValue={offerings?.semester}
            rules={[{ required: true, message: "Semester is required" }]}
          >
            <Input value={offerings?.semester} disabled />
          </Form.Item>

          <Form.Item
            name="batch"
            label="Batch"
            rules={[{ required: true, message: "Batch is required" }]}
            initialValue={offerings?.batch}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="challanPhoto"
            label="Fee Challan Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Dragger
              action="/upload.do"
              listType="picture"
              accept="image/png,image/jpeg,image/jpg"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-hint">
                Support for a single upload. Upload Submitted Fee Challan Image.
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="creditHours"
            label="Credit Hours"
            initialValue={0}
            rules={[
              {
                required: true,
                message: "Credit Hours must be greater than 0",
                type: "number",
                min: 3,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="courses"
            label="Courses"
            rules={[{ required: true, message: "Courses is required" }]}
          >
            <Transfer
              listStyle={{ flexBasis: "calc(50% - 20px)" }}
              dataSource={offerings?.courses.map((course) => ({
                ...course,
                key: course._id,
              }))}
              titles={["Offered Courses", "Selected Courses"]}
              targetKeys={targetKeys}
              onChange={onChange}
              render={(item) => {
                return <span key={item.key}>{item.title}</span>;
              }}
              oneWay
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Add Joining</Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Joining;
