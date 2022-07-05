import React,{useState, useRef} from 'react'
import { useHistory } from "react-router-dom";
import { Tag, Descriptions, PageHeader, Drawer, Collapse, message, Button, Form, Input } from 'antd';

import  visaStatus from '../../utils/visa_status'
import api from '../../api/api';

export default function VisaInfo(props) {
    const { Panel } = Collapse;
    const history  = useHistory()
    const [visible, setVisible] = useState(false)
    const feedbackRef = useRef()

    const OnChange = (key) => {
        console.log(key);
    };

    const onClose = () => {
        props.updataVisible(false)
    };

    const approvHandler =()=>{
        api.changeEmpVisaStatus({
            visaInfoID: props.empVisaInfo._id,
            eid: props.empVisaInfo.userID,
            phaseNum: props.empVisaInfo.status
        })
        .then(res=>{
            // console.log(res)
            props.updateActionBtn(false)
            history.push('/hr/visa')
        })
        .catch(err=>console.log(err))
    }

    const rejectHandler=()=>{
        setVisible(true)
        message.error('Please provide a feedback for the rejection')
        if(feedbackRef.current.resizableTextArea.textArea.value){
            const textAreaContent = feedbackRef.current.resizableTextArea.textArea.value
            api.changeEmpVisaStatus({
                visaInfoID: props.empVisaInfo._id,
                eid: props.empVisaInfo.userID,
                phaseNum: props.empVisaInfo.status,
                feedback: textAreaContent
            })
            .then(res=>{
                console.log(res)
                setVisible(false)
                props.updateActionBtn(false)
                history.push('/hr/visa')
            })
            .catch(err=>console.log(err))
        }
    }

    return (
        <Drawer
            title="Uploaded Visa Files"
            placement="right"
            size="large"
            onClose={onClose}
            visible={props.visible}
        >

            <PageHeader
                className="site-page-header"
                title={`${props.empVisaInfo.userInfoID.name.first} ${props.empVisaInfo.userInfoID.name.middle} ${props.empVisaInfo.userInfoID.name.last}`}
                avatar={{ src: `http://127.0.0.1:3001/${props.empVisaInfo.userInfoID.profile}` }}
                extra={props.ActionBtn &&(
                [<Button key="1" type="primary" onClick={approvHandler}>Approve</Button>,
                <Button key="2" onClick={rejectHandler}>Reject</Button>,
                ]
                )}
            >
                <Descriptions size="small" column={2} style={{margin:"10px 0"}}>
                    <Descriptions.Item label="Visa Phase">{visaStatus.statsMatch(props.empVisaInfo.status)}</Descriptions.Item>
                    <Descriptions.Item label="Visa Phase Status">
                        <Tag color={visaStatus.fileStatus(props.empVisaInfo.status, props.empVisaInfo) === "pending" ? "blue" 
                            : visaStatus.fileStatus(props.empVisaInfo.status, props.empVisaInfo) === "rejected" ? "red" 
                            : visaStatus.fileStatus(props.empVisaInfo.status, props.empVisaInfo) === "approved" ? "green" : "yellow"}>
                            {visaStatus.fileStatus(props.empVisaInfo.status, props.empVisaInfo)}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>

                {visible && (
                    <>
                                <Form.Item label="Feeback">
                                <Input.TextArea allowClear showCount ref={feedbackRef} />
                              </Form.Item>
                    </>
                )}

            </PageHeader>



            <Collapse onChange={OnChange}>
                <Panel header="OPT Receipt" key="1">
                    <div style={{ padding: "20px" }}>
                        {/* <img src={`http://localhost:3001/${props.empVisaInfo.userInfoID.citizenship.optReceipt}`} alt="" style={{ height: 400, width: 500 }} /> */}
                        <object width="80%" height="400" data={`http://localhost:3001/${props.empVisaInfo.userInfoID.citizenship.optReceipt}`} type="application/pdf">   </object>
                    </div>
                </Panel>

                <Panel header="EAD Card" key="2">
                    <div style={{ padding: "20px" }}>
                        {(props.empVisaInfo.EAD.status === "never submitted")
                            ? <div>No Data</div>
                            :
                            <>
                            {(props.empVisaInfo.EAD.file.fileType === "application/pdf") && (
                                <object width="60%" height="500" data={props.empVisaInfo.EAD.file.dataURI} type="application/pdf"> </object>
                            )}
                            {(props.empVisaInfo.EAD.file.fileType === "image/jpeg" || props.empVisaInfo.EAD.file.fileType === "image/png") && (
                                <img src={props.empVisaInfo.EAD.file.dataURI} alt="opt receipt" style={{ height: "500", width: "60%" }} />
                            )}
                            </>
                        }
                    </div>
                </Panel>


                <Panel header="I-983" key="3">
                    <div style={{ padding: "20px" }}>
                        {(props.empVisaInfo.I983.status === "never submitted")
                            ? <div>No Data</div>
                            :
                            <>
                            {(props.empVisaInfo.I983.file.fileType === "application/pdf") && (
                                <object width="60%" height="500" data={props.empVisaInfo.I983.file.dataURI} type="application/pdf"> </object>
                            )}
                            {(props.empVisaInfo.I983.file.fileType === "image/jpeg" || props.empVisaInfo.I983.file.fileType === "image/png") && (
                                <img src={props.empVisaInfo.I983.file.dataURI} alt="opt receipt" style={{ height: "500", width: "60%" }} />
                            )}
                            </>
                        }
                    </div>
                </Panel>

                <Panel header="I-20" key="4">
                    <div style={{ padding: "20px" }}>
                        {(props.empVisaInfo.I20.status === "never submitted")
                            ? <div>No Data</div>
                            :
                            <>
                            {(props.empVisaInfo.I20.file.fileType === "application/pdf") && (
                                <object width="60%" height="500" data={props.empVisaInfo.I20.file.dataURI} type="application/pdf"> </object>
                            )}
                            {(props.empVisaInfo.I20.file.fileType === "image/jpeg" || props.empVisaInfo.I20.file.fileType === "image/png") && (
                                <img src={props.empVisaInfo.I20.file.dataURI} alt="opt receipt" style={{ height: "500", width: "60%" }} />
                            )}
                            </>
                        }
                    </div>
                </Panel>

            </Collapse>
        </Drawer>
    )
}
