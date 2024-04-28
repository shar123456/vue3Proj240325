<template>
  <van-nav-bar
    title="工作计划详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="DetailContainer">
    <van-cell-group inset>
  <van-cell title="标题" :value="DataEntityState.EditData.workScheduleName" />
  <van-cell title="计划编号" :value="DataEntityState.EditData.workScheduleNo" />
  <van-cell title="类型" :value="DataEntityState.EditData.workScheduleType" />
  <van-cell title="计划状态" :value="DataEntityState.EditData.workScheduleStatus" />
  <van-cell title="通知类型" :value="DataEntityState.EditData.noticeType" />
  <van-cell title="发布人" :value="DataEntityState.EditData.initiator" />
  <!-- <van-cell title="开始时间" :value="DataEntityState.EditData.startTimeStr" /> -->


  <van-cell title="创建时间" :value="DataEntityState.EditData.createTimeStr" />

  <van-cell title="工作内容"   size="large"  value="" :label="DataEntityState.EditData.workScheduleDesc"  />
  

  <van-cell title="备注"   size="large"  value="" :label="DataEntityState.EditData.remarkDesc"  />
  




</van-cell-group>
<van-divider>结尾</van-divider>
  </div>






  <van-back-top target=".DetailContainer"  bottom="16vh" />




</template>

<script lang="ts">
import { onMounted,ref,reactive,toRefs} from "vue";
import {
  GetWorkScheduleById
}
  from "@/Request/WorkScheduleRequest";
import {
  WorkScheduleEntity
} from "@/TypeInterface/IWorkScheduleInterface";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import {  showSuccessToast ,showFailToast,showConfirmDialog } from "vant";
export default {
   props: ["Id"],
  setup(props:any) {
    let router = useRouter();
      const srcImg = ref("");
       const ProductDetailActive = ref(1);
         const store = useStore();
       let htmlDesc=ref("");
      


    let passpic = ref(require("../../../assets/passe.png"));
    let nopasspic = ref(require("../../../assets/nopasse.png"));


    let DataEntityState = reactive(new WorkScheduleEntity());
    onMounted(() => {
     
let i:any=router.currentRoute.value.query.Id;
console.log(i);

  
GetWorkScheduleById({ Id: i }).then((res: any) => {
                  if (res.isSuccess) {
                   
                 DataEntityState.EditData=res.datas;

             console.log("GetWorkScheduleById",DataEntityState.EditData);
                  }
                  else
                  {
                    showFailToast(res.msg);
                  }
                });
    });
    let onClickLeft = () => {
      router.go(-1);
    };
    


    return { ProductDetailActive,onClickLeft,srcImg ,htmlDesc,
      DataEntityState,passpic,nopasspic};
  },
};
</script>

<style >
.DetailContainer{
    border:0px solid red;
    width:100%;
    height: calc(100vh - 100px);
 

     overflow-y:auto; 
}

.PassTaskMark{
  width:100%;


 text-align: center;display: flex;flex-direction: row;justify-content: center;
 
}
.PassTaskMark img{
width:110px;
height:70px;
}
</style>