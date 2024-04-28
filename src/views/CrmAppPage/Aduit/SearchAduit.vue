<template>
  <div style="border: 0px solid red; height: 45px">
    <nav-bar :NavHideRight="NavHideRight" :NavHideLeft="NavHideLeft">
      <template v-slot:default>
        <van-search
          input-align="center"
          v-model="searchData"
          @search="SearchBtn"
          placeholder="请输入标题关键词"
        />
      </template>
      <template v-slot:Right></template>
    </nav-bar>
  </div>



  <!-- <div style="height:100%" class="ProductContainer1"> -->



    <van-tabs class="ProductTap" v-model:active="ProductActive" @click-tab="onClickTab">



      <van-tab title="综合">     
        
  
         
        <div v-if="IsShowNoData"   style="margin-top: 20px; color: rgb(100, 93, 93);text-align: center;">
    暂无数据信息
  </div>

 

  <div v-if="!IsShowNoData" class="ProductContainer" style="display: flex;flex-direction: column;
  align-items:center;width: 100%;">

<van-list
style="border:0px solid blue;width: 100%;display: flex;flex-direction: column;
  align-items:center;width: 100%;" ref='listRef' 

v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check="checkLoad"
>


    <div  v-for="Temp in DataEntityState.DataList" :key="Temp.examTaskId" 
    style="width: 94%;height: 128px;border: 2px outset rgba(182, 213, 223, 0.233);display: flex;
justify-content: center;align-items: center;flex-direction: column;
box-sizing: border-box;margin-bottom: 14px;
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
<van-button type="primary" size="mini"  @click="DetailBtn(Temp.examNo,Temp.examTaskId)">详情</van-button>
<van-button type="success" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="AgreeBtn(Temp.examNo,Temp.examId)">同意</van-button>
<van-button type="danger" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="RejectBtn(Temp.examNo,Temp.examId)">驳回</van-button>
        </div>
      </div>

    </div>


  </van-list>


    <van-back-top target=".ProductContainer"  bottom="16vh" />




  </div>




      </van-tab>
      <van-tab title="未审批">
        <div v-if="IsShowNoData" style="margin-top: 20px; color: rgb(100, 93, 93);text-align: center;">
    暂无数据信息
  </div>

  <div v-if="!IsShowNoData" class="ProductContainer" style="display: flex;flex-direction: column;
  align-items:center;width: 100%;">

<van-list
style="border:0px solid blue;width: 100%;display: flex;flex-direction: column;
  align-items:center;width: 100%;" ref='listRef' 

v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check="checkLoad"
>

    <div v-for="Temp in DataEntityState.DataList" :key="Temp.examId" style="width: 94%;height: 128px;border: 2px outset rgba(182, 213, 223, 0.233);display: flex;
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
<van-button type="primary" size="mini"  @click="DetailBtn(Temp.examNo,Temp.examTaskId)">详情</van-button>
<van-button type="success" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="AgreeBtn(Temp.examNo,Temp.examId)">同意</van-button>
<van-button type="danger" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="RejectBtn(Temp.examNo,Temp.examId)">驳回</van-button>
        </div>
      </div>

    </div>

  </van-list>
    <van-back-top target=".ProductContainer"  bottom="16vh" />


  </div>

      </van-tab>
      <van-tab title="驳回">
        <div v-if="IsShowNoData" style="margin-top: 20px; color: rgb(100, 93, 93);text-align: center;">
    暂无数据信息
  </div>

  <div v-if="!IsShowNoData" class="ProductContainer" style="display: flex;flex-direction: column;
  align-items:center;width: 100%;">
<van-list
style="border:0px solid blue;width: 100%;display: flex;flex-direction: column;
  align-items:center;width: 100%;" ref='listRef' 

v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check="checkLoad"
>


    <div v-for="Temp in DataEntityState.DataList" :key="Temp.examId" style="width: 94%;height: 128px;border: 2px outset rgba(182, 213, 223, 0.233);display: flex;
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
<van-button type="primary" size="mini"  @click="DetailBtn(Temp.examNo,Temp.examTaskId)">详情</van-button>
<van-button type="success" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="AgreeBtn(Temp.examNo,Temp.examId)">同意</van-button>
<van-button type="danger" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="RejectBtn(Temp.examNo,Temp.examId)">驳回</van-button>
        </div>
      </div>

    </div>

  </van-list>
    <van-back-top target=".ProductContainer"  bottom="16vh" />


  </div>
</van-tab>
      <van-tab title="通过">
        <div v-if="IsShowNoData" style="margin-top: 20px; color: rgb(100, 93, 93);text-align: center;">
    暂无数据信息
  </div>

  <div v-if="!IsShowNoData" class="ProductContainer" style="display: flex;flex-direction: column;
  align-items:center;width: 100%;">

<van-list
style="border:0px solid blue;width: 100%;display: flex;flex-direction: column;
  align-items:center;width: 100%;" ref='listRef' 

v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check="checkLoad"
>


    <div v-for="Temp in DataEntityState.DataList" :key="Temp.examId" style="width: 94%;border: 2px outset rgba(182, 213, 223, 0.233);display: flex;
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
<van-button type="primary" size="mini"  @click="DetailBtn(Temp.examNo,Temp.examTaskId)">详情</van-button>
<van-button type="success" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="AgreeBtn(Temp.examNo,Temp.examId)">同意</van-button>
<van-button type="danger" size="mini" :disabled="Temp.examResult == '通过'||Temp.examResult == '驳回'" @click="RejectBtn(Temp.examNo,Temp.examId)">驳回</van-button>
        </div>
      </div>

    </div>
  </van-list>
    <van-back-top target=".ProductContainer"  bottom="16vh" />


  </div>
</van-tab>

    </van-tabs>
    

  <!-- </div> -->


</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";

import { useStore } from "vuex";
import NavBar from "@/components/NavBar.vue";




import {  GetExaminationDatas } from "@/Request/ExaminationRequest";
import {
  ExaminationEntity,
  ExaminationTaskColumns,
} from "@/TypeInterface/IExaminationInterface";
import { SetExaminationResult } from "@/Request/ExaminationRequest";
import {  showSuccessToast ,showFailToast,showConfirmDialog ,showToast} from "vant";




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
    let IsShowLoading = ref(true);
    let IsShowNoData = ref(false);
    let ProductActive = ref(0);
    let productsList = ref<any[]>([]);
    let collectImg = ref(require("../../../assets/images/collect.png"));
    const DataEntityState = reactive(new ExaminationEntity());
    const pageSize = ref(10);
    const current1 = ref(1);
    const totalCount = ref(0);
    const loading = ref(false);
    const checkLoad = ref(false);
    
    const listRef = ref<any>();
    const list = ref([]);

    const finished = ref(false);
    const currentNum = ref(2);
    const onLoad = async() => {
      // 异步更新数据
      loading.value = true;
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
     console.log("onLoad",ProductActive.value);
  
   

      let condition="";


if(ProductActive.value==0)
{  
  condition=""
}
if(ProductActive.value==1)
{
  condition="未审批"
}

if(ProductActive.value==2)
{
  condition="驳回"
}

if(ProductActive.value==3)
{
  condition="通过"
}



      let UserDatasList = await  GetExaminationDatas({
        current: currentNum.value,
        pageSize: 5,
        ...DataEntityState.QueryConditionInfo,
      });
             

      console.log("currentNum.value", currentNum.value);
      if (UserDatasList.isSuccess) {
        if(condition=="")
        {
          DataEntityState.DataList.push(...UserDatasList.datas);
          totalCount.value = UserDatasList.datas.length;
          console.log("totalCount.value", totalCount.value);
        }else{
          let w= UserDatasList.datas.filter((i:any)=>i.examResult==condition);;
          totalCount.value = w.length;
          DataEntityState.DataList.push(...w);
        }
    
       
        current1.value = 1;
        if(totalCount.value>0)
      {
        finished.value=false;
        loading.value = false;
        currentNum.value++;
      }else
      { loading.value = false;
        finished.value=true;
      }
      }
      if (DataEntityState.DataList.length > 0) {
        IsShowNoData.value = false;
      }
      else {
        IsShowNoData.value = true;

      }









  
    };
















    onMounted( async() => {
      IsShowNoData.value = false;
      let SC_Type = route.query.SC_Type;
     
      currentNum.value=2;



      let UserDatasList = await  GetExaminationDatas({
        current: 1,
        pageSize: 5,
        ...DataEntityState.QueryConditionInfo,
      });


    
      if (UserDatasList.isSuccess) {
        DataEntityState.DataList = UserDatasList.datas;
        totalCount.value = DataEntityState.DataList.length;
        current1.value = 1;
      
      }
      if (totalCount.value > 0) {
        IsShowNoData.value = false;
      }
      else {
        IsShowNoData.value = true;

      }













    });















    const onClickTab = async () => {
      finished.value=false;
let condition="";
currentNum.value=2;
DataEntityState.DataList=[];
if(ProductActive.value==0)
{  
  condition=""
}
if(ProductActive.value==1)
{
  condition="未审批"
}

if(ProductActive.value==2)
{
  condition="驳回"
}

if(ProductActive.value==3)
{
  condition="通过"
}



      let UserDatasList = await  GetExaminationDatas({
        current: 1,
        pageSize: 5,
        ...DataEntityState.QueryConditionInfo,
      });
             

      console.log("amount", UserDatasList);
      if (UserDatasList.isSuccess) {
        if(condition=="")
        {
          DataEntityState.DataList = UserDatasList.datas;
        }else{
          DataEntityState.DataList = UserDatasList.datas.filter((i:any)=>i.examResult==condition);;
        }
    
        totalCount.value = DataEntityState.DataList.length;
        current1.value = 1;
      
      }
      if (totalCount.value > 0) {
        IsShowNoData.value = false;
      }
      else {
        IsShowNoData.value = true;

      }

    };



    const onRefresh = async() => {

      let condition="";

DataEntityState.DataList=[];
if(ProductActive.value==0)
{
  condition=""
}
if(ProductActive.value==1)
{
  condition="未审批"
}

if(ProductActive.value==2)
{
  condition="驳回"
}

if(ProductActive.value==3)
{
  condition="通过"
}



      let UserDatasList = await  GetExaminationDatas({
        current: 1,
        pageSize: 10000000,
        ...DataEntityState.QueryConditionInfo,
      });
             

      console.log("amount", UserDatasList);
      if (UserDatasList.isSuccess) {
        if(condition=="")
        {
          DataEntityState.DataList = UserDatasList.datas;
        }else{
          DataEntityState.DataList = UserDatasList.datas.filter((i:any)=>i.examResult==condition);;
        }
    
        totalCount.value = DataEntityState.DataList.length;
        current1.value = 1;
      
      }
      if (totalCount.value > 0) {
        IsShowNoData.value = false;
      }
      else {
        IsShowNoData.value = true;

      }



      setTimeout(() => {
        showToast('刷新成功');
        loading.value = false;
      
      }, 1000);
    }






    let collectProduct = (id:any) => {
      // getProductById(id).then((res) => {
      //   let result = res.productData.data[0];
      //   let Title = result.title;
      //   let Price = result.price;
      //   let cover_url = result.cover_url;
      //   let ProductId = result.id;
      //   let params = { Title, Price, cover_url, ProductId };
      //   store.dispatch("addCollect", { content: params });
      //   Toast.success("收藏成功");
      // });
    };
    let GoToProductDetail = (Id:any) => {
      router.push({ path: `/Home_App/ProductDetail/${Id}` });
    };

    let SearchBtn = async() => {
      let txt = searchData.value;
console.log("SearchBtn",txt);
      if (txt == "") {
        return;
      }

      let condition="";

DataEntityState.DataList=[];
if(ProductActive.value==0)
{
  condition=""
}
if(ProductActive.value==1)
{
  condition="未审批"
}

if(ProductActive.value==2)
{
  condition="驳回"
}

if(ProductActive.value==3)
{
  condition="通过"
}



      let UserDatasList = await  GetExaminationDatas({
        current: 1,
        pageSize: 10000000,
        ...DataEntityState.QueryConditionInfo,
      });
             

    
      if (UserDatasList.isSuccess) {
        if(condition=="")
        {
          DataEntityState.DataList = UserDatasList.datas.filter((i:any)=>i.examName.indexOf(txt)>-1);;
        }else{
          console.log("SearchBtn", UserDatasList.DataList);
          DataEntityState.DataList = UserDatasList.datas.filter((i:any)=>i.examResult==condition&&i.examName.indexOf(txt)>-1);;
        }
        console.log("SearchBtn", DataEntityState.DataList);
        totalCount.value = DataEntityState.DataList.length;
        current1.value = 1;
        searchData.value="";
      }
      if (totalCount.value > 0) {
        IsShowNoData.value = false;
      }
      else {
        IsShowNoData.value = true;

      }




    // router.push({ path: "/SearchProduct", query: { PName: txt } });
    };


    let DetailBtn=(examNo:string,examId:string)=>{
      router.push({ path: `/Home_App/AduitDetail/${examId}` });
      // router.push({ path: "/Home/ExaminationTaskDetail", query: { Id: item,Type:"Examination" } });
    }

    async function refreshList (){
      let condition="";

DataEntityState.DataList=[];
if(ProductActive.value==0)
{
  condition=""
}
if(ProductActive.value==1)
{
  condition="未审批"
}

if(ProductActive.value==2)
{
  condition="驳回"
}

if(ProductActive.value==3)
{
  condition="通过"
}



      let UserDatasList = await  GetExaminationDatas({
        current: 1,
        pageSize: 10000000,
        ...DataEntityState.QueryConditionInfo,
      });
             

      console.log("amount", UserDatasList);
      if (UserDatasList.isSuccess) {
        if(condition=="")
        {
          DataEntityState.DataList = UserDatasList.datas;
        }else{
          DataEntityState.DataList = UserDatasList.datas.filter((i:any)=>i.examResult==condition);;
        }
    
        totalCount.value = DataEntityState.DataList.length;
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







    return {
      searchData,onLoad,finished,listRef,checkLoad,
      NavHideRight,
      NavHideLeft,
      IsShowLoading,
      IsShowNoData,
      ProductActive,
      productsList,
      collectImg,
      collectProduct,
      GoToProductDetail,
      SearchBtn,DataEntityState,onClickTab,DetailBtn,onRefresh,loading,AgreeBtn,RejectBtn
    };
  },
};
</script>

<style>
.ProductContainer {
  width: 100%;
  height: calc(100vh - 150px) !important;
  overflow-y: auto; 
  display: flex;
  flex-direction: row;
  border: 0px solid red;
  margin-top: 4px;
}
.ProductTap {
  width: 100%;  height: calc(100vh - 100px) !important;  border: 0px solid red;
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