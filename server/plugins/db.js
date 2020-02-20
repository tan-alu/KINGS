//数据库
module.exports = app => {
  // 引用Mongoose
  const momgoose = require('mongoose')
  //链接数据库
  momgoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}