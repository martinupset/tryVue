<template>
  <div>
    <el-header style="text-align: right; font-size: 12px">
      <el-popover placement="right" trigger="click">
        <el-table :data="cartData">
          <el-table-column property="name" label="商品名称"></el-table-column>
          <el-table-column property="price" label="商品价格"></el-table-column>
          <el-table-column property="number" label="数量"></el-table-column>
        </el-table>
        <el-button
          class="el-icon-shopping-cart-full"
          slot="reference"
          size="mini"
        ></el-button>
        <el-button
          type="primary"
          round
          size="mini"
          @click.native="handleBuy"
          style="float: right"
          >确定购买</el-button
        >
      </el-popover>
    </el-header>
    <el-table :data="computedTableData">
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="description" label="商品描述"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="stock" label="库存"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @change="handleInputChange(search)"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAdd(scope.row)"
            >加入购物车</el-button
          >
          <el-button size="mini" type="danger" @click="handleRemove(scope.row)"
            >移出购物车</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
const {getCookie} = require('../handleCookie')
const baseUrl = "http://127.0.0.1:3333/products";
const httpHeader = { headers: {'Authorization': 'Bearer ' + getCookie('token')} }
export default {
  name: "UserInterface",
  props: {
    msg: String,
  },
  data() {
    return {
      tableData: [],
      num: 1,
      search: "",
      searchTableData: null,
      cartData: [],
    };
  },
  computed: {
    computedTableData() {
      return this.searchTableData || this.tableData;
    },
  },
  async mounted() {
    await this.fetchTableData()
  },
  methods: {
    handleAdd(value) {
      const { id, name, price, stock } = value;
      const exist = this.cartData.some((item) => item.name === name);
      if (exist) {
        this.cartData.forEach((item) => {
          if (item.id === id && item.number < stock) {
            item.number++;
            item.stock--;
          } else if (item.id === id && item.number.toString() === stock) {
            console.log("out of stock");
          }
        });
      } else {
        if (stock !== "sell out") {
          this.cartData.push({ id, name, price, number: 1, stock: stock - 1 });
        } else {
          console.log("out of stock");
        }
      }
    },

    handleRemove(value) {
      const { id } = value;
      const exist = this.cartData.some((item) => item.id === id);
      if (exist) {
        this.cartData.forEach((item, index) => {
          if (item.id === id && item.number > 1) {
            item.number--;
            item.stock++;
          } else if (item.id === id && item.number === 1) {
            this.cartData.splice(index, 1);
          }
        });
      } else {
        console.log("do not find this item");
      }
    },

    handleInputChange(searchValue) {
      const productArray = this.tableData;
      const searchedProductArray = productArray.filter((product) => {
        return product.name.includes(searchValue);
      });
      this.searchTableData = searchedProductArray;
    },

    async handleBuy() {
      const storeUrl = "http://127.0.0.1:3333/store";
      const storeSystem = await axios.post(storeUrl, this.cartData);
      this.cartData = [];
      console.log(storeSystem.data);
      const orderNumber = (parseInt(Math.random() * 10) + 1).toString();
      const flowUrl = "http://127.0.0.1:3333/flow/" + orderNumber;
      const flowSystem = await axios.get(flowUrl);
      await this.fetchTableData()
      console.log(flowSystem.data);
    },

    async fetchTableData() {
      try {
        const myData = await axios.get(baseUrl, httpHeader);
        this.tableData = myData.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
</style>
