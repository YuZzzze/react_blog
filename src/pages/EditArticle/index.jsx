import React, { useEffect ,useState } from 'react'
import { useNavigate } from 'react-router';
import {Row ,Col ,Button, message, Modal, Form, Input} from 'antd'
import Vditor from 'vditor'
import "vditor/dist/index.css";
import Http from '../../api/api'
import {debounce} from '../../utils/debounce'
import './index.css'
import { replace } from 'lodash';

const EditArticle = () => {
    // 路由跳转
    const navigate = useNavigate()

    // 模态框
    const [isModalOpen, setIsModalOpen] = useState(false)
    // markdown编辑器
    const [vd, setVd] = React.useState()
    useEffect(() => {
      const vditor = new Vditor("vditor", {
        after: () => {
          vditor.setValue("");
          setVd(vditor);
        },
        height:'100%'

      })
    }, []);
    
    // 模态框方法
    const showModal = () => {
        setIsModalOpen(true);
      };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 文章发布
    const onFinish = (values) => {
        // 获取标题简介
        const {title ,introduce} = values;
        const articleContent = vd.getValue()
        const {username} = JSON.parse(localStorage.getItem('userData'))
        const articleInfor = {
            articleContent,
            username,
            title,
            introduce
        }
        // 发送发布文章网络请求
        Http('post','submitArticle',articleInfor).then(res=>{
            if(res){
                message.success('发布成功')
                setTimeout(()=>{
                    navigate(`/detailed/${res}`,{replace:true})
                },200)
            }else{
                message.error('发布失败')
                vd.setValue(articleInfor.articleContent)
            }
            setIsModalOpen(false);
        })

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    

    return (
        <div>
            <Row type='flex' justify='center'>
                <Col xl={18} className="markdown-editor">
                    <div id="vditor" className="markdown-editor" />
                    <Button type='primary' className='submit_button' onClick={showModal}>发布</Button>
                </Col>
            </Row>
            <Modal title="发布文章" open={isModalOpen} onCancel={handleCancel}
            footer={''}
            >
                <Form
                // 防抖
                onFinish={debounce(onFinish,300)}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="文章标题"
                    name="title"
                    rules={[
                    {
                        required: true,
                        message: '请输入文章标题',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="文章简介"
                    name="introduce"
                    rules={[
                    {
                        required: true,
                        message: '请输入文章简介',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                            发布
                    </Button>
                </Form.Item>

                </Form>
            </Modal>
        </div>
    )
        
}

export default EditArticle