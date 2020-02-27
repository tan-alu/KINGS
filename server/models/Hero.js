// 模型
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  //定义模型字段
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  title: {
    type: String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  scores: {
    difficult: {
      type: Number
    },
    skills: {
      type: Number
    },
    attack: {
      type: Number
    },
    survive: {
      type: Number
    }
  },
  skills: [{
    icon: {
      type: String
    },
    name: {
      type: Sring
    },
    description: {
      type: String
    },
    tips: {
      type: String
    }
  }],
  // 数据需要关联
  // 顺风出装
  items1: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  // 逆风出装
  items2: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Item'
  }],
  // 使用技巧
  usageTips: {
    type: String
  },
  // 对抗技巧
  battleTips: {
    type: String
  },
  // 团队思路
  teamTips: {
    type: String
  },
  // 英雄关系
  partner: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Hero'
    },
    description: {
      type: String
    }
  }]
})
//导出Mongoose的模型
module.exports = mongoose.model('Hero', schema)