let ipUrl = 'http://127.0.0.1:7002/default'

let servicePath = {
  getArticleList: `${ipUrl}/getArticleList`, // 首页
  getArticleById: `${ipUrl}/getArticleById/`, // 详细页
  getTypeInfo: `${ipUrl}/getTypeInfo`, // 获取文章类别
  getListById: `${ipUrl}/getListById/`, // 列表页

}

export default servicePath