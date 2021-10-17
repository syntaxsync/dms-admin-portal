import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  BuildOutlined,
  NotificationOutlined,
  BookOutlined,
  BlockOutlined,
  DiffOutlined,
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
        <AuthContext.Consumer>
          {({ user }) => {
            if (user.role === "admin") {
              return (
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                >
                  <SubMenu
                    key={"degrees"}
                    icon={<BuildOutlined />}
                    title="Manage Degrees"
                  >
                    <Menu.Item key="degree-list">
                      <Link to="/degree-list">Degrees</Link>
                    </Menu.Item>

                    <Menu.Item key="add_degree">
                      <Link to="/degree-list/add">Add New Degree</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key={"departments"}
                    icon={<BlockOutlined />}
                    title="Manage Departments"
                  >
                    <Menu.Item key="list_departments">
                      <Link to="/departments">Departments</Link>
                    </Menu.Item>

                    <Menu.Item key="add_department">
                      <Link to="/departments/add">Add New Department</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="offerings"
                    icon={<BookOutlined />}
                    title="Manage Offerings"
                  >
                    <Menu.Item key="offerings_list">
                      <Link to="offerings">Offerings</Link>
                    </Menu.Item>
                    <Menu.Item key="add_offerings">
                      <Link to="offerings/add">Add Offerings</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="manage_joinings"
                    icon={<DiffOutlined />}
                    title="Manage Joinings"
                  >
                    <Menu.Item key="approve_joining">
                      <Link to="manage/joinings">Approve Joining</Link>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              );
            } else {
              return (
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                >
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
                  <SubMenu key="sub2" icon={<LaptopOutlined />} title="Result">
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
                </Menu>
              );
            }
          }}
        </AuthContext.Consumer>
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
