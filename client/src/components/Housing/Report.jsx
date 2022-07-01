import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Divider
} from "@mui/material";
import api from '../../api/api';
import { DataGrid } from '@mui/x-data-grid';
import Comment from "./Comment";
import auth from '../../utils/auth';

export default function Report(props) {
  let report = props.report;

  const [comments, updateComments] = useState([]);
  const [newComment, updateNewComment] = useState({reportID: report._id});

  useEffect(() => {
    api
      .getEmpHousingComments(report._id)
      .then(res => {
        updateComments(res.data)
      });
  }, []);

  const handleAddComment = (e) => {
    updateNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };
  const submitNewComment = (e) => {
    e.preventDefault();
    // let tempComment = {
    //   ...newComment, 
    //   username: auth.getUser().username,
    //   self: true
    // };
    // updateComments([
    //   ...comments,
    //   tempComment
    // ])
    api
      .addEmpHousingComment(newComment, report._id)
      .then(res => {
        console.log(res.data);
        // updateNewComment({reportID: report._id});
        window.location.reload(true);
      })
  };

  return (
    <Box>
      <h5>{report.title}</h5>
      <p>{report.desc}</p>
      <p>Created by: {report.username}, Timestamp: {report.timestamp.substring(0, 10)}, Status: {report.status}</p> 
      <div>
        <h6>Add comment: </h6>
        <form>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <TextField
              label="Comment"
              variant="outlined"
              onChange={handleAddComment}
              name="desc"
              fullWidth
            />
            <Button onClick={submitNewComment}>
              Add
            </Button>
          </Stack>
        </form>
      </div>
      <br></br>
      <div>
        <h6>Comments: </h6>
        {comments.map((comment, index) => (
          // <p key={index}>{comment.desc}</p>
          <Comment comment={comment} key={index}/>
        ))}
      </div>
    </Box>
  )
}