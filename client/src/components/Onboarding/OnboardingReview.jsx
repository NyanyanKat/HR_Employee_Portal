// import * as React from 'react';
// import { Box, Tab } from '@mui/material';
// import { TabList, TabPanel, TabContext } from '@mui/lab';

// export default function LabTabs() {
    // const [tabValue, setTabValue] = React.useState('1');

    // const handleChange = (event, newValue) => {
    //     setTabValue(newValue);
    // };

//     return (
        // <Box sx={{ width: '100%', typography: 'body1' }}>
        //     <TabContext value={tabValue}>
        //         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        //             <TabList onChange={handleChange} aria-label="lab API tabs example">
        //                 <Tab label="Pending" value="1" style={{minWidth:"15%"}}/>
        //                 <Tab label="Rejected" value="2" style={{minWidth:"15%"}}/>
        //                 <Tab label="Approved" value="3" style={{minWidth:"15%"}}/>
        //             </TabList>
        //         </Box>
        //         <TabPanel value="1">

        //         </TabPanel>
        //         <TabPanel value="2">

        //         </TabPanel>
        //         <TabPanel value="3">

        //         </TabPanel>
        //     </TabContext>
        // </Box>
//     );
// }

import React from "react";
import { useEffect, useState } from "react";
import { Box, Tab } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Avatar, List, Button } from "antd";
import "antd/dist/antd.css";


export default function OnboardingReview() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [tabValue, setTabValue] = React.useState('1');

  const handleChange = (event, newValue) => {
      setTabValue(newValue);
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1',  padding: "0 30px"}}>
    <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Pending" value="1" style={{minWidth:"15%"}}/>
                <Tab label="Rejected" value="2" style={{minWidth:"15%"}}/>
                <Tab label="Approved" value="3" style={{minWidth:"15%"}}/>
            </TabList>
        </Box>
        <TabPanel value="1">
        <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <Button shape="round" size="default">
              View Application
            </Button>
          </List.Item>
        )}
      />

        </TabPanel>
        <TabPanel value="2">
        <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <Button shape="round" size="default">
              View Application
            </Button>
          </List.Item>
        )}
      />

        </TabPanel>
        <TabPanel value="3">
        <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <Button shape="round" size="default">
              View Application
            </Button>
          </List.Item>
        )}
      />

        </TabPanel>
    </TabContext>
</Box>
  );
}
