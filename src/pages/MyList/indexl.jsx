import { useState ,useEffect } from 'react'
import {Row,Col,List,Spin} from 'antd'
import {CalendarOutlined,BarsOutlined,FireOutlined} from '@ant-design/icons'
// import { Router, Route } from 'react-router'
import { Link } from 'react-router-dom'
import Http from '../../api/api'
import Author from '../../components/Author'
import './index.css'

const MyList = () =>{
    // 初始化列表状态
    const [mylist,setMylist] = useState([])
    // 是否处于加载状态
    const [isLoading, setIsLoading] = useState(true);
    // 获取是否登录
    const userData = JSON.parse(localStorage.getItem("userData"))

    useEffect(()=>{
        // 请求初始化列表状态数据
        Http('get','getMyListInfor',userData)
            .then(data=>{
                setMylist(data.reverse())
            })
        setIsLoading(false)
        // eslint-disable-next-line
    },[])

    // 访问量+1
    const addViewCount = (id)=>{
        Http('get',"addViewCount",{id:id})
            .then(res=>{})
    }

    return(
        <div>
            <Row type='flex' className='comm-main' justify='center'>
                <Col className='comm-left' xs={24} sm={18} md={16} lg={14} xl={12}>
                    <Spin spinning={isLoading} delay="500">
                        <List
                        header={<div>最新日志</div>}
                        itemLayout='vertical'
                        dataSource={mylist}
                        renderItem={item=>(
                            <List.Item>
                                <div className='list-title'>
                                    <Link to={`/detailed/${item.article_id}`} onClick={()=>(addViewCount(item.article_id))}>{item.title}</Link>
                                </div>
                                <div className='list-icon'>
                                    <span><CalendarOutlined />{item.addTime}</span>
                                    {/* <span><BarsOutlined />视频教程</span> */}
                                    <span><FireOutlined />{item.view_count}</span>
                                </div>
                                <div className='list-context'>
                                    {item.introduce}
                                </div>
                            </List.Item>
                        )}  
                        />
                    </Spin>
                </Col>
                <Col className='comm-right' xs={0} sm={6} md={6} lg={6} xl={6}>
                    <Author></Author>
                </Col>
            </Row>
        </div>
    )
    
}

export default MyList