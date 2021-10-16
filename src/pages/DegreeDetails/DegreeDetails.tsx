import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Descriptions,
  Layout,
  message,
  Table,
  TableColumnsType,
  Typography,
} from "antd";

import api from "../../services/api/api";
import { Degree } from "../../types/Degree";

const { Content } = Layout;
const { Title } = Typography;

type Course = {
  key: string;
  title: string;
  code: string;
  category: string;
  creditHours: number;
};

const columns: TableColumnsType<Course> = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Credit Hours",
    dataIndex: "creditHours",
  },
];

interface AddDegreeProps {}

const AddDegree: FunctionComponent<AddDegreeProps> = () => {
  const { code } = useParams();

  const [degree, setDegree] = useState<Degree | undefined>();

  useEffect(() => {
    const fetchDegree = async () => {
      try {
        const { data: response } = await api.get(`/degrees/${code}`);

        if (response.status === "Success") {
          const { doc } = response.data;
          console.log(doc);
          setDegree(doc);
        }
      } catch (err) {
        message.error(err.message);
      }
    };

    fetchDegree();

    return () => {
      setDegree(undefined);
    };
  }, [code]);

  return (
    <Layout>
      <Content>
        <Title level={2}>{degree?.title}</Title>
        <Descriptions>
          <Descriptions.Item label="Title">{degree?.title}</Descriptions.Item>
          <Descriptions.Item label="Code">{degree?.code}</Descriptions.Item>
          <Descriptions.Item label="Credit Hours">
            {degree?.creditHours}
          </Descriptions.Item>
        </Descriptions>
        <Table
          pagination={{ pageSize: 20 }}
          columns={columns}
          dataSource={degree?.courses.map((cour) => ({
            ...cour,
            key: cour._id,
          }))}
        />
      </Content>
    </Layout>
  );
};

export default AddDegree;
