import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string'
import api from '../../api/api';


export default function Registration() {
  const { search } = useLocation();
  // console.log('search:', search);  //?token=xxx&email=xxx
  const values = queryString.parse(search) //{token:'xxx', email: 'xxx'}
  // console.log('values',values);  //

  const initialFormData = Object.freeze({
    email: `${values.email}`,
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
    <div>
      <form>
        <label>Email</label>
        <input type="email" value={values.email} name='email' disabled />
        <label>Username</label>
        <input type="username" name='username' onChange={handleChange} />
        <label>Password</label>
        <input type="password" name='password' onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  )
}
