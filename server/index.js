// 入口文件
const express = require("express")

const app = express()
//中间件
app.use(express.json())
//跨域模块
app.use(require('cors')())

require('./routes/admin')(app)
require('./plugins/db')(app)


//监听,放一个回调函数
app.listen(3000, () => {
  console.log('http://localhost:3000')
});