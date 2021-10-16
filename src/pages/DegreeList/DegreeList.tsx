import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import {
  message,
  Space,
  Table,
  TableColumnsType,
  Typography,
  Popconfirm,
} from "antd";
import { NavLink as Link } from "react-router-dom";

import api from "../../services/api/api";
import { Degree } from "../../types/Degree";

const { Text, Title } = Typography;

interface DegreeListProps {}

const DegreeList: FunctionComponent<DegreeListProps> = () => {
  const [degrees, setDegrees] = useState<Degree[]>([]);

  const deleteDegree = async (id) => {
    try {
      await api.delete(`/degrees/${id}`);

      setDegrees(() => degrees.filter((deg) => deg._id !== id));

      message.success("Degree Deleted Successfully");
    } catch (err) {
      message.error(err.message);
    }
  };

  const columns: TableColumnsType<Degree> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Credit Hours",
      dataIndex: "creditHours",
    },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <Space direction="horizontal" size="middle">
            <Link to={`/degree-list/${record.code}`}>View Details</Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteDegree(record._id)}
            >
              <Text style={{ cursor: "pointer" }} type="danger">
                Delete
              </Text>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();
    const fetchDegrees = async () => {
      const { data: response } = await api.get("/degrees");

      if (response.status === "Success") {
        const { data } = response;

        setDegrees(() =>
          data.docs.map((degree: Degree) => ({ ...degree, key: degree._id }))
        );
      }
    };

    fetchDegrees();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <Fragment>
      <Title level={2}>Degrees</Title>
      <Table columns={columns} dataSource={degrees} />
    </Fragment>
  );
};

export default DegreeList;
