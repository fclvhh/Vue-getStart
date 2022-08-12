import $util from "@/common/util"

export default {
  state: {
    skus_type: 0,
    name: '',
    category: [],
    desc: '',
    unit: '',
    stock: 0,
    mini_stock: 0,
    display_stock: 0,
    status: 0,
    express: '',
    //  单个表单数据
    oPrice: 0,
    pPrice: 0,
    cPrice: 0,
    weight: 0,
    volume: 0,
    //  规格卡片
    sku_card: [
      {
        name: '颜色',
        type: 0,
        list: [
          {
            name: '黄色',
            image: '',
            color: ''
          },
        ]
      }
    ],
    // 表头
    ths: [
      {name: "商品规格", rowspan: 1, colspan: 1, width: ""},
      {name: "sku图片", rowspan: 2, width: "60"},
      {name: "销售价", rowspan: 2, width: "100"},
      {name: "市场价", rowspan: 2, width: "100"},
      {name: "成本价", rowspan: 2, width: "100"},
      {name: "库存", rowspan: 2, width: "100"},
      {name: "体积", rowspan: 2, width: "100"},
      {name: "重量", rowspan: 2, width: "100"},
      {name: "编码", rowspan: 2, width: "100"},
    ],


  },
  getters: {
    //  获取表头
    tableThs(state = this.state) {
      state.ths[0].colspan = state.sku_card.length
    }
  },
  mutations: {
    // 设置属性的值
    vModelState(state = this.state, {name, value}) {
      state[name] = value
      console.log(value);
    },
    //增加card
    addSkuCard(state = this.state) {
      state.sku_card.push({
        name: '规格名称',
        type: 0, // 0-无 1-颜色 2图片
        list: []
      })
    },
    //删除card
    deleteSkuCard(state = this.state, index) {
      state.sku_card.splice(index, 1)
    },
    // 修改规格卡片
    vModelSkuCard(state = this.state, {key, index, value}) {
      state.sku_card[index][key] = value
    },
    //  规格卡片排序
    sortSkuCard(state = this.state, {action, index}) {
      $util[action](state.sku_card, index)
    },
    //  增加指定规格卡片的规格属性
    addSkuValue(state = this.state, index) {
      state.sku_card[index].list.push({
        name: '规格名称',
        image: '',
        color: ''
      })
    },
    //  删除规格属性
    deleteSkuValue(state = this.state, {index1, index2}) {
      state.sku_card[index1].list.splice(index2, 1)
    },
    //  修改规格属性
    updateSkuValue(state = this.state, {index1, index2, key, value}) {

      state.sku_card[index1].list[index2][key] = value
    },
    //  排序规格卡片的属性列表
    sortSkuValue(state = this.state, {index, value}) {
      state.sku_card[index].list = value
    },
  },
  actions: {}
}
