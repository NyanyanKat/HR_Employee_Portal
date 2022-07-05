import React from 'react'
import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';

export default function index() {
    return (
        <Result
        icon={<SmileOutlined />}
        title="Nice to Meet You !"
        subTitle="Home Page"
        style={{marginTop:"100px"}}
      />
    )
}
