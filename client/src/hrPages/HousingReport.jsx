import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import api from "../api/api";
import axios from 'axios';
import { Button, Box, Table, TextField } from "@mui/material";
import auth from "../utils/auth";
import Comment from "./Comment";

export default function HousingReport() {
    // get user info data from backend
    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState({});
    const [comments, setComments] = useState([]);
    const [hr, setHR] = useState(false);
    const [edit, setEdit] = useState(false);
    const [role, setRole] = useState('');

    const [hrData, setHrData] = useState({});
    const [commentEdit, setCommentEdit] = useState('');


    const { id } = useParams(); // report id
    console.log('id', id);

    // get housing id from report

    const initialFormData = Object.freeze({
        reportID: id,
        desc: "",
        timestamp: Date.now,
        creatorID: '',
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


                    console.log(report);
                })

            axios.get(`http://127.0.0.1:3001/api/hr/report/comment/${id}`)
                .then(res => {
                    console.log(res.data);
                    setComments(res.data);
                    console.log(comments);
                    setLoading(false);
                })
            //get hr user info
            axios.get(`http://127.0.0.1:3001/api/employee/hr`)
                .then(res => {
                    console.log(res.data);
                    // setHrData(res.data);

                    updateFormData({
                        ...formData,
                        creatorID: hrData._id
                    })

                    setHR(true);
                    console.log(hrData);
                })

        } catch (err) {
            console.log(err);
        }

        //get comments from report

    }, [])

    // get role from comment


    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }
    let history = useHistory();


    const submitComment = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            //post to create comment on report
            await axios.post(`http://localhost:3001/api/hr/housing/report/${id}/comment`, formData)
                .then(res => {
                    console.log(res.data);
                    // setReport(res.data);
                    console.log(report);
                    setComments([...comments, res.data]);
                    console.log(comments);
                    //history.go(0);
                })
            console.log('hrdata', hr.Data)
        } catch (err) {
            console.log(err);
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
        if (edit === false) {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }

    const handleCommentEdit = (e) => {
        setCommentEdit(e.target.value);
        console.log(e.target.value);

    }
    const handleEditSubmit = (cid, data) => {
        // fetch to get comment

        // axios({
        //     method: 'get',
        //     url: `http://localhost:3001/api/hr/report/comment/one/${cid}`,
        //     headers: {}, 
        //     data: {
        //       body: data, // This is the body part
        //     }
        //   })
        //     .then(res => {
        //         console.log(res.data);
        //         setComments([...comments, res.data]);
        //         console.log(comments);
        //         //history.go(0);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        const newComments = [];
        axios.post(`http://localhost:3001/api/hr/report/comment/one/${cid}`, 
        {comment: data})
            .then(res => {
                console.log('res.data', res.data);
                // setReport(res.data);
                console.log(report);
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i]._id !== cid) {
                        newComments.push(comments[i]);
                    } else {
                        newComments.push(res.data);
                    }
                }

                setComments(newComments);
                console.log(comments);
                //history.go(0);
            })

        setEdit(false)
    }


    return (
        <div>
            {loading ? <div>Loading...</div> :
                <div>
                    <h3>{report.title}</h3>
                    <p>{report.desc}</p>
                    <p>{report.timestamp.substring(0, 10)}</p>
                    {/* <p>Submitted by {report.creatorID.infoID.name.first} {report.creatorID.infoID.name.last}</p> */}

                    {/* comment box */}
                    <Box>
                        <h4>Comments <Button onClick={handleEdit}>Edit Comments</Button></h4>
                        {/* <Comment comments={comments} /> */}

                        {
                            comments.map((comment, i) => {
                                return (
                                    <Box key={i}>
                                        <p>{comment.desc} </p>
                                        <p>{comment.timestamp.substring(0, 10)}</p>
                                        {edit && comment.creatorID === auth.getUser().id ?
                                            <>
                                                <TextField
                                                    name="desc"
                                                    value={commentEdit}
                                                    onChange={handleCommentEdit}
                                                    multiline
                                                    rows={2}
                                                    variant="outlined"
                                                    label="Edit Comment"
                                                />
                                                <Button onClick={() => handleEditSubmit(comment._id, commentEdit)}>submit edit</Button>
                                            </>
                                            : <></>}
                                        {/* <p>Submitted by {comment.creatorID.infoID.name.first} {comment.creatorID.infoID.name.last}</p> */}
                                    </Box>
                                )
                            })
                        }

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