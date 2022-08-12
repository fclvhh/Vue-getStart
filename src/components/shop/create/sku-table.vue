<template>
  <div>
    <template>
      <el-table
          size="mini"
          :data="tableData"
          height="250"
          border
          style="width: 100%">
        <el-table-column
            type="index"
            width="50"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="name"
            label="商品规格"
            width="180"
            align="center">
          <el-table-column
              prop="province"
              label="规格1"
              width="120">
          </el-table-column>
          <el-table-column
              prop="city"
              label="规格2"
              width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column
            prop="address"
            label="sku图片"
            align="center">
        </el-table-column>
        <el-table-column
            prop="address"
            label="销售价"
            align="center">
        </el-table-column>
        <el-table-column
            prop="address"
            label="市场价"
            align="center">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "sku-table",
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
}
</script>

<style scoped>

</style>
