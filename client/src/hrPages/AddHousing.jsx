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

export default function AddHousing() {

    let history = useHistory();
    const addHousing = () => {
        console.log('add housing');
        history.push('/housing/add');
    }

    const initialFormData = Object.freese({
        houseNumber: '',
        street: '',
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


    const handleSubmit = (e) => {
        let formattedFormData = {
            address: {
                houseNumber: formData.houseNumber,
                street: formData.street,
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
        //  api.createHousing(formattedFormData)
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
                    name="street"
                    label="Street"
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
                </Box>
            </form>


            {/* <Form>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="houseNumber" placeholder="House Number" className="my-1" />
                    <Form.Control type="streetName" placeholder="Street Name" className="my-1" />
                    <Form.Control type="city" placeholder="City" className="my-1" />
                    <Form.Control type="state" placeholder="State" className="my-1" />
                    <Form.Control type="zip" placeholder="ZIP" className="my-1" />
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> 
                 </Form.Group>

                <Form.Group className="mb-3" controlId="landlord">
                    <Form.Label>LandLord Info</Form.Label>
                    <Form.Control type="name" placeholder="name" />
                    <Form.Control type="tel" placeholder="tel" />
                    <Form.Control type="email" placeholder="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="facility">
                    <Form.Label>Facility Info</Form.Label>
                    <Form.Control type="numBeds" placeholder="Number of Beds" />
                    <Form.Control type="numMattress" placeholder="Number of Mattresses" />
                    <Form.Control type="numTables" placeholder="Number of Tables" />
                    <Form.Control type="numChairs" placeholder="Number of Chairs" />

                </Form.Group>
                <Button variant="primary" type="submit" onClick={onFormSubmit}>
                    Submit
                </Button>
            </Form> */}
        </div>
    )
}