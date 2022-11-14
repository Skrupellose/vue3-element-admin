const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //css
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      [process.env.VUE_APP_API]: {
        target: process.env.VUE_APP_TARGET,
        changeOrigin: true,
        ws: false,
        secure: false,
        pathRewrite: {
          [`^${process.env.VUE_APP_API}`]: ''
        }
      }
    }
  }
}
