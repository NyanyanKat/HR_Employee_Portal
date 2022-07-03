import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { Tabs, PageHeader, Button, Descriptions, Divider, Tag, Checkbox, Collapse, Avatar, Modal, Form, Input, Alert } from "antd";
import api from "../../api/api";
const { Panel } = Collapse;

export default function ViewOnboarding() {
  const { search } = useLocation(); //search:  ?eid=62bd645b6668e40cbd17aa40
  const eid = queryString.parse(search).eid; //62bd645b6668e40cbd17aa40
  const [userInfo, loadUserInfo] = useState({});
  const [isLoading, updateLoading] = useState(true);
  const history = useHistory()
  const feedbackRef = useRef()
  const [visible, setVisible] = useState(false);
  const [err, updateErr] = useState("")
  const [empty, updateEmpty] = useState("")


  //displaying user info
  useEffect(() => {
    api
      .getOneOnboarding(eid)
      .then((res) => {
        // console.log(res.data)
        updateLoading(false);
        loadUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const approvHandler = () => {
    api.changeOboardingStatus({
      eid: eid,
      status: "approved"
    })
      .then((res) => {
        console.log(res.data)
        history.push('/hire/onboarding')
      })
      .catch((err) => console.log(err))
  }

  const rejectHandler = () => {
    setVisible(true)
  }
  const comfirmHandler = () => {
    const textAreaContent = feedbackRef.current.resizableTextArea.textArea.value;
    if (textAreaContent.trim().length === 0) {
      updateErr("error")
      updateEmpty("Must provide a reason for rejection")
      return
    }
    api.changeOboardingStatus({
      eid: eid,
      status: "rejected",
      feedback: textAreaContent
    })
      .then((res) => {
        console.log(res.data)
        // history.push('/hire/onboarding')
        history.push('/hire/onboarding')
        setVisible(false)
        updateErr("")
        updateEmpty("")
      })
      .catch((err) => console.log(err))
  }

  const cancelHandler = () => {
    setVisible(false)
  }


  const { TabPane } = Tabs;
  const onChange = (key) => {
    console.log(key);
  };

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
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <PageHeader
            className="site-page-header-responsive"
            avatar={{ src: `http://127.0.0.1:3001/${userInfo.profile}` }}
            // : (<>avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{userInfo.name.first[0]}</Avatar>}</>)
            onBack={() => window.history.back()}
            title={`${userInfo.name.first} ${userInfo.name.middle} ${userInfo.name.last}`}
            tags={<Tag color={userInfo.userID.onboardingStatus === "pending" ? "blue" : (userInfo.userID.onboardingStatus === "rejected" ? "red" : "green")}>{userInfo.userID.onboardingStatus}</Tag>}
            extra={userInfo.userID.onboardingStatus === "pending" &&
              [<Button key="1" type="primary" onClick={approvHandler}>Approve</Button>,
              <Button key="2" onClick={rejectHandler}>Reject</Button>,
              ]
            }
            footer={
              <Tabs tabPosition="right">
                <TabPane tab="About Employee" key="1">
                  <Divider>Personal Info</Divider>
                  <Descriptions
                    layout="vertical"
                    bordered
                    column={{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
                  >
                    <Descriptions.Item label="First Name" >{userInfo.name.first}</Descriptions.Item>
                    <Descriptions.Item label="Middle Name">{userInfo.name.middle}</Descriptions.Item>
                    <Descriptions.Item label="Last Name" >{userInfo.name.last}</Descriptions.Item>
                    <Descriptions.Item label="Perferred Name">{userInfo.name.perferred}</Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">{userInfo.dob}</Descriptions.Item>
                    <Descriptions.Item label="SSN">{userInfo.ssn}</Descriptions.Item>
                    <Descriptions.Item label="Gender">{userInfo.gender}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {`${userInfo.address.streetName}, ${userInfo.address.houseNumber}, ${userInfo.address.city},  ${userInfo.address.state},  ${userInfo.address.zip}`}
                    </Descriptions.Item>
                    <Descriptions.Item label="License?">
                      <Checkbox defaultChecked={userInfo.license ? true : false} disabled>
                        Yes
                      </Checkbox>
                      <Checkbox defaultChecked={userInfo.license ? false : true} disabled>
                        No
                      </Checkbox>
                    </Descriptions.Item>
                    {userInfo.license &&
                      <>
                        <Descriptions.Item label="License Number">{userInfo.license.number}</Descriptions.Item>
                        <Descriptions.Item label="License Expiration Date">{userInfo.license.expiration}</Descriptions.Item>
                      </>
                    }
                  </Descriptions>

                  <Divider style={{ marginTop: '50px' }}>Contact Info</Divider>
                  <Descriptions
                    layout="vertical"
                    bordered
                    column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 2, xs: 1 }}
                  >
                    <Descriptions.Item label="Cell Phone Number" span="2">{userInfo.cellphone}</Descriptions.Item>
                    <Descriptions.Item label="Work Phone Number" span="2">{userInfo.workphone}</Descriptions.Item>
                  </Descriptions>
                  {userInfo.eContact.map((item, index) => {
                    return (
                      <div key={index}>
                        <Divider></Divider>
                        <Descriptions
                          layout="vertical"
                          bordered
                          column={{ xxl: 6, xl: 6, lg: 6, md: 2, sm: 2, xs: 1 }}
                        >
                          <Descriptions.Item label="First Name">{item.first}</Descriptions.Item>
                          <Descriptions.Item label="Middle Name">{item.middle}</Descriptions.Item>
                          <Descriptions.Item label="Last Name">{item.last}</Descriptions.Item>
                          <Descriptions.Item label="Tel">{item.tel}</Descriptions.Item>
                          <Descriptions.Item label="Email">{item.email}</Descriptions.Item>
                          <Descriptions.Item label="Relationship">{item.relationship}</Descriptions.Item>
                        </Descriptions>
                      </div>
                    )
                  })}

                </TabPane>

                <TabPane tab="Employment" key="2">
                  <Divider>Work Authrization</Divider>
                  <Descriptions
                    layout="vertical"
                    bordered
                    column={{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 2, xs: 1 }}
                  >
                    {userInfo.citizenship.citizen ? (
                      <Descriptions.Item
                        label="Are you a citizen or permanent resident of the U.S?"
                        span="4"
                      >
                        <Checkbox defaultChecked={userInfo.citizenship.status === "Citizen" ? true : false} disabled>
                          Citizen
                        </Checkbox>
                        <Checkbox defaultChecked={userInfo.citizenship.status === "Green Card" ? true : false} disabled>
                          Green Card
                        </Checkbox>
                      </Descriptions.Item>

                    ) : (
                      <>
                        <Descriptions.Item label="Visa Title" span="4">
                          {userInfo.citizenship.status}
                        </Descriptions.Item>
                        <Descriptions.Item label="Start Date">
                          {userInfo.citizenship.start}
                        </Descriptions.Item>
                        <Descriptions.Item label="End Date">
                          {userInfo.citizenship.end}
                        </Descriptions.Item>
                        <Descriptions.Item label="Number of Days Remaining">
                          Remaining
                        </Descriptions.Item>
                      </>
                    )}
                  </Descriptions>

                  <Divider style={{ marginTop: '50px' }}>Reference</Divider>
                  <Descriptions
                    layout="vertical"
                    bordered
                    column={{ xxl: 6, xl: 6, lg: 6, md: 2, sm: 2, xs: 1 }}
                  >
                    <Descriptions.Item label="First Name">
                      {userInfo.reference.first}
                    </Descriptions.Item>
                    <Descriptions.Item label="Middle Name">{userInfo.reference.middle}</Descriptions.Item>
                    <Descriptions.Item label="Last Name">
                      {userInfo.reference.last}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      {userInfo.reference.tel}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {userInfo.reference.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Relationship">
                      {userInfo.reference.relationship}
                    </Descriptions.Item>
                  </Descriptions>
                </TabPane>

                <TabPane tab="Documents" key="3">
                  <Divider>Evidence</Divider>
                  <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                    <Panel header="Profile Picture" key="1">
                      <img src={`http://localhost:3001/${userInfo.profile}`} alt="employee profile pic" style={{ height: 300, width: 300 }} />
                    </Panel>
                    {userInfo.license && <Panel header="Driver's License" key="2">
                      <img src={`http://localhost:3001/${userInfo.license.photo}`} alt="license copy" style={{ height: 245, width: 400 }} />
                    </Panel>}
                    {!userInfo.citizenship.citizen && <Panel header="OPT Receipt" key="3">
                      <img src={`http://localhost:3001/${userInfo.citizenship.optReceipt}`} alt="opt receipt" style={{ height: 400, width: 500 }} />
                      <object width="100%" height="400" data={`http://localhost:3001/${userInfo.citizenship.optReceipt}`} type="application/pdf">   </object>
                    </Panel>}
                  </Collapse>
                </TabPane>
              </Tabs>
            }
          >
            <Content extra={extraContent}>
              <Descriptions size="small" column={2}>
                <Descriptions.Item label="Email">
                  {userInfo.userID.email}
                </Descriptions.Item>
                <Descriptions.Item label="Username">
                  {userInfo.userID.username}
                </Descriptions.Item>
                <Descriptions.Item label="Creation Time">
                  {userInfo.creatationDate}
                </Descriptions.Item>
                <Descriptions.Item label="Association">
                  {userInfo._id}
                </Descriptions.Item>
              </Descriptions>
              {userInfo.rejFeedback &&
                <Alert
                  message="Feedback"
                  description={userInfo.rejFeedback}
                  type="error"
                  style={{ width: "85%" }}
                />
              }
            </Content>
          </PageHeader>

          <Modal
            title="Please give a feedback for rejecting the employee's onboarding application"
            centered
            visible={visible}
            onOk={comfirmHandler}
            onCancel={cancelHandler}
            width={1000}
          >
            <Form.Item label="Feeback" validateStatus={err} hasFeedback help={empty}>
              <Input.TextArea allowClear showCount ref={feedbackRef} />
            </Form.Item>
          </Modal>
        </>
      )}
    </>
  );
}
