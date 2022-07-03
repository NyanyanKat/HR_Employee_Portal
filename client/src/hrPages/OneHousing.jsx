import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../api/api";
import axios from 'axios';
export default function OneHousing() {
    // get user info data from backend
    const [housing, setHousing] = useState({});
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    console.log('id', id);

    const loadData = async () => {
        try {
            await axios.get(`http://127.0.0.1:3001/api/hr/housing/one/${id}`)
                .then(res => {
                    console.log(res.data);
                    setLoading(false);
                    setHousing(res.data);
                    console.log(housing)
                })

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();

        // axios.get(`http://127.0.0.1:3001/api/hr/housing/one/${id}`)
        //     .then(res => {
        //         setLoading(false);
        //         console.log(res.data);

        //         setHousing(res.data);
        //         console.log(housing)
        //     })
    }, []);

    return (
        <div>

            {loading ? <div>Loading...</div> :
                <div>
                    <h2>Facility Info</h2>
                    <p>Beds: {housing.facilityInfo.numBeds}</p>
                    <p>Mattresses: {housing.facilityInfo.numMattress}</p>
                    <p>Tables: {housing.facilityInfo.numTables}</p>
                    <p>Chairs: {housing.facilityInfo.numChairs}</p>
                    <br>
                    </br>
                    <h2> Landlord </h2>
                    <p>Name: {housing.landlord.name}</p>
                    <p>Phone: {housing.landlord.tel}</p>
                    <p>Email: {housing.landlord.email}</p>
                </div>
            }

        </div>
    )
}