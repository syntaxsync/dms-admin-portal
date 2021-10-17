import React, {
  Fragment,
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  Space,
  Typography,
  Image,
  Form,
  Input,
  Select,
  Card,
  Button,
} from "antd";

import api from "../../services/api/api";

import { AuthContext } from "../../App";
import catchAsync from "../../utils/ErrorHandler";

const { Title } = Typography;
const { Option } = Select;

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [imageSrc, setImageSrc] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const abortController = new AbortController();
    const getProfileImage = catchAsync(async () => {
      const { data } = await api.get(`files/${user.profilePicture}`);
      setImageSrc(data);
    });

    getProfileImage();

    return () => {
      abortController.abort();
    };
  }, [user.profilePicture]);

  return (
    <Space
      style={{ width: "100%", textAlign: "center" }}
      direction="vertical"
      size="large"
    >
      <Title level={2}>Profile</Title>
      <Card style={{ width: 500, margin: "0 auto" }}>
        <Space style={{ width: "100%" }} direction="vertical" size="large">
          <Image
            style={{ borderRadius: "50%" }}
            width={200}
            height={200}
            src={imageSrc}
          />
          <Form
            labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
            style={{ textAlign: "left" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please Provide name of user" },
              ]}
              initialValue={user.name}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" initialValue={user.email}>
              <Input type="email" disabled />
            </Form.Item>

            <Form.Item label="Role" name="role" initialValue={user.role}>
              <Select disabled>
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            </Form.Item>

            {user.role !== "admin" &&
              (user.role === "teacher" ? (
                <Fragment>
                  <Form.Item
                    name="employeeId"
                    label="Employee Id"
                    initialValue={
                      user.data.type === "teacher" && user.data.employeeId
                    }
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    name="designation"
                    label="Designation"
                    initialValue={
                      user.data.type === "teacher" && user.data.designation
                    }
                  >
                    <Input disabled />
                  </Form.Item>
                </Fragment>
              ) : (
                <Fragment>
                  <Form.Item
                    label="Batch"
                    name="batch"
                    initialValue={
                      user.data.type === "student" && user.data.batch
                    }
                  >
                    <Input type="number" disabled />
                  </Form.Item>
                  <Form.Item
                    name="degree"
                    label="Degree"
                    initialValue={
                      user.data.type === "student" && user.data.degree.title
                    }
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name="registrationNumber"
                    label="Registration Number"
                    initialValue={
                      user.data.type === "student" &&
                      user.data.registrationNumber
                    }
                  >
                    <Input disabled />
                  </Form.Item>
                </Fragment>
              ))}
            <Form.Item wrapperCol={{ offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </Space>
  );
};

export default Profile;
