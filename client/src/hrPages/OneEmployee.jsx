import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import api from '../api/api';
import axios from 'axios';

export default function OneEmployee() {
    // get user info data from backend
    const [userInfo, setUserInfo] = useState({});

    const { id } = useParams();
    console.log('id', id);

    const loadData = () => {
        try{
            fetch('/api/employee/info/' + id)
            .then(res => console.log(res.body))
            .then(data => {
                console.log(data);
                setUserInfo(data);
            })
            .catch(err => console.log(err));
        console.log('userinfo', userInfo);
        }
        catch(err){
            console.log(err);
        }
    }

    // api.getEmployeeInfo()
    //     .then(res => {
    //         console.log(res.data);
    //         setUserInfo(res.data);
    //     })
    //     .catch(err => console.log(err));


    useEffect(() => {
        loadData();
        console.log(userInfo);
        // fetch('/api/employee/' + id)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setUserInfo(data);
        //     })
        //     .catch(err => console.log(err));
        //     console.log('userinfo',userInfo);
        // api.getEmployeeInfo()
        //     .then(res => {
        //         console.log(res.data);
        //         setUserInfo(res.data);
        //     })
        //     .catch(err => console.log(err));
    }, []);

    // const { search } = useLocation();
    // console.log('search:', search);  //?token=xxx&email=xxx
    // const queries = queryString.parse(search); //{token:'xxx', email: 'xxx'}
    // console.log('values', queries);

    console.log('userInfo:', userInfo);

    // b. Summary View (list total number of employees, and order them alphabetically by
    //     last name)
    //     i. Name (legal full name)
    //     1. The name should be a link that opens a new tab that displays the
    //     entire profile.
    //     ii. SSN
    //     iii. Work Authorization Title
    //     iv. Phone Number
    //     v. Email


    return (
        <div>
            {/* <Table columns={columns} dataSource={userInfo} />; */}

            <a href="/">Name: {userInfo.name}</a>
            <p>SSN: {userInfo.ssn}</p>
            <p>Work Authorization Title: {userInfo.workAuthTitle}</p>
            <p>Phone Number: {userInfo.phoneNumber}</p>
            <p>Email: {userInfo.email}</p>

        </div>
    )
}