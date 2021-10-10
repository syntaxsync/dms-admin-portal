import { Course } from "./User";

export type Degree = {
  key: string;
  _id: string;
  title: string;
  code: string;
  creditHours: number;
  course: [Course];
};
