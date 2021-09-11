import React, { FunctionComponent } from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Button,
  message,
  Space,
  Divider,
  Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import api from "../../services/api/api";

const { Title } = Typography;

interface ForgotPasswordProps {}

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await api.post("/users/forgotPassword", {
        email: values.email,
      });

      if (response) {
        const { data } = response;
        if (data.status === "success") {
          message.info(data.message);
          navigate("/login");
        }
      } else {
        message.error("Error: Please contact admin");
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
        <Col offset={6} span={12}>
          <Card>
            <Card.Grid style={{ width: "100%" }}>
              <Title level={2}>Forgot Password</Title>
              <Divider />
              <Form onFinish={onFinish}>
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
                  &nbsp;Or&nbsp;
                  <Link to="/login">Already have an account?</Link>
                </Form.Item>
              </Form>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default ForgotPassword;
