import React, { FunctionComponent } from "react";
import { Layout, Row, Col, Typography, Avatar, Menu } from "antd";
import { NavLink as Link } from "react-router-dom";

import Logo from "../resources/images/logo.png";
import { AuthContext } from "../App";

const { Header } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

interface PageHeaderProps {}

const PageHeader: FunctionComponent<PageHeaderProps> = () => {
  return (
    <Header className="header">
      <Row gutter={24} justify="space-around" align="middle">
        <Col span={8} offset={0}>
          <Link to="/">
            <Row justify="space-around" align="middle">
              <Col span={6}>
                <img src={Logo} width={55} height={55} alt="DM Systems" />
              </Col>
              <Col span={18}>
                <Title level={4} style={{ display: "inline", color: "#fff" }}>
                  DM Systems
                </Title>
              </Col>
            </Row>
          </Link>
        </Col>
        <AuthContext.Consumer>
          {({ isAuth, logout, user }) => {
            return (
              <Col span={16} className="text-right">
                <Menu style={{ float: "right" }} mode="horizontal" theme="dark">
                  {isAuth ? (
                    <SubMenu
                      key="SubMenu"
                      icon={<Avatar>{user.name[0]}</Avatar>}
                      title={user.name}
                    >
                      <Menu.Item key="logout" onClick={logout}>
                        Log out
                      </Menu.Item>
                    </SubMenu>
                  ) : (
                    <>
                      <Menu.Item key="login">
                        <Link to="/register">Register</Link>
                      </Menu.Item>
                      <Menu.Item key="register">
                        <Link to="/login">Login</Link>
                      </Menu.Item>
                    </>
                  )}
                </Menu>
              </Col>
            );
          }}
        </AuthContext.Consumer>
      </Row>
    </Header>
  );
};

export default PageHeader;
