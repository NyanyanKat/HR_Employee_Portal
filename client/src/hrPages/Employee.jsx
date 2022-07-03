import React from "react";
import { useEffect, useState } from "react";
import { Box, Tab, TextField } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Avatar, List, Button } from "antd";
import "antd/dist/antd.css";
import { useHistory, useRouteMatch } from "react-router-dom";
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
                setSearchData(res.data);
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
        filterData(q);
    }, []);


    let history = useHistory();
    const viewProfile = (eid) => {
        console.log(eid);
        history.push(`/employee/info/${eid}`);
    }

    var searchArray = [];
    // filter data based on search query
    const filterData = (q) => {
        if (q === null || q === "") {
            setSearchData(data);
        } else {
            searchArray = [];
            data.forEach(item => {
                if (item.username.includes(q)) {
                    searchArray.push(item);
                }

            });
            setSearchData(searchArray);
            // filter data based on search query
            // set searchData to be the filtered data

        }

    }

    // const handleChange = (e) => {
    //     updateFormData({
    //       ...formData,
    //       [e.target.name]: e.target.value,
    //     });
    //   };

    console.log(data[0])
    return (
        <Box sx={{ width: '100%', typography: 'body1', padding: "0 30px" }}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {/* search box */}
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Search"
                    onChange={(e) => {
                        console.log(e.target.value)
                        setQ(e.target.value);
                        filterData(e.target.value);
                        console.log('q', q);
                        console.log('data is array? ', Array.isArray(data));
                    }}
                    value={q}
                />


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
                    {searchData.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.username}</td>
                            <td>{employee.email}</td>
                            <td><Button type="primary" onClick={() => viewProfile(employee._id)}>View Profile</Button></td>
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


        </Box >
    );
}
