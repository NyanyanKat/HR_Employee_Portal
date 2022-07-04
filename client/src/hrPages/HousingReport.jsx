import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import api from "../api/api";
import axios from 'axios';
import { Button, Box, Table, TextField } from "@mui/material";
import auth from "../utils/auth";

export default function HousingReport() {
    // get user info data from backend
    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState({});

    const { id } = useParams(); // report id
    console.log('id', id);

    // get housing id from report


    const initialFormData = Object.freeze({
        reportID: id,
        desc: "",
        timestamp: Date.now,
        // creatorID: localStorage.getItem("user").id,
    })

    const [formData, updateFormData] = useState(initialFormData);


    // id is report id
    const loadData = () => {
        try {
            //get report
            axios.get(`http://127.0.0.1:3001/api/hr/report/${id}`)
            .then(res => {
                console.log(res.data);
                setReport(res.data);
                setLoading(false);
                
                console.log(report);
            })
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        try {
            //get report
            axios.get(`http://127.0.0.1:3001/api/hr/report/${id}`)
            .then(res => {
                console.log(res.data);
                setReport(res.data);
                setLoading(false);
                
                console.log(report);
            })
        } catch (err) {
            console.log(err);
        }

        // axios.get(`http://
    },[])

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);
    }

    const submitComment = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            //post to create comment on report
            await axios.post(`http://localhost:3001/api/hr/housing/report/:id/comment`, formData)
                .then(res => {
                    console.log(res.data);
                    setReport(res.data);
                    console.log(report)
                })
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            {loading ? <div>Loading...</div> :
                <div>
                    <h3>{report.title}</h3>
                    <p>{report.desc}</p>
                    <p>{report.timestamp}</p>
                    {/* <p>Submitted by {report.creatorID.infoID.name.first} {report.creatorID.infoID.name.last}</p> */}

                    {/* comment box */}
                    <Box>
                        <h4>Comments</h4>
                
                        {report.comments.map((comment) => {
                            return (
                                <Box>
                                    <p>{comment.desc}</p>
                                    <p>{comment.timestamp}</p>
                                    <p>Submitted by {comment.creatorID.infoID.name.first} {comment.creatorID.infoID.name.last}</p>
                                </Box>
                            )
                        }
                        )}

                        {/* add new comment */}

                        <h4>Add a comment</h4>
                        <form>
                            <TextField
                                name="desc"
                                label="Comment Description"
                                value={formData.desc}
                                onChange={handleChange}
                                sx={{ m: 1 }}
                                required
                            />
                            <Button onClick={submitComment}>Submit</Button>
                        </form>

                    </Box>
                </div>
            }
        </div>

    )
}