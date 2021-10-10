import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Layout,
  message,
  Typography,
  Table,
  Collapse,
  Row,
  Col,
  Form,
  Select,
  Button,
  Descriptions,
} from "antd";
import { AuthContext } from "../../App";
import api from "../../services/api/api";
import { Course } from "../../types/User";

const { Content } = Layout;
const { Panel } = Collapse;
const { Title } = Typography;

const columns = [
  {
    title: "Course Title",
    dataIndex: "title",
  },
  {
    title: "Course Code",
    dataIndex: "code",
  },
  {
    title: "Credit Hours",
    dataIndex: "creditHours",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
];

interface JoiningProps {}

const Joining: FunctionComponent<JoiningProps> = () => {
  const { user } = useContext(AuthContext);
  const [offerings, setOfferings] = useState([]);
  const [coursesPicked, setCoursesPicked] = useState([]);

  const addJoining = ({ course }) => {
    const selectedCourse = JSON.parse(course);
    console.log(selectedCourse);
    const result = coursesPicked.find(
      (cour) => cour.code === selectedCourse.code
    );

    if (result) {
      message.error("Course already selected");
    } else {
      setCoursesPicked((state) => [
        ...state,
        { ...selectedCourse, key: selectedCourse.code },
      ]);
    }
  };

  useEffect(() => {
    const abort = new AbortController();
    const fetchOfferingForDegree = async () => {
      if (user?.data?.type === "student") {
        try {
          const { data } = await api.get(
            `/degrees/${user?.data?.degree?._id}/offerings`
          );

          setOfferings(() => data?.data?.offerings);
        } catch (err) {
          message.error(err.message);
        }
      }
    };

    fetchOfferingForDegree();

    return () => {
      abort.abort();
    };
  }, [user]);

  return (
    <Layout>
      <Content>
        <Title level={2}>Join Courses</Title>

        <Form
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={addJoining}
        >
          <Row>
            <Col xs={{ offset: 0, span: 8 }}>
              <Form.Item
                name="course"
                label="Course"
                rules={[
                  { required: true, message: "Please Select a course to add" },
                ]}
              >
                <Select>
                  {offerings?.map((offering) =>
                    offering?.offerings?.map((offer) => {
                      return (
                        <Select.OptGroup
                          key={`${offer._id}-${offer.semester}`}
                          label={`${offer.semester}`}
                        >
                          {offer.courses.map(
                            (course: Course, index: number) => (
                              <Select.Option
                                key={`${offer._id}-${course.code}-${index}`}
                                value={JSON.stringify(course)}
                                disabled={coursesPicked.includes(
                                  (selectedCourse) =>
                                    selectedCourse._id === course._id
                                )}
                              >
                                {course.title} - {course.code}
                              </Select.Option>
                            )
                          )}
                        </Select.OptGroup>
                      );
                    })
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ offset: 1, span: 8 }}>
              <Form.Item>
                <Button
                  disabled={coursesPicked.length >= 6}
                  type="primary"
                  htmlType="submit"
                >
                  Join Course
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col sm={{ order: 0, span: 24 }} lg={{ order: 0, span: 11 }}>
            <Title level={3}>Offerings</Title>
            <Collapse>
              {offerings?.map((offering) => {
                return offering?.offerings?.map((offer) => {
                  return (
                    <Panel
                      header={`Semester ${offer.semester}`}
                      key={offer._id}
                    >
                      <Table columns={columns} dataSource={offer.courses} />
                    </Panel>
                  );
                });
              })}
            </Collapse>
          </Col>
          <Col
            sm={{ order: 1, span: 24 }}
            lg={{ order: 1, span: 12, offset: 1 }}
          >
            <Title level={3}>Selected Courses</Title>
            <Table
              columns={columns}
              dataSource={coursesPicked}
              pagination={false}
            />
            <Descriptions
              style={{
                marginTop: "1rem",
              }}
            >
              <Descriptions.Item
                style={{ width: "50%" }}
                label="Total Credit Hours &nbsp; (max: 20)"
              >
                {coursesPicked.reduce(
                  (total, course) => course.creditHours + total,
                  0
                )}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ width: "50%" }}
                label="Total Courses Joined"
              >
                {coursesPicked.length}
              </Descriptions.Item>
            </Descriptions>
            <Button type="primary" onClick={() => console.log("Hello")}>
              Submit Joining
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Joining;
