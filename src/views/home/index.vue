<template>
  <div>
    <div class="wrapper">
      <!-- 顶部-->
      <div class="topShow">
        <el-card :body-style="{ padding: '0px',display:'flex',justifyContent: 'center',alignContent: 'center' }"
                 class="card-wrapper" shadow="hover"
                 v-for="(item,index) in cardArr" :key="index"
        >
          <i class="icon-size" :class="item.icon"></i>
          <div style="padding: 14px;" class="card-record">
            <span class="card-tip">{{ item.title }}</span>
            <div class="card-count">
              {{ item.count }}
            </div>
          </div>
        </el-card>
      </div>
      <div class="sections">

        <div class="goods-wrapper">
          <!-- 商品-->
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="goods-info">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>商铺及商品提示</span>
                    <span style="float: right; padding: 3px 0">您需要关注的店铺以及待处理事项</span>
                  </div>
                  <div class="inner-cards">
                    <div v-for="(item,index) in goodsArr" :key="index" class="text item ">
                      <span>{{ item.num }}</span>
                      <div>{{ item.title }}</div>
                    </div>
                  </div>
                </el-card>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>交易提示</span>
                    <span style="float: right; padding: 3px 0">您需要立刻处理的交易订单</span>
                  </div>
                  <div class="inner-cards">
                    <div v-for="(item,index) in tradeArr" :key="index" class="text item">
                      <span>{{ item.num }}</span>
                      <div>{{ item.title }}</div>
                    </div>
                  </div>
                </el-card>

              </div>
            </el-col>
            <el-col :span="12">
              <!-- e-chart表-->
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>卡片名称</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div v-for="o in 10" :key="o" class="text item">
                  {{ '列表内容 ' + o }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="sell-wrap">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>销售情况统计</span>
                  <span style="float: right; padding: 3px 0">按周期统计商家店铺的订单量和订单金额</span>
                </div>
                <div class="sell-for-wrap">
                  <div v-for="(item,index) in sellArr" :key="index" class="text item item-for-wrap">
                    <div class="item-title">
                      {{ item.title }}
                    </div>
                    <div class="item-list">
                      <div v-for="(listItem,listIndex) in item.list" :key="listIndex">
                        <span>{{ listItem.title }}</span>
                        <span>{{ listItem.num }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>单品销售排名</span>
                  <span style="float: right; padding: 3px 0">按周期统计商家店铺的订单量和订单金额</span>
                </div>
                <template>
                  <el-table
                      :data="tableData"
                      height="198"
                      border
                      style="width: 100%">
                    <el-table-column
                        type="index"
                        label="#"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="商品信息"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="sellCount"
                        label="销量"
                        width="50"
                    >
                    </el-table-column>
                  </el-table>
                </template>

              </el-card>
            </el-col>
          </el-row>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      cardArr: [
        {icon: 'el-icon-user-solid add-size', title: '关注个数（个）', count: '30', id: 1},
        {icon: 'el-icon-s-goods', title: '订单总数（笔）', count: '120', id: 2},
        {icon: 'el-icon-s-order', title: '今日订单总金额（元）', count: '4183.80', id: 3},
        {icon: 'el-icon-s-marketing', title: '本月销量（笔）', count: '100', id: 4},
      ],
      goodsArr: [
        {num: "64", title: '出售中'},
        {num: "10", title: '待回复'},
        {num: "0", title: '库存预警'},
        {num: "3", title: '仓库中'},
      ],
      tradeArr: [
        {num: "0", title: '待付款'},
        {num: "10", title: '待发货'},
        {num: "0", title: '已发货'},
        {num: "3", title: '已收货'},
        {num: "3", title: '退款中'},
        {num: "3", title: '待售后'},
      ],
      sellArr: [
        {title: '昨日销量', list: [{title: '订单量（件）', num: '12'}, {title: '订单金额（元）', num: '12'}]},
        {title: '本月销量', list: [{title: '订单量（件）', num: '12'}, {title: '订单金额（元）', num: '12'}]},
      ],
      tableData: [
        {
          name: "小天鹅",
          sellCount: '9'
        },
        {
          name: "小天鹅",
          sellCount: '9'
        },
        {
          name: "小天鹅",
          sellCount: '9'
        },
        {
          name: "小天鹅",
          sellCount: '9'
        },
        {
          name: "小天鹅",
          sellCount: '9'
        },
        {
          name: "小天鹅",
          sellCount: '9'
        },
        {
          name: "小天鹅",
          sellCount: '9'
        },
      ]
    };
  },

}
</script>

<style scoped lang="scss">
.wrapper {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
}

.topShow {
  display: flex;
  justify-content: center;
}

.card-wrapper:last-child {
  margin-right: 0 !important;
}

.card-wrapper {
  margin-right: 15px;
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  padding-left: 15px;

  .el-card_body {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .icon-size {
    display: block;
    font-size: 50px;
    margin-top: 15px;
  }

  .card-record {
    display: flex;
    flex-direction: column;

    .card-tip {
      order: 2;
      font-size: 12px;
      margin-top: 8px;
    }

    .card-count {
      order: 1;
      font-weight: 900;
      font-size: 20px;

    }
  }

}

.inner-cards {
  display: flex;
  justify-content: space-around;

  div {
    //border: 1px solid red;
    padding: 10px;
    text-align: center;

    span:nth-child(1) {
      font-weight: 800;
      font-size: 16px;
    }

    div {
      font-size: 12px;
      font-weight: 300;
    }
  }

  div:hover {
    background-color: #ccc;
  }
}

.sell-for-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .item-for-wrap:nth-child(2) {
    margin-top: 15px;
  }

  .item-for-wrap {
    display: flex;
    flex-direction: row;

    .item-title {
      padding: 0 12px;
      border: 1px solid red;
      height: 92px;
      line-height: 92px;
      background-color: antiquewhite;
    }

    .item-list {
      border: 1px solid red;
      flex-grow: 1;
      padding: 12px;

      div:nth-child(1) span:nth-child(2)::after {
        content: '';
        display: block;
        border-bottom: 1px solid #cccccc;
        margin: 10px 0;
      }

    }
  }
}

</style>
