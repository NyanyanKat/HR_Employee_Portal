import { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
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
  FormHelperText,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function Registration() {
  //handle Data Validation
  const [errMsg, updateErrMsg] = useState({
    email: "",
    password: "",
    username: "",
  });

  //handleClickShowPassword
  const [showPwd, updateShowPwd] = useState(false);
  const handleClickShowPassword = () => {
    updateShowPwd(!showPwd);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Controlled Component
  const { search } = useLocation();
  // console.log('search:', search);  //?token=xxx&email=xxx
  const queries = queryString.parse(search); //{token:'xxx', email: 'xxx'}
  // console.log('values',values);

  const initialFormData = Object.freeze({
    email: `${queries.email}`,
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Sign Up
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .register(formData)
      .then((res) => {
        // console.log('Response',res.data)
        updateErrMsg({});
      })
      .catch((error) => {
        // console.log('Error',error.response.data)
        updateErrMsg(error.response.data);
      });
  };

  return (
    <form>
      <Box sx={{ display: "flex", flexDirection: "column", width: "45ch" }}>
        <TextField
          label="Email"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="email"
          value={queries.email}
          error={errMsg.email ? true : false}
          helperText={errMsg.email}
          disabled
        />
        <TextField
          label="Username"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="username"
          error={errMsg.username ? true : false}
          disabled={errMsg.email ? true : false}
          helperText={errMsg.username}
        />
        <FormControl variant="outlined" sx={{ m: 1 }}>
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={errMsg.password ? true : false}
            disabled={errMsg.email ? true : false}
          >
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
                  disabled={errMsg.email ? true : false}
                >
                  {showPwd ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            error={errMsg.password ? true : false}
            helperText={errMsg.password}
            disabled={errMsg.email ? true : false}
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
          disabled={errMsg.email ? true : false}
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
}
