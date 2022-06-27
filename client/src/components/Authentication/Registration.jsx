import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import api from '../../api/api';
import { TextField, OutlinedInput, Button, InputAdornment, IconButton, FormControl, InputLabel, Box } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material'

export default function Registration() {

  const [attr, setAttr] = useState(false);
  const handleClickShowPassword = () => {
    setAttr(!attr);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const { search } = useLocation();
  // console.log('search:', search);  //?token=xxx&email=xxx
  const queries = queryString.parse(search) //{token:'xxx', email: 'xxx'}
  // console.log('values',values);  //

  const initialFormData = Object.freeze({
    email: `${queries.email}`,
    username: "",
    password: ""
  });

  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    api.register(formData).then(res => console.log(res.data)).catch(error => console.log(error))
  }

  return (
    <form>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '45ch' }}>

        <TextField label="Email" variant="outlined" sx={{ m: 1}} onChange={handleChange} value={queries.email} name="email" disabled/>
        <TextField  label="Username" variant="outlined"  sx={{ m: 1}} onChange={handleChange} name="username" />
        <FormControl variant="outlined"  sx={{ m: 1}} >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={attr ? 'text' : 'password'}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {attr ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
          />
        </FormControl>
        <Button variant="outlined" onClick={handleSubmit}  sx={{ m: 1}} size="large">Sign Up</Button>
      </Box>
    </form>
  )
}
