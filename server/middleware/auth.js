// 写成一个函数。好配置
module.exports = options => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  const assert = require('http-assert')
  return async (req, res, next) => {
    // 校验用户是否登录
    // 获取请求头
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请提供token')
    const {
      id
    } = jwt.verify(token, req.app.get('secret')) // 如果是app.get()是访问不到的
    assert(id, 401, '请提供jwd token')
    // 客户端请求时用户对象是谁
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    // console.log(tokenData)
    await next()
  }
}