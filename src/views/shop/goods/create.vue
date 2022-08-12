<template>
  <div>
    <div class="tab-wrapper">


      <el-tabs v-model="tabIndex" type="card" @tab-click="handleClick" style="padding: 10px">
        <el-tab-pane label="基础设置">
          <create-shop></create-shop>
        </el-tab-pane>
        <el-tab-pane label="商品规格">
          <el-form label-width="80px">
            <el-form-item label="商品规格">
              <el-radio-group :value="skus_type" @input="vModelState({name:'skus_type',value:$event})">
                <el-radio-button :label="0" border>单一规格</el-radio-button>
                <el-radio-button :label="1" border>多规格</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <!-- 单规格-->
          <template v-if="skus_type === 0">
            <single-attr></single-attr>
          </template>
          <!-- 多规格-->
          <template v-else>
            <el-form label-width="80px">
              <el-form-item label="添加规格">
                <sku-card v-for="(item,index) in sku_card" :key="index" :item="item" :index="index"
                          :total="total"
                ></sku-card>
                <el-button type="success" @click="addSkuCard" style="margin-top: 15px;">添加规格</el-button>
              </el-form-item>
            </el-form>
            <el-form label-width="80px">

              <el-form-item label="批量设置">
                <el-button type="text">销售价</el-button>
                <el-button type="text">市场价</el-button>
                <el-button type="text">成本价</el-button>
                <el-button type="text">库存</el-button>
                <el-button type="text">体积</el-button>
                <el-button type="text">重量</el-button>
              </el-form-item>

              <el-form-item label="规格设置">
                <sku-table></sku-table>
              </el-form-item>
            </el-form>
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品性质">角色管理</el-tab-pane>
        <el-tab-pane label="媒体设置">定时任务补偿</el-tab-pane>
        <el-tab-pane label="商品详情">定时任务补偿</el-tab-pane>
        <el-tab-pane label="折扣设置">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
    <el-button size="mini" @click="back">回到商品列表</el-button>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex/dist/vuex.mjs";
import CreateShop from "@/components/shop/create";
import SingleAttr from "@/components/shop/single-attr";
import SkuCard from "@/components/shop/create/sku/sku-card";
import SkuTable from "@/components/shop/create/sku-table";

export default {
  name: "create",
  components: {SkuTable, SkuCard, SingleAttr, CreateShop},
  data() {
    return {
      tabIndex: 0,
    }
  },
  computed: {
    ...mapState({
      skus_type: state => state.goods_create.skus_type,
      sku_card: state => state.goods_create.sku_card
    }),
    total() {
      return this.sku_card.length
    }
  },
  mounted() {

  },
  methods: {
    ...mapMutations(['vModelState', 'addSkuCard']),
    back() {
      this.$router.push({
        name: 'List'
      })
    },
    handleClick(tab) {
      console.log(tab.index);
    },

  }
}
</script>

<style scoped lang="scss">

</style>
