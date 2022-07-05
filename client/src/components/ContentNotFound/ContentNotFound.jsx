import React from "react";
import {useHistory} from "react-router-dom";
import { Button, Result } from 'antd';


export default function ContentNotFound() {
    const history = useHistory()
    const handleClick = ()=>{
        history.push('/')
    }
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={handleClick}>Back Home</Button>}
            />        
        </div>
    )
}