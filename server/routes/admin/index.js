//具体路由
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')

  // 定义一个路由,是express的一个子路由
  const router = express.Router({
    // 合并参数
    mergeParams: true
  })
  // const Category = require('../../models/Category')
  //把数据存进去
  router.post('/', async (req, res) => {
    // const Model = require(`../../models/${req.params.resource}`)
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
  // 获取资源列表
  router.get('/', async (req, res, next) => {
    // 校验用户是否登录
    // 获取请求头
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请提供token')
    const {
      id
    } = jwt.verify(token, app.get('secret'))
    assert(id, 401, '请提供jwd token')
    // 客户端请求时用户对象是谁
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    // console.log(tokenData)
    await next()
  }, async (req, res) => {
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

  // npm i multer
  const multer = require('multer')
  //中间件，上传目标地址
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  // 单文件上传
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    // res.send('ok')
    const {
      username,
      password
    } = req.body
    // 根据用户名找用户
    const user = await AdminUser.findOne({
      username
      // unique: true
    }).select('+password')
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户名不存在'
    //   })
    // }
    // 校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(password, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    // 返回Token
    const token = jwt.sign({
      id: user.id
    }, app.get('secret'))
    res.send({
      token
    })
  })
  // 错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}