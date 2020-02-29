<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基础信息">
          <el-form-item label="名 称">
            <el-input v-model="model.name">
            </el-input>
          </el-form-item>
          <el-form-item label="称 号">
            <el-input v-model="model.title">
            </el-input>
          </el-form-item>
          <el-form-item label="类 型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难 度">
            <el-rate v-model="model.scores.difficult" :max=9 show-score style="margin-top:0.6rem">
            </el-rate>
          </el-form-item>
          <el-form-item label="技 能">
            <el-rate v-model="model.scores.skills" :max=9 show-score style="margin-top:0.6rem">
            </el-rate>
          </el-form-item>
          <el-form-item label="攻 击">
            <el-rate v-model="model.scores.attack" :max=9 show-score style="margin-top:0.6rem">
            </el-rate>
          </el-form-item>
          <el-form-item label="生 存">
            <el-rate v-model="model.scores.survive" :max=9 show-score style="margin-top:0.6rem">
            </el-rate>
          </el-form-item>
          <el-form-item label="头 像">
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+'/upload'" :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团队思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus">添加技能</i>
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <!-- 根据索引（唯一值）push进去 -->
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
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
      model: {
        avatar: '',
        name: '',
        scores: {
          difficult: 0
        }
      },
      categories: [],
      items: []
    }
  },
  methods: {
    // 出装
    async fetchItem () {
      const res = await this.$http.get('rest/items')
      this.items = res.data
    },
    async fetchCategories () {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
    },
    async save () {
      // 新增和编辑
      let res
      if (this.id) {
        // 编辑
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        // 新增
        res = await this.$http.post('rest/heroes', this.model)
      }
      console.log(res)
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      // 赋值,因为可能有些值被覆盖了
      this.model = Object.assign({}, this.model, res.data)
    },
    // 头像上传
    async afterUpload (res) {
      // console.log(res)
      // 给this.model赋一个属性avatar
      // this.$set(this.model, 'avatar', res.url)
      this.model.avatar = res.url
    }
  },
  created () {
    this.fetchItem()
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
