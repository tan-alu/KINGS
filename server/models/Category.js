// 模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //定义模型字段
  name: {
    type: String
  }
})
//导出Mongoose的模型
module.exports = mongoose.model('Category', schema)