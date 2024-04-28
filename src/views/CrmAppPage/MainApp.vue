<template>
<div>
    <van-nav-bar title="首页" />
    <home-swiper style="margin-top:0px" :banners="banners"></home-swiper>
  <div style="width:100%;height:5px;border:0px solid #dedede;background-color:#dedede"></div>

<van-notice-bar
  left-icon="volume-o"
  text="系统已更新到最新版本，请用户留意。如遇问题，请联系管理员"
/>
<div style="height:15px;width:100%;background-color: white;"></div>
    <!-- <van-grid :column-num="3" :gutter="10">
  <van-grid-item v-for="value in 6" :key="value" icon="label-o" text="文字" />
</van-grid> -->

<van-grid style="" :column-num="3" :gutter="10">
  <van-grid-item  v-for="(item,index) in channels" :key="index" :icon="item.icon_url" :text="item.name"
  @click="GoToCategory(item.id,item.name,item.path)"
   />
  </van-grid>

   

</div>

</template>
<script lang="ts">
import { ref ,onMounted} from 'vue';
import { useRouter, useRoute } from "vue-router";
import HomeSwiper from "@/components/CrmAppComp/HomeSwiper.vue";
export default {
  components: {
      HomeSwiper
  },
  setup() {
 
    const active = ref(0);
    const router = useRouter();

    let channels = ref<any[]>([]);
      let banners = ref<any[]>([]);
    onMounted(()=>{
      let channelsList = [
      {
    "id": 1,
    "icon_url": "jingxuan.png",
    "name": "线索","path":"/Home_App/SearchClue"
} , {
    "id": 5,
    "icon_url": "lianxiren.jpg",
    "name": "联系人"    ,"path":"/Home_App/SearchContacts"        
},
      
      {
    "id": 7,
    "icon_url": "gaoduan.png",
    "name": "工作计划","path":"/Home_App/SearchWorkPlan"   
   
}, {
    "id": 8,
    "icon_url": "keyan.png",
    "name": "审批任务","path":"/Home_App/SearchAduit"
}, {
    "id": 3,
    "icon_url": "chanpin.jpg",
    "name": "产品查询","path":"/Home_App/SearchProductv1"
}];
      
          channelsList.forEach((item)=>{
            item.icon_url=require(`@/assets/images/${item.icon_url}`);
          });
          channels.value=channelsList;
         
        
          let slidesList = [{
        "id": 6,
        "title": "融职图书商城",
        "url": "https://www.eduwork.cn",
        "img": "ad/2020-0820-5f3dfe85ae3fd.png",
        "status": 1,
        "seq": 1,
        "created_at": "2021-01-04T08:46:56.000000Z",
        "updated_at": "2021-01-04T08:46:56.000000Z",
        // "img_url": "http://www.bioon.com.cn/ewebeditor/fckup/2018/9/20180925160146500131.jpg"

        "img_url": "slide1.jpg"


    },
    {
        "id": 7,
        "title": "融职图书商城",
        "url": "https://www.eduwork.cn",
        "img": "ad/2020-0820-5f3dfe9530bfd.png",
        "status": 1,
        "seq": 2,
        "created_at": "2021-01-04T08:46:56.000000Z",
        "updated_at": "2021-01-04T08:46:56.000000Z",
        // "img_url": "https://p3.ssl.qhimgs1.com/sdr/400__/t01e0565c07fe452003.jpg"
        "img_url": "slide2.jpg"
    },
    {
        "id": 8,
        "title": "融职图书商城",
        "url": "https://www.eduwork.cn",
        "img": "ad/2020-0820-5f3dfe7756215.png",
        "status": 1,
        "seq": 3,
        "created_at": "2021-01-04T08:46:56.000000Z",
        "updated_at": "2021-01-04T08:46:56.000000Z",
        // "img_url": "http://pic2.cxtuku.com/00/11/77/b8078c2e4456.jpg"
        "img_url": "slide3.jpg"
    },
    {
        "id": 9,
        "title": "融职图书商城",
        "url": "https://www.eduwork.cn",
        "img": "ad/2020-0825-5f44b35f595a4.png",
        "status": 1,
        "seq": 4,
        "created_at": "2021-01-04T08:46:56.000000Z",
        "updated_at": "2021-01-04T08:46:56.000000Z",
        // "img_url": "http://p4.so.qhmsg.com/t01919b9c29e5fc25b0.jpg"
        "img_url": "slide4.jpg"
    },
    {
        "id": 10,
        "title": "融职图书商城",
        "url": "https://www.eduwork.cn",
        "img": "ad/2020-0827-5f474a7259d67.png",
        "status": 1,
        "seq": 5,
        "created_at": "2021-01-04T08:46:56.000000Z",
        "updated_at": "2021-01-04T08:46:56.000000Z",
        // "img_url": "http://p1.so.qhmsg.com/t0199f79565b2e3329e.jpg"
        "img_url": "slide5.jpg" 
    }
]

banners.value = slidesList; 

     });


    let GoToCategory=(pid:any,pname:any,path:any)=>{
      router.push({ path: path, query: { pid: pid,pname:pname } });
    }


    const LogOut = () => {
      localStorage.setItem("starToken", "");
        localStorage.setItem("UserName", "");
      router.push({ path: "/login", query: { selected: "1" } });
    };

    return { LogOut,channels,GoToCategory,banners };
  },
};
</script>
<style scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 110px;
    text-align: center;
    background-color: #cedfebda;
  }
</style>