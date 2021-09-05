import React, { FunctionComponent } from "react";
import { NavLink as Link } from "react-router-dom";
import { Card, Col, Row, Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

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

interface ForgotPasswordProps {}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {
  return (
    <Row gutter={24}>
      <Col offset={6} span={12}>
        <Card>
          <Card.Grid style={{ width: "100%" }}>
            <Form {...formItemLayout}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Forgot Password
                </Button>
                &nbsp;Or
              </Form.Item>
              <Link to="/login">Already have an account?</Link>
            </Form>
          </Card.Grid>
        </Card>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
