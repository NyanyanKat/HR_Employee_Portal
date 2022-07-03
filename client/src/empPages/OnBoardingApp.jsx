import { useEffect, useState } from "react";
import auth from "../utils/auth";
import api from "../api/api";
import { TextField, FormControl, InputLabel, Box, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { Divider, Tabs, Alert } from "antd";


const { TabPane } = Tabs;

export default function Onboarding() {
  const[alert, setAlert] = useState("")

  useEffect(() => {
    if (auth.getUser().onboardingStatus === "pending") {
      setDisabled(true)
      setAlert("Please wait for HR to review your application.")
    }
    if(auth.getUser().onboardingStatus === "rejected"){
      api.getOneOnboarding(auth.getUser().id)
      .then(res=>{
        console.log(res.data)
        setDisabled(false)
        setAlert(res.data.rejFeedback)
      })
      .catch(err=> console.log(err))
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    let formattedFormData = {
      name: {
        first: formData.firstname,
        last: formData.lastname,
        middle: formData.middlename,
        preferred: formData.preferredname,
      },
      profilePic: formData.profilePic,
      address: {
        houseNumber: formData.building,
        streetName: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      },
      cellphone: formData.cellphone,
      workphone: formData.workphone,
      car: {
        make: formData.carmake,
        model: formData.carmodel,
        color: formData.carcolor,
      },
      ssn: formData.ssn,
      dob: formData.dob,
      gender: formData.gender,
      citizenship: {
        citizen: formData.citizen == "Yes" ? true : false,
        status: formData.citizenship,
        optReceipt: formData.optReceipt,
        start: formData.citizenshipstart,
        end: formData.citizenshipend,
      },
      license: {
        //license?
        number: formData.licensenumber,
        expiration: formData.expirationdate,
        licenseCopy: formData.licenseCopy,
      },
      reference: {
        first: formData.referencefirst,
        last: formData.referencelast,
        middle: formData.referencemiddle,
        tel: formData.referencetel,
        email: formData.referenceemail,
        relationship: formData.referencerelationship,
      },
      eContact: inputFields,
      userID: auth.getUser().id,
    };
    console.log(formattedFormData);

    // sending formatted FormData to mongodb and changing status as well
    api
      .onboarding(formattedFormData)
      .then((res) => {
        setDisabled(true)
        // console.log("ResponseMsg", res.data);
        setAlert("Please wait for HR to review your application.")
        // changing onboarding state in local storage
        auth.changeStatus("pending")
      })
      .catch((error) => {
        console.log("Error", error.response.data);
        // updateErrMsg(error.response.data);
      });
  };

  const initialFormData = Object.freeze({
    firstname: "",
    middlename: "",
    lastname: "",
    preferredname: "",
    profilePic: "",
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
    ssn: "",
    dob: "",
    gender: "I do not wish to answer",
    citizen: "",
    citizenship: "",
    optReceipt: "",
    citizenshipStart: "",
    citizenshipEnd: "",
    visatitle: "",
    license: "",
    licensenumber: "",
    expirationdate: "",
    licenseCopy: "",
    referencefirst: "",
    referencemiddle: "",
    referencelast: "",
    referencetel: "",
    referenceemail: "",
    referencerelationship: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [isdisabled, setDisabled] = useState(false)

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const [inputFields, setInputFields] = useState([
    {
      first: "",
      last: "",
      middle: "",
      tel: "",
      email: "",
      relationship: "",
    },
  ]);

  const handleEContactsChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = (event) => {
    event.preventDefault();
    let newfield = {
      first: "",
      last: "",
      middle: "",
      tel: "",
      email: "",
      relationship: "",
    };
    setInputFields([...inputFields, newfield]);
  };

  const requiredText = "This field is required";

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
        <h1>New Employee Onboarding Form</h1>
        {auth.getUser().onboardingStatus !== "pending" &&
          <Button
            variant="outlined"
            onClick={handleSubmit}
            sx={{ m: 1 }}
            size="large"
          >
            Submit Application
          </Button>
        }
      </div>
      <h5>
        Hello! We are excited for your first day. Please fill in the form
        below.
      </h5>
      <span>Note: * denotes required field</span>
      {isdisabled ? (
        <Alert
          message="Onboarding Application Status: Pending"
          description={alert}
          type="info"
          showIcon
          style={{ width: "85%", margin:"20px 0 " }}
        />
      ):(
        <Alert
          message="Onboarding Application Status: Rejected"
          description={`${alert}. Please make a resubmission as soon as possible.`}
          type="error"
          showIcon
          style={{ width: "85%", margin:"20px 0 " }}
        />      )}
      <hr></hr>

      <Tabs tabPosition="left">
        <TabPane tab="About You" key="1">

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Divider orientation="left" orientationMargin="0">Email</Divider>

            <TextField
              label={auth.getUser().email}
              variant="outlined"
              sx={{ m: 1, width: 500 }}
              size="small"
              name="email"
              disabled
            />
            <Divider orientation="left" orientationMargin="0">Name</Divider>
            <div>
              <TextField
                label="First name"
                variant="outlined"
                onChange={handleChange}
                name="firstname"
                sx={{ m: 1 }}
                size="small"
                error={!formData.firstname}
                helperText={!formData.firstname ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <TextField
                label="Middle name"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="middlename"
                disabled={isdisabled}
              />

              <TextField
                label="Last name"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="lastname"
                error={!formData.lastname}
                helperText={!formData.lastname ? requiredText : ""}
                disabled={isdisabled}
                required
              />

              <TextField
                label="Preferred Name"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="preferredname"
                disabled={isdisabled}
              />
            </div>

            <Divider orientation="left" orientationMargin="0">Personal Info</Divider>
            <div>
              <TextField
                label="SSN"
                variant="outlined"
                sx={{ mb: 2, mr: 3 }}
                size="small"
                onChange={handleChange}
                name="ssn"
                error={!formData.ssn}
                helperText={!formData.ssn ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <TextField
                name="dob"
                label="Birthday"
                sx={{ mr: 3 }}
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                size="small"
                error={!formData.dob}
                helperText={!formData.dob ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <FormControl style={{ width: 250 }}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  name="gender"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleChange}
                  size="small"
                  disabled={isdisabled}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                  <MenuItem value={"I do not wish to answer"}>
                    I do not wish to answer
                  </MenuItem>
                </Select>
              </FormControl>
            </div>


            <Divider orientation="left" orientationMargin="0">Address</Divider>
            <div>
              <TextField
                label="Street Name"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                style={{ width: 700 }}
                onChange={handleChange}
                name="street"
                error={!formData.street}
                helperText={!formData.street ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <TextField
                label="building/apt#"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="building"
                error={!formData.building}
                helperText={!formData.building ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <TextField
                label="State"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="state"
                error={!formData.state}
                helperText={!formData.state ? requiredText : ""}
                required
                disabled={isdisabled}
              />
              <TextField
                label="City"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="city"
                error={!formData.city}
                helperText={!formData.city ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <TextField
                label="Zip"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="zip"
                error={!formData.zip}
                helperText={!formData.zip ? requiredText : ""}
                required
                disabled={isdisabled}
              />
            </div>

            <Divider orientation="left" orientationMargin="0">Contact Info</Divider>
            <div>
              <TextField
                label="Cell Phone"
                variant="outlined"
                size="small"

                sx={{ m: 1 }}
                onChange={handleChange}
                name="cellphone"
                error={!formData.cellphone}
                helperText={!formData.cellphone ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <TextField
                label="Work Phone"
                variant="outlined"
                size="small"
                sx={{ m: 1 }}
                onChange={handleChange}
                name="workphone"
                disabled={isdisabled}
              />

            </div>
            <Divider orientation="left" orientationMargin="0">Emergency Contact(s) 1+</Divider>
            <div>
              {inputFields.map((input, index) => {
                return (
                  <div key={index}>
                    <TextField
                      label="First name"
                      variant="outlined"
                      sx={{ m: 1 }}
                      size="small"
                      onChange={(event) => handleEContactsChange(index, event)}
                      name="first"
                      error={!inputFields[index].first}
                      helperText={!inputFields[index].first ? requiredText : ""}
                      required
                      disabled={isdisabled}
                    />

                    <TextField
                      label="Middle name"
                      variant="outlined"
                      sx={{ m: 1 }}
                      size="small"
                      onChange={(event) => handleEContactsChange(index, event)}
                      name="middle"
                      disabled={isdisabled}
                    />
                    <TextField
                      label="Last name"
                      variant="outlined"
                      sx={{ m: 1 }}
                      size="small"
                      onChange={(event) => handleEContactsChange(index, event)}
                      name="last"
                      error={!inputFields[index].last}
                      helperText={!inputFields[index].last ? requiredText : ""}
                      required
                      disabled={isdisabled}
                    />
                    <TextField
                      label="Phone"
                      variant="outlined"
                      sx={{ m: 1 }}
                      size="small"
                      onChange={(event) => handleEContactsChange(index, event)}
                      name="tel"
                      error={!inputFields[index].tel}
                      helperText={!inputFields[index].tel ? requiredText : ""}
                      required
                      disabled={isdisabled}
                    />
                    <TextField
                      label="Email"
                      variant="outlined"
                      sx={{ m: 1 }}
                      size="small"
                      onChange={(event) => handleEContactsChange(index, event)}
                      name="email"
                      error={!inputFields[index].email}
                      helperText={!inputFields[index].email ? requiredText : ""}
                      required
                      disabled={isdisabled}
                    />

                    <TextField
                      label="Relationship"
                      variant="outlined"
                      sx={{ m: 1 }}
                      size="small"
                      onChange={(event) => handleEContactsChange(index, event)}
                      name="relationship"
                      error={!inputFields[index].relationship}
                      helperText={!inputFields[index].relationship ? requiredText : ""}
                      required
                      disabled={isdisabled}
                    />
                  </div>
                );
              })}
              <Button variant="outlined" sx={{ ml: 1 }} onClick={addFields}>Add More..</Button>
            </div>

            <Divider orientation="left" orientationMargin="0">Reference</Divider>
            <div>
              <TextField
                label="First name"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="referencefirst"
                error={!formData.referencefirst}
                helperText={!formData.referencefirst ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <TextField
                label="Middle name"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="referencemiddle"
                disabled={isdisabled}
              />
              <TextField
                label="Last name"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="referencelast"
                error={!formData.referencelast}
                helperText={!formData.referencelast ? requiredText : ""}
                required
                disabled={isdisabled}
              />
              <TextField
                label="Phone"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="referencetel"
                error={!formData.referencetel}
                helperText={!formData.referencetel ? requiredText : ""}
                required
                disabled={isdisabled}
              />
              <TextField
                label="Email"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="referenceemail"
                error={!formData.referenceemail}
                helperText={!formData.referenceemail ? requiredText : ""}
                required
                disabled={isdisabled}
              />

              <TextField
                label="Relationship"
                variant="outlined"
                sx={{ m: 1 }}
                size="small"
                onChange={handleChange}
                name="referencerelationship"
                error={!formData.referencerelationship}
                helperText={!formData.referencerelationship ? requiredText : ""}
                required
                disabled={isdisabled}
              />
            </div>

            <Divider orientation="left" orientationMargin="0">
              Car Info
            </Divider>
            <div>
              <TextField
                label="Make"
                variant="outlined"
                size="small"
                sx={{ m: 1 }}
                onChange={handleChange}
                name="carmake"
                disabled={isdisabled}
              />

              <TextField
                label="Model"
                variant="outlined"
                size="small"
                sx={{ m: 1 }}
                onChange={handleChange}
                name="carmodel"
                disabled={isdisabled}
              />

              <TextField
                label="Color"
                size="small"
                variant="outlined"
                sx={{ m: 1 }}
                onChange={handleChange}
                name="carcolor"
                disabled={isdisabled}
              />
            </div>

            <Divider orientation="left" orientationMargin="0">
              Driver License
            </Divider>
            <div>
              <p>Do you have a driver's license?</p>
              <FormControl style={{ width: 200 }}>
                <InputLabel id="grouped-native-select" sx={{ mt: 1 }} size="small">Select Yes or No</InputLabel>
                <Select
                  native
                  labelId="grouped-native-select"
                  // defaultValue={formData.citizen}
                  value={formData.license}
                  name="license"
                  onChange={handleChange}
                  label="license"
                  size="small"
                  sx={{ mt: 1 }}
                  error={!formData.license}
                  required
                  disabled={isdisabled}
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
                <>
                  <TextField
                    label="License Number"
                    variant="outlined"
                    sx={{ m: 1, ml: 2 }}
                    size="small"
                    onChange={handleChange}
                    name="licensenumber"
                    error={!formData.licensenumber}
                    helperText={!formData.licensenumber ? requiredText : ""}
                    required
                    disabled={isdisabled}
                  />
                  <TextField
                    name="expirationdate"
                    label="Expiration Date"
                    sx={{ m: 1 }}
                    size="small"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                    error={!formData.expirationdate}
                    helperText={!formData.expirationdate ? requiredText : ""}
                    required
                    disabled={isdisabled}
                  />
                  <br></br>
                  <p>Upload Copy of License Here</p>
                  <Button variant="outlined" component="label" sx={{ p: 4 }}>
                    <TextField
                      name="licenseCopy"
                      onChange={handleFile}
                      type="file"
                      required
                      disabled={isdisabled}
                      error={!formData.licenseCopy}
                      helperText={!formData.licenseCopy ? requiredText : ""
                      }
                    />
                  </Button>

                </>) : (
                ""
              )}
            </div>

            <Divider orientation="left" orientationMargin="0">
              Upload Profile Picture
            </Divider>
            <div>
              <Button variant="outlined" component="label" sx={{ p: 4 }}>
                <TextField
                  name="profilePic"
                  onChange={handleFile}
                  type="file"
                  disabled={isdisabled}
                />
              </Button>
            </div>

          </Box>
        </TabPane>

        <TabPane tab="Work Authrization" key="2">
          <div>
            <Divider orientation="left" orientationMargin="0">Are you a citizen or permanent resident of the U.S?</Divider>
            <div>
              <FormControl style={{ width: 300 }}>
                <InputLabel htmlFor="grouped-native-select">Select Yes or No</InputLabel>
                <Select
                  native
                  // defaultValue={formData.citizen}
                  value={formData.citizen}
                  name="citizen"
                  onChange={handleChange}
                  // InputLabelProps={{shrink: false}}
                  error={!formData.citizen}
                  required
                  disabled={isdisabled}
                >
                  <option value=""></option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
                <FormHelperText error>
                  {!formData.citizen ? requiredText : ""}
                </FormHelperText>
              </FormControl>
            </div>
            {formData.citizen === "Yes" ? (
              <div>
                <Divider orientation="left" orientationMargin="0">Please Select Your Citizenship</Divider>
                <FormControl style={{ width: 300 }}>
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
                    disabled={isdisabled}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={"Green Card"}>Green Card</MenuItem>
                    <MenuItem value={"Citizen"}>Citizen</MenuItem>
                  </Select>
                  <FormHelperText error>
                    {!formData.citizenship ? requiredText : ""}
                  </FormHelperText>
                </FormControl>
              </div>
            ) : (
              ""
            )}

            {formData.citizen === "No" ? (
              <div>
                <Divider orientation="left" orientationMargin="0">What is your work authorization?</Divider>
                <FormControl>
                  <InputLabel htmlFor="grouped-select">Select Visa Type</InputLabel>
                  <Select
                    defaultValue=""
                    value={formData.citizenship}
                    name="citizenship"
                    onChange={handleChange}
                    error={!formData.citizenship}
                    required
                    disabled={isdisabled}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value={"H1-B,L2,F1(CPT/OPT),H4,Other"}>
                      H1-B, L2, H4, Other
                    </MenuItem>
                    <MenuItem value={"F1(CPT/OPT)"}>F1(CPT/OPT)</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                  <FormHelperText error>
                    {!formData.citizenship ? requiredText : ""}
                  </FormHelperText>

                  <br></br>
                  <Box>
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
                      disabled={isdisabled}
                    />

                    <TextField
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
                      disabled={isdisabled}
                    />
                  </Box>
                </FormControl>
              </div>
            ) : (
              ""
            )}
            {formData.citizenship === "F1(CPT/OPT)" ? (
              <div>
                <Divider orientation="left" orientationMargin="0">Please upload your OPT receipt</Divider>
                <Button variant="outlined" component="label" sx={{ p: 4 }}>
                  <TextField
                    name="optReceipt"
                    onChange={handleFile}
                    type="file"
                    required
                    disabled={isdisabled}
                    error={!formData.optReceipt}
                    helperText={!formData.optReceipt ? requiredText : ""}
                  />
                </Button>
              </div>
            ) : (
              ""
            )}

            {formData.citizenship === "Other" ? (
              <>
                <Divider orientation="left" orientationMargin="0">Please enter your Visa title</Divider>
                <TextField
                  label="Visa Title"
                  variant="outlined"
                  onChange={handleChange}
                  name="visatitle"
                  disabled={isdisabled}
                  error={!formData.visatitle}
                  helperText={!formData.visatitle ? requiredText : ""}
                  required
                />
              </>
            ) : (
              ""
            )}
          </div>
        </TabPane>
      </Tabs>
    </>










  );
}
