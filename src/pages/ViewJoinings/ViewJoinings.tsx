import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Typography, Table, TableColumnsType, Tag, Button, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import api from "../../services/api/api";
import { Joining } from "../../types/Joining";
import catchAsync from "../../utils/ErrorHandler";

const { Title } = Typography;

interface ViewJoiningsProps {}

const columns: TableColumnsType<Joining> = [
  {
    title: "Batch",
    dataIndex: "batch",
  },
  {
    title: "Student Name",
    render: (text, record) => record?.student?.name,
  },
  {
    title: "Reg. No",
    render: (text, record) => {
      record.student.data.type = "student";

      if (record.student.data.type === "student") {
        return record.student.data.registrationNumber;
      }
    },
  },
  {
    title: "Courses",
    render: (value, record) => {
      return record.courses.map((course) => (
        <Tag key={course._id}>{course.title}</Tag>
      ));
    },
  },
  {
    title: "Semester",
    dataIndex: "semester",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Challan Photo",
    render: (value, record) => {
      return (
        <Button
          onClick={async () => {
            const { data } = await api.get(`files/${record.challanPhoto}`);
            const downloadBtn = document.createElement("a");
            downloadBtn.href = data;
            document.body.appendChild(downloadBtn);
            downloadBtn.click();
            document.body.removeChild(downloadBtn);
          }}
          icon={<DownloadOutlined />}
        >
          Download
        </Button>
      );
    },
  },
];

const ViewJoinings: FunctionComponent<ViewJoiningsProps> = () => {
  const [joinings, setJoinings] = useState<Joining[]>([]);

  useEffect(() => {
    const fetchJoining = catchAsync(async () => {
      const { data: response } = await api.get("/users/my-joinings");
      const { joinings: myJoinings } = response.data;
      setJoinings(
        myJoinings.map((joining) => ({ ...joining, key: joining._id }))
      );
    });

    fetchJoining();
  }, []);
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Title level={3}>My Joinings</Title>
      <Table columns={columns} dataSource={joinings} />
    </Space>
  );
};

export default ViewJoinings;
