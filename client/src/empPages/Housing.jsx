import { useState } from "react";
import api from "../api/api";
import {
  Box,
  Stack
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
// import MenuItem from "@mui/material/MenuItem";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import FormHelperText from "@mui/material/FormHelperText";
import Report from "../components/Housing/Report";
import Comment from "../components/Housing/Comment";

export default function Onboarding() {
  const [housingDetail, updateHousingDetail] = useState({
    address: {},
    tenents: []
  });
  const [housingReports, updateHousingReports] = useState([]);

  api.getEmpHousingDetail().then(res => {
    console.log('detail')
    console.log(res.data)
    updateHousingDetail(JSON.parse(res.data))
    console.log(housingDetail)
  });
  api.getEmpHousingReports().then(res => {
    console.log('reports')
    console.log(res.data)
    updateHousingReports(JSON.parse(res.data))
  });

  return (
    <Stack spacing={2}>
      <Box sx={{ flexWrap: "wrap" }}>
        <h1>House Details</h1>
        <Stack spacing={2}>
          <p>{housingDetail.address.houseNumber + housingDetail.address.streetName}</p>
          <p>{housingDetail.address.city + ', ' + housingDetail.address.state + housingDetail.address.zip}</p>
        </Stack>
        <Stack>
          <DataGrid
            columns={[{ field: 'fullname' }, { field: 'tel' }]}
            rows={housingDetail.tenents}
          />
        </Stack>
      </Box>
      <Box sx={{ flexWrap: "wrap" }}>
        <h1>Facility Reports</h1>
        <Stack>

        </Stack>
      </Box>
    </Stack>
  )
}