import { Typography } from "antd";
import React, { useState, useEffect, FunctionComponent, Fragment } from "react";
import api from "../../services/api/api";
import { Offerings as OfferingsType } from "../../types/Offerings";
import catchAsync from "../../utils/ErrorHandler";

const { Title } = Typography;

interface OfferingsProps {}

const Offerings: FunctionComponent<OfferingsProps> = () => {
  const [offerings, setOfferings] = useState<OfferingsType[]>([]);

  useEffect(() => {
    const fetchOfferings = catchAsync(async () => {
      const { data: response } = await api.get("offerings");
      console.log(response);
    });

    fetchOfferings();
  }, []);

  return (
    <Fragment>
      <Title level={2}>Offerings</Title>
    </Fragment>
  );
};

export default Offerings;
