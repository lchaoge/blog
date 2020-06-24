import Head from 'next/head'
import React,{ useState,useEffect } from 'react'
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import {Row, Col, List, Icon, Breadcrumb} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

function MyList(list) {
  const [myList,setMyList] = useState(list.data)
  useEffect(() => {
    setMyList(list.data)
    
  })
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List header={<div>最新日志</div>} itemLayout="vertical" dataSource={myList} renderItem={item=>(
            <List.Item>
              <div className="list-title">
                <Link href={{pathname:'/detailed',query:{id:item.id}}}>{item.title}</Link>
              </div>
              <div className="list-icon">
              <span><Icon type="calender" /> {item.addTime}</span>
              <span><Icon type="folder" /> {item.typeName}</span>
              <span><Icon type="fire" /> {item.view_count}人</span>
              </div>
              <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
              </div>
            </List.Item>
          )} />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author/>
            <Advert/>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

MyList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    let url = servicePath.getListById+id
    console.log(url)
    axios(url).then((res)=>{
      resolve(res.data)
    })
  })
  return await promise
}

export default MyList