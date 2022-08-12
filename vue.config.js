module.exports = {
  lintOnSave: false,
  devServer: {
    // clientLogLevel: 'info',
    host: 'localhost',
    port: 8080,
    https: false,
    open: true,
    proxy: {
      "/admin": {
        target: 'http://ceshi5.dishait.cn/admin',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/admin': ""
        }
      }
    }
  }
}
