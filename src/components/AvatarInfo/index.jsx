import {Avatar ,message,Popover} from 'antd'
import {useNavigate} from 'react-router-dom'
import Author from '../Author'
import './index.css'

const AvatarInfo = () => {
    const navigate = useNavigate()
    const logOut = ()=>{
        localStorage.removeItem("userData")
        navigate("/home",{replace: true})
        message.info("已退出登录")
    }

    return (
        <div>
            <Popover content={<div className='infor_item'><Author/><span onClick={logOut} className="logout">退出登录</span></div>}  trigger="hover">
                <Avatar size={36} src="https://img1.baidu.com/it/u=3556944590,3804013833&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"></Avatar>
            </Popover>
        </div>
    )
}

export default AvatarInfo   