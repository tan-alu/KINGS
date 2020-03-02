<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标 题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data () {
    return {
      model: {},
      categories: []
    }
  },
  methods: {
    // 富文本编辑器里上传的图片
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData()
      // 后端定义的字段是file
      formData.append('file', file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    async save () {
      // 新增和编辑
      let res
      if (this.id) {
        // 编辑
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        // 新增
        res = await this.$http.post('rest/articles', this.model)
      }
      console.log(res)
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    // 获取上级分类列表数据
    async getCategory () {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    }
  },
  created () {
    this.getCategory()
    // 如果有This.id才执行this.fetch()
    this.id && this.fetch()
  }
}
</script>
