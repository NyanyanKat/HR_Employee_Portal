import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../api/api";
import axios from 'axios';
export default function OneHousing() {
    // get user info data from backend
    const [housing, setHousing] = useState({});
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    console.log('id', id);

    const loadData = async () => {
        try {
            await axios.get(`http://127.0.0.1:3001/api/hr/housing/one/${id}`)
                .then(res => {
                    console.log(res.data[0]);
                    setLoading(false);
                    setHousing(res.data[0]);

                })

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // loadData();

        axios.get(`http://127.0.0.1:3001/api/hr/housing/one/${id}`)
            .then(res => {
                setLoading(false);
                console.log(res.data[0]);

                setHousing(res.data[0]);
                console.log(housing)
            })
    }, []);

    return (
        <div>
            <div>
                <h2>Facility Info</h2>
                <p>{housing.landlord.name}</p>/
                {/* <h4>Number of Beds: {housing.facilityInfo.numBeds}</h4>
                <h4>Number of Mattresses: {housing.facilityInfo.numMattress}</h4>
                <h4>Number of Tables: {housing.facilityInfo.numTables}</h4>
                <h4>Number of Chairs: {housing.facilityInfo.numChairs}</h4>
                {housing.facilityInfo.reports.map(report => {
                    return (
                        <div>
                            <h4>Report: {report.title}</h4>
                            <h4>Date: {report.timestamp}</h4>
                            <h4>Status: {report.status}</h4>
                            <h4>Created By: {report.creatorID.username}</h4>
                            <h4>Description: {report.desc}</h4>

                        </div>
                    )
                })} */}
            </div>
            <div>
                <h2>Employee Info</h2>
                {/* <h4><a href='/'>{housing.employeeInfo.infoID.name.first} {housing.employeeInfo.infoID.name.last}</a></h4>
                <h4>{housing.employeeInfo.infoID.email}</h4>
                <h4>{housing.employeeInfo.infoID.cellphone}</h4>
                <h4>{housing.employeeInfo.infoID.car}</h4> */}
            </div>
        </div>
    )
}