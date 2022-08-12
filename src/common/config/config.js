const config = {
  logo: 'My-admin',
  headerNav: {
    activeIndex: '0',
    list: [
      {
        title: "首页",
        asideActiveIndex: '0',
        asideMenu: [
          {
            asideTitle: "后台首页",
            icon: 'el-icon-s-home',
            pathname: 'Home'
          },
          {
            asideTitle: "相册管理",
            icon: 'el-icon-s-claim',
            pathname: 'Image'
          }
        ]
      },
      {
        title: "商品",
        asideActiveIndex: '0',
        asideMenu: [
          {
            asideTitle: "商品管理",
            icon: 'el-icon-s-home',
            pathname: 'List'
          },
          {
            asideTitle: "相册管理",
            icon: 'el-icon-s-claim',
            pathname: 'Image'
          },
          {
            asideTitle: "demo",
            icon: 'el-icon-s-claim',
            pathname: 'Demo'
          }
        ]
      },
      {title: "订单"},
      {title: "会员"},
      {title: "设置"},
    ]
  }
}

export default config
