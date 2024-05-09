<template>


<van-nav-bar
  title="关于我们"
  left-text="返回"
  
  left-arrow
  @click-left="onClickLeft"

/>

  <div class="aboutContainer">
   

    <div class="about-content">
      <div class="up">
        <!-- <img :src="imglogo" alt="" srcset="" /> -->
         CRM 客户资源管理系统
        
        </div>
      <div class="middle" style="padding-top: 15px;padding-bottom:  15px;padding-left: 5px;">
        <span >&nbsp;&nbsp;CRM是一款专门为个体工商户、代理公司及中小型企业打造的客户资源管理系统。
        该系统可以方便、快捷、高效的管理与客户之间的关系，从而提高客户的价值和满意度。
        此外，通过使用CRM系统，用户可以很好地对客户进行细分，从而针对每类客户采取不同的运营策略，
        以此提升客户体验的同时，也能持续维护与客户之间的关系，不断挖掘客户的价值，最终达到增加用户自身营收的目的。
      </span>   <span>&nbsp;&nbsp;
系统主要包括线索管理、客户管理、联系人管理、商机管理、产品管理、报价管理、发货管理、库存管理工作计划及审批等功能。
</span>
</div>
      <div class="foot" >
   
    <img :src="imgabout1" alt="" srcset="" />
    <!-- <img :src="imgabout2" alt="" srcset="" /> -->
    <!-- <img src="https://p0.ssl.qhimgs1.com/sdr/400__/t010642527e31e7ea96.jpg" alt="" srcset="" /> -->
      </div>
    </div>
  </div>
</template>

<script>

import { ref, reactive,onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
  
    
  },
  setup() {
    const router=useRouter();
    const imgabout1 = ref(require("@/assets/images/about1.jpeg"));
    const imgabout2 = ref(require("@/assets/images/about2.png"));
   function onClickLeft(){
    router.go(-1);
   }
      
    return { imgabout1,imgabout2,onClickLeft };
  },
  
};
</script>

<style  scoped>
.aboutContainer{
  
  width:100%;
  height: calc(100vh - 90px) !important;
overflow-y:scroll;
display: flex;
flex-direction: row;
}

.about-content {
  margin-top: 0px;
  border: 0px double #dedede;
  height: calc(100%-60px);
  width: 100%;

height:100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 5px;
  justify-content: space-around;
}
.up {
  width: 100%;
  height: 10%;
  border: 0px double #dedede;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 23px;
  background-color: white;
  color:rgb(223, 23, 23)
}
.up img {
  height: 55%;
  width: 50%;
}
.middle {
  width: 100%;
  height: 42%;
  border-bottom: 1px double #eee;
  border-top: 1px double #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  /* padding: 5px; */
}
.middle span {
  text-align: left;
}
.foot {
  height: 45%;
  width: 100%;
  border: 0px double red;
}
.foot img{
   height: 100%;
  width: 100%;
}



 


</style>