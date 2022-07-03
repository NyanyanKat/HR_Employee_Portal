import React from "react";
import { useEffect, useState } from "react";
import { Box, Tab, TextField } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Avatar, List, Button } from "antd";
import { Table } from 'react-bootstrap'
import api from '../api/api';
import { Modal, Form, Input, Select, message } from "antd";
import { useHistory } from "react-router-dom";
export default function Housing() {
    //get all housing data from backend
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.getHousing()
            .then(res => {
                console.log(res.data)
                setData(res.data);
                setLoading(false);
            }).catch(err => console.log(err));
    }, []);
    console.log(data);
    let history = useHistory();
    const viewHouse = (id) => {
        console.log(id);
        history.replace(`/hr/housing/one/${id}`);
    }
    const deleteHouse = (id) => {
        console.log(id);
        api.deleteHouse(id)
            .then(res => {
                console.log(res.data)
                message.success("House deleted successfully");
                setData(data.filter(item => item.id !== id));
            }
            ).catch(err => console.log(err));
    }
    const addTenant = (id) => {
        history.push(`/hr/housing/addTenant/${id}`);
    }

    // }

    return (
        <Box sx={{ width: '100%', typography: 'body1', padding: "0 30px" }}> 
            <h1>Test</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Address</th>
                        <th>Tenants</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.address.houseNumber}  {item.address.streetName} {item.address.city} {item.address.state} {item.address.zip}</td>
                            <td>{item.tenants}</td>
                            <td>
                                <Button type="primary" className="mx-1" onClick={() => addTenant(item._id)}>Edit Tenants</Button>
                                <Button type="primary" className="mx-1" onClick={() => viewHouse(item._id)}>View Housing Details</Button>
                                <Button type="danger" className="mx-1" onClick={() => viewHouse(item._id)}>Delete Housing </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            {/* <Button type="primary" onClick={addHousing}>Add Housing</Button> */}
        </Box>

        // <div>
        //     <h1>Housing</h1>
        //     {/* <Button type="primary" onClick={() => }>Add Housing</Button>
        //     <Button type="primary" onClick={() => }>Delete Housing</Button> */}
        //     <Table striped bordered hover>
        //         <thead>
        //             <tr>
        //                 <th>Address</th>
        //                 <th>Landlord</th>
        //                 <th>Tenants</th>
        //                 <th></th>

        //             </tr>
        //         </thead>
        //         <tbody>
        //             {data.map(item => (
        //                 <tr key={item._id}>
        //                     <td>{item.address.houseNumber} {item.address.streetName} {item.address.city} {item.address.state} {item.address.zip}</td>
        //                     <td>{item.landlord.name} {item.landlord.tel} {item.landlord.email}</td>
        //                     <td>{item.tenants.length}</td>
        //                     <Button type="primary" onClick={() => viewHouse(item._id)}>View Profile</Button>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </Table>
        // </div>
    )
}