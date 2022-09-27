import {createApp} from 'vue'
import App from './App.vue'


import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as ELIcons from '@element-plus/icons-vue'

import router from "@/router/index.js";

//引入全局css
import "@/styles/normalize.css"
import "@/styles/default.css"

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import {fas,faCartShopping} from '@fortawesome/free-solid-svg-icons'

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from "axios";

library.add(faCartShopping,fas)

// 创建应用实例对象,链式调用使用router,ElementPlus,FontAwesome
const app = createApp(App).use(router).use(ElementPlus).component("font-awesome-icon", FontAwesomeIcon)

//注册el-icon
for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}

app.config.globalProperties.$axios=axios;


//最后才挂载
app.mount('#app')
