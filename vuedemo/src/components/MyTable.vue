<template>
  <div>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown trigger="click">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-input
              size="mini"
              placeholder="商品名称"
              v-model="name">
            </el-input>
            <el-input
              size="mini"
              placeholder="商品描述"
              v-model="description">
            </el-input>
            <el-input
              size="mini"
              placeholder="商品价格"
              v-model="price">
            </el-input>
            <el-input
              size="mini"
              placeholder="库存"
              v-model="stock">
            </el-input>
            <el-button type="primary" round size="mini" @click.native="handleSubmit">确定录入</el-button>
            <el-button slot="reference">录入商品</el-button>
          </el-popover>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-table :data="tableData">
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="description" label="商品描述"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="stock" label="库存"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  const baseUrl = 'http://127.0.0.1:3333/products'
  const {getCookie} = require('../handleCookie')

export default {
  components: {},
  data() {
      return {
        tableData: [],
        name: '',
        description: '',
        price: '',
        stock: '',
        token: getCookie('token')
      }
  },
  //监听属性 类似于data概念
  computed: {
    httpHeader(){
      return { headers: {'Authorization': 'Bearer ' + getCookie('token')} }
      }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async handleSubmit() {
      try {
        const productData = {
          'name': this.name,
          'description': this.description,
          'price': this.price,
          'stock': this.stock
        }
        await axios.post(baseUrl, productData, this.httpHeader)
        this.tableData.push(productData)
        this.name = ''
        this.description = ''
        this.price = ''
        this.stock = ''
      } catch (e) {
        console.log(e)
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    try {
      const myData = await axios.get(baseUrl, this.httpHeader)
      this.tableData = myData.data
    } catch(e) {
      console.log(e)
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>
