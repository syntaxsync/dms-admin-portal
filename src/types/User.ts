export type Course = {
  _id: string;
  title: string;
  code: string;
  creditHours: number;
  prerequisites: Course[];
  category: string;
};

export type Degree = {
  title: string;
  code: string;
  creditHours: number;
  course: Course[];
  _id: string;
};

export type Teacher = {
  type: "teacher";
  employeeId: string;
  designation: string;
  courses: [];
};

export type Student = {
  type: "student";
  batch: number;
  degree: Degree;
  registrationNumber: string;
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
