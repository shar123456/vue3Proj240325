import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {setUpAntd} from '@/assets/ant-design-vue-config/ant-design-config'
//import './Mock/mockDatas'
//import Fragment from 'vue-fragment'
import dayjs from 'dayjs'; 
import 'dayjs/locale/zh-cn'; 
import '@/styles/antGlobelStyle.css'
import '@/styles/CrmGlobleStyle.css'
dayjs.locale('zh-cn');


// import { Button,Tabbar,TabbarItem,Grid,GridItem ,Swipe,SwipeItem,NavBar,NoticeBar } from 'vant';
// import 'vant/lib/index.css';
import AddVantComponents from '@/assets/vant-config/vant-config'

import { jsSeamlessScroll, cssSeamlessScroll,vueSeamless,vueSeamlessScroll  } from "vue-seamless-scroll";
const app=createApp(App);
app.use(cssSeamlessScroll);
app.use(jsSeamlessScroll);
app.use(vueSeamless);
app.use(vueSeamlessScroll);
setUpAntd(app);

app.use(store);
app.use(router);
//app.use(Fragment.Plugin)

AddVantComponents(app);
// app.use( Button );
// app.use( Tabbar );
// app.use( TabbarItem );app.use( Grid );app.use( GridItem );app.use( Swipe );
// app.use( SwipeItem );app.use( NavBar );app.use( NoticeBar );
app.mount('#app')
