<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form-item label="规格项：">
        <el-input type="text" :value="item.name" @input="vModel('name',index,$event)"
                  style="width: 300px;">
          <el-button slot="append" icon="el-icon-more"></el-button>
        </el-input>
        <el-radio-group style="margin-left: 20px;" :value="item.type" @input="vModel('type',index,$event)">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">颜色</el-radio>
          <el-radio :label="2">图片</el-radio>
        </el-radio-group>
        <el-button icon="el-icon-top" style="margin-left: 150px" @click="sortCard('moveUp',index)"
                   :disabled="index === 0"
        ></el-button>

        <el-button icon="el-icon-bottom" @click="sortCard('moveDown',index)"
                   :disabled="total === (index+1)"
        ></el-button>
        <el-button type="text" @click="deleteSkuCard(index)">删除</el-button>
      </el-form-item>

    </div>
    <div class="body">
      <!-- 规格属性列表-->
      <sku-card-body-item :type="item.type" :list="item.list" :cardIndex="index"></sku-card-body-item>
      <!-- 增加规格-->
      <el-button type="text" @click="addSkuValue(index)"><i class="el-icon-plus"></i>增加规格值</el-button>
    </div>
  </el-card>

</template>

<script>
import {mapMutations} from "vuex/dist/vuex.mjs";
import SkuCardBodyItem from "@/components/shop/create/sku/sku-card-bodyItem";

export default {
  name: "sku-card",
  components: {SkuCardBodyItem},
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
    },
    total: {
      type: Number,
    }
  },
  data() {
    return {
      list: this.item.list,
    }
  },
  methods: {
    ...mapMutations(['deleteSkuCard', 'vModelSkuCard', 'sortSkuCard', 'addSkuValue']),
    vModel(key, index, value) {
      console.log(value);
      this.vModelSkuCard({key, index, value})
    },
    sortCard(action, index) {
      this.sortSkuCard({action, index})
    }
  }
}
</script>

<style scoped lang="scss">

</style>
