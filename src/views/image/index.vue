<template>
  <div>
    <el-container>
      <el-header>
        <div class="form-wrap">
          <div class="search">
            <el-select placeholder="请选择活动区域" value label-width="150px">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input placeholder="请输入相册名称" label-width="150px"></el-input>
            <el-button type="success">搜索</el-button>
          </div>
          <div class="create-image">
            <el-button type="warning" @click="imageBatchUnSelect" v-if="this.imageChooseCache.length>0">批量取消</el-button>
            <el-button type="danger" @click="imageBatchDelete" v-if="this.imageChooseCache.length>0">批量删除</el-button>
            <el-button type="success" @click="openAlbumModel(false)">创建相册</el-button>
            <el-button type="warning" @click="uploadImageModelVisible = true">上传图片</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="aside-wrapper">
            <div class="photo-item" v-for="(item,index) in this.albumArr" :key="index"
                 @click.stop="photoClick(index)"
                 :class="{photoActive:currentIndex === index}"
            >
              <span>{{ item.name }}</span>
              <el-dropdown>
                 <span class="el-dropdown-link">
                   {{ item.num }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.stop.native="openAlbumModel({item,index})">修改</el-dropdown-item>
                  <el-dropdown-item @click.stop.native="photoDelete(index)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-main style="line-height: inherit">
            <div class="image-list-wrapper" style="margin-top: -10px">
              <el-row :gutter="20">
                <el-col :span="24" :lg="4" :md="6" :sm="8" v-for="(item,index) in this.imageArr" :key="index"
                        style="margin-top: 10px">
                  <div :class="{imageItemWrapper:item.isChecked}" style="position: relative">
                    <el-tag v-if="item.isChecked" :class="{tag:item.isChecked}"
                            type="warning" style="position: absolute;top: 0;right: 0;"
                    >
                      {{ item.checkOrder }}
                    </el-tag>
                    <el-card :body-style="{ padding: '0px'}">
                      <img alt=""
                           :src="item.imgSrc"
                           class="image"
                           @click="imageChoose(item,index)"
                      >
                      <div class="image-title">
                        {{ item.imgName }}
                      </div>
                      <div class="button-wrapper">
                        <el-button-group>
                          <el-button size="mini" icon="el-icon-view" @click="previewImageModel(item)"></el-button>
                          <el-button size="mini" icon="el-icon-edit" @click="imageNameChange(item,index)"></el-button>
                          <el-button size="mini" icon="el-icon-delete" @click="imageDelete(index)"></el-button>
                        </el-button-group>
                      </div>

                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-main>

        </el-container>
      </el-container>
      <el-footer>
        <div class="footer-wrapper">
          <div class="button-wrap">
            <el-button-group>
              <el-button icon="el-icon-arrow-left" size="mini"
                         style="padding: 8px"
              >上一页
              </el-button>
              <el-button size="mini"
                         style="padding: 8px"
              >下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
          </div>
          <div class="pageSplit-wrap">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
          </div>
        </div>
      </el-footer>
    </el-container>

    <!--    修改｜创建 相册弹窗 -->
    <el-dialog :title="albumFormTitle" :visible.sync="albumFormVisible" width="35%" top="10%">
      <el-form :model="albumForm">
        <el-form-item label="相册名称" label-width="120px">
          <el-input v-model="albumForm.name" aria-placeholder="请输入相册名称" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="计数" label-width="120px">
          <el-input-number v-model="albumForm.order" :min="0" size="medium"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="albumFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </div>
    </el-dialog>
    <!--上传图片弹框-->
    <el-dialog
        title="提示"
        :visible.sync="uploadImageModelVisible"
        width="30%"
        center>
      <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
         <el-button @click="centerDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--预览图片-->
    <el-dialog
        :visible.sync="previewImageVisible"
        width="40vw"
        top="5vh"
        class="preview-image-dialog"
    >
      <img alt=""
           src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
           class="image"
      >

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "image",
  data() {
    return {
      albumArr: [],
      imageArr: [],
      //选中图片数组
      imageChooseCache: [],
      currentIndex: 0,
      albumFormVisible: false,
      uploadImageModelVisible: false,
      previewImageVisible: false,
      albumEditIndex: -1,
      previewImageSrc: '',
      albumForm: {
        name: '',
        num: 0,
        order: 0
      },
    }
  },
  computed: {
    albumFormTitle() {
      return this.albumEditIndex > -1 ? '修改相册' : '创建相册'
    },

  },
  methods: {
    handleSizeChange() {
    },
    handleCurrentChange() {
    },
    initData() {
      for (let i = 0; i < 20; i++) {
        this.albumArr.push({
          name: `相册${i}`,
          num: `${Math.floor(Math.random() * 100)}`,
          order: 0
        })
      }
      for (let i = 0; i < 20; i++) {
        this.imageArr.push({
          id: i,
          imgSrc: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          imgName: `图片${i}`,
          isChecked: false,
          checkOrder: 1
        })
      }

    },
    // photo 都是侧栏的方法
    photoClick(index) {
      this.currentIndex = index
    },
    photoDelete(index) {
      console.log('删除');
      this.$confirm('是否删除该相册？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '修改成功'
        });
      })
      this.albumArr.splice(index, 1)
    },
    photoChange() {
      this.albumArr[this.albumEditIndex].name = this.albumForm.name
      this.albumArr[this.albumEditIndex].order = this.albumForm.order
    },
    // 修改or创建相册
    openAlbumModel(opt) {
      // 修改逻辑
      if (opt) {
        const {item, index} = opt
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumEditIndex = index
        console.log(this.albumEditIndex);
        this.albumFormVisible = true
      } else {
        //  创建逻辑
        this.albumForm = {
          name: '',
          order: 0
        }

        this.albumEditIndex = -1
        this.albumFormVisible = true
      }

    },
    // 确实修改or创建相册操作
    confirmAlbumModel() {
      // 判断是修改操作
      if (this.albumEditIndex > -1) {
        this.photoChange()
        return this.albumFormVisible = false
      } else {
        //  创建逻辑
        this.albumArr.unshift({
          name: this.albumForm.name,
          order: this.albumForm.order,
          num: 0
        })
        this.albumFormVisible = false
      }
    },
    previewImageModel(item) {
      this.previewImageVisible = true
      this.previewImageSrc = item.imgSrc
    },
    imageNameChange(item, index) {
      this.$prompt('请输入图片名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: item.imgName,
        inputValidator(value) {
          if (value === '') {
            return '图片名称不能为空'
          }
        },
      }).then(({value}) => {
        this.imageArr[index].imgName = value
        this.$message({
          type: 'success',
          message: '图片名称修改成功'
        });
      })
    },
    imageDelete(index) {

      this.$confirm(' 是否删除该图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.imageArr.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })

    },
    // checkOrder的相关代码 （一次取消选中代码）
    imageChoose(item) {
      // 未被选中
      if (!item.isChecked) {
        this.imageChooseCache.push({
          id: item.id,
          imgSrc: item.imgSrc
        })
        item.checkOrder = this.imageChooseCache.length
        item.isChecked = true
      } else {
        /*
        * 已被选择过
        *   取消选择的逻辑
        */
        // 从缓存中找到选中的图片
        // debugger
        let chooseIndex = this.imageChooseCache.findIndex((val) => val.id === item.id)
        // 没找到
        if (chooseIndex === -1) return
        // 找到，取消选择
        this.imageChooseCache.splice(chooseIndex, 1)
        // 重新排序
        if (chooseIndex + 1 <= this.imageChooseCache.length) {
          for (let j = chooseIndex; j < this.imageChooseCache.length; j++) {
            let restIndex = this.imageArr.findIndex((val) => val.id === this.imageChooseCache[j].id)
            if (restIndex > -1) {
              this.imageArr[restIndex].checkOrder -= 1
            }
          }
        }
        item.isChecked = false
        item.checkOrder = 0
      }

    },
    // 批量删除图片
    imageBatchDelete() {
      this.$confirm(' 是否删除该图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除逻辑代码
        this.imageArr = this.imageArr.filter((item) => {
          return !this.imageChooseCache.some(cacheItem => {
            return cacheItem.id === item.id
          })
        })
        this.imageChooseCache = []
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })

    },
    // 批量取消选中
    imageBatchUnSelect() {
      this.imageArr.forEach((item) => {
        let selectIndex = this.imageChooseCache.findIndex((val) => {
          return item.id === val.id
        })
        if (selectIndex > -1) {
          item.isChecked = false
          item.checkOrder = 0
          this.imageChooseCache.splice(selectIndex, 1)
        }
      })
    }
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped lang="scss">
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
}

.el-aside {
  height: calc(100vh - 225px);
  background-color: #D3DCE6;
  color: #333;
}

.el-main {
  height: calc(100vh - 225px);
  overflow: scroll;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

// 头部 搜索表单样式
.form-wrap {
  display: flex;
  justify-content: space-between;
  align-content: center;
  //line-height: 60px;
  margin-top: 10px;

  .search {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;

    .el-select {
      margin-left: 20px;
    }

    .el-input {
      margin-left: 20px;
    }

    .el-button {
      margin-left: 20px;
    }
  }

  .create-image {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
}

// 侧栏样式
.aside-wrapper {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 1px solid #333333;
  height: 100%;
  margin-bottom: 10px;

  .photo-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid red;
    padding: 15px;
    cursor: pointer;
  }

  .photoActive {
    background-color: aqua;
  }
}

.upload-demo {
  text-align: center;
}

// 图片列表
.image {
  width: 100%;
  display: block;
}

// 图片列表相关样式
.image-list-wrapper {
  .imageItemWrapper {
    outline: 2px solid red;
    position: relative;

  }

  .image-title {
    position: relative;
    border: 1px solid red;
    background-color: rgba(0, 0, 0, .5);
    padding: 5px;
    color: #E9EEF3;
    font-size: 12px;
    margin-top: -28px;
    z-index: 100;
  }

  .button-wrapper {

    .el-button {
      padding: 10px;
    }
  }
}

// 底部分页样式
.footer-wrapper {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;

  .button-wrap {
    padding: 10px 23px 10px 10px;
    border-right: 1px solid;

  }

  .pageSplit-wrap {
    margin-left: 10px;
  }
}

</style>
