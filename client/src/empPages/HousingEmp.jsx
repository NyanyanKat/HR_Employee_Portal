import { useState, useEffect } from "react";
import api from "../api/api";
import {
  Box,
  Stack,
  TextField,
  Button,
  Divider
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Report from "../components/Housing/Report";
import auth from '../utils/auth';

export default function Housing() {
  const [housingDetail, updateHousingDetail] = useState({
    address: {},
    tenents: []
  });
  const [housingReports, updateHousingReports] = useState([]);

  useEffect(() => {
    api
      .getEmpHousingDetail()
      .then(res => {
        for (let i in res.data.tenents) {
          res.data.tenents[i].id = parseInt(i) + 1;
        }
        return res.data
      })
      .then(data => {
        console.log(data)
        updateHousingDetail(data)
      });
  }, []);

  useEffect(() => {
    api.getEmpHousingReports().then(res => {
      console.log('reports')
      updateHousingReports(res.data)
      console.log(housingReports)
    });
  }, []);

  const columns = [
    { field: 'fullname', headerName: 'Full Name', width: 200 },
    { field: 'tel', headerName: 'Phone Number', width: 200 },
  ];

  const [newReport, updateNewReport] = useState({
    title: '',
    desc: ''
  });
  const handleAddReport = (e) => {
    updateNewReport({
      ...newReport,
      [e.target.name]: e.target.value,
    });
  };
  const submitNewReport = (e) => {
    e.preventDefault();
    // let tempReport = {
    //   ...newReport,
    //   username: auth.getUser().username,
    //   timestamp: new Date().toISOString(),
    //   status: 'Open',
    //   _id: report._id
    // };
    // updateHousingReports({
    //   ...housingReports,
    //   tempReport
    // })
    api
      .addEmpHousingReport(newReport)
      .then(res => {
        console.log(res.data);
        // updateNewReport({
        //   title: '',
        //   desc: ''
        // });
        window.location.reload(true);
      })
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ flexWrap: "wrap" }}>
        <h1>House Details</h1>
        <div>
          <h4>Address: </h4>
          <p>{housingDetail.address.houseNumber + ' ' + housingDetail.address.streetName}</p>
          <p>{housingDetail.address.city + ', ' + housingDetail.address.state + ' ' + housingDetail.address.zip}</p>
        </div>
        <div style={{ height: 280, width: '100%' }}>
          <DataGrid
            rows={housingDetail.tenents}
            columns={columns}
          />
        </div>
      </Box>
      <Box sx={{ flexWrap: "wrap" }}>
        <h1>Facility Reports</h1>
        <div>
          <h4>Add facility report: </h4>
          <form>
            <Stack
              direction="row"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <TextField
                label="Title"
                variant="outlined"
                onChange={handleAddReport}
                name="title"
                fullWidth
              />
              <Button onClick={submitNewReport}>
                Upload
              </Button>
            </Stack>
            <br></br>
            <TextField
              label="Description"
              variant="outlined"
              onChange={handleAddReport}
              name="desc"
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
            />
          </form>
        </div>
        <br></br>
        <div>
          <h4>Existing Reports: </h4>
          {housingReports.map((report, index) => (
            <Report report={report} key={index}/>
          ))}
        </div>
      </Box>
    </Stack>
  )
}
