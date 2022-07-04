import React, { useState } from 'react'
import { Button, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactFileReder from 'react-file-reader'

export default function Upload(props) {

    return (
        (<>
            {(!props.disabledBtn) ? (
                <>
                    {props.alert.displayAlert && (
                        <>
                            <Alert
                                message={props.alert.message}
                                description={props.alert.description}
                                type={props.alert.color}
                                showIcon
                                style={{ width: "80%", margin: "20px auto" }}
                            />
                        </>
                    )}
                    <h4>Please upload a copy of your file here</h4>
                    <p>Note: only accept Image format or .pdf format</p>
                    <ReactFileReder fileTypes={[".png", ".pdf", ".jpeg", ".jpg"]} handleFiles={files => {
                        var reader = new FileReader()
                        reader.readAsDataURL(files[0])
                        reader.onload = function () {
                            // setDataSource(reader.result)
                            console.log(files[0].type)
                            // console.log(reader.result)
                            props.setFileInfo({
                                name: files[0].name,
                                type: files[0].type,
                                url: reader.result
                            })
                        }
                    }}>
                        <Button icon={<UploadOutlined />} className={"btn"} disabled={props.disabledBtn}>Upload</Button>
                    </ReactFileReder>
                </>
            ) : (
                <>
                    <Alert
                        message={props.alert.message}
                        description={props.alert.description}
                        type={props.alert.color}
                        showIcon
                        style={{ width: "80%", margin: "0 auto" }}
                    />
                </>
            )
            }
            <div style={{ padding: "40px" }}>
                {props.fileInfo.type === "application/pdf" && (
                    <object width="60%" height="500" data={props.fileInfo.url} type="application/pdf"> </object>
                )}
                {(props.fileInfo.type === "image/jpeg" || props.fileInfo.type === "image/png") && (
                    <img src={props.fileInfo.url} alt="opt receipt" style={{ height: "500", width: "60%" }} />
                )}
            </div>
        </>)
    )
}
