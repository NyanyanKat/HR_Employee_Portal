import React from "react";
import { useEffect, useState } from "react";
import api from '../../api/api'
import { Box, Tab, Button } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import 'bootstrap/dist/css/bootstrap.min.css';
import VisaInfo from "./VisaInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faCheckToSlot } from '@fortawesome/free-solid-svg-icons'
import visaStatus from "../../utils/visa_status";

export default function OnboardingReview() {
    const [isLoading, updateLoading] = useState(true);
    const [tabValue, setTabValue] = React.useState('1');
    const [visible, setVisible] = useState(false);
    const [flag, setFlag] = useState(false)
    const [actionBtn, setActionBtn] = useState(true)
    const [allVisaEmps, updateAllVisaEmps] = useState([])
    const [incompVisaEmps, updateIncompVisaEmps] = useState([])
    const [empVisaInfo, updateEmpVisaInfo] = useState({})

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const updataVisible = (visible) => {
        setVisible(visible)
        setFlag(false)
    }

    const updateActionBtn = (visible) => {
        setActionBtn(visible)
    }

    useEffect(() => {
        api.getAllVisaEmp()
            .then(res => {
                console.log(res.data)
                updateAllVisaEmps(res.data.all)
                updateIncompVisaEmps(res.data.incomp)
                updateLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const viewHandler = (userInfoID, visaID, trigger) => {
        if(trigger){
            updateActionBtn(true)
        }
        // console.log(userInfoID,visaID)
        api.getOneEmpVisaInfo({ userInfoID, visaID })
            .then(res => {
                // console.log(res.data)
                updateEmpVisaInfo(res.data)
                setFlag(true)
                setVisible(true)
            })
            .catch(err => { console.log(err) })
    };

    const sendHandler = () => {

    }

    return (
        <>
            {isLoading ? (<div>Loading</div>) : (
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange}>
                                <Tab label="In Progess" value="1" style={{ minWidth: "15%" }} />
                                <Tab label="All" value="2" style={{ minWidth: "15%" }} />
                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <div className="container-fluid">
                                <table className="table table-bordered custom-table">
                                    <thead>
                                        <tr>
                                            <th rowSpan={2}>Employee Name</th>
                                            <th colSpan={4}>Work Auth</th>
                                            <th rowSpan={2}>Next Steps</th>
                                            <th rowSpan={2}>Action</th>
                                        </tr>
                                        <tr>
                                            <td>Visa Title</td>
                                            <td>Start Date</td>
                                            <td>End Date</td>
                                            <td>Remaining Date</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {incompVisaEmps.map(item => {
                                            return (
                                                <tr key="item._id">
                                                    <td>{`${item.userInfoID.name.first} ${item.userInfoID.name.middle} ${item.userInfoID.name.last}`}</td>
                                                    <td>{item.userInfoID.citizenship.status}</td>
                                                    <td>{item.userInfoID.citizenship.start}</td>
                                                    <td>{item.userInfoID.citizenship.end}</td>
                                                    <td>remaining date</td>
                                                    <td>{visaStatus.nextStep(item.status, item)}</td>
                                                    <td>
                                                        {visaStatus.fileStatus(item.status, item) === "pending" ? (
                                                            <Button variant="outlined" size="small" onClick={() => viewHandler(item.userInfoID._id, item._id, item.userID )}>
                                                                <FontAwesomeIcon icon={faCheckToSlot} style={{ fontSize: "1em", marginRight: "10px" }}/>Check
                                                            </Button>
                                                        ) : (
                                                            <Button variant="outlined" size="small" onClick={sendHandler}>
                                                                <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "1em", marginRight: "10px" }} />Send Notification
                                                            </Button>

                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        <TabPanel value="2">
                            <div className="container-fluid page-content">
                                <table className="table table-bordered custom-table">
                                    <thead>
                                        <tr>
                                            <th rowSpan={2}>Employee Name</th>
                                            <th colSpan={4}>Work Auth</th>
                                            <th rowSpan={2}>Uploads</th>
                                        </tr>
                                        <tr>
                                            <td>Visa Title</td>
                                            <td>Start Date</td>
                                            <td>End Date</td>
                                            <td>Remaining Date</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allVisaEmps.map(item => {
                                            return (
                                                <tr key="item._id">
                                                    <td>{`${item.userInfoID.name.first} ${item.userInfoID.name.middle} ${item.userInfoID.name.last}`}</td>
                                                    <td>{item.userInfoID.citizenship.status}</td>
                                                    <td>{item.userInfoID.citizenship.start}</td>
                                                    <td>{item.userInfoID.citizenship.end}</td>
                                                    <td>remaining date</td>
                                                    <td>
                                                        <Button variant="outlined" size="small" onClick={() => viewHandler(item.userInfoID._id, item._id)}>View</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                    </TabContext>
                    {flag && <VisaInfo empVisaInfo={empVisaInfo} visible={visible} updataVisible={updataVisible} ActionBtn={actionBtn} updateActionBtn={updateActionBtn}></VisaInfo>}
                </Box>
            )}
        </>
    )
}


