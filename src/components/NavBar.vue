<template>
    <div class="nav-bar" >
<div class="Left" :class="[{'LeftHiden':NavHideLeft,'NoLeftHiden':!NavHideLeft}]" @click="goBack" style="">
    <img src="../assets/images/left-black.png" alt="" srcset=""><text>返回</text>
</div>
<div class="Center"><slot></slot></div>
<div class="Right" :class="[{'RightHiden':NavHideRight}]"><slot name="Right"></slot></div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
   
    props:{
        NavHideRight:{
            type:Boolean,
            default(){
                return false;
            }
        },
        NavHideLeft:{
            type:Boolean,
            default(){
                return false;
            }
        },

        

    },
    setup () {
        const router=useRouter();

      const  goBack=()=>{
          router.go(-1);
      }

        return {goBack}
    }
}
</script>

<style  scoped>
.nav-bar{
    height: 38px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    color:black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
   
   
  
    /* box-shadow:0 2px 0px rgba(100,100,100,0.1); */
    
}
.Right,.Left{
    width: 50px;line-height: 38px;
   
}
.RightHiden{
    display: none;  
}
.LeftHiden{
    display: none;  
}
.NoLeftHiden{
    display:flex;align-items: center; 
}
.Left img{
    width: 15px;
    height: 15px;
    
    
}
.Center{
 text-align: center;
  flex:1;
  border:0px solid red;
  padding-top: 6px;

}
.van-search{

    margin-top: 14px !important;

}
</style>