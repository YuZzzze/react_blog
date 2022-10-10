import { useEffect, useState } from 'react'
import { Row ,Col , Breadcrumb ,Affix} from 'antd'
import {Link ,useLocation ,useParams} from 'react-router-dom'
import {CalendarOutlined,BarsOutlined,FireOutlined} from '@ant-design/icons'
import { marked } from 'marked'
import hljs from 'highlight.js'
import Author from '../../components/Author'
import Tocify from '../../components/Tocify/index.tsx'
import 'markdown-navbar'
import 'highlight.js'
import './index.css'
import Http from '../../api/api'
import Loading from '../../components/Loading'

const Detailed = () =>{
    // 获取参数
    const params = useParams();

    // 通过id请求文章数据
    const [article,setarticle] = useState()
    let {title,addTime,view_count,article_content} = article ||""

    useEffect(()=>{
        // 请求文章数据
        Http('get','getArticleById',params)
            .then((res)=>{
                setarticle(res)
                setIsLoading(false)
            })
            // eslint-disable-next-line
    },[])  

    // 加载动画
    const [isLoading, setIsLoading] = useState(true);

    // markdown处理
    const renderer = new marked.Renderer();
    const tocify = new Tocify()

    renderer.heading = (text ,level)=>{
        const anchor = tocify.add(text,level)
        return `<a id="${anchor}" href="#${anchor}" onclick="return false" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

    marked.setOptions({
        renderer:renderer,
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        highlight:function (code) {
            return hljs.highlightAuto(code).value
        }
    })
    const html = marked(article_content+'')


    return(
        <div>
            <Row type='flex' className='comm-main' justify='center'>
                <Col className='comm-left' xs={24} sm={18} md={16} lg={14} xl={12}>
                    <div className="bread-div" id="aaa">
                        <Breadcrumb>
                            <Breadcrumb.Item> <Link to='/home'>首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>文章详情</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {isLoading ? <Loading/> :
                        (<div>
                            <div className="detailed-title">{title}</div>
                            <div className='list-icon'>
                                    <span><CalendarOutlined />{addTime}</span>
                                    {/* <span><BarsOutlined />视频教程</span> */}
                                    <span><FireOutlined />{view_count}</span>
                            </div>
                            <div className="detailed-content" 
                                dangerouslySetInnerHTML={{__html:html}}>
                            </div>
                        </div>)
                    }
                </Col>
                <Col className='comm-right' xs={0} sm={6} md={6} lg={6} xl={6}>
                    <Author/>
                    <Affix offsetTop={8}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">章节目录</div>
                                {tocify && tocify.render()}
                            </div>  
                    </Affix>
                </Col>
            </Row>
        </div>
    )
    
}

export default Detailed