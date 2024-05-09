<template>
    <van-nav-bar
  title="用户信息"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<div class="UserAccountContainer">

    <van-cell-group inset style="margin-top:5px;">
  <van-cell title="用户名" :value="state.data.Name" />
  <van-cell title="昵称" :value="state.data.NickName" />
  <van-cell title="性别" :value="state.data.Gender" />

</van-cell-group>
</div>



</template>

<script lang="ts">
import { reactive, toRefs ,ref,onMounted} from 'vue'
import {useRouter}  from 'vue-router'

export default {
    components:{
        
    },
    setup () {
        const router=useRouter();
        let state:any = reactive({data:{}
          
           
           
        })
    
    
onMounted(()=>{
  
  let userinfoStr:string=localStorage.getItem("UserName")||"";

  state.data =JSON.parse(userinfoStr);
  console.log("AppUserInfo",state);

  
})



    const onClickLeft=()=>{
        router.go(-1);
    }
  
        return {
            state,onClickLeft
        }
    }
}
</script>

<style  scoped>
.UserAccountContainer{
    width:100%;
    height:calc(100vh - 100px);
    border:0px solid red;
    overflow-y:auto;
    background-color: rgba(223, 228, 233, 0.08);
}
</style>