import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  BuildOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router";
import { NavLink as Link } from "react-router-dom";
import { AuthContext } from "../../App";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export interface DashboardProps {}

const Dashboard: React.SFC<DashboardProps> = () => {
  return (
    <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
      <Sider
        width={250}
        className="site-layout-background"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <AuthContext.Consumer>
            {({ user }) => {
              if (user.role === "admin") {
                return (
                  <SubMenu
                    key={"department"}
                    icon={<BuildOutlined />}
                    title="Departments"
                  >
                    <Menu.Item key="add_degree">
                      <Link to="/degree-list">Degrees</Link>
                    </Menu.Item>

                    <Menu.Item key="add_department">
                      <Link to="/degree-list/add">Add New Degree</Link>
                    </Menu.Item>
                  </SubMenu>
                );
              } else {
                return (
                  <>
                    <SubMenu
                      key="sub1"
                      icon={<UserOutlined />}
                      title="Student Info"
                    >
                      <Menu.Item key="1">
                        <Link to="my-degree">My Degree</Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link to="join-courses">My Courses</Link>
                      </Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub2"
                      icon={<LaptopOutlined />}
                      title="Result"
                    >
                      <Menu.Item key="5">option5</Menu.Item>
                      <Menu.Item key="6">option6</Menu.Item>
                      <Menu.Item key="7">option7</Menu.Item>
                      <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu
                      key="sub3"
                      icon={<NotificationOutlined />}
                      title="Courses"
                    >
                      <Menu.Item key="9">option9</Menu.Item>
                      <Menu.Item key="10">option10</Menu.Item>
                      <Menu.Item key="11">option11</Menu.Item>
                      <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                  </>
                );
              }
            }}
          </AuthContext.Consumer>
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
