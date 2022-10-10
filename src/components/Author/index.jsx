import {Avatar ,Divider,Image} from 'antd'
import {QqOutlined,WechatOutlined,GithubOutlined} from '@ant-design/icons'
import './index.css'

const Author = () => {
    return (
        <div className='author-div comm-box'>
            <div><Avatar size={90} src="https://img1.baidu.com/it/u=3556944590,3804013833&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"></Avatar></div>
            <div className='author-name'>YuZzzze</div>
            <div className='author-introduction'>这是一个大菜比</div>
            <Divider>社交账号</Divider>
            <Avatar size={28} className='account'><QqOutlined /></Avatar>
            <Avatar size={28} className='account'><WechatOutlined /></Avatar>
            <Avatar size={28} className='account'><GithubOutlined /></Avatar>
        </div>
    )
}

export default Author