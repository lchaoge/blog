import Head from 'next/head'
import React,{ useState } from 'react'
import axios from 'axios'
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../public/style/pages/index.css'
import {Row, Col, List, Icon} from 'antd'
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

function Home(list) {
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
  const [myList,setMyList] = useState(list.data)
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List header={<div>最新日志</div>} itemLayout="vertical" dataSource={myList} renderItem={item=>(
            <List.Item>
              <div className="list-title">
                <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                  {item.title}
                </Link>
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
Home.getInitialProps = async () => {
  const promise = new Promise((resolve)=>{
    let url = servicePath.getArticleList
    axios(url).then((res)=>{
      resolve(res.data)
    })
  })
  return await promise
}
export default Home