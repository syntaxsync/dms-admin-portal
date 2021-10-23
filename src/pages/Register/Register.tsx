import React, { useContext, useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  message,
  Card,
  Row,
  Col,
  Space,
  Typography,
  Divider,
} from "antd";
import { NavLink as Link } from "react-router-dom";

import api from "../../services/api/api";
import { AuthContext } from "../../App";
import catchAsync from "../../utils/ErrorHandler";
import { Department } from "../../types/Department";

const { Title } = Typography;
const { Option, OptGroup } = Select;

export interface RegisterProps {}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register: React.SFC<RegisterProps> = () => {
  const [role, setRole] = useState<string>();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form] = Form.useForm();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const fetchDegrees = catchAsync(async () => {
      const { data: response } = await api.get("departments");

      setDepartments(response?.data?.docs);
    });

    fetchDegrees();
  }, []);

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const response = await api.post("/users/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        role: values.role,
      });

      if (response) {
        const { data } = response;

        localStorage.setItem("token", data.accessToken);

        const { data: completeProfileResponse } = await api.post(
          "/users/complete-profile",
          values
        );

        const { user } = completeProfileResponse.data;

        login(user, data.accessToken, data.refreshToken, true);
      } else {
        message.error("Please Fill All Feilds");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Space
      size="large"
      direction="vertical"
      style={{ width: "100%", overflowX: "hidden", padding: 20 }}
    >
      <Row gutter={24}>
        <Col span={14} offset={5}>
          <Card hoverable>
            <Card.Grid style={{ width: "100%" }} hoverable={false}>
              <Title level={2} style={{ textAlign: "center" }}>
                Register
              </Title>
              <Divider />
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      type: "string",
                      message: "Please Enter valid name",
                    },
                    {
                      required: true,
                      message: "Please input your name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Role",
                    },
                  ]}
                >
                  <Select
                    onChange={(value: string) => setRole(value)}
                    placeholder="Please select your role"
                  >
                    <Option value="student">Student</Option>
                    <Option value="teacher">Teacher</Option>
                  </Select>
                </Form.Item>

                {role &&
                  (role === "student" ? (
                    <>
                      <Form.Item
                        name="degree"
                        label="Degree"
                        rules={[
                          { required: true, message: "Degree is required" },
                        ]}
                      >
                        <Select placeholder="Please Select the Degree">
                          {departments.map((department) => (
                            <OptGroup
                              key={department?._id}
                              label={department?.name}
                            >
                              {department?.degrees?.map((degree) => (
                                <Option key={degree?._id} value={degree?._id}>
                                  {degree?.title}
                                </Option>
                              ))}
                            </OptGroup>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="registrationNumber"
                        label="Registration Number"
                        rules={[
                          {
                            required: true,
                            message: "Registration Number is Required",
                            min: 6,
                            max: 20,
                            type: "string",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        name="batch"
                        label="Batch"
                        rules={[
                          {
                            required: true,
                            message: "Batch is required",
                            type: "string",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        name="currentSemester"
                        label="Current Semester"
                        rules={[
                          {
                            message: "Current Semester is required",
                            required: true,
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                    </>
                  ) : (
                    <>
                      <Form.Item
                        name="employeeId"
                        label="Employee ID"
                        rules={[
                          {
                            required: true,
                            message: "Employee ID is required",
                            type: "string",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="designation"
                        label="Designation"
                        rules={[
                          {
                            required: true,
                            type: "string",
                            message: "Designation is required",
                          },
                        ]}
                      >
                        <Select placeholder="Please Select Designation">
                          <Option value="Lecturer">Lecturer</Option>
                          <Option value="Assistant Professor">
                            Assistant Professor
                          </Option>
                          <Option value="Professor">Professor</Option>
                          <Option value="HOD">HOD</Option>
                        </Select>
                      </Form.Item>
                    </>
                  ))}

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>
                    I have read the <Link to="">agreement</Link>
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                  &nbsp;or&nbsp;
                  <Link to="/login">Already have an account!</Link>
                </Form.Item>
              </Form>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default Register;
