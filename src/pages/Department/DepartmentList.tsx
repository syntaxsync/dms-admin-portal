import React, { useState, useEffect, Fragment, FunctionComponent } from "react";
import {
  Space,
  TableColumnsType,
  Typography,
  Table,
  Popconfirm,
  Tag,
} from "antd";
import { NavLink as Link } from "react-router-dom";

import { Department } from "../../types/Department";
import catchAsync from "../../utils/ErrorHandler";
import api from "../../services/api/api";

const { Title, Link: AntLink } = Typography;

interface DepartmentListProps {}

const DepartmentList: FunctionComponent<DepartmentListProps> = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = catchAsync(async () => {
      const { data: response } = await api.get("departments");

      const { docs } = response.data;
      setDepartments(docs);
    });

    fetchDepartments();
  }, []);

  const deleteDepartment = catchAsync(async (id) => {
    await api.delete(`departments/${id}`);

    setDepartments(() =>
      departments.filter((department) => department._id !== id)
    );
  });

  const columns: TableColumnsType<Department> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Faulty",
      dataIndex: "faculty",
    },
    {
      title: "Degrees",
      render: (text, record) => {
        return (
          <Space direction="vertical">
            {record.degrees.map((degree) => (
              <Tag key={degree._id}>
                <Link to={`/degree-list/${degree.code}`}>{degree.title}</Link>
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <Popconfirm
            title="Are you sure to Delete?"
            onConfirm={() => deleteDepartment(record._id)}
          >
            <AntLink type="danger">Delete</AntLink>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Space style={{ width: "100%" }} direction="vertical" size="large">
        <Title level={2}>Departments</Title>
        <Table
          columns={columns}
          dataSource={departments.map((department) => ({
            ...department,
            key: department._id,
          }))}
        />
      </Space>
    </Fragment>
  );
};

export default DepartmentList;
