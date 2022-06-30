// import React, { useRef, useEffect, useState } from "react";
// import {Table} from "@mui/material";
// //find all employees
// export default function Employee() {
//     // const employees = fetch('/api/employees')
//     //     .then(res => res.json())
//     //     .then(data => data)
//     //     .catch(err => console.log(err));

//     // const columns = [{
//     //     dataField: 'id',
//     //     text: 'Product ID',
//     //     sort: true
//     // }, {
//     //     dataField: 'name',
//     //     text: 'Product Name',
//     //     sort: true
//     // }, {
//     //     dataField: 'price',
//     //     text: 'Product Price'
//     // }];

//     return (
//         <div>
//             {/* <Table columns={columns} data={employees} />
//             {employees.map(employee => (
//                 <div>
//                     <h1>{employee.name}</h1>
//                     <p>{employee.email}</p>
//                 </div>
//             ))} */}
//             <Table />

//         </div>
//     )
// }






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
import { useHistory } from "react-router-dom";
import api from '../api/api';
import { Table } from 'react-bootstrap'

export default function Employee() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);


    const [searchParam] = useState(["first", "last", "preferred"]);

    // const handleChange = (event, newValue) => {
    //     setTabValue(newValue);
    // };


    const loadMoreData = () => {

        api.getEmployee()
        .then(res => {
            console.log(res.data)
            setLoading(false);
            setData(res.data);
        })
        .catch(err => console.log(err));

        //fetch from backend
        // api.getEmployee()
        //     .then((res) => {
        //         return res.data
        //     })
        //     .then((body) => {
        //         console.log(body);
        //         setData([...data, ...body.results]);

        //     })
        //     .catch(() => {
        //         console.log("error");
        //     });
    };
    
    useEffect(() => {
        loadMoreData();
        console.log(data);
    }, []);


    let history = useHistory();
    const viewProfile = (eid) => {
        console.log(eid);
        history.replace(`/employee/info/${eid}`);
    }


    // filter data based on search query
    const filterData = (q) => {
        if (q === "") {
            setSearchData([data]);
        } else {
            // const filteredData = data.filter(item => {
            //     return searchParam.some(param => item[param].includes(q));
            // }).slice(0, 10);
            // setSearchData(filteredData);


            // const search = searchParam.map((param) => {
            //     return `${param}:${q}`;
            // }).join(" ");
            // const searchData = data.filter((item) => {
            //     return new RegExp(search, "i").test(item.name.first);
            // }).slice(0, 10);
            // console.log('searchData', searchData);
            // setSearchData(searchData);
        }

    }
console.log(data[0])
    return (
        <Box sx={{ width: '100%', typography: 'body1', padding: "0 30px" }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* search box */}
                <label htmlFor="search-form">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        placeholder="Search for..."
                        value={q}
                        /*
                        // set the value of our useState q
                        //  anytime the user types in the search box
                        */
                        onChange={(e) => {
                            setQ(e.target.value);
                            filterData(e.target.value);
                            console.log(searchData);
                        }}
                    />
                    <span className="sr-only">Search countries here</span>
                </label>
                {/* <Button type="primary" style={{marginBottom:"10px"}}>Search</Button> */}
            </Box>

            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Username</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.username}</td>
                            <td>{employee.email}</td>
                            <td><Button type="primary" onClick={() => viewProfile(employee.email)}>View Profile</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* <List
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.email}>
                        <List.Item.Meta
                            name={<a href="https://ant.design">{item.name.first} {item.name}</a>}
                            cell={<a href="https://ant.design">{item.cellphone}</a>}

                        />
                        <form>
                            <Button type="primary" onClick={() => viewProfile(item.userid.email)}>View Profile</Button>
                        </form>
                    </List.Item>
                )}
            /> */}


        </Box>
    );
}
