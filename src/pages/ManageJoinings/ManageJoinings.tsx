import {
  Space,
  Typography,
  Select,
  Table,
  TableColumnsType,
  Tag,
  Popconfirm,
} from "antd";
import { off } from "process";
import React, { FunctionComponent, useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";

import api from "../../services/api/api";
import { Department } from "../../types/Department";
import { Offerings } from "../../types/Offerings";
import catchAsync from "../../utils/ErrorHandler";

const { Title, Link: AntLink } = Typography;
const { OptGroup, Option } = Select;

interface ManageJoiningsProps {}

const columns: TableColumnsType<Offerings> = [
  {
    title: "Batch",
    dataIndex: "batch",
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
    title: "Degree",
    render: (value, record) => {
      return (
        <Link to={`/degree-list/${record.degree.code}`}>
          {record.degree.title}
        </Link>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Change Status",
    render: (record, value) => {
      return (
        <Space direction="horizontal">
          <Popconfirm title="are you sure to approve joining?">
            <AntLink>Approve</AntLink>
          </Popconfirm>
          <Popconfirm title="are you sure to reject joining?">
            <AntLink type="danger">Reject</AntLink>
          </Popconfirm>
        </Space>
      );
    },
  },
];

const ManageJoinings: FunctionComponent<ManageJoiningsProps> = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [offerings, setOfferings] = useState<Offerings[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<string>();

  useEffect(() => {
    const fetchDegrees = catchAsync(async () => {
      const { data: response } = await api.get("departments");

      setDepartments(response.data.docs);
    });

    fetchDegrees();
  }, []);

  useEffect(() => {
    const fetchJoinings = catchAsync(async () => {
      const { data: response } = await api.get(
        `degrees/${selectedDegree}/joinings`
      );

      setOfferings(response.data.joinings);
    });

    selectedDegree && fetchJoinings();
  }, [selectedDegree]);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={2}>Approve Joinings</Title>

      <Select
        onSelect={(value: string) => setSelectedDegree(value)}
        placeholder="Please Select Degree"
        style={{ width: "100%" }}
      >
        {departments.map((department) => (
          <OptGroup key={department._id} label={department.name}>
            {department.degrees.map((degree) => (
              <Option key={degree._id} value={degree._id}>
                {degree.title}
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>

      <Table
        columns={columns}
        dataSource={offerings.map((offering) => ({
          ...offering,
          key: offering._id,
        }))}
      />
    </Space>
  );
};

export default ManageJoinings;
