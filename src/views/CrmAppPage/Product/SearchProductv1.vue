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
  :finished-text="finishedDesc"
  @load="onLoad"
  :immediate-check="checkLoad"
>

<van-card style="border: 0px solid red;width: 100%;"
            v-for="item in DataEntityState.DataList"
            :key="item.id"
            :tag="(parseFloat(item.unitPrice.toFixed(3))) > 1000 ? '新品' : ''"
            :price="item.unitPrice"
            :desc="item.description"
            :title="item.productName"
            :thumb="
              
              require('../../../assets/images/' + 'default8.jpg')
            "
            origin-price="2130.00"
            @click="GoToProductDetail(item.id)"
          >
            <template #tags>
              <van-tag plain type="danger">打折</van-tag>
              <van-tag plain type="danger">热销</van-tag>
            </template>
            <template #num>
              <!-- <van-icon
                @click.stop="collectProduct(item.id)"
                :name="collectImg"
              /> -->

              <van-tag class="TagCollect" @click.stop="collectProduct(item.id)" plain type="primary">收藏</van-tag>
            </template>
          </van-card>


  </van-list>


    <van-back-top target=".ProductContainer"  bottom="16vh" />




  </div>




  
</van-tab>

<van-tab title="库存">     
</van-tab>
<van-tab title="销量">     
</van-tab>
<van-tab title="价格">     
</van-tab>

    </van-tabs>
    

  <!-- </div> -->


</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";

import { useStore } from "vuex";
import NavBar from "@/components/NavBar.vue";





import {
  ProductEntity,

} from "@/TypeInterface/ICrm/IProductManagement";
import { GetProductManagementDatas,GetProductById } from "@/Request/CrmRequest/ProductManagementRequest";
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
    const DataEntityState = reactive(new ProductEntity());
    const pageSize = ref(10);
    const current1 = ref(1);
    const totalCount = ref(0);
    const loading = ref(false);
    const checkLoad = ref(false);
    
    const listRef = ref<any>();
    const list = ref([]);
    let finishedDesc = ref("没有更多了");
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



      let UserDatasList = await  GetProductManagementDatas({
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
        finishedDesc.value=`没有更多了，共${ DataEntityState.DataList.length}笔`
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



      let UserDatasList = await  GetProductManagementDatas({
        current: 1,
        pageSize: 5,
        ...DataEntityState.QueryConditionInfo,
      });

console.log(UserDatasList.datas);
    
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



      let UserDatasList = await  GetProductManagementDatas({
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



      let UserDatasList = await  GetProductManagementDatas({
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
      GetProductById({ Id: id }).then((res: any) => {
        console.log("GetProductById", res);
        let result = res.datas;
        let Title = result.productName;
        let Price = result.unitPrice;
        // let cover_url = result.cover_url;
        let cover_url = "default8.jpg"
        let ProductId = result.id;
        let params = { Title, Price, cover_url, ProductId };
        store.dispatch("addCollect", { content: params });
        showSuccessToast("收藏成功");
      });
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



      let UserDatasList = await  GetProductManagementDatas({
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



      let UserDatasList = await  GetProductManagementDatas({
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
      SearchBtn,DataEntityState,onClickTab,DetailBtn,onRefresh,loading,finishedDesc
    };
  },
};
</script>

<style >
.ProductContainer {
  width: 100%;
  height: calc(100vh - 150px) !important;
  overflow-y: auto; 
  display: flex;
  flex-direction: row;
  border: 0px solid red;
  margin-top: 4px;

}

::-webkit-scrollbar {
  width: 1px;
}

.ProductTap {
  width: 100%;  height: calc(100vh - 100px) !important;  border: 0px solid red;
}


.ProductContainer .van-card__content {
  text-align: left;
  margin-left: 5px;
  justify-content: center;
}
.ProductContainer .van-card__title {
  font-weight: 900;
  color: #333;
font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px; 
}
.ProductContainer .van-card__bottom {
  text-align: right;
}
.van-card__title {
  background-color: rgba(238, 238, 238, 0);
}
.van-card__content {
  background-color: rgba(238, 238, 238, 0.12);
}
.van-card {
  background-color: rgba(238, 238, 238, 0);
}
.van-card__header {
  background-color: rgba(238, 238, 238, 0.01);
}
.van-card__price {
  color: red;}
.van-card__thumb {
  background-color: rgba(238, 238, 238, 0);
}
.van-tabs__content {
  margin-top: 10px;
}
.ProductContainer .van-icon__image {
  margin-left: 5px;
  margin-right: 5px;
  width: 18px;
  height: 18px;
}
.ProductContainer .van-card__bottom{
  text-align: left;
}











</style>