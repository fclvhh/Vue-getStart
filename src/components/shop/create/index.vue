<template>
  <div class="form-wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input :value="name" @input="vModelState({name:'name',value:$event})"
                  placeholder="请输入商品名称，不能超过60个字符" style="width:400px">
        </el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <div class="block">
          <el-cascader
              :value="category" @input="vModelState({name:'category',value:$event})"
              :options="form.options"
          ></el-cascader>
        </div>
      </el-form-item>
      <el-form-item label='商品描述'>
        <el-input type="textarea" placeholder="选填，商品卖点简述，例如：此商品美观大方性价比高，不容错过"
                  :rows="10" style="width: 600px"
                  :value="desc" @input="vModelState({name:'desc',value:$event})"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品单位">
        <el-input placeholder="请输入商品单位" style="width:200px"
                  :value="unit" @input="vModelState({name:'unit',value:$event})"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="总库存">
        <el-input type="number" style="width:200px"
                  :value="stock" @input="vModelState({name:'stock',value:$event})"
        >
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="库存预警">
        <el-input type="number" style="width:200px"
                  :value="mini_stock" @input="vModelState({name:'mini_stock',value:$event})"
        >
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="库存显示">
        <el-radio-group :value="display_stock" @input="vModelState({name:'display_stock',value:$event})">
          <el-radio :label="0" border>是</el-radio>
          <el-radio :label="1" border>否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-radio-group :value="status" @input="vModelState({name:'status',value:$event})">
          <el-radio :label="0" border>放入仓库</el-radio>
          <el-radio :label="1" border>立即上架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="运费模版">
        <el-select :value="express" @input="vModelState({name:'express',value:$event})"
                   placeholder="请选择运费模版" style="width: 400px">
          <el-option label="模版一" value="shanghai"></el-option>
          <el-option label="模版二" value="beijing"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex/dist/vuex.mjs";

export default {
  name: "createShop",
  data() {
    return {
      form: {
        options: [
          {
            value: 1,
            label: '东南',
            children: [{
              value: 2,
              label: '上海',
              children: [
                {value: 3, label: '普陀'},
                {value: 4, label: '黄埔'},
                {value: 5, label: '徐汇'}
              ]
            }, {
              value: 7,
              label: '江苏',
              children: [
                {value: 8, label: '南京'},
                {value: 9, label: '苏州'},
                {value: 10, label: '无锡'}
              ]
            }, {
              value: 12,
              label: '浙江',
              children: [
                {value: 13, label: '杭州'},
                {value: 14, label: '宁波'},
                {value: 15, label: '嘉兴'}
              ]
            }]
          }, {
            value: 17,
            label: '西北',
            children: [{
              value: 18,
              label: '陕西',
              children: [
                {value: 19, label: '西安'},
                {value: 20, label: '延安'}
              ]
            }, {
              value: 21,
              label: '新疆维吾尔族自治区',
              children: [
                {value: 22, label: '乌鲁木齐'},
                {value: 23, label: '克拉玛依'}
              ]
            }]
          }]
      }
    }
  },
  computed: {
    ...mapState({
      name: state => state.goods_create.name,
      category: state => state.goods_create.category,
      desc: state => state.goods_create.desc,
      unit: state => state.goods_create.unit,
      stock: state => state.goods_create.stock,
      mini_stock: state => state.goods_create.mini_stock,
      display_stock: state => state.goods_create.display_stock,
      status: state => state.goods_create.status,
      express: state => state.goods_create.express,
    })
  },
  methods: {
    ...mapMutations(['vModelState']),
  }
}
</script>

<style scoped lang="scss">

</style>
