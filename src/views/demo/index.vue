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
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="margin-top: 15px">
      <el-select v-model="select" slot="prepend" placeholder="请选择" class="demo">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
    </el-input>


    <el-select :value="value" @change="handle" placeholder="请选择" style="margin-top: 20px">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>


    <el-select :value="region" @change="handle2">
      <el-option label="区域零" value="0"></el-option>
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>

    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
    </el-checkbox-group>

    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>

  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: "Demo",
  methods: {
    handle(val) {
      let opt = this.options.find(item => item.value === val)

      if (opt) {
        this.value = opt.value

      }
    },
    handle2(val) {
      console.log(val);
      this.region = val
    },
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
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  },
  data() {
    return {
      radio: '',
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      input3: '',
      select: '',
      value: '类目1',
      region: '--Please choose an option--',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
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

.el-select {
  ::v-deep .el-input {
    width: 130px;

    .el-input__inner {
      border: none !important;
      outline: medium !important;
    }
  }

}

.input-with-select {
  ::v-deep .el-input__inner {
    border: none;
    outline: medium;
  }

  ::v-deep .el-input-group__prepend {
    background-color: #fff;
  }
}
</style>
