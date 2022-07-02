import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Box,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useHistory } from "react-router-dom";
import api from "../api/api";
import axios from "axios";

export default function AddHousing() {

    let history = useHistory();
    const addHousing = () => {
        console.log('add housing');
        history.push('/hr/housing/summary');
    }

    const initialFormData = Object.freeze({
        houseNumber: '',
        streetName: '',
        city: '',
        state: '',
        zip: '',
        landlordName: '',
        landlordTel: '',
        landlordEmail: '',
        numBeds: '',
        numMattress: '',
        numTables: '',
        numChairs: '',
    })

    const [formData, updateFormData] = useState(initialFormData);
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        api.getEmployee()
            .then(res => {
                console.log(res.data)
                setEmployee(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async (e) => {
        let formattedFormData = {
            address: {
                houseNumber: formData.houseNumber,
                streetName: formData.streetName,
                city: formData.city,
                state: formData.state,
                zip: formData.zip
            },
            landlord: {
                name: formData.landlordName,
                tel: formData.landlordTel,
                email: formData.landlordEmail
            },
            facilityInfo: {
                numBeds: formData.numBeds,
                numMattress: formData.numMattress,
                numTables: formData.numTables,
                numChairs: formData.numChairs,
            }
        }

        console.log(formattedFormData);

        // create housing here
        api.createHousing(formattedFormData)
            .then(res => {
                console.log(res.data);
                addHousing();
            })
            .catch(err => console.log(err));

    }


    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);
    };

    return (
        <div>
            <h3>Add Housing</h3>
            <form>
                <Box display="flex" flexDirection="column" alignItems="center">

                    <p>Address</p>
                    <TextField
                        name="houseNumber"
                        label="House Number"
                        value={formData.houseNumber}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="streetName"
                        label="Street Name"
                        value={formData.street}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="city"
                        label="City"
                        value={formData.city}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="state"
                        label="State"
                        value={formData.state}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="zip"
                        label="Zip"
                        value={formData.zip}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <p>Landlord</p>
                    <TextField
                        name="landlordName"
                        label="Name"
                        value={formData.landlordName}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="landlordTel"
                        label="Tel"
                        value={formData.landlordTel}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="landlordEmail"
                        label="Email"
                        value={formData.landlordEmail}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <p>Facility Info</p>
                    <TextField
                        name="numBeds"
                        label="Number of Beds"
                        value={formData.numBeds}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="numMattress"
                        label="Number of Mattress"
                        value={formData.numMattress}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="numTables"
                        label="Number of Tables"
                        value={formData.numTables}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />

                    <TextField
                        name="numChairs"
                        label="Number of Chairs"
                        value={formData.numChairs}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                        required
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </Box>
            </form>

        </div>
    )
}