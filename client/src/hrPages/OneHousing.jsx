import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function OneHousing() {
    // get user info data from backend
    const [housing, setHousing] = useState({});

    const { id } = useParams();
    console.log('id', id);

    const loadData = () => {
        try {
            fetch('/api/housing/' + id)
                .then(res => console.log(res.body))
                .then(data => {
                    console.log(data);
                    setHousing(data);
                })
                .catch(err => console.log(err));
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
        console.log(housing);
    }, []);

    return (
        <div>
            <div>
                <h2>Facility Info</h2>

                <h4>Number of Beds: {housing.facilityInfo.numBeds}</h4>
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
                })}
            </div>
            <div>
                <h2>Employee Info</h2>
                <h4><a href='/'>{housing.employeeInfo.infoID.name.first} {housing.employeeInfo.infoID.name.last}</a></h4>
                <h4>{housing.employeeInfo.infoID.email}</h4>
                <h4>{housing.employeeInfo.infoID.cellphone}</h4>
                <h4>{housing.employeeInfo.infoID.car}</h4>
            </div>
        </div>
    )
}