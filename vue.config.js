const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const IconsResolver = require('unplugin-icons/resolver')
const Icons = require('unplugin-icons/webpack')
const path = require('path')
module.exports = {
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  productionSourceMap: process.env.NODE_ENV === 'development',
  //css
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  configureWebpack: config => {
    config.plugins = [
      ...config.plugins,
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep']
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'i'
          })
        ]
      }),
      Icons({
        autoInstall: true
      })
    ]

    Object.assign(config.resolve, {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@u': path.resolve(__dirname, './src/utils'),
        '@a': path.resolve(__dirname, './src/api')
      }
    })
  },

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
        include: ['@/src/components/svgIcon/icon']
      })
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
