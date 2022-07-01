import React from "react";
import { useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import api from '../../api/api'
import { Box, Tab } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Avatar, List, Button } from "antd";
import "antd/dist/antd.css";


export default function OnboardingReview() {
  const [isLoading, updateLoading] = useState(true);
  const [pendingApp, updatePendingApp] = useState([]);
  const [approvedApp, updateApprovedApp] = useState([]);
  const [rejectedApp, updateRejectedApp] = useState([]);
  const [nosubmissionApp, updateNoSubmissionApp] = useState([]);



  useEffect(() => {
    api.getAllOnboarding()
      .then(res => {
        // console.log(res.data.approvedReview[0].infoID.name.first[0])
        updateLoading(false);
        updatePendingApp(res.data.pendingReview)
        updateApprovedApp(res.data.approvedReview)
        updateRejectedApp(res.data.rejectedReview)
        updateNoSubmissionApp(res.data.nosubmissionReview)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const [tabValue, setTabValue] = React.useState('1');
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  let history = useHistory ();
  const handleView = (eid) => {
      history.push(`/hire/onboarding/view?eid=${eid}`)
  }

  return (
    <>
    {isLoading ? (<div>Loading</div>) : (
      <Box sx={{ width: '100%', typography: 'body1', padding: "0 30px" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Pending" value="1" style={{ minWidth: "15%" }} />
            <Tab label="Rejected" value="2" style={{ minWidth: "15%" }} />
            <Tab label="Never Submited" value="3" style={{ minWidth: "15%" }} />
            <Tab label="Approved" value="4" style={{ minWidth: "15%" }} />
          </TabList>
        </Box>
      
        <TabPanel value="1">
          <List
            dataSource={pendingApp}
            renderItem={(item) => (
              <List.Item key={item._id}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.profilePic} />}
                  avatar = {<Avatar style={{ backgroundColor: '#1890ff' }}>{item.infoID.name.first[0]}</Avatar>}
                  title={<a href={`/hire/onboarding/view?eid=${item._id}`}>{`${item.infoID.name.first}  ${item.infoID.name.last}`}</a>}
                  description={item.email}
                />
                <Button shape="round" size="default" onClick={()=>handleView(item._id)}>
                  View Application
                </Button>
              </List.Item>
            )}
            />
      
        </TabPanel>
        <TabPanel value="2">
          <List
            dataSource={rejectedApp}
            renderItem={(item) => (
              <List.Item key={item._id}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.profilePic} />}
                  avatar = {<Avatar style={{ backgroundColor: '#1890ff' }}>{item.name.first[0]}</Avatar>}
                  title={<a href={`/hire/onboarding/view?eid=${item.infoID}`}>{`${item.infoID.name.first}  ${item.infoID.name.last}`}</a>}
                  description={item.email}
                />
                <Button shape="round" size="default" onClick={()=>handleView(item.userID._id)}>
                  View Application
                </Button>
              </List.Item>
            )}
          />
        </TabPanel>
      
        <TabPanel value="3">
        <List
            dataSource={nosubmissionApp}
            renderItem={(item) => (
              <List.Item key={item._id}>
                <List.Item.Meta
                  avatar = {<Avatar style={{ backgroundColor: '#1890ff' }}>{item.username[0]}</Avatar>}
                  title={item.username}
                  description={item.email}
                />
                <Button shape="round" size="default">
                  Send Invitation
                </Button>
              </List.Item>
            )}
          />
        </TabPanel>
      
        <TabPanel value="4">
          <List
            dataSource={approvedApp}
            renderItem={(item) => (
              <List.Item key={item.userID}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.profilePic} />}
                  avatar = {<Avatar style={{ backgroundColor: '#1890ff' }}>{item.infoID.name.first[0]}</Avatar>}
                  title={<a href={`/hire/onboarding/view?eid=${item.infoID}`}>{`${item.infoID.name.first}  ${item.infoID.name.last}`}</a>}
                  description={item.email}
                /> 
                <Button shape="round" size="default" onClick={()=>handleView(item._id)}>
                  View Application
                </Button>
              </List.Item>
            )}
          />
        </TabPanel>
      </TabContext>
      </Box>

    )}
    </>
  );
}


