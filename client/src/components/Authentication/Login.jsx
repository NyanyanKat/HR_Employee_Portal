import { useState } from "react";
import api from "../../api/api";
import {
  TextField,
  OutlinedInput,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Box,
  FormHelperText
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import auth from '../../utils/auth'

export default function Login() {

  const [showPwd, updateShowPwd] = useState(false);
  const handleClickShowPassword = () => {
    updateShowPwd(!showPwd);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  //handle Input Validation
  const [errMsg, updateErrMsg] = useState(initialFormData);

  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    api
      .login(formData)
      .then((res) => {
        auth.login(res.data.token,res.data.user)
        updateErrMsg({username:"",password:""});
      })
      .catch((error) => {
        // console.log(error)
        if(error.response.status === 400){
          updateErrMsg(error.response.data);
        }
      });
  };

  return (
    <form>
      <Box sx={{ display: "flex", flexDirection: "column", width: "45ch" }}>
        <TextField
          label="Username"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="username"
          error={errMsg.username ? true : false}
          helperText={errMsg.username}
        />
        <FormControl variant="outlined" sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-password" error={errMsg.password ? true : false}>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPwd ? "text" : "password"}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  error={errMsg.password ? true : false}
                >
                  {showPwd ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            error={errMsg.password ? true : false}
          />
          {errMsg.password && (
            <FormHelperText error> {errMsg.password} </FormHelperText>
          )}
        </FormControl>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{ m: 1 }}
          size="large"
        >
          Log In
        </Button>
      </Box>
    </form>
  );
}
