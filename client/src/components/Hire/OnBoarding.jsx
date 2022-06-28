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
  Grid,
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Onboarding() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT", e);
    console.log(formData);
  };

  const initialFormData = Object.freeze({
    firstname: "",
    middlename: "",
    lastname: "",
    preferredname: "",
    pic: "",
    building: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    cellphone: "",
    workphone: "",
    carmake: "",
    carmodel: "",
    carcolor: "",
    // email grab from store??
    ssn: "",
    dob: "",
    gender: "",
    citizen: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  return (

    <form>
      <Box sx={{ flexWrap: "wrap" }}>
      <h1 >New Employee Onboarding Form</h1>
        <h5>Hello! We are excited for your first day. Please fill in
        the questions below.</h5>
        <br></br>
        <span>* denotes required field</span> 
        <br></br><hr></hr>

        <p> Name </p>
        <TextField
          label="First name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="firstname"
          required
        />

        <TextField
          label="Middle name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="middlename"
        />
        <TextField
          label="Last name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="lastname"
          required
        />
        <br></br>
        <br></br>

        <p>Preferred Name</p>
        <TextField
          label="Preferred Name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="preferredname"
        />
        <br></br>
        <br></br>

        <p>Profile Picture</p>
        <TextField
          label="Profile Picture"
          placeholder="profile"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="pic"
        />
        <br></br>
        <br></br>

        <p>Address</p>
        <TextField
          label="building/apt#"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="building"
          required
        />
        <TextField
          label="Street Name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="street"
          style={{ width: 600 }}
          required
        />
        <TextField
          label="City"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="city"
          required
        />
        <TextField
          label="State"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="state"
          required
        />
        <TextField
          label="Zip"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="zip"
          required
        />
        <br></br>
        <br></br>

        {/* iii. Current address (building/apt #, street name, city, state, zip)
iv. Cell phone number, work phone number
v. Car information (make, model, color)
vi. Email (pre-filled based on email that received registration token, cannot be
edited) */}

        <p>Contact Number</p>
        <TextField
          label="Cell Phone"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="cellphone"
          required
        />

        <TextField
          label="Work Phone"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="workphone"
        />
        <br></br>
        <br></br>

        <p>Car Information</p>
        <TextField
          label="Make"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="carmake"
        />

        <TextField
          label="Model"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="carmodel"
        />

        <TextField
          label="Color"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="carcolor"
        />
        <br></br>
        <br></br>

        <p>Email</p>
        <TextField
          label="TODO"
          variant="outlined"
          sx={{ m: 1 }}
        //   onChange={handleChange}
          name="email"
          disabled
        />
        <br></br>
        <br></br>

        <p>SSN</p>
        <TextField
          label="SSN"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="ssn"
          required
        />
        <br></br>
        <br></br>

        <p>Date of Birth</p>
          <TextField
            name="dob"
            label="Birthday"
            type="date"
            defaultValue=""
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            required
          />
        <br></br>
        <br></br>
        
        <p>Gender</p>
        <FormControl style={{width: 250}}>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          name="gender"
          value={formData.gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'I do not wish to answer'}>I do not wish to answer</MenuItem>
        </Select>
      </FormControl>
      <br></br><br></br>

        <p>Are you a citizen or permanent resident of the U.S?</p>
        <FormControl style={{width: 250}}>
        <InputLabel id="yescitizen">Yes?</InputLabel>
        <Select
          labelId="yescitizen"
          name="citizen"
          value={formData.citizen}
          label="yescitizen"
          onChange={handleChange}
        >
          <MenuItem value={'Green Card'}>Green Card</MenuItem>
          <MenuItem value={'Citizen'}>Citizen</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={{width: 250}}>
        <InputLabel id="nocitizen">No?</InputLabel>
        <Select
          labelId="nocitizen"
          name="citizen"
          value={formData.citizen}
          label="nocitizen"
          onChange={handleChange}
        >
          <MenuItem value={'Green Card'}>Green Card</MenuItem>
          <MenuItem value={'Citizen'}>Citizen</MenuItem>
        </Select>
      </FormControl>
        <br></br><br></br>
        
        <p>Do you have a driver’s license?</p>
            
        <br></br><br></br>

        <p>Reference (who referred you to this company? There can only be 1)</p>

        <br></br><br></br>

        <p>Emergency contact(s) (1+)</p>




        {/* vii. SSN, date of birth, gender (male, female, i do not wish to answer)
viii. “Are you a citizen or permanent resident of the U.S?”
1. Yes: choose “Green Card” or “Citizen”
2. No: “What is your work authorization?” (require them to upload
files, you can test it with blank pdfs)
a. H1-B, L2, F1(CPT/OPT), H4, Other
b. If F1(CPT/OPT): show an input field for uploading their
OPT Receipt. See Employee #Visa Status Management.
c. If other: show an input box to specify the visa title
d. Start and end date
ix. “Do you have a driver’s license?”
1. Yes: driver’s license number, expiration date, and an uploaded
copy of the license
x. Reference (who referred you to this company? There can only be 1)
1. First name, last name, middle name, phone, email, relationship
xi. Emergency contact(s) (1+)
1. First name, last name, middle name, phone, email, relationship */}

        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{ m: 1 }}
          size="large"
        >
          Submit Application
        </Button>
      </Box>
    </form>
  );
}
