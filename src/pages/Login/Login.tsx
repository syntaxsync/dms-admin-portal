import { useContext } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Card,
  Row,
  Col,
  Space,
  Typography,
  Divider,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink as Link } from "react-router-dom";

import { AuthContext } from "../../App";
import api from "../../services/api/api";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const { login } = useContext(AuthContext);

  const onFinish = async (values: any) => {
    try {
      const response = await api.post("/users/login", {
        email: values.email,
        password: values.password,
      });

      if (response) {
        const { status, data } = response;

        if (data.data.user && data.data.user.data) {
          data.data.user.data.type = data.data.user.role;
        }

        if (status === 200) {
          login(
            data.data.user,
            data.accessToken,
            data.refreshToken,
            values.remember
          );
          message.success("Login Successful");
        }
      } else {
        message.error("Email or Password is Incorrect");
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <Space
      size="middle"
      direction="vertical"
      style={{ width: "100%", overflowX: "hidden", padding: 20 }}
    >
      <Row gutter={24}>
        <Col span={12} offset={6}>
          <Card hoverable={true}>
            <Card.Grid style={{ width: "100%" }} hoverable={false}>
              <Title style={{ textAlign: "center" }} level={2}>
                Login
              </Title>
              <Divider />
              <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                  &nbsp;Or
                  <Link to="/register"> register now!</Link>
                </Form.Item>

                <Link to="/forgot-password" className="login-form-forgot">
                  Forgot password
                </Link>
              </Form>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default Login;
