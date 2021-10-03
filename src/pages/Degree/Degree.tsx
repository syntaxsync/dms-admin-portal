import React, { Fragment, FunctionComponent } from "react";
import { Layout, Typography, Descriptions, Space, Table } from "antd";
import { AuthContext } from "../../App";
import _ from "lodash";

const { Content } = Layout;
const { Title } = Typography;

interface DegreeProps {}

const Degree: FunctionComponent<DegreeProps> = () => {
  return (
    <Layout>
      <Content>
        <Title level={2}>Degree</Title>
        <AuthContext.Consumer>
          {({ user }) => {
            if (user.data.type === "student") {
              const courseByCategories = _.groupBy(
                user?.data?.degree?.course,
                (course) => course.category
              );

              return (
                <Space direction="vertical" size="large">
                  <Descriptions size="small" column={2}>
                    <Descriptions.Item label="Name">
                      {user?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {user?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Degree">
                      {user?.data?.degree?.title}
                    </Descriptions.Item>
                    <Descriptions.Item label="Code">
                      {user?.data?.degree?.code}
                    </Descriptions.Item>
                    <Descriptions.Item label="Credit Hours">
                      {user?.data?.degree?.creditHours}
                    </Descriptions.Item>
                    <Descriptions.Item label="Batch">
                      {user?.data?.batch}
                    </Descriptions.Item>
                  </Descriptions>
                  {Object.keys(courseByCategories).map((category) => (
                    <Fragment key={category}>
                      <Title level={4}>{category} Courses</Title>
                      <Table
                        columns={[
                          {
                            title: "Code",
                            dataIndex: "code",
                            sorter: (a, b) => a.code.length - b.code.length,
                          },
                          {
                            title: "Title",
                            dataIndex: "title",
                            sorter: (a, b) => a.title.length - b.title.length,
                          },
                          {
                            title: "Credit Hours",
                            dataIndex: "creditHours",
                            sorter: (a, b) => a.creditHours - b.creditHours,
                          },
                          {
                            title: "Category",
                            dataIndex: "category",
                            sorter: (a, b) =>
                              a.category.length - b.category.length,
                          },
                        ]}
                        dataSource={courseByCategories[category]}
                      />
                    </Fragment>
                  ))}
                </Space>
              );
            } else {
              <></>;
            }
          }}
        </AuthContext.Consumer>
      </Content>
    </Layout>
  );
};

Degree.propTypes = {};

export default Degree;
