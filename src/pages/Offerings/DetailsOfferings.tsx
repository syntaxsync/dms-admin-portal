import { BackwardOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  TableColumnsType,
  Table,
  Tag,
  Typography,
  Row,
  Col,
  Space,
} from "antd";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api/api";
import { Offerings } from "../../types/Offerings";
import { Course } from "../../types/User";
import catchAsync from "../../utils/ErrorHandler";

const { Title } = Typography;

interface DetailsOfferingProps {}

const DetailsOffering: FunctionComponent<DetailsOfferingProps> = () => {
  const { offeringId, degreeId } = useParams();
  const [offering, setOffering] = useState<Offerings>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleOfferingData = catchAsync(async () => {
      const { data: response } = await api.get(
        `degrees/${degreeId}/offerings/${offeringId}`
      );

      setOffering(response.data.offering);
    });

    fetchSingleOfferingData();
  }, [offeringId, degreeId]);

  const colums: TableColumnsType<Course> = [
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Credit Hours",
      dataIndex: "creditHours",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Pre Requisites",
      render: (text: string, record: Course) =>
        record?.prerequisites.map((course) => (
          <Tag key={course._id}>{course.title}</Tag>
        )),
    },
  ];

  return (
    <Space direction="vertical">
      <Row align="middle">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Title level={2}>Offering details</Title>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Button
            style={{ float: "right" }}
            onClick={() => navigate(-1)}
            icon={<BackwardOutlined />}
          >
            Back
          </Button>
        </Col>
      </Row>
      <Descriptions>
        <Descriptions.Item label="Degree Title">
          {offering?.degree?.title}
        </Descriptions.Item>

        <Descriptions.Item label="Degree Code">
          {offering?.degree?.code}
        </Descriptions.Item>

        <Descriptions.Item label="Total Credit Hours (Complete Degree)">
          {offering?.degree?.creditHours}
        </Descriptions.Item>

        <Descriptions.Item label="Semester">
          {offering?.semester}
        </Descriptions.Item>

        <Descriptions.Item label="Batch">{offering?.batch}</Descriptions.Item>
      </Descriptions>
      <Table
        columns={colums}
        dataSource={offering?.courses.map((course) => ({
          ...course,
          key: course._id,
        }))}
      />
    </Space>
  );
};

export default DetailsOffering;
