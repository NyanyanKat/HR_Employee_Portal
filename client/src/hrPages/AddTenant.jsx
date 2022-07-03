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
import { useHistory, useParams } from "react-router-dom";
import api from "../api/api";
import axios from "axios";
import { Table } from 'react-bootstrap'

export default function AddTenants() {

    let history = useHistory();
    const { id } = useParams();
    console.log("id", id);

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


    }

    const addTenants = (empID) => {
        // post to backend
        // add housing id to employee

        console.log("add tenants");
        axios.put(`http://127.0.0.1:3001/api/employee/${empID}`, {
            housing_id: id
            })
            .then(res => {
                console.log(res);
                history.push("/tenants");
            })
    }

    const handleChange = (e) => {

    };

    return (
        <div>
            <h3>Add Housing</h3>
            <form>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Table striped bordered hover>
                        <thead>
                            <tr>

                                <th>Username</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee.username}</td>
                                    <td>{employee.email}</td>
                                    <td><Button type="primary" onClick={() => addTenants(employee._id)}>Add to housing</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* <Button onClick={handleSubmit}>Submit</Button> */}
                </Box>
            </form>

        </div>
    )
}