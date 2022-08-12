<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="市场价格">
        <el-input :value="oPrice" @input="vModelState({name:'oPrice',value:$event})"
                  type="number" style="width:200px">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="销售价格">
        <el-input :value="pPrice" @input="vModelState({name:'pPrice',value:$event})" type="number"
                  style="width:200px">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="成本价格">
        <el-input :value="cPrice" @input="vModelState({name:'cPrice',value:$event})" type="number"
                  style="width:200px">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品重量">
        <el-input :value="weight" @input="vModelState({name:'weight',value:$event})"
                  type="number" style="width:200px">
          <template slot="append">公斤</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品体积">
        <el-input :value="volume" @input="vModelState({name:'volume',value:$event})"
                  type="number" style="width:200px">
          <template slot="append">立方米</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex/dist/vuex.mjs";

export default {
  name: "singleAttr",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      oPrice: state => state.goods_create.oPrice,
      pPrice: state => state.goods_create.pPrice,
      cPrice: state => state.goods_create.cPrice,
      weight: state => state.goods_create.weight,
      volume: state => state.goods_create.volume,
    })
  },
  methods: {
    ...mapMutations(['vModelState']),
  }
}
</script>

<style scoped>

</style>
