import {Link,Navigate, useNavigate} from 'react-router-dom'
import { Menu,Row,Col,Button } from 'antd';
import { HomeFilled,MenuOutlined,SmileFilled } from '@ant-design/icons';
import AvatarInfo from '../AvatarInfo';

import './index.css'

const Header = () => {
    const navigate = useNavigate();
    const userData = localStorage.getItem("userData")

    return(
        <div className='header-container'>
            <Row type="flex" justify='center' align='middle' style={{height:"100%"}}>
                <Col xs={14} sm={18} md={12} lg={12} xl={12} >
                    <Link to='/home'><span className='header-logo'>YuZzzze</span></Link>
                    <span className='header-text'>这是React练习的个人博客</span>
                </Col>
                <Col xs={0} sm={0} md={4} lg={4} xl={4}>
                    <Menu mode="horizontal" defaultSelectedKeys={['home']} className='header-right'>
                        <Menu.Item key="home">
                            <HomeFilled/>
                            <Link to='/home'><span>首页</span></Link>
                        </Menu.Item>    
                        {/* <Menu.Item key="video">
                            <MenuOutlined/>
                            <Link to='/mylist'><span>我的</span></Link>
                        </Menu.Item>     */}
                    </Menu>    
                </Col>
                <Col xs={6} sm={4} md={3} lg={3} xl={2} className="login_container">
                    {userData? <Button type='primary' className='btn login_item' onClick={()=>{navigate('/articleEdit')}}>
                        开始创作
                    </Button> : ''}
                </Col>
                {userData ?
                    <Col xs={2} sm={2} md={1} lg={1} xl={1} className="login_container">
                        <AvatarInfo/>
                    </Col> :
                    <Col xs={4} sm={2} md={1} lg={1} xl={1} className="login_container">
                        <Button type='primary' className='btn login_botton' onClick={()=>{navigate('/login')}}><span>登录</span></Button>
                    </Col>
                }


            </Row>
        </div>
    )
};

  export default Header