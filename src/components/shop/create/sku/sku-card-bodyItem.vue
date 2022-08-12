<template>
  <div>
    <div class="card-attr-wrap">
      <div class="color-attr" v-for="(attr,attrIndex) in list" :key="attrIndex"
           :v-dragging="{ item:attr, list: list, group: `skuItem${cardIndex}` }"
      >
        <el-color-picker v-model="attr.color" size="mini" v-if="type===1"></el-color-picker>
        <span v-if="type===2">
              <i class="el-icon-plus" @click="chooseImage"></i>
        </span>
        <el-input type="text" :value="attr.name" @input="inputHand(attrIndex,$event)"
                  style="width: 80px"></el-input>
        <span @click="deleteSkuValue({index1:cardIndex,index2:attrIndex})">
              <i class="el-icon-circle-close"></i>
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "sku-card-bodyItem",
  inject: ['app'],
  props: {
    type: {
      type: Number,
    },
    cardIndex: {
      type: Number,
    },
    list: {
      type: Array,
    }
  },
  mounted() {
    // 监听拖拽的过程
    // this.$dragging.$on('dragged', ({ value }) => {
    //   console.log(value.item)
    //   console.log(JSON.stringify(value.list))
    //   console.log(value.otherData)
    // })
    // 监听拖拽的结束
    this.$dragging.$on('dragend', (e) => {
      console.log('拖拽结束');
      console.log(e);
      if (e.group === 'skuItem' + this.cardIndex) {
        this.sortSkuValue({index: this.cardIndex, value: this.list})
      }
    })
  },
  methods: {
    ...mapMutations(['deleteSkuValue', 'updateSkuValue', 'sortSkuValue']),
    inputHand(attrIndex, e) {
      console.log(e);
      this.updateSkuValue({index1: this.cardIndex, index2: attrIndex, key: 'name', value: e})
    },
    chooseImage() {
      this.app.open((res) => {
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>
