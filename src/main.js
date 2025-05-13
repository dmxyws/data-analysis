import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 引入数据持久化插件
// import './style.css'
import 'element-plus/dist/index.css' // Element Plus样式
import 'normalize.css' // Normalize.css必须在Element样式之后引入
import App from './App.vue'
import router from './router'

const pinia = createPinia() // 创建Pinia实例
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia) // 将Pinia安装到应用中
app.use(router)
app.mount('#app')
