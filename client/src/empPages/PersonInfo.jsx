import React, { useState, useEffect } from "react";
import auth from "../utils/auth";
import api from "../api/api";
//import { connect, useDispatch, useSelector } from "react-redux";
//import { edit, add, cancel } from "../redux/actions/profileAction";
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
    ListItemAvatar,
} from "@mui/material";

export default function PersonalInfo(props) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisable, setDisable] = useState(true);
    const [isEdit, setEdit] = useState(false);

    const userId = auth.getUser().id;

    useEffect(() => {
        api
            .getProfile({ params: { id: userId } })
            .then((res) => {
                console.log(userId);
                setUser(res.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    if (isLoading) {
        return (
            <div>
                <h2>No User Info Found!</h2>
            </div>
        );
    }

    function AddData(data) {
        //add(data) function changes data
    }

    function changeButtons() {
        setDisable(!isDisable);
        setEdit(!isEdit);
        //console.log(isDisable);
    }

    return (
        <div>
            <h1>Personal Info</h1>
            {isEdit ? (
                <Box m={2} pt={3}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            var proceed = window.confirm(
                                "Are you sure you want to discard all changes?"
                            );
                            if (proceed) {
                                //console.log("yes");
                                changeButtons();
                            } else console.log("No");
                        }}
                    >
                        Cancel
                    </Button>

                    <Button variant="outlined" onClick={() => {
                        var proceed = window.confirm(
                            "Are you sure you want to save all changes?"
                        );
                        if (proceed) {
                            console.log("yes");
                        } else console.log("No");
                    }}>
                        Save
                    </Button>
                </Box>
            ) : (
                <Box m={2} pt={3}>
                    <Button variant="outlined" onClick={changeButtons}>
                        Edit
                    </Button>
                </Box>
            )}
            <br></br>
            <hr></hr>
            {/* <h4>Name</h4>

      <span> {user.name.first}</span>
      <span> {user.name.middle}</span>
      <span> {user.name.last}</span>
      <br></br>
      <br></br>
      <p> Preferred Name: {user.name.preferred}</p>
      <p>Profile Picture: {user.profile}</p>
      <p>Email: {auth.getUser().email}</p>
      <p>SSN: {user.ssn}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Gender: {user.gender}</p>
      <br></br>
      <h4>Address</h4>
      <ul>
        <li>Building/apt#: {user.address.houseNumber}</li>
        <li>Street Name: {user.address.streetName}</li>
        <li>City: {user.address.city}</li>
        <li>State: {user.address.state}</li>
        <li>Zip: {user.address.zip}</li>
      </ul>

      <br></br>
      <h4>Contact Info</h4>
      <ul>
        <li>Cell# {user.cellphone}</li>
        <li>Work# {user.workphone ? user.workphone : "None"}</li>
      </ul>
      <br></br>

      <h4>Employment </h4>
      <ul>
        <li>Visa: {user.citizenship.status}</li>
        <li>Start Date: {user.citizenship.start}</li>
        <li>End Date: {user.citizenship.end}</li>
      </ul>
      <br></br>

      <h4>Emergency Contact</h4>
      <ul>
        <li>First name: {user.eContact.first}</li>
        <li>Middle Name: {user.eContact.middle}</li>
        <li>Last Name: {user.eContact.last}</li>
        <li>Phone: {user.eContact.tel}</li>
        <li>Email: {user.eContact.email}</li>
        <li>Relationship: {user.eContact.relationship}</li>
      </ul>

      <h4>Documents</h4>
      <br></br>
      <br></br> */}

            <form>
                <Box sx={{ flexWrap: "wrap" }}>
                    {/* <TextField
          variant="outlined"
          sx={{ m: 1 }}
          onChange={}
          value={user.name.first}
          disabled
        /> */}
                    <h4> Name </h4>

                    <TextField
                        label="First"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.name.first}
                        name="first"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="Middle"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.name.middle}
                        name="middle"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="Last"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.name.last}
                        name="last"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                    <br></br>

                    <TextField
                        label="Preferred Name"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.name.preferred}
                        name="preferred"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                    <br></br>
                    <br></br>

                    <TextField
                        label="Email"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={auth.getUser().email}
                        name="email"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="SSN"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.ssn}
                        name="ssn"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="Date of Birth"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.dob}
                        name="dob"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                    <br></br>
                    <br></br>

                    <TextField
                        label="Gender"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.gender}
                        name="gender"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                    <br></br>
                    <br></br>

                    <h4>Profile Picture</h4>
                    <img src={`http://localhost:3001/${user.profile}`} alt="employee profile pic" style={{ height: 300, width: 300 }} />
                    <TextField
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.profile}
                        name="profile"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <h4>Address</h4>
                    <TextField
                        label="House/Apt#"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.address.houseNumber}
                        name="houseNumber"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="Street"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.address.streetName}
                        name="streetName"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="City"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.address.city}
                        name="city"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="State"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.address.state}
                        name="state"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="Zip"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.address.zip}
                        name="zip"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                    <br></br>
                    <br></br>

                    <h4>Contact Info</h4>
                    <TextField
                        label="Cell#"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.cellphone}
                        name="cellphone"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="Work#"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.workphone}
                        name="workphone"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                    <br></br>
                    <br></br>

                    <h4>Employment</h4>
                    <TextField
                        label="Visa Title"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.citizenship.status}
                        name="citizienshipStatus"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="Start Date"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.citizenship.start}
                        name="citizenshipStart"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>

                    <TextField
                        label="End Date"
                        type="text"
                        //style={{outline: 'none'}}
                        variant="standard"
                        defaultValue={user.citizenship.end}
                        name="citizenshipEnd"
                        sx={{ m: 1 }}
                        disabled={isDisable ? true : false}
                        InputProps={{
                            disableUnderline: true,
                        }}
                    ></TextField>
                    <br></br>
                    <br></br>

                    <h4>Emergency Contact</h4>
                    {user.eContact.map(item => {
                        return (
                            <>
                                <TextField
                                    label="First Name"
                                    type="text"
                                    //style={{outline: 'none'}}
                                    variant="standard"
                                    defaultValue={item.first}
                                    name="eContactFirst"
                                    sx={{ m: 1 }}
                                    disabled={isDisable ? true : false}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                ></TextField>

                                <TextField
                                    label="Middle Name"
                                    type="text"
                                    //style={{outline: 'none'}}
                                    variant="standard"
                                    defaultValue={item.middle}
                                    name="eContactMiddle"
                                    sx={{ m: 1 }}
                                    disabled={isDisable ? true : false}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                ></TextField>

                                <TextField
                                    label="Last Name"
                                    type="text"
                                    //style={{outline: 'none'}}
                                    variant="standard"
                                    defaultValue={item.last}
                                    name="eContactLast"
                                    sx={{ m: 1 }}
                                    disabled={isDisable ? true : false}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                ></TextField>
                                <br></br>

                                <TextField
                                    label="Phone"
                                    type="text"
                                    //style={{outline: 'none'}}
                                    variant="standard"
                                    defaultValue={item.tel}
                                    name="eContactTel"
                                    sx={{ m: 1 }}
                                    disabled={isDisable ? true : false}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                ></TextField>

                                <TextField
                                    label="Email"
                                    type="text"
                                    //style={{outline: 'none'}}
                                    variant="standard"
                                    defaultValue={item.email}
                                    name="eContactEmail"
                                    sx={{ m: 1 }}
                                    disabled={isDisable ? true : false}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                ></TextField>

                                <TextField
                                    label="Relationship"
                                    type="text"
                                    //style={{outline: 'none'}}
                                    variant="standard"
                                    defaultValue={item.relationship}
                                    name="eContactRelationship"
                                    sx={{ m: 1 }}
                                    disabled={isDisable ? true : false}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                ></TextField>
                            </>

                        )
                    })}

                </Box>
            </form>
        </div>
    );
}

//  function mapDispatchToProps(dispatch) {
//    return {

//    }
//  }

//  export default connect(null,mapDispatchToProps)(PersonalInfo);