import React, { useRef, useEffect, useState } from "react";
import {Table} from "@mui/material";
//find all employees
export default function Employee() {
    // const employees = fetch('/api/employees')
    //     .then(res => res.json())
    //     .then(data => data)
    //     .catch(err => console.log(err));

    // const columns = [{
    //     dataField: 'id',
    //     text: 'Product ID',
    //     sort: true
    // }, {
    //     dataField: 'name',
    //     text: 'Product Name',
    //     sort: true
    // }, {
    //     dataField: 'price',
    //     text: 'Product Price'
    // }];

    return (
        <div>
            {/* <Table columns={columns} data={employees} />
            {employees.map(employee => (
                <div>
                    <h1>{employee.name}</h1>
                    <p>{employee.email}</p>
                </div>
            ))} */}
            <Table />
           
        </div>
    )
}
