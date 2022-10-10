import { useState } from 'react'
import {Row,Col,List,Breadcrumb} from 'antd'
import {CalendarOutlined,BarsOutlined,FireOutlined} from '@ant-design/icons'
import Author from '../../components/Author'
import './index.css'

const MyList = () =>{

    const [mylist,setMylist] = useState(
        [
            {title:'文章1',context:'这是该系统第1篇文章'},
            {title:'文章2',context:'这是该系统第2篇文章'},
            {title:'文章3',context:'这是该系统第3篇文章'},
            {title:'文章4',context:'这是该系统第4篇文章'}
        ]
    )

    return(
        <div>
            <Row type='flex' className='comm-main' justify='center'>
                <Col className='comm-left' xs={24} sm={24} md={16} lg={14} xl={12}>

                    <div className="bread-div"></div>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>视频教程</Breadcrumb.Item>
                    </Breadcrumb>
                    <List
                    header={<div>最新日志</div>}
                    itemLayout='vertical'
                    dataSource={mylist}
                    renderItem={item=>(
                        <List.Item>
                            <div className='list-title'>
                                {item.title}
                            </div>
                            <div className='list-icon'>
                                <span><CalendarOutlined />2022年10月6日</span>
                                <span><BarsOutlined />视频教程</span>
                                <span><FireOutlined />阅读次数</span>
                            </div>
                            <div className='list-context'>
                                {item.context}
                            </div>
                        </List.Item>
                    )}  
                    />
                </Col>
                <Col className='comm-right' xs={0} sm={0} md={4} lg={6} xl={6}>
                    <Author></Author>
                </Col>
            </Row>
        </div>
    )
}

export default MyList