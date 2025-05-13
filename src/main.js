import { createApp } from 'vue'
// import './style.css'
import 'element-plus/dist/index.css' // Element Plus样式
import 'normalize.css' // Normalize.css必须在Element样式之后引入
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
