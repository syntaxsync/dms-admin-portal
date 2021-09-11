import React, { useContext } from "react";
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
import { NavLink as Link, useNavigate } from "react-router-dom";

import api from "../../interceptor/api";
import { AuthContext } from "../../App";

const { Title } = Typography;
const { Option } = Select;

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
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onFinish = async (values: any) => {
    try {
      const response = await api.post("/users/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      console.log(response);

      if (response) {
        const { data } = response;
        login(data.user, data.accessToken, data.refreshToken);
        navigate("/");
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
                  initialValue="student"
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Role",
                    },
                  ]}
                >
                  <Select>
                    <Option value="student">Student</Option>
                    <Option value="teacher">Teacher</Option>
                  </Select>
                </Form.Item>

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
