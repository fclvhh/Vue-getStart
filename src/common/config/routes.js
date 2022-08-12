// import home from "@/views/home";
// import layout from '@/views/layout'
// import login from "@/views/login";
const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: {name: 'Home'},
    component: 'layout',
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '后台首页'
        },
        component: 'home',
      },
      {
        path: 'image',
        name: 'Image',
        meta: {
          title: '相册管理'
        },
        component: 'image',
      },
      {
        path: 'shop/goods/list',
        name: 'List',
        meta: {
          title: '商品列表'
        },
        component: 'shop/goods/list'
      },
      {
        path: 'shop/goods/create',
        name: 'Create',
        meta: {
          title: '创建商品'
        },
        component: 'shop/goods/create'
      },
      {
        path: 'demo',
        name: 'Demo',
        meta: {
          title: '测试用'
        },
        component: 'demo'
      },

    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: '登陆页'
    },
    component: 'login'
  },
  // {
  //   path: '*',
  //   redirect: {name: 'Home'},
  //   component: 'home'
  // }
]

let getRoutes = (routes) => {
  createRouter(routes)
  return routes
}

function createRouter(arr) {
  arr.forEach(function (item) {
    if (!item.component) return
    //去除 index
    const pathStr = deleteLastIndex(item.component)
    // 生成name
    item.name = item.name || pathStr.split('/').pop()
    // 生成 path
    item.path = item.path || `/${pathStr}`
    let componentFun = import(`@/views/${item.component}`)
    item.component = () => componentFun
    if (item.children && item.children.length > 0) {
      createRouter(item.children)
    }
  })
}

// 去除index
// function getValue(str) {
//   // str = login/index
//   // 获取最后一个/的索引
//   let index = str.lastIndexOf('/')
//   // 获取最后一个/后面的值
//   let val = str.substring(index+1,str.length)
//   // 判断是不是index结尾
//   if (val === 'index') {
//     return str.substring(index,-1)
//   }
//   return str
// }

function deleteLastIndex(str) {
  let arr = str.split('/')
  if (arr.indexOf('index') === -1) {
  } else {
    if (arr.indexOf('index') === arr.length) {
      arr.pop()
    }
  }
  return arr.join('/')
}


export default getRoutes(routes)
