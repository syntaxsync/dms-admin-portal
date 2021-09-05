import { Form, Input, Row, Col, Card, Button, message } from "antd";
import React, { FunctionComponent } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import api from "../../interceptor/api";

interface ResetPasswordProps {}

const ResetPassword: FunctionComponent<ResetPasswordProps> = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const onFinish = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await api.post(`users/resetPassword/${token}`, values);
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
    <Row gutter={24}>
      <Col offset={6} span={12}>
        <Card>
          <Card.Grid style={{ width: "100%" }}>
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
                  Forgot Password
                </Button>
                &nbsp;Or&nbsp;
                <NavLink to="/login">Login</NavLink>
              </Form.Item>
            </Form>
          </Card.Grid>
        </Card>
      </Col>
    </Row>
  );
};

export default ResetPassword;
