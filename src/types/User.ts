import { Degree } from "./Degree";

export type Course = {
  _id: string;
  title: string;
  code: string;
  creditHours: number;
  prerequisites: Course[];
  category: string;
};

export type Teacher = {
  type: "teacher";
  employeeId: string;
  designation: string;
  courses: [];
};

export type Student = {
  type: "student";
  batch: string;
  degree: Degree;
  registrationNumber: string;
  currentSemester: string;
  courses: [];
};

export type User = {
  email: string;
  name: string;
  profilePicture: string;
  role: string;
  status: string;
  data: Student | Teacher;
};
