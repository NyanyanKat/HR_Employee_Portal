import { Button, Steps } from 'antd';
import React, { useState } from 'react';
import Upload from './Upload';
import api from '../../api/api';
import auth from '../../utils/auth';
import { useEffect } from 'react';

export default function Visa() {
    const { Step } = Steps;

    const [current, setCurrent] = useState(1);
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [fileInfo, updateFileInfo] = useState({
        name: "",
        url: "",
        type: ""
    })

    const [alert, setAlert] = useState({
        message: "",
        description: "",
        color:'',
        rejFeedback: "",
        displayAlert: false,
    })

    const setFileInfo = (fileInfo) => {
        updateFileInfo(fileInfo)
    }

    useEffect(() => {
        api.getVisaStatus(auth.getUser().id)
            .then(res => {
                console.log(res.data)
                const phaseNum = res.data.status
                setCurrent(phaseNum)
                if (res.data.opt[phaseNum-1].status === "pending") {
                    setFileInfo({
                        name: res.data.opt[phaseNum - 1].file.fileName,
                        type: res.data.opt[phaseNum - 1].file.fileType,
                        url: res.data.opt[phaseNum - 1].file.dataURI
                    })
                    if(phaseNum === 2){
                        setAlert({
                            message: "I-983 Status: Pending",
                            description: "Waiting for HR to approve and sign your I-983",
                            color: 'info',
                            displayAlert: false,
                        })
                    }else if(phaseNum ===3){
                        setAlert({
                            message: "I-20 Status: Pending",
                            description: "Waiting for HR to approve your I-20",
                            color: 'info',
                            displayAlert: false,
                        })
                    }else{
                        setAlert({
                            message: "OPT EAD Status: Pending",
                            description: "Waiting for HR to approve your OPT EAD",
                            color: 'info',
                            displayAlert: false,
                        })
                    }
                    setDisabledBtn(true)
                } else if (res.data.opt[phaseNum-1].status === "rejected") {
                    setFileInfo({
                        name: res.data.opt[phaseNum - 1].file.fileName,
                        type: res.data.opt[phaseNum - 1].file.fileType,
                        url: res.data.opt[phaseNum - 1].file.dataURI,
                    })
                    setAlert({
                        message: "Status: Rejected",
                        description: `${res.data.opt[phaseNum - 1].rejFeedback}. Please make a re-submission as soon as possible.`,
                        displayAlert: true,
                        color:'error'
                    })
                    setDisabledBtn(false)
                } else if(res.data.opt[phaseNum-1].status === "approved" ){
                    console.log('here')
                    console.log(phaseNum)
                    if(phaseNum === 3){
                        setCurrent(3)
                        setDisabledBtn(true)
                        setAlert({
                            message:"I-20 Status: Approved",
                            description:"All documents have been approved",
                            displayAlert: false,
                            color:'success'
                        })
                        setFileInfo({
                            name: res.data.opt[phaseNum-1].file.fileName,
                            type: res.data.opt[phaseNum-1].file.fileType,
                            url: res.data.opt[phaseNum-1].file.dataURI,
                        })           
                        return 
                    }
                    setCurrent(phaseNum + 1)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const steps = [
        {
            title: 'OPT Receipt',
            content: <img src="" alt="opt receipt"></img>,
        },
        {
            title: 'OPT EAD',
            content: <Upload setFileInfo={setFileInfo} fileInfo={fileInfo}  disabledBtn={disabledBtn} alert={alert} />
        },
        {
            title: 'I-983',
            content:
                (
                    <>
                        <Upload setFileInfo={setFileInfo} fileInfo={fileInfo} disabledBtn={disabledBtn} alert={alert} />
                        <ul style={{ textAlign: "left" }}>
                            <li>I983 Form</li>
                            <li>template sample</li>
                        </ul>
                    </>
                )
        },
        {
            title: 'I-20',
            content: <Upload setFileInfo={setFileInfo} fileInfo={fileInfo}  disabledBtn={disabledBtn} alert={alert} />,
        }
    ];

    const handleSubmit = () => {
        api.sendEmpVisaFile({ fileInfo, status: current, eid: auth.getUser().id })
            .then((res) => {
                console.log(res.data)
                setAlert({
                    message: "Status: Pending",
                    description: "Waiting for HR to approve your upload",
                })
                // message.success('Waiting for HR to approve your OPT EAD')
                setDisabledBtn(true)
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <div style={{ padding: "10px 50px" }}>
            <Steps current={current}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                <Button type="primary" onClick={handleSubmit} disabled={disabledBtn}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

