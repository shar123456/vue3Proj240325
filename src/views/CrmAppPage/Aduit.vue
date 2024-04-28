<template>
  <div class="collectTitleBar">
    <van-nav-bar title="审批任务" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>

  <div v-if="IsShowNoData" style="margin-top: 20px; color: rgb(100, 93, 93);text-align: center;">
    暂无数据信息
  </div>

  <div v-if="!IsShowNoData" class="AduitContainer" style="display: flex;flex-direction: column;
  align-items:center;width: 100%;">

    <div v-for="Temp in DataEntityState.DataList" :key="Temp.examTaskId" style="width: 94%;height: 128px;border: 2px outset rgba(182, 213, 223, 0.233);display: flex;
justify-content: center;align-items: center;flex-direction: column;box-sizing: border-box;margin-bottom: 14px;
border-radius: 11px;padding-left: 3px;background-color:rgba(229, 233, 212, 0.22);">



      <div style="width: 100%;height: 21%;border-bottom: 1px solid #dedede;display: flex;
align-items: center;">
        <text style="font-weight: bolder;font-size: 17px;">标题：{{ Temp.examName }}</text>
      </div>
      <div style="width: 100%;height: 18%;border-bottom: 1px solid #dedede;display: flex;
align-items: center;color: rgb(100, 93, 93)">
        <text style="overflow: hidden;width: 100%;
white-space: nowrap;
text-overflow: ellipsis;">内容：{{ Temp.taskDesc }}</text>
      </div>



      <div style="width: 100%;height: 18%;border-bottom: 1px solid #dedede;
  display: flex;
justify-content: center;align-items: center;flex-direction: row;color: rgb(100, 93, 93)">
        <div style="width: 40%;border: 0px solid #dedede;">发起人：{{ Temp.initiator }}</div>
        <div style="width: 70%;border: 0px solid #dedede;">开始时间：{{ Temp.endTimeStr }}</div>
      </div>

 <div style="width: 100%;height: 18%;border-bottom: 1px solid #dedede;
  display: flex;
justify-content: center;align-items: center;flex-direction: row;color: rgb(100, 93, 93)">
        <div style="width: 40%;border: 0px solid #dedede;">审批人：{{ Temp.examUser }}</div>
        <div style="width: 70%;border: 0px solid #dedede;" :class="{ cBlue: Temp.examStatus == '已完成', cGreen: Temp.examStatus == '进行中' }">审批结果：{{ Temp.examStatus }}</div>
      </div>


      <div style="width: 100%;height: 18%;border: 0px solid #dedede; display: flex;
justify-content: center;align-items: center;flex-direction: row;">

        <!-- <div style="width: 40%;" :class="(Temp.examStatus=='已完成'?'cBlue':Temp.examStatus=='进行中'?'cGreen':'')"> -->
        <div style="width: 40%;" :class="{ cBlue: Temp.examResult == '通过', cGreen: Temp.examResult == '驳回' }">
          任务状态：{{ Temp.examResult }}

        </div>

        <div style="width: 70%; display: flex;
justify-content:flex-end;padding-right: 4px;"> 
<van-button type="success" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="AgreeBtn(Temp.examNo,Temp.examId)">同意</van-button>
<van-button type="danger" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="RejectBtn(Temp.examNo,Temp.examId)">驳回</van-button>
        </div>
      </div>

    </div>



  </div>
</template>

<script lang="ts">
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";
import { showConfirmDialog } from 'vant';
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
import {  GetExaminationDatas } from "@/Request/ExaminationRequest";
import {
  ExaminationEntity,
  ExaminationTaskColumns,
} from "@/TypeInterface/IExaminationInterface";
import { SetExaminationResult } from "@/Request/ExaminationRequest";
import {  showSuccessToast ,showFailToast } from "vant";
export default {

  setup() {
    let NavHideRight = ref(true);
    let NavHideLeft = ref(false);
    let router = useRouter();
    const store = useStore();
    let collectInfo = ref([]);
    let IsShowNoData = ref(false);
    const DataEntityState = reactive(new ExaminationEntity());




    const pageSize = ref(10);
    const current1 = ref(1);
    const totalCount = ref(0);



    onMounted(async () => {

      let result = store.dispatch("GetCollectList");
      result.then((res) => {
        collectInfo.value = res;
      })

      
      let UserDatasList = await  GetExaminationDatas({
        current: 1,
        pageSize: 10000000,
        ...DataEntityState.QueryConditionInfo,
      });


      console.log("amount", UserDatasList);
      if (UserDatasList.isSuccess) {
        DataEntityState.DataList = UserDatasList.datas.filter((i:any)=>i.examResult=="未审批");
        totalCount.value = DataEntityState.DataList.length;
        current1.value = 1;
        store.commit('SetAduitTaskCount', totalCount.value)
      }
      if (totalCount.value > 0) {
        IsShowNoData.value = false;
      }
      else {
        IsShowNoData.value = true;

      }









    });
    function onClickLeft() {
      router.go(-1);
    }
     

    async function refreshList (){
      let UserDatasList = await  GetExaminationDatas({
        current: 1,
        pageSize: 10000000,
        ...DataEntityState.QueryConditionInfo,
      });


      console.log("amount", UserDatasList);
      if (UserDatasList.isSuccess) {
        DataEntityState.DataList = UserDatasList.datas.filter((i:any)=>i.examResult=="未审批");
        totalCount.value =  DataEntityState.DataList.length;
        current1.value = 1;
        console.log("SetAduitTaskCount",totalCount.value);
        store.commit('SetAduitTaskCount', totalCount.value)

      }
      if (totalCount.value > 0) {
        IsShowNoData.value = false;
      }
      else {
        IsShowNoData.value = true;

      }
    }

function AgreeBtn(TaskId:string,Id:string){


showConfirmDialog({
  title: '提示',
  message:
    `同意编号为：${TaskId} 的任务？`,
})
  .then(() => {

    let params={remark: "Moblie",result:"agree",examId:Id}
      SetExaminationResult(params).then(async (res: any) => {
            if (res.isSuccess) {
              showSuccessToast("审批完成.");
              refreshList ();
           
            }
            else
            {
              showFailToast(res.msg);
            }

          
         });
  })
  .catch(() => {
    // on cancel
  });

}
function RejectBtn(TaskId:string,Id:string){
  showConfirmDialog({
  title: '提示',
  message:
    `驳回编号为：${TaskId} 的任务？`,
})
  .then(() => {
    let params={remark: "Moblie",result:"reject",examId:Id}
      SetExaminationResult(params).then(async (res: any) => {
            if (res.isSuccess) {
              showSuccessToast("审批完成.");
              refreshList ();
           
            }
            else
            {
              showFailToast(res.msg);
            }

          
         });



  })
  .catch(() => {
    // on cancel
  });
}

    return { NavHideRight, NavHideLeft, onClickLeft, collectInfo, DataEntityState,
       IsShowNoData,AgreeBtn,RejectBtn };
  },
};
</script>

<style scoped>
.collectTitleBar .van-nav-bar {
  background-color: #f6f6f4;
}

.Left {
  background-color: #eee !important;
}

.AduitContainer {
  width: 100%;
  height: calc(100vh - 110px) !important;
  overflow-y: auto;

  border: 0px solid rgba(182, 213, 223, 0.733);
  box-sizing: border-box;
  margin-top: 10px;
}

.cGreen {
  color: rgb(27, 167, 39);
  font-weight: bolder;
}

.cGray {
  color: black;
  font-weight: bolder;
}

.cBlue {
  color: rgb(27, 88, 167);
  font-weight: 800;
  ;
}
</style>