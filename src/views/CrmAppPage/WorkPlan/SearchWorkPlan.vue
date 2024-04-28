<template>

  <div style="border: 0px solid red; height: 45px">
    <nav-bar :NavHideRight="NavHideRight" :NavHideLeft="NavHideLeft">
      <template v-slot:default>
        <van-search input-align="center" v-model="searchData" @search="SearchBtn" placeholder="请输入搜索关键词" />
      </template>
      <template v-slot:Right></template>
    </nav-bar>
  </div>


  <van-empty v-if="ShowEmpty" :description="Emptydescription" />
  <div v-if="!ShowEmpty" class="ContentContainer">
    <van-loading v-if="Showloading" size="24px" vertical>加载中...</van-loading>

    <van-list style="border:0px solid blue;width: 100%;display: flex;flex-direction: column;
  align-items:center;width: 100%;" ref='listRef' v-model:loading="loading" :finished="finished" :finished-text="finishedDesc"
      @load="onLoad" :immediate-check="checkLoad">

      <div v-for="Temp in DataEntityState.DataList" :key="Temp.id" style="width: 94%;border: 2px outset rgba(182, 213, 223, 0.233);
box-sizing: border-box;margin-bottom: 14px;background-color:rgba(229, 233, 212, 0.09);
border-radius: 11px;padding: 3px;">




     




        <van-row  class="colTitle_Head_Row">
          <van-col class="colTitle_Head" span="6">工作计划</van-col>
          <van-col class="colDesc_Head" span="18"><van-text-ellipsis :content="Temp.workScheduleName" /></van-col>  
        </van-row>
        <van-row>
          <van-col class="colTitle" span="5">发起人：</van-col>
          <van-col class="colDesc" span="7"><van-text-ellipsis :content="Temp.initiator" /></van-col>  
          <van-col class="colTitle" span="5">类型：</van-col>
          <van-col class="colDesc" span="7"><van-text-ellipsis :content="Temp.workScheduleType" /></van-col>  
        </van-row>
        <van-row>
          
          <van-col class="colTitle" span="6">创建时间：</van-col>
          <van-col class="colDesc" span="18"><van-text-ellipsis :content="Temp.createTimeStr" /></van-col>  
        </van-row>
        <van-row>
          <van-col class="colTitle" span="6">开始时间：</van-col>
          <van-col class="colDesc" span="18"><van-text-ellipsis :content="Temp.startTimeStr" /></van-col>  
         
        </van-row>
       
       

        <van-row>
          <van-col class="colTitle colTitleEnd" span="6">计划状态：</van-col>
          <van-col class="colDesc colTitleEnd" span="6"
          :class="{ cGreen: Temp.workScheduleStatus == '即将开始', cRed: Temp.workScheduleStatus == '已过期'|| Temp.workScheduleStatus == '已取消', cBlue: Temp.workScheduleStatus == '已完成'}"
          ><van-text-ellipsis :content="Temp.workScheduleStatus" /></van-col>  
          <van-col style="display: flex;
justify-content:flex-end;padding-right: 4px;align-items: center;" class="colTitle colTitleEnd" span="12"><van-button @click="DetailBtn(Temp.workScheduleNo,Temp.id)" type="success" size="mini" >计划详情</van-button></van-col>
        </van-row>
     


       
      </div>

    </van-list>
    <van-back-top target=".ContentContainer"  bottom="16vh" />
  </div>

</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";
import { showSuccessToast } from "vant";
import { useStore } from "vuex";
import NavBar from "@/components/NavBar.vue";
import {
  GetWorkScheduleDatas
}
  from "@/Request/WorkScheduleRequest";
import {
  WorkScheduleEntity
} from "@/TypeInterface/IWorkScheduleInterface";


export default {
  components: {
    NavBar,
  },
  setup() {
    let route = useRoute();
    let router = useRouter();
    const store = useStore();
    let searchData = ref("");
    let NavHideRight = ref(true);
    let NavHideLeft = ref(false);



    let DataListTemp:any;
    let collectImg = ref(require("../../../assets/images/collect.png"));


    const DataEntityState = reactive(new WorkScheduleEntity());


 


    const loading = ref(false);
    const finished = ref(false);
    const checkLoad = ref(false);
    let finishedDesc = ref("没有更多了");

    
    const onLoad = async () => {
      // 异步更新数据
      loading.value = true;

      let UserDatasList = await GetWorkScheduleDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      });
      if (UserDatasList.isSuccess) {
    
      DataEntityState.QueryConditionInfo.workScheduleName=searchData.value;

        if(DataEntityState.QueryConditionInfo.workScheduleName!=null&&DataEntityState.QueryConditionInfo.workScheduleName!="")
{
  DataListTemp = UserDatasList.filter((i:any)=>i.workScheduleName.indexOf(DataEntityState.QueryConditionInfo.workScheduleName)>0);
}
else
{
  DataListTemp= UserDatasList;
}
         


console.log("DataListTemp.value",DataListTemp.datas);
        DataEntityState.DataList.push(...DataListTemp.datas);
        totalCount.value = DataListTemp.length;
        if (totalCount.value > 0) {
          finished.value = false;
          loading.value = false;
          current1.value++;
        } else {
          loading.value = false;
          finished.value = true;
          finishedDesc.value=`没有更多了，共${ DataEntityState.DataList.length}笔`
        }
      }
      if (DataEntityState.DataList.length > 0) {
       ShowEmpty.value = false;
      }
      else {
        ShowEmpty.value = true;

      }

    };

   

    /***分页****************/
    const pageSize = ref(5);
    const current1 = ref(2);
    const totalCount = ref(0);
    let refreshMark = ref<string>("");
    let ShowEmpty = ref(true);
    let Emptydescription = ref("暂无线索数据");
    let Showloading = ref(true);

    /***分页****************/

    onMounted(async () => {
      refreshMark.value = new Date().getTime().toString();
    });

    watch(refreshMark, () => {
      DataEntityState.QueryConditionInfo.firm="";
      current1.value = 2;
      ShowEmpty.value = false;
      Showloading.value = true;
      GetWorkScheduleDatas({
        current: 1,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      }).then((res: any) => {

        if (res.isSuccess) {

          DataEntityState.DataList = res.datas;
          
          totalCount.value = res.datas?.length;
          current1.value = 2;

          console.log("GetWorkScheduleDatas", DataEntityState.DataList);
          if (totalCount.value > 0) {
            ShowEmpty.value = false;
            Showloading.value = false;
          } else {
            ShowEmpty.value = true;
            Showloading.value = false;
          }
        } else {
          ShowEmpty.value = false;
          Showloading.value = false;
        }
      });
    });

    let SearchBtn = () => {
      let txt = searchData.value;
      
      DataEntityState.QueryConditionInfo.workScheduleName=txt;
      
           current1.value = 2;
      ShowEmpty.value = false;
      Showloading.value = true;
      GetWorkScheduleDatas({
        current: 1,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      }).then((res: any) => {

        if (res.isSuccess) {
          DataEntityState.QueryConditionInfo.workScheduleName=searchData.value;


        if(DataEntityState.QueryConditionInfo.workScheduleName!=null&&DataEntityState.QueryConditionInfo.workScheduleName!="")
{
  DataListTemp= res.datas.filter((i:any)=>i.workScheduleName.indexOf(DataEntityState.QueryConditionInfo.workScheduleName)>0);
}
else
{
  DataListTemp= res.datas;
}
       
DataEntityState.DataList=DataListTemp;
          totalCount.value = DataListTemp?.length;
          current1.value = 2;

          console.log("GetWorkScheduleDatas", DataEntityState.DataList);
          if (totalCount.value > 0) {
            ShowEmpty.value = false;
            Showloading.value = false;
          } else {
            ShowEmpty.value = true;
            Showloading.value = false;
          }
        } else {
          ShowEmpty.value = false;
          Showloading.value = false;
        }
      });

      
    };

  
    let DetailBtn=(Code:string,id:string)=>{
      router.push({ path: `/Home_App/WorkPlanDetail`,query: { Id: id} });
      // router.push({ path: "/Home/ExaminationTaskDetail", query: { Id: item,Type:"Examination" } });
    }


    return {
      searchData,
      NavHideRight,
      NavHideLeft,


 
      
      collectImg,
      loading, finished, onLoad, checkLoad,finishedDesc,
      SearchBtn, ShowEmpty, Emptydescription, Showloading, DataEntityState,DetailBtn
    };
  },
};
</script>

<style scoped>
.ContentContainer {
  width: 100%;
  height: calc(100vh - 100px) !important;
  overflow-y: scroll;

  border: 0px solid rgba(127, 155, 95, 0.712);
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
 
  flex-flow: wrap;


}
.colTitle_Head_Row
{
  /* background-color:rgba(77, 224, 41, 0.244); */


  background-color:rgba(127, 155, 95, 0.122);
}
.colTitle_Head {
  border-bottom: 1px solid rgba(226, 216, 216, 0.408);font-weight: 600;font-size: 17px;
  height: 30px;line-height: 30px;
}
.colDesc_Head {
  border-bottom: 1px solid  rgba(226, 216, 216, 0.408); height: 30px;line-height: 30px; font-weight: 600;font-size: 17px;
}
.colTitle {
  border-bottom: 1px solid rgba(226, 216, 216, 0.408);font-weight: 400;font-size: 14px;color: gray;
  height: 27px;line-height: 27px;
}
.colDesc {
  border-bottom: 1px solid  rgba(226, 216, 216, 0.408); height: 27px;line-height: 27px!important; font-weight: 400;font-size: 14px; color: gray;


}
.van-text-ellipsis
{
  line-height: 27px!important; 
}
.colTitleEnd{
  border-bottom: 0;
}
.colDescEnd {
  border-bottom: 0;
}
.cRed {
  color: rgba(218, 73, 73, 0.856);
  font-weight: bolder;
  font-size: 17px;
}

.cGray {

  font-weight: bolder;  font-size: 17px;
}

.cGreen {
  color: rgb(27, 167, 39);
  font-weight: bolder; font-size: 17px;
}

.cBlue {
  color: rgb(27, 88, 167);
  font-weight: 800;  font-size: 17px;
  ;
}
</style>