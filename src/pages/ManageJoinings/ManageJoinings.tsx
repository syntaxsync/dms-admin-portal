import { DownloadOutlined } from "@ant-design/icons";
import {
  Space,
  Typography,
  Select,
  Table,
  TableColumnsType,
  Tag,
  Image,
  Popconfirm,
  Button,
  message,
} from "antd";
import React, { FunctionComponent, useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";

import api from "../../services/api/api";
import { Department } from "../../types/Department";
import { Joining } from "../../types/Joining";
import catchAsync from "../../utils/ErrorHandler";

const { Title, Link: AntLink } = Typography;
const { OptGroup, Option } = Select;

interface ManageJoiningsProps {}

const ManageJoinings: FunctionComponent<ManageJoiningsProps> = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [joinings, setJoinings] = useState<Joining[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<string>();

  const changeStatus = catchAsync(
    async (id: string, degree: string, status: string, student: string) => {
      const { data: response } = await api.patch(
        `degrees/${degree}/joinings/${id}/update-status/${status}`
      );

      setJoinings(
        joinings.map((joining) => {
          if (joining._id === id) {
            return response.data.joining;
          } else {
            return joining;
          }
        })
      );

      message.success(`Joining is updated successfully`);
    }
  );

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
    {
      title: "Change Status",
      render: (record, value) => {
        return (
          <Space direction="horizontal">
            <Popconfirm
              onConfirm={() =>
                changeStatus(
                  value._id,
                  value.degree._id,
                  "Approved",
                  value.student.name
                )
              }
              title="are you sure to approve joining?"
            >
              <AntLink>Approve</AntLink>
            </Popconfirm>
            <Popconfirm
              onConfirm={() =>
                changeStatus(
                  value._id,
                  value.degree._id,
                  "Rejected",
                  value.student.name
                )
              }
              title="are you sure to reject joining?"
            >
              <AntLink type="danger">Reject</AntLink>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
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

      setJoinings(
        response.data.joinings.map((joining: Joining) => ({
          ...joining,
          key: joining._id,
        }))
      );
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
        dataSource={joinings.map((offering) => ({
          ...offering,
          key: offering._id,
        }))}
      />
    </Space>
  );
};

export default ManageJoinings;
