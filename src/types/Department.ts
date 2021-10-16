import { Degree } from "./Degree";

export type Department = {
  name: string;
  degrees: [Degree];
  faculty: string;
  _id: string;
};
