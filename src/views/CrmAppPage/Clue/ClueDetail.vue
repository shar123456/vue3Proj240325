<template>
  <van-nav-bar
    title="线索详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="DetailContainer">
    <van-cell-group inset>
  <van-cell title="公司" :value="DataEntityState.EditData.firm" />
  <van-cell title="姓名" :value="DataEntityState.EditData.name" />
  <van-cell title="职位" :value="DataEntityState.EditData.position" />
  <van-cell title="行业" :value="DataEntityState.EditData.industry" />
  <van-cell title="手机号" :value="DataEntityState.EditData.mobilePhone" />
  <van-cell title="电话" :value="DataEntityState.EditData.phone" />
  <van-cell title="传真" :value="DataEntityState.EditData.fax" />


  <van-cell title="电邮" :value="DataEntityState.EditData.email" />

  <van-cell title="网站" :value="DataEntityState.EditData.webSite" />

  <van-cell title="线索来源" :value="DataEntityState.EditData.clueSource" />

  <van-cell title="评级" :value="DataEntityState.EditData.rate" />
  <van-cell title="审核状态" :value="DataEntityState.EditData.clueAuditState" />
  <van-cell title="线索编号" :value="DataEntityState.EditData.clueCode" />

  <van-cell title="邮政编码" :value="DataEntityState.EditData.postalCode" />
  <van-cell title="所属区域" :value="DataEntityState.EditData.belongArea" />
  <van-cell title="省份" :value="DataEntityState.EditData.province" />
  <van-cell title="城市" :value="DataEntityState.EditData.city" />
  <van-cell title="备注"   size="large"  value="" :label="DataEntityState.EditData.remark"  />
  






</van-cell-group>
<van-divider>结尾</van-divider>
  </div>






  <van-back-top target=".DetailContainer"  bottom="16vh" />




</template>

<script lang="ts">
import { onMounted,ref,reactive,toRefs} from "vue";
import {
  GetClueById
}
  from "@/Request/CrmRequest/ClueManagementRequest";
import {
  ClueEntity,IClueInfo
} from "@/TypeInterface/ICrm/IClueManagement";
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


    let DataEntityState = reactive(new ClueEntity());
    onMounted(() => {
     
let i:any=router.currentRoute.value.params.Id;
console.log(i);

  
GetClueById({ Id: i }).then((res: any) => {
                  if (res.isSuccess) {
                   
                 DataEntityState.EditData=res.datas;

             console.log("GetClueById",DataEntityState.EditData);
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