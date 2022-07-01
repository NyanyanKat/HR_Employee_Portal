import { useState, useEffect } from "react";
import {
  Stack,
  Button,
  TextField,
  Divider
} from "@mui/material";
import auth from '../../utils/auth';
import api from '../../api/api';

export default function Report(props) {
  let comment = props.comment;
  const [showTextField, updateShowTextField] = useState(false);
  const [commentDesc, updateCommentDesc] = useState(comment.desc);
  // console.log(comment)
  const toTextField = (e) => {
    updateShowTextField(true);
  };
  const handleUpdateComment = (e) => {
    updateCommentDesc(e.target.value);
  }
  const submitComment = (e) => {
    e.preventDefault();
    api
      .updateEmpHousingComment({ desc: commentDesc }, comment._id)
      .then(res => {
        updateShowTextField(false);
        // window.location.reload(true);
      })
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      {showTextField ?
        <TextField
          label="Comment"
          variant="outlined"
          onChange={handleUpdateComment}
          name="desc"
          value={commentDesc}
          fullWidth
        /> :
        <p>{comment.username + ': ' + commentDesc + ', created on ' + comment.timestamp.substring(0, 10)}</p>
      }
      {comment.self ?
        (showTextField ?
          <Button onClick={submitComment}>Submit</Button> :
          <Button onClick={toTextField}>Update</Button>
        ) :
        <div></div>
      }
    </Stack>
  )
}