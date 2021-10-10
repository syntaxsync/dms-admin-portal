import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import { NavLink as Link } from "react-router-dom";

import api from "../../services/api/api";
import { Degree } from "../../types/Degree";

interface DegreeListProps {}

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
      console.log(record);
      return <Link to={`/degree-list/${record.code}`}>View Details</Link>;
    },
  },
];

const DegreeList: FunctionComponent<DegreeListProps> = () => {
  const [degrees, setDegrees] = useState<Degree[]>([]);

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
      <Table columns={columns} dataSource={degrees} />
    </Fragment>
  );
};

export default DegreeList;
