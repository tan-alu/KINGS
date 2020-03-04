// 入口文件
const express = require("express")

const app = express()
app.set('secret', 'i2u34y12oi3u4y8')
//中间件
app.use(express.json())
//跨域模块
app.use(require('cors')())
// 托管静态文件，让我们可以通过/upload访问到文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)


//监听,放一个回调函数
app.listen(3000, () => {
  console.log('http://localhost:3000')
});