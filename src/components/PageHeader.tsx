import React, { FunctionComponent } from "react";
import { Layout, Row, Col, Typography, Avatar } from "antd";
import { NavLink as Link } from "react-router-dom";

import Logo from "../resources/images/logo.png";

const { Header } = Layout;
const { Title } = Typography;

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
        <Col span={8} offset={8} className="text-right">
          <Avatar>U</Avatar>
        </Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
