import { Degree } from "./Degree";
import { Course, User } from "./User";

export type Joining = {
  batch: string;
  challanPhoto: string;
  courses: [Course];
  degree: Degree;
  semester: string;
  status: string;
  student: User;
  _id: string;
  key: string;
};
