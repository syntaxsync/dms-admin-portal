import React, { FunctionComponent } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Card,
  Button,
  message,
  Space,
  Divider,
  Typography,
} from "antd";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import api from "../../interceptor/api";

const { Title } = Typography;

interface ResetPasswordProps {}

const ResetPassword: FunctionComponent<ResetPasswordProps> = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const onFinish = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await api.patch(`users/resetPassword/${token}`, values);
      if (response) {
        const { data } = response;
        if (data.status === "success") {
          message.success(data.message);
          navigate("/login");
        }
      } else {
        message.error("Invalid Token");
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <Space
      size="large"
      direction="vertical"
      style={{ width: "100%", overflowX: "hidden", padding: 20 }}
    >
      <Row gutter={24}>
        <Col offset={5} span={14}>
          <Card>
            <Card.Grid style={{ width: "100%" }}>
              <Title className="text-center" level={2}>
                Reset Password
              </Title>
              <Divider />
              <Form
                labelCol={{
                  xs: { span: 24 },
                  sm: { span: 8 },
                }}
                wrapperCol={{
                  xs: { span: 24 },
                  sm: { span: 16 },
                }}
                onFinish={onFinish}
              >
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
                  wrapperCol={{
                    xs: {
                      span: 24,
                      offset: 0,
                    },
                    sm: {
                      span: 16,
                      offset: 8,
                    },
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Save Password
                  </Button>
                  &nbsp;Or&nbsp;
                  <NavLink to="/login">Already have an account?</NavLink>
                </Form.Item>
              </Form>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default ResetPassword;
