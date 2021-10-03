import React, { FunctionComponent } from "react";
import { Layout, Row, Col, Avatar, Menu } from "antd";
import { NavLink as Link } from "react-router-dom";

import Logo from "../resources/images/dm-system-logo-min.png";
import { AuthContext } from "../App";

const { Header } = Layout;
const { SubMenu } = Menu;

interface PageHeaderProps {}

const PageHeader: FunctionComponent<PageHeaderProps> = () => {
  return (
    <Header className="header">
      <Row gutter={24} justify="space-around" align="middle">
        <Col style={{ padding: 0 }} span={8} offset={0}>
          <Link to="/">
            <img src={Logo} width={"auto"} height={45} alt="DM Systems" />
          </Link>
        </Col>
        <AuthContext.Consumer>
          {({ isAuth, logout, user }) => {
            return (
              <Col style={{ padding: 0 }} span={16} className="text-right">
                <Menu style={{ float: "right" }} mode="horizontal" theme="dark">
                  {isAuth ? (
                    <SubMenu
                      style={{ padding: 0 }}
                      key="SubMenu"
                      icon={<Avatar>{user.name[0]}</Avatar>}
                      title={user.name}
                    >
                      <Menu.Item key="profile">
                        <Link to="/profile">Profile</Link>
                      </Menu.Item>
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
