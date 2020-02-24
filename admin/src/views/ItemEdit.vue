<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名 称">
        <el-input v-model="model.name">
          <!-- <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option> -->
        </el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async save () {
      // 新增和编辑
      let res
      if (this.id) {
        // 编辑
        res = await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        // 新增
        res = await this.$http.post('rest/items', this.model)
      }
      console.log(res)
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>
