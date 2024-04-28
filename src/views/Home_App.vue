<template>
  <div>
    <van-tabbar v-model="tabbarActive" active-color="#F55353">
      <van-tabbar-item icon="home-o" to="/Home_App/MainApp">主页</van-tabbar-item>
    
      <van-tabbar-item :badge="MyTaskCount" icon="apps-o" to="/Home_App/Aduit"
        >任务</van-tabbar-item
      >
      <van-tabbar-item icon="setting-o" to="/Home_App/Profile">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
  <router-view />
</template>
<script lang="ts">
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { GetExaminationDatas} from "@/Request/ExaminationRequest";
import {
  ExaminationTaskEntity,
  ExaminationTaskColumns,
} from "@/TypeInterface/IExaminationInterface";
export default {
  setup() {
    const router = useRouter(); // 跳转的路由
    const route = useRoute(); // 接收参数的路由
    const store = useStore();
    let tabbarActive = ref(0);
   
    const DataEntityState = reactive(new ExaminationTaskEntity());
    onMounted(async() => {



let UserDatasList = await GetExaminationDatas({
  current: 1,
  pageSize: 10000,
  ...DataEntityState.QueryConditionInfo,
});



if (UserDatasList.isSuccess) {
  DataEntityState.DataList = UserDatasList.datas.filter((i:any)=>i.examResult=="未审批");;
  store.state.AduitTaskCount =  DataEntityState.DataList.length;

}









});


       let MyTaskCount= computed(()=>{

        const token = localStorage.getItem("starToken");
      console.log("token", token);

      if (!token) {
        return"";
      }
else
{
  //return store.state.cartCount;
  return store.state.AduitTaskCount;
}




         
       }
      
     
       );






    watch(route, (newValue, oldValue) => {
      //直接监听
      switch (newValue.path) {
        case "/Home_App/MainApp":
          tabbarActive.value = 0;
          break;
       
          
 case "/Home_App/Aduit":
          tabbarActive.value = 1;
          break;

          
        case "/Home_App/Profile":
          tabbarActive.value = 2;
          break;

        default:
          tabbarActive.value = 100;
          break;
      }
    });
    return { tabbarActive,MyTaskCount};
  },
};
</script>
<style>
/* @import "./assets/css/Alicoin/iconfont.css";
@import "./assets/css/base.css"; */

.van-nav-bar__content{
  background-color: #F6F6F4;
}
/* .van-nav-bar__text{
  color: #7e7171 !important;
}
.van-icon-arrow-left{
  color: #7e7171 !important;
} */
.van-grid-item__content{
  background-color: #f5f5f3;
 
}


::-webkit-scrollbar {
  width: 1px;
}
</style>
