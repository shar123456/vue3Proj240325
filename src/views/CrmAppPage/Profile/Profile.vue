<template>
  <div>
    <div style="border:0px solid red;height:45px;">
  <nav-bar :NavHideRight="NavHideRight" :NavHideLeft="NavHideLeft">
    <template v-slot:default>
      <!-- <van-search input-align="center" v-model="searchData" placeholder="请输入搜索关键词" />  -->
     个人中心
    </template>
    <template v-slot:Right></template>
  </nav-bar>
</div>
    <div style="margin-top: 0px" class="profile_container">
      <div class="profile_up">
        <div class="profile_up-left">
          <van-image width="7rem" height="8rem" fit="contain" :src="imglogo" />
        </div>
        <div class="profile_up-right">
          <ul>
            <li><span>昵称：</span><span>{{UserInfo.NickName}}</span></li>
            <li><span>登录名：</span><span>{{UserInfo.Name}}</span></li>
            <!-- <li><span>性别：</span><span>{{UserInfo.Gender}}</span></li> -->
               <li><span>状态：</span><span>在线</span></li>
          </ul>
        </div>
      </div>
      <div class="profile_middle">
        <ul>
        
          <li style="" @click="goTo('/Home_App/Collect')">
            <span>我的收藏</span>
            <van-icon name="arrow" />
          </li>
          <li style="margin:0px;padding:0px;height:0px;" >
            <span style="height:4px;background-color:#eee;width:100%;"></span>
          </li>
          <li style=""  @click="goTo('/Order')">
            <span>我的订单</span>
            <van-icon name="arrow" />
          </li>
         
        
          <!--  <li style=""  @click="goTo('/Address')">
            <span>地址管理</span>
            <van-icon name="arrow" />
          </li> -->
            <li style=""  @click="goTo('/ScanTest')">
            <span>报表管理</span>
            <van-icon name="arrow" />
          </li>
          <li style=""  @click="goTo('/Home_App/UserAccount')">
            <span>用户信息</span>
            <van-icon name="arrow" />
          </li>
          <li style="margin:0px;padding:0px;height:0px;" >
            <span style="height:4px;background-color:#eee;width:100%;"></span>
          </li>
          <li style="border-bottom: 1px solid rgba(209, 209, 209, 0.068);height:40px"  @click="goTo('/Home_App/About')">
            <span>关于我们</span>
            <van-icon name="arrow" />
          </li>
        </ul>
      </div>
      <div class="profile_down">
        <van-button @click="tologOut" type="danger" round block
          >退出登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
// import { logOut } from "@/network/user.js";
 import {  showSuccessToast  } from "vant";
 import 'vant/lib/index.css';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref,reactive,onMounted } from "vue";

import { isNull } from "lodash";
export default {
  components: {
    NavBar,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    let NavHideRight=ref(true);
     let NavHideLeft=ref(true);
    const imglogo = ref(require("../../../assets/images/ren.jpg"));
    let UserInfo:any=ref({});
onMounted(()=>{
  
  let userinfoStr:string=localStorage.getItem("UserName")||"";
  UserInfo.value =JSON.parse(userinfoStr);
  console.log("AppUserInfo",UserInfo);

  
})





    const tologOut = () => {
      // logOut().then((res) => {
      //   if (res.status == "204") {
      //   }
      // });

 
      const token = localStorage.getItem("starToken");
     

        if (!token) 
{
  showSuccessToast("尚未登录");
    setTimeout(() => {
      router.push({ path: "/login", query: { selected: "1" } });
      }, 1000);
   return;
}

showSuccessToast("退出成功");
      localStorage.setItem("starToken", "");
        localStorage.setItem("UserName", "");
      setTimeout(() => {
        router.push({ path: "/Login" });
      }, 1000);
    };

    const goTo=(path:any,query:any)=>{
      router.push({path,query:query||{}});
    }



    return { NavHideRight,NavHideLeft,tologOut, imglogo ,goTo,UserInfo};
  },
};
</script>

<style  scoped>
.profile_container {
  border: 0px solid red;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.profile_up {
  width: 100%;
  height: 140px;
  background-color: rgba(74, 116, 163, 0.027);
  margin-top: 0px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
}

.profile_up-left {
  border: 0px solid red;
  width: 40%;
  height: 100%;
}
.profile_up-right {
  border: 0px solid red;
  width: 60%;
  height: 100%;
}
.profile_middle {
  
  width: 100%;
  height: 260px;
  background-color: rgba(74, 116, 163, 0);
  margin-top: 16px;
}
.profile_down {
  width: 95%;
  height: 60px;
  background-color: rgba(90, 175, 79, 0);
  position: fixed;
  bottom:60px
}

.profile_middle ul li {
  height: 40px;
  width: 100%;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: white;
  margin-bottom: 5px;
}

.profile_up-right ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0px solid red;
  height: 100%;
}
.profile_up-right ul li {
  width: 100%;

  display: flex;

  align-items: center;
  padding: 5px;
  background-color: rgba(192, 192, 192, 0.102);
  margin-bottom: 5px;
}
</style>