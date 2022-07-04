import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import api from "../api/api";
import axios from 'axios';
import { Button, Box } from "@mui/material";
import { Table } from 'react-bootstrap';

export default function OneHousing() {
    // get user info data from backend
    const [housing, setHousing] = useState({});
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState(false);
    const [reportData, setReportData] = useState([]);

    const { id } = useParams();
    console.log('id', id);

    const loadData = async () => {
        //get report 
        try {
            //housing info
            await axios.get(`http://127.0.0.1:3001/api/hr/housing/one/${id}`)
                .then(res => {
                    console.log(res.data);
                    setHousing(res.data);

                })
                .catch(err => console.log(err));
            //report data
            await axios.get(`http://127.0.0.1:3001/api/hr/report/housing/${id}`)
                .then(res => {
                    console.log(res.data);
                    setReportData(res.data);
                    setLoading(false);
                    setReports(true);
                    console.log(reportData);
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();

    }, []);

    let history = useHistory();

    const viewReport = (reportID) => {
        console.log(reportID);
        history.push(`/hr/housing/report/${reportID}`);
    }

    return (
        <div>

            {loading ? <div>Loading...</div> :
                <div>
                    <h2>Facility Info</h2>
                    <p>Beds: {housing.facilityInfo.numBeds}</p>
                    <p>Mattresses: {housing.facilityInfo.numMattress}</p>
                    <p>Tables: {housing.facilityInfo.numTables}</p>
                    <p>Chairs: {housing.facilityInfo.numChairs}</p>
                    <br>
                    </br>
                    <h2> Landlord </h2>
                    <p>Name: {housing.landlord.name}</p>
                    <p>Phone: {housing.landlord.tel}</p>
                    <p>Email: {housing.landlord.email}</p>

                    <h2>Facility Reports</h2>
                    {reports ? (
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map((report, index) => (
                                        <tr key={index}>
                                            <td>{report.title}</td>
                                            <td>{report.timestamp}</td>
                                            <td><Button type="primary" onClick={() => viewReport(report._id)}>View Report</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Box>
                    ) : (
                        <h4>There are currently no active reports</h4>
                    )}

                </div>
            }

        </div>
    )
}