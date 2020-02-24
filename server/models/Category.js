// 模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //定义模型字段
  name: {
    type: String
  },
  // 保存到数据库，注意type不能是String类型
  parents: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }
})
//导出Mongoose的模型
module.exports = mongoose.model('Category', schema)