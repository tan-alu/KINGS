// 广告位模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //定义模型字段
  username: {
    type: String
  },
  password: {
    type: String,
    // 前端页面是否显示密码
    select: false,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})
//导出Mongoose的模型
module.exports = mongoose.model('AdminUser', schema)