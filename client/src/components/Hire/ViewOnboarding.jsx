import React from "react";
import Feedback from "./Feedback";
import { Box } from "@mui/material";
import {Space,Tabs,PageHeader,Button,Descriptions,Divider,Tag,Checkbox,Collapse} from "antd";
const { Panel } = Collapse;

export default function ViewOnboarding() {
  const { TabPane } = Tabs;
  const onChange = (key) => {
    console.log(key);
  };

  const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Full Name">Danling Sun</Descriptions.Item>
      <Descriptions.Item label="Association">421421</Descriptions.Item>
      <Descriptions.Item label="Email">danlingsun@gmail.com</Descriptions.Item>
      <Descriptions.Item label="Username">danlingsun</Descriptions.Item>
      <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
    </Descriptions>
  );

  const Content = ({ children, extra }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

  const extraContent = (
    <div
      style={{
        display: "flex",
        width: "max-content",
        justifyContent: "flex-end",
      }}
    ></div>
  );

  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Title"
        tags={<Tag color="blue">Pending</Tag>}
        extra={[
          <Button key="1" type="primary">
            Approve
          </Button>,
          <Button key="2">Reject</Button>,
        ]}
        footer={
          <Tabs tabPosition="right">
            <TabPane tab="About Employee" key="1">
              <Divider>Personal Info</Divider>
              <Descriptions
                layout="vertical"
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="First Name">
                  Danling
                </Descriptions.Item>
                <Descriptions.Item label="Middle Name"></Descriptions.Item>
                <Descriptions.Item label="Last Name">Sun</Descriptions.Item>
                <Descriptions.Item label="Perferred Name">
                  Danling
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                  01/01/2022
                </Descriptions.Item>
                <Descriptions.Item label="Gender">Female</Descriptions.Item>
                <Descriptions.Item label="Cell Phone Number" span={1.5}>
                  1238086490
                </Descriptions.Item>
                <Descriptions.Item label="Work Phone Number" span={1.5}>
                  9292572388
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={3}>
                  45 abc St, New Brunswick, NJ08901
                </Descriptions.Item>
              </Descriptions>
            </TabPane>

            <TabPane tab="Employment" key="2">
              <Divider>Work Authrization</Divider>
              <Descriptions
                layout="vertical"
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item
                  label="Are you a citizen or permanent resident of the U.S?"
                  span={4}
                >
                  <Checkbox defaultChecked={false} disabled>
                    Citizen
                  </Checkbox>
                  <Checkbox defaultChecked disabled>
                    Green Card
                  </Checkbox>
                </Descriptions.Item>
                <Descriptions.Item label="Visa Title">
                  F1(CPT/OPT)
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                  02/15/2022
                </Descriptions.Item>
                <Descriptions.Item label="End Date">
                  02/15/2025
                </Descriptions.Item>
              </Descriptions>
              <Divider>Reference</Divider>
              <Descriptions
                layout="vertical"
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              >
                <Descriptions.Item label="First Name">David</Descriptions.Item>
                <Descriptions.Item label="Middle Name"></Descriptions.Item>
                <Descriptions.Item label="Last Name">Chou</Descriptions.Item>
                <Descriptions.Item label="Phone">1234567890</Descriptions.Item>
                <Descriptions.Item label="Email">
                  david@gmail.com
                </Descriptions.Item>
                <Descriptions.Item label="Relationship">
                  Friend
                </Descriptions.Item>
              </Descriptions>
            </TabPane>

            <TabPane tab="Documents" key="3">
            <Divider>Evidence</Divider>
              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                <Panel header="Profile Picture" key="1">
                </Panel>
                <Panel header="Driver's License" key="2">
                </Panel>
                <Panel header="OPT Receipt" key="3">
                </Panel>
              </Collapse>
            </TabPane>
          </Tabs>
        }
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>

      <Space style={{ marginBottom: 200 }}></Space>

      <Box sx={{ width: "65%", padding: "30px 30px" }}>
        <Feedback />
      </Box>
    </>
  );
}
