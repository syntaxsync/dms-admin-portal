import { message } from "antd";

const catchAsync = (func: (...params: any) => Promise<any>) => {
  return (...params: any) =>
    func(...params).catch((err) => message.error(err.message));
};

export default catchAsync;
