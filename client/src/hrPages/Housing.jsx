import React from "react";
import { useEffect, useState } from "react";
import api from '../api/api';
import { Table, Modal, Form, Input, Select, message } from "antd";
import {Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
export default function Housing() {
    //get all housing data from backend
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     api.getHousing()
    //         .then(res => {
    //             console.log(res.data)
    //             setData(res.data);
    //             setLoading(false);
    //         }).catch(err => console.log(err));
    // }, []);
    // console.log(data);
    // let history = useHistory();
    // const viewHouse = (id) => {
    //     console.log(id);
    //     history.replace(`/housing/${id}`);

    // }

    return (
        <div>
            <h1>Test</h1>
            {/* <Button type="primary" onClick={addHousing}>Add Housing</Button> */}
        </div>

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