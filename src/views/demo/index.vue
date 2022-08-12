<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        highlight-current-row
        @current-change="handleCurrentChange"
    >
      <el-table-column
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Demo",
  methods: {
    tableRowClassName({rowIndex}) {

      if (rowIndex === 0) {
        return 'warning-row';
      } else if (rowIndex === 2) {
        return 'success-row';
      }
      return '';
    },
    handleCurrentChange(val, val2) {
      console.log(val);
      console.log(val2);
      this.currentRow = val;
    },
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }]
    }
  },
}
</script>

<style scoped lang="scss">
.el-table {
  ::v-deep .warning-row {
    background: red;
  }
}

.el-table {
  ::v-deep {
    .success-row {
      background: #f0f9eb;
    }
  }
}
</style>
