//具体路由
module.exports = app => {
  const express = require('express')
  // 定义一个路由,是express的一个子路由
  const router = express.Router()
  const Category = require('../../models/Category')
  //把数据存进去
  router.post('/categories', async (req, res) => {
    //这里需要一个中间件才可以使用，在server文件的Index.js中添加
    const model = await Category.create(req.body)
    //发送给客户端，让客户端知道已经完成
    res.send(model)
  })
  // 编辑
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除
  router.delete('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      type: true
    })
  })
  // 获取列表数据
  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(30)
    res.send(items)
  })
  // 获取某一个分类详情接口
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  //将子路由挂载到中间件上
  app.use('/admin/api', router)
}