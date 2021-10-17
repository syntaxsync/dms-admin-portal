import { LoadingOutlined } from "@ant-design/icons";
import { Typography, Select, Spin, Table, TableColumnsType } from "antd";
import React, { useState, useEffect, FunctionComponent } from "react";
import { NavLink as Link } from "react-router-dom";

import api from "../../services/api/api";
import { Department } from "../../types/Department";
import { Offerings as OfferingsType } from "../../types/Offerings";
import catchAsync from "../../utils/ErrorHandler";

const { Title } = Typography;
const { Option, OptGroup } = Select;

interface OfferingsProps {}

const Offerings: FunctionComponent<OfferingsProps> = () => {
  const [offerings, setOfferings] = useState<OfferingsType[]>([]);
  const [degreeByDepartments, setDegreeByDepartments] = useState<Department[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDegree, setSelectedDegree] = useState<string>();

  useEffect(() => {
    const fetchDegree = catchAsync(async () => {
      const { data: response } = await api.get("departments");
      setDegreeByDepartments(response.data.docs);
      setLoading(false);
    });

    fetchDegree();
  }, []);

  useEffect(() => {
    const fetchOfferings = catchAsync(async () => {
      setLoading(true);
      const { data: response } = await api.get(
        `degrees/${selectedDegree}/offerings`
      );

      setOfferings(
        response.data.offerings.map((offering: OfferingsType) => ({
          ...offering,
          key: offering._id,
        }))
      );
      setLoading(false);
    });

    selectedDegree && fetchOfferings();
  }, [selectedDegree]);

  const handleDegreeChange = (degree: string) => {
    setSelectedDegree(degree);
  };

  const columns: TableColumnsType<OfferingsType> = [
    {
      title: "Semester",
      dataIndex: "semester",
    },
    {
      title: "Batch",
      dataIndex: "batch",
    },
    {
      title: "Degree Title",
      render: (text, record) => record.degree.title,
    },
    {
      title: "Action",
      render: (text, record) => (
        <Link to={`${selectedDegree}/${record._id}`}>View Details</Link>
      ),
    },
  ];

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Title level={2}>Offerings</Title>
      <Select
        placeholder="Please Select the Degree to view Offerings"
        onSelect={handleDegreeChange}
        style={{ width: "50%" }}
      >
        {degreeByDepartments.map((department) => (
          <OptGroup key={department._id} label={department.name}>
            {department?.degrees.map((degree) => (
              <Option key={degree._id} value={degree._id}>
                {degree.title}
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>

      <Table columns={columns} dataSource={offerings} />
    </Spin>
  );
};

export default Offerings;
