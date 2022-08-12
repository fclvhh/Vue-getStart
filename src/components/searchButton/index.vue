<template>
 <div>
   <div class="pane-wrapper">
     <div class="pane-head">
       <div class="button-wrap">
         <slot name="button"></slot>
       </div>
       <div class="search-wrap">
         <slot name="search">
           <el-input v-model="keyWord" :placeholder="placeholder" class="input"></el-input>
           <el-button type="info" @click="handleSearch">搜索</el-button>
           <el-button plain @click="highSearch">高级搜索</el-button>
         </slot>
       </div>
     </div>
     <div class="power-search" v-show="this.searchFlag">
       <el-card class="box-card">
         <div slot="header" class="clearfix">
           <span>高级搜索</span>
           <el-button style="float: right; padding: 3px 0" type="text" @click="packUp">收起</el-button>
         </div>
         <div>
           <slot name="form"></slot>
         </div>
       </el-card>
     </div>

   </div>
 </div>
</template>

<script>
export default {
  name: "SearchButton",
  data() {
    return {
      keyWord:'',
      searchFlag:false
    }
  },
  props:{
    placeholder:{
      type:String,
      default:''
    }
  },
  methods:{
    handleSearch() {
      this.$emit('search',this.keyWord)
    },
    highSearch() {
      this.searchFlag = true
    },
    packUp() {
      this.searchFlag = false
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
</style>
