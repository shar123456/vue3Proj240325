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
          <van-col class="colTitle_Head" span="4">联系人</van-col>
          <van-col class="colDesc_Head" span="20"><van-text-ellipsis :content="Temp.name" /></van-col>  
        </van-row>
        <van-row>
          <van-col class="colTitle" span="4">职务：</van-col>
          <van-col class="colDesc" span="8"><van-text-ellipsis :content="Temp.position" /></van-col>  
          <van-col class="colTitle" span="4">部门：</van-col>
          <van-col class="colDesc" span="8"><van-text-ellipsis :content="Temp.dept" /></van-col>  
        </van-row>
        <van-row>
          <van-col class="colTitle" span="4">电邮：</van-col>
          <van-col class="colDesc" span="8"><van-text-ellipsis :content="Temp.email" /></van-col>  
          <van-col class="colTitle" span="4">传真：</van-col>
          <van-col class="colDesc" span="8"><van-text-ellipsis :content="Temp.fax" /></van-col>  
        </van-row>
        <van-row>
          <van-col class="colTitle" span="4">手机：</van-col>
          <van-col class="colDesc" span="8"><van-text-ellipsis :content="Temp.mobilePhone" /></van-col>  
          <van-col class="colTitle" span="4">电话：</van-col>
          <van-col class="colDesc" span="8"><van-text-ellipsis :content="Temp.phone" /></van-col>  
        </van-row>
        <van-row>
          <van-col class="colTitle" span="4">地址：</van-col>
          
          <van-col class="colDesc" span="20">
            <van-text-ellipsis :content="Temp.province+'&nbsp'+ Temp.city +'&nbsp'+  Temp.address" />
          </van-col>  
        </van-row>


        <van-row>
          <van-col class="colTitle colTitleEnd" span="4">来源：</van-col>
          <van-col class="colDesc colTitleEnd" span="8"
          
          ><van-text-ellipsis :content="Temp.contactSource" /></van-col>  
          <van-col style="display: flex;
justify-content:flex-end;padding-right: 4px;align-items: center;" class="colTitle colTitleEnd" span="12">
<a :href="'tel:'+Temp.mobilePhone">拨打号码</a>&nbsp;&nbsp;&nbsp;
<a :href="'sms:'+Temp.mobilePhone">发送短信</a>
</van-col>
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
  GetContactManagementDatas
}
  from "@/Request/CrmRequest/ContactManagementRequest";
import {
  ContactEntity
} from "@/TypeInterface/ICrm/IContactManagement";






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


    const DataEntityState = reactive(new ContactEntity());


 


    const loading = ref(false);
    const finished = ref(false);
    const checkLoad = ref(false);
    let finishedDesc = ref("没有更多了");

    
    const onLoad = async () => {
      // 异步更新数据
      loading.value = true;

      let UserDatasList = await GetContactManagementDatas({
        current: current1.value,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      });
      if (UserDatasList.isSuccess) {
    
      DataEntityState.QueryConditionInfo.name=searchData.value;

        if(DataEntityState.QueryConditionInfo.firm!=null&&DataEntityState.QueryConditionInfo.name!="")
{
  DataListTemp = UserDatasList.filter((i:any)=>i.name.indexOf(DataEntityState.QueryConditionInfo.name)>0);
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
      GetContactManagementDatas({
        current: 1,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      }).then((res: any) => {

        if (res.isSuccess) {

          DataEntityState.DataList = res.datas;
          
          totalCount.value = res.datas?.length;
          current1.value = 2;

          console.log("GetContactManagementDatas", DataEntityState.DataList);
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
      
      DataEntityState.QueryConditionInfo.name=txt;
      
           current1.value = 2;
      ShowEmpty.value = false;
      Showloading.value = true;
      GetContactManagementDatas({
        current: 1,
        pageSize: pageSize.value,
        ...DataEntityState.QueryConditionInfo,
      }).then((res: any) => {

        if (res.isSuccess) {
          DataEntityState.QueryConditionInfo.name=searchData.value;


        if(DataEntityState.QueryConditionInfo.name!=null&&DataEntityState.QueryConditionInfo.name!="")
{
  DataListTemp= res.datas.filter((i:any)=>i.name.indexOf(DataEntityState.QueryConditionInfo.name)>0);
}
else
{
  DataListTemp= res.datas;
}
       
DataEntityState.DataList=DataListTemp;
          totalCount.value = DataListTemp?.length;
          current1.value = 2;

          console.log("GetContactManagementDatas", DataEntityState.DataList);
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

  
    let DetailBtn=(clueCode:string,id:string)=>{
      router.push({ path: `/Home_App/ClueDetail/${id}` });
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