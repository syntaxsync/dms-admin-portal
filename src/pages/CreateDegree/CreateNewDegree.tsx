import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Layout,
  message,
  Transfer,
  Typography,
} from "antd";
import { useNavigate } from "react-router";
import api from "../../services/api/api";
import { useForm } from "antd/lib/form/Form";

const { Content } = Layout;
const { Title } = Typography;

interface CreateNewDegreeProps {}

type Course = {
  key: string;
  title: string;
  code: string;
  category: string;
  creditHours: number;
};

export const calculateCreditHours = (
  courses: Course[],
  selectedCourses: string[]
): number => {
  return courses.reduce((acc, course) => {
    if (selectedCourses.includes(course.key)) {
      return acc + course.creditHours;
    }
    return acc;
  }, 0);
};

const CreateNewDegree: FunctionComponent<CreateNewDegreeProps> = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [form] = useForm();

  const onChange = (nextTargetKeys) => {
    form.setFieldsValue({
      creditHours: calculateCreditHours(courses, nextTargetKeys),
    });
    setTargetKeys(nextTargetKeys);
  };

  const onSubmit = async (values) => {
    try {
      await api.post("/degrees", values);
      message.success(`Degree created successfully!`);
      form.resetFields();
      navigate("/degree-list");
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data: response } = await api.get("/courses");

        if (response.status === "Success") {
          const { docs } = response.data;
          const courses = docs.map((course: any) => ({
            ...course,
            key: course._id,
          }));

          setCourses(courses);
        }
      } catch (err) {
        message.error("Unable to connect to Internet");
      }
    };

    fetchCourses();
  }, []);
  return (
    <Layout>
      <Content>
        <Title style={{ textAlign: "center" }} level={2}>
          Add New Degree
        </Title>
        <Form
          form={form}
          onFinish={onSubmit}
          labelCol={{ xs: { span: 8 } }}
          wrapperCol={{ xs: { span: 16 } }}
          labelAlign="left"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please provide your title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="Code"
            rules={[{ required: true, message: "Please provide your code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="courses"
            label="Courses"
            rules={[
              {
                required: true,
                message: "Please select atleast 10 courses",
              },
              {
                type: "array",
                min: 10,
              },
            ]}
          >
            <Transfer
              listStyle={{ flexBasis: "calc(50% - 20px)" }}
              dataSource={courses}
              titles={["Target", "Selected"]}
              targetKeys={targetKeys}
              onChange={onChange}
              render={(item) => {
                return <span key={item.key}>{item.title}</span>;
              }}
              oneWay
            />
          </Form.Item>
          <Form.Item name="creditHours" label="Credit Hours">
            <Input type="number" disabled />
          </Form.Item>
          <Form.Item wrapperCol={{ xs: { offset: 8, span: 16 } }}>
            <Button type={"primary"} htmlType="submit">
              Add New Degree
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default CreateNewDegree;
