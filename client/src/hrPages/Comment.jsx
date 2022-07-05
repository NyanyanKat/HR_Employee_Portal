import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import api from "../api/api";
import axios from 'axios';
import auth from "../utils/auth";
import { Button, Box, Table, TextField } from "@mui/material";

export default function Comment(props) {
    // get user info data from backend
    const comments = props.comments;

    const { id } = useParams();
    console.log('id', id);
    const [loading, setLoading] = useState(true);
    const [hr, setHR] = useState(false);
    useEffect(() => {
        const role = auth.getUser().role ;
        console.log(role);
        if (role === 'hr') {
            setHR(true);
        }
        setLoading(false);
    }, [])

    const editComment = (cid) => {
        console.log(cid);
    }

    return (
        <div>
            {
                comments.map((comment, i) => {
                    return (
                        <Box key={i}>
                            <p>{comment.desc} {hr ?
                                <Button onClick={()=>editComment(comment._id)}> Edit </Button>
                                : <></>}
                            </p>
                            <p>{comment.timestamp.substring(0, 10)}</p>
                            {/* <p>Submitted by {comment.creatorID.infoID.name.first} {comment.creatorID.infoID.name.last}</p> */}
                        </Box>
                    )
                })
            }
        </div>
    )
}