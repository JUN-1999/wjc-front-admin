import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
import { resolve } from 'path'
import dayjs from 'dayjs'

const fs = require('fs')

export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  // 全局 scss 资源
  const scssResources = []
  fs.readdirSync('src/styles/resources').map(dirname => {
    if (fs.statSync(`src/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@import "src/styles/resources/${dirname}";`)
    }
  })

  return defineConfig({
    base: './',
    plugins: createVitePlugins(env, command === 'build'),
    server: {
      port: 3292,
      strictPort: true, // 若 3292 端口被占用,直接结束项目
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join(''),
        },
      },
    },
    define: {
      __UPDATE_TIME__: JSON.stringify(dayjs().format('YYYY-M-D HH:mm:ss')),
    },
  })
}
