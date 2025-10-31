/* eslint-disable vue/multi-word-component-names */
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
// element-puls图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 和风天气图标
import 'qweather-icons/font/qweather-icons.css'
// 引入pinia
import { createPinia } from 'pinia'
// 导入 vue-echarts 组件
import ECharts from 'vue-echarts';
// 引入css文件
import '@/assets/styles/weather-styles.css'
// 引入加载组件
import Loading from './components/Loading.vue'
// 引入emitter
import emitter from './utils/emitter'
const pinia = createPinia()
const app = createApp(App)
// 循环注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(emitter)
// 全局注册图表组件，在模板中可以使用 <v-chart> 标签
app.component('Loading', Loading) // 全局注册，在任何组件中都可以直接使用<Loading />
app.component('v-chart', ECharts);
app.mount('#app')
