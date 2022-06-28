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
  SliderValueLabel,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
//import Button from '@mui/material/Button';
//import IconButton from '@mui/material/IconButton';

export default function Onboarding() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT", e);
    console.log(formData);
    console.log("eContact: ", formData.eContact.first);
    api
      .onboarding(formData)
      .then((res) => {
        // console.log('Response',res.data)
        updateErrMsg({});
      })
      .catch((error) => {
        // console.log('Error',error.response.data)
        updateErrMsg(error.response.data);
      });
  };

  const initialFormData = Object.freeze({
    firstname: "",
    middlename: "",
    lastname: "",
    preferredname: "",
    profilepic: "",
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
    citizenship: "",
    citizenshipfile: "",
    citizenshipstart: "",
    citizenshipend: "",
    visatitle: "",
    license: "",
    licensenumber: "",
    expirationdate: "",
    licensecopy: "",
    eContactfirst: "",
    eContactmiddle: "",
    eContactlast: "",
    eContacttel: "",
    eContactemail: "",
    eContactrelationship: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [inputFields, setInputFields] = useState([{ name: "", age: "" }]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = (event) => {
    event.preventDefault();
    let newfield = { name: "", age: "" };
    setInputFields([...inputFields, newfield]);
  };

  const requiredText = "This field is required";

  return (
    <form>
      <Box sx={{ flexWrap: "wrap" }}>
        <h1>New Employee Onboarding Form</h1>
        <h5>
          Hello! We are excited for your first day. Please fill in the questions
          below.
        </h5>
        <br></br>
        <span>* denotes required field</span>
        <br></br>
        <hr></hr>

        <p> Name </p>
        <TextField
          label="First name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="firstname"
          error={!formData.firstname}
          helperText={!formData.firstname ? requiredText : ""}
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
          error={!formData.lastname}
          helperText={!formData.lastname ? requiredText : ""}
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
        <Button variant="contained" component="label">
          Upload File
          <TextField
            //label="Profile Picture"
            name="profilepic"
            onChange={handleChange}
            type="file"
            required
            error={!formData.profilepic}
            helperText={!formData.profilepic ? requiredText : ""}
          />
        </Button>
        <br></br>
        <br></br>

        <p>Address</p>
        <TextField
          label="building/apt#"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="building"
          error={!formData.building}
          helperText={!formData.building ? requiredText : ""}
          required
        />
        <TextField
          label="Street Name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="street"
          style={{ width: 600 }}
          error={!formData.street}
          helperText={!formData.street ? requiredText : ""}
          required
        />
        <TextField
          label="City"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="city"
          error={!formData.city}
          helperText={!formData.city ? requiredText : ""}
          required
        />
        <TextField
          label="State"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="state"
          error={!formData.state}
          helperText={!formData.state ? requiredText : ""}
          required
        />
        <TextField
          label="Zip"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="zip"
          error={!formData.zip}
          helperText={!formData.zip ? requiredText : ""}
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
          error={!formData.cellphone}
          helperText={!formData.cellphone ? requiredText : ""}
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
          error={!formData.ssn}
          helperText={!formData.ssn ? requiredText : ""}
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
          error={!formData.dob}
          helperText={!formData.dob ? requiredText : ""}
          required
        />
        <br></br>
        <br></br>

        <p>Gender</p>
        <FormControl style={{ width: 250 }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="gender"
            value={formData.gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"I do not wish to answer"}>
              I do not wish to answer
            </MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <br></br>

        <p>Are you a citizen or permanent resident of the U.S?</p>
        <FormControl style={{ width: 200 }}>
          <InputLabel id="grouped-native-select">Select Yes or No</InputLabel>
          <Select
            native
            labelId="grouped-native-select"
            // defaultValue={formData.citizen}
            value={formData.citizen}
            name="citizen"
            onChange={handleChange}
            label="citizen"
            error={!formData.citizen}
            required
          >
            <option value=""></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          <FormHelperText error>
            {!formData.citizen ? requiredText : ""}
          </FormHelperText>
        </FormControl>
        {formData.citizen === "Yes" ? (
          <FormControl style={{ width: 250 }}>
            <InputLabel htmlFor="grouped-select">
              Select Your Citizenship
            </InputLabel>
            <Select
              defaultValue=""
              value={formData.citizenship}
              name="citizenship"
              onChange={handleChange}
              error={!formData.citizenship}
              required
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={"Green Card"}>Green Card</MenuItem>
              <MenuItem value={"Citizen"}>Citizen</MenuItem>
            </Select>
            <FormHelperText error>
              {!formData.citizenship ? requiredText : ""}
            </FormHelperText>
          </FormControl>
        ) : (
          ""
        )}
        {formData.citizen === "No" ? (
          <FormControl style={{ width: 300 }}>
            <InputLabel htmlFor="grouped-select">
              What is your work authorization?
            </InputLabel>
            <Select
              defaultValue=""
              value={formData.citizenship}
              name="citizenship"
              onChange={handleChange}
              error={!formData.citizenship}
              required
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={"H1-B,L2,F1(CPT/OPT),H4,Other"}>
                H1-B, L2, F1(CPT/OPT), H4, Other
              </MenuItem>
              <MenuItem value={"F1(CPT/OPT)"}>F1(CPT/OPT)</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            <FormHelperText error>
              {!formData.citizenship ? requiredText : ""}
            </FormHelperText>

            <br></br>
            <Box sx={{ flexDirection: "row" }}>
              <TextField
                style={{ width: 150 }}
                name="citizenshipstart"
                label="Start Date"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                error={!formData.citizenshipstart}
                helperText={!formData.citizenshipstart ? requiredText : ""}
                required
              />

              <TextField
                style={{ width: 150 }}
                name="citizenshipend"
                label="End Date"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                error={!formData.citizenshipend}
                helperText={!formData.citizenshipend ? requiredText : ""}
                required
              />
            </Box>
          </FormControl>
        ) : (
          ""
        )}
        {formData.citizenship === "F1(CPT/OPT)" ? (
          <Button variant="contained" component="label">
            Upload OPT Receipt
            <TextField
              //label="Profile Picture"
              style={{ flexWrap: "wrap" }}
              name="citizenshipfile"
              onChange={handleChange}
              type="file"
              required
              error={!formData.citizenshipfile}
              helperText={!formData.citizenshipfile ? requiredText : ""}
            />
          </Button>
        ) : (
          ""
        )}

        {formData.citizenship === "Other" ? (
          <TextField
            style={{display:"flex", justifyContent:"flex-end"}}
            label="Visa Title"
            variant="outlined"
            sx={{ m: 1 }}
            onChange={handleChange}
            name="visatitle"
            error={!formData.visatitle}
            helperText={!formData.visatitle ? requiredText : ""}
            required
          />
        ) : (
          ""
        )}
        <br></br>
        <br></br>

        <p>Do you have a driver’s license?</p>
        <FormControl style={{ width: 200 }}>
          <InputLabel id="grouped-native-select">Select Yes or No</InputLabel>
          <Select
            native
            labelId="grouped-native-select"
            // defaultValue={formData.citizen}
            value={formData.license}
            name="license"
            onChange={handleChange}
            label="license"
            error={!formData.license}
            required
          >
            <option value=""></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
          <FormHelperText error>
            {!formData.license ? requiredText : ""}
          </FormHelperText>
        </FormControl>
        {formData.license === "Yes" ? (
          <Box sx={{ flexWrap: "wrap" }}>
            <TextField
              label="License Number"
              variant="outlined"
              sx={{ m: 1 }}
              onChange={handleChange}
              name="licensenumber"
              error={!formData.licensenumber}
              helperText={!formData.licensenumber ? requiredText : ""}
              required
            />
            <TextField
              name="expirationdate"
              label="Expiration Date"
              sx={{ m: 1 }}
              type="date"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              error={!formData.expirationdate}
              helperText={!formData.expirationdate ? requiredText : ""}
              required
            />
            <br></br>
            <br></br>
            <p>Upload Copy of License Here</p>
            <Button variant="contained" component="label">
              Upload File
              <TextField
                //label="License Copy"
                name="licensecopy"
                onChange={handleChange}
                type="file"
                required
                error={!formData.licensecopy}
                helperText={!formData.licensecopy ? requiredText : ""}
              />
            </Button>
          </Box>
        ) : (
          ""
        )}

        <br></br>
        <br></br>

        <p>Reference (who referred you to this company? There can only be 1)</p>
        <TextField
          label="First name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="eContactfirst"
          error={!formData.eContactfirst}
          helperText={!formData.eContactfirst ? requiredText : ""}
          required
        />

        <TextField
          label="Middle name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="eContactmiddle"
        />
        <TextField
          label="Last name"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="eContactlast"
          error={!formData.eContactlast}
          helperText={!formData.eContactlast ? requiredText : ""}
          required
        />
        <TextField
          label="Phone"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="eContacttel"
          error={!formData.eContacttel}
          helperText={!formData.eContacttel ? requiredText : ""}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="eContactemail"
          error={!formData.eContactemail}
          helperText={!formData.eContactemail ? requiredText : ""}
          required
        />

        <TextField
          label="Relationship"
          variant="outlined"
          sx={{ m: 1 }}
          onChange={handleChange}
          name="eContactrelationship"
          error={!formData.eContactrelationship}
          helperText={!formData.eContactrelationship ? requiredText : ""}
          required
        />
        <br></br>
        <br></br>

        <p>Emergency contact(s) (1+)</p>
        <form>
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <input
                  name="name"
                  placeholder="Name"
                  value={input.name}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <input
                  name="age"
                  placeholder="Age"
                  value={input.age}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <button onClick={addFields}>Add More..</button>
              </div>
            );
          })}
        </form>

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
