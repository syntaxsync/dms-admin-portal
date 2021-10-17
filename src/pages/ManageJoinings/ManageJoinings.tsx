import { Space, Typography, Select } from "antd";
import React, { FunctionComponent, useEffect, useState } from "react";

import api from "../../services/api/api";
import { Department } from "../../types/Department";
import catchAsync from "../../utils/ErrorHandler";

const { Title } = Typography;
const { OptGroup, Option } = Select;

interface ManageJoiningsProps {}

const ManageJoinings: FunctionComponent<ManageJoiningsProps> = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
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

      console.log(response);
    });

    selectedDegree && fetchJoinings();
  }, [selectedDegree]);

  return (
    <Space direction="vertical">
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
    </Space>
  );
};

export default ManageJoinings;
