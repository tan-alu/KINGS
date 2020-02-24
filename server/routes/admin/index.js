//具体路由
module.exports = app => {
  const express = require('express')
  // 定义一个路由,是express的一个子路由
  const router = express.Router({
    // 合并参数
    mergeParams: true
  })
  // const Category = require('../../models/Category')
  //把数据存进去
  router.post('/', async (req, res) => {
    const Model = require(`../../models/${req.params.resource}`)
    //这里需要一个中间件才可以使用，在server文件的Index.js中添加
    const model = await req.Model.create(req.body)
    //发送给客户端，让客户端知道已经完成
    res.send(model)
  })
  // 编辑
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      type: true
    })
  })
  // 获取列表数据
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parents'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(30)
    res.send(items)
  })
  // 获取某一个分类详情接口
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //将子路由挂载到中间件上
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router)
}