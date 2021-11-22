<template>
  <el-table :data="computedTableData">
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="description" label="商品描述"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="stock" label="库存"> </el-table-column>
      <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
          @change="handleInputChange(search)"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleClick(scope.$index, scope.row)">加入购物车</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleClick(scope.$index, scope.row)">移出购物车</el-button>
      </template>
    </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3333/products'
export default {
  name: "UserInterface",
  props: {
    msg: String,
  },
  data() {
    return {
      tableData: [],
      num: 1,
      search: '',
      searchTableData: null
    }
  },
  computed: {
      computedTableData(){
          return this.searchTableData || this.tableData
      }
  },
  async mounted() {
    try {
      const myData = await axios.get(baseUrl)
      this.tableData = myData.data
    } catch(e) {
      console.log(e)
    }
  },
  methods: {
      handleClick(value,value2) {
        console.log(value2);
      },
      handleInputChange(searchValue) {
          const productArray = this.tableData
          const searchedProductArray = productArray.filter(product => {
              return product.name.includes(searchValue)
          })
          this.searchTableData = searchedProductArray
      }
    }
};
</script>

<style scoped>
</style>
