<template>
  <div>
    <el-tabs v-model="tabIndex" type="card" @tab-click="handleClick" style="padding: 10px">
      <el-tab-pane :label="tabItem.name"
                   v-for="(tabItem,index) in this.tabNameArr" :key="index"
      >
        <search-button placeholder="要搜索的商品名称" @search="searchHandle"
                       ref="searchBtn"
        >
          <template #button>
            <el-button type="success" @click="toCreate">发布商品</el-button>
            <el-button type="danger" @click="tableBatchDelete">批量删除</el-button>
            <el-button>下架</el-button>
            <el-button>上架</el-button>
            <el-button>推荐</el-button>
          </template>
          <template #form>
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item label="商品名称">
                <el-input v-model="form.name" placeholder="商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品编码">
                <el-input v-model="form.id" placeholder="商品编码"></el-input>
              </el-form-item>
              <el-form-item label="商品类型">
                <el-select v-model="form.type" placeholder="商品类型">
                  <el-option label="类型一" value="shanghai"></el-option>
                  <el-option label="类型二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-input v-model="form.category" placeholder="商品分类"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="info" @click="onSearch">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="clearSearch">清空筛选条件</el-button>
              </el-form-item>
            </el-form>
          </template>
        </search-button>
        <div class="table-wrapper">
          <el-table
              class="table"
              border
              ref="multipleTable"
              :data="tableData[index].list"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                align="center"
                width="45">
            </el-table-column>
            <el-table-column
                prop="title"
                label="商品"
            >
              <template slot-scope="scope">
                <div class="slot-warp">
                  <div class="img">
                    <img :src="scope.row.cover" alt="" style="width: 60px;height: 60px;">
                  </div>
                  <div class="body">
                    <h5> {{ scope.row.title }} </h5>
                    <p>分类： {{ scope.row.category }}</p>
                    <p>时间： {{ scope.row.create_time }}</p>
                  </div>
                </div>

              </template>
            </el-table-column>
            <el-table-column
                prop="type"
                label="商品类型"
            >
            </el-table-column>
            <el-table-column
                prop="sale_count"
                label="实际销量"
            >
            </el-table-column>
            <el-table-column
                align="center"
                prop="order"
                label="商品排序"
                show-overflow-tooltip>


            </el-table-column>
            <el-table-column
                prop="status"
                label="商品状态"
                align="center"
            >
              <template slot-scope="scope">
                <!--                <el-button :type="scope.row.status? 'success':'danger' " size="mini" @click="tableItemChangeStatus(scope.row)" plain>-->
                <!--                  {{scope.row.status ? "上架":'下架'}}-->
                <!--                </el-button>-->

                <el-button type="success" size="mini"
                           @click="scope.row.isCheck = 1" plain>
                  审核通过
                </el-button>
                <el-button type='danger' size="mini"
                           @click="scope.row.isCheck = 2" plain>
                  审核不通过
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
                prop="stock"
                label="总库存"
            >
            </el-table-column>
            <el-table-column
                prop="pPrice"
                label="价格（元）"
            >
            </el-table-column>
            <el-table-column
                label="操作"
                width="200"
                align="center"
            >
              <template slot-scope="scope">
                <el-button-group>
                  <el-button type="primary" plain>修改</el-button>
                  <el-button type="danger" plain @click="deleteTableItem(scope)">删除</el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
          <div style="height: 60px;"></div>
          <el-footer>
            <div class="footer-wrapper">
              <div class="pageSplit-wrap">
                <el-pagination
                    :current-page="tableData[tabIndex].currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
              </div>
            </div>
          </el-footer>
        </div>
      </el-tab-pane>


    </el-tabs>
  </div>
</template>

<script>
import SearchButton from "@/components/searchButton";

export default {
  name: "list",
  components: {SearchButton},
  data() {

    return {
      tabIndex: 0,
      tabNameArr: [
        {name: '审核中'},
        {name: '出售中'},
        {name: '已下架'},
        {name: '库存预警'},
        {name: '回收站'}
      ],
      input: '',
      form: {
        name: '',
        id: '',
        type: '',
        category: ''
      },
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    this.__getData()
  },
  methods: {
    toCreate() {
      this.$router.push({
        name: 'Create'
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    __getData() {
      for (let i = 0; i < this.tabNameArr.length; i++) {
        this.tableData.push({
          currentPage: 1,
          list: []
        })
        for (let j = 0; j < 20; j++) {
          this.tableData[i].list.push({
            id: j,
            title: '荣耀 V10全网通 标配版 4GB+64GB 魅力红' + i + '-' + j,
            cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
            create_time: '2019-07-17 18:34:14',
            category: '手机',
            type: '普通商品',
            sale_count: 20,
            order: '1000',
            status: 1,
            stock: '200',
            pprice: 1000,
            isCheck: 1,
          })
        }
      }
    },

    tableItemChangeStatus(scope) {
      console.log(scope);
      scope.status = scope.status === 1 ? 0 : 1;

    },

    tableBatchDelete() {
      this.$confirm(' 是否删除该图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除逻辑代码
        this.tableData[this.tabIndex].list = []
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })

    },
    deleteTableItem(scope) {
      this.$confirm(' 是否删除该图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除逻辑代码
        let rowIndex = scope.$index
        this.tableData[this.tabIndex].list.splice(rowIndex, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })

    },
    handleClick(tab) {
      console.log(tab.index);
    },
    onSearch() {
      console.log('开始高级搜索');
    },
    clearSearch() {
      this.$refs.searchBtn[this.tabIndex].searchFlag = false
      this.from = {
        name: '',
        id: '',
        type: '',
        category: ''
      }
    },
    searchHandle(info) {
      console.log(info);
      console.log('简单搜索');
    }
  }

}
</script>

<style scoped lang="scss">
.pane-wrapper {
  .pane-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .button-wrap {

    }

    .search-wrap {
      display: flex;

      .input {
        margin-right: 10px;
        width: 200px;
      }
    }

  }

  .power-search {
    margin-top: 15px;
  }
}

.table-wrapper {
  .table {
    margin-top: 15px;
  }
}

.footer-wrapper {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 0;

  .button-wrap {
    padding: 10px 23px 10px 10px;
    border-right: 1px solid;

  }

  .pageSplit-wrap {
    margin-left: 10px;
  }
}
</style>
