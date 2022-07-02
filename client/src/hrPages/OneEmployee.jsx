import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import api from '../api/api';
import axios from 'axios';

export default function OneEmployee() {
    // get user info data from backend
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const { eid } = useParams();
    console.log('eid', eid);

    const loadData = () => {
        try{
            axios.get(`http://127.0.0.1:3001/api/employee/info/${eid}`)
            .then(res => {
                console.log(res);
                setUserInfo(res.data);
                setLoading(false);
            })
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
            <h1>Employee Info</h1>
            {loading ? <div>Loading...</div> :
            <div>
            <p>Name: {userInfo.name.first} {userInfo.name.last}</p>
            <p>Address: {userInfo.address.houseNumber} {userInfo.address.streetName} {userInfo.address.city} {userInfo.address.state} {userInfo.address.zip}</p>
            <p>Email: {userInfo.userID.email}</p>
            <p>License: {userInfo.license.number} Expiration: {userInfo.license.expiration}</p>
            <p>DOB: {userInfo.dob}</p>
            <p>Reference: {userInfo.reference.first} {userInfo.reference.last}  Phone Num: {userInfo.reference.tel}  Email: {userInfo.reference.email}</p>
            </div>
            }
            <p>Gender: {userInfo.gender}</p>
            <p>SSN: {userInfo.ssn}</p>
            <p>CellPhone #: {userInfo.cellphone}</p>
            <p>WorkPhone #: {userInfo.workphone}</p>

        </div>
    )
}   