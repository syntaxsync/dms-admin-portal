import { Degree } from "./Degree";
import { Course } from "./User";

export type Offerings = {
  semester: string;
  batch: string;
  degree: Degree;
  courses: [Course];
};
