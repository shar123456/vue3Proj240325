<template>
  <van-nav-bar
    title="审批任务详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="productDetailContainer">
    <van-cell-group inset>
  <van-cell title="任务编号" :value="DataEntityState.EditData.examTaskNo" />
  <van-cell title="审批标题" :value="DataEntityState.EditData.examName" />
  <van-cell title="审批类型" :value="DataEntityState.EditData.examType" />
  <van-cell title="紧急程度" :value="DataEntityState.EditData.emergencyLevel" />

  <van-cell title="审批状态" :value="DataEntityState.EditData.examStatus" />
  <van-cell title="发起人" :value="DataEntityState.EditData.initiator" />
  <van-cell size="large" title-style="font-weight:900" title="流程进展"  />
</van-cell-group>

<van-steps direction="vertical" v-for="item,index in DataEntityState.EditData.examinationFlowDtoHelps"
 :active="item.examResult!='未审批'?0:1"  :active-color="item.examResult=='通过'?'#07c160':'#dd4b39'">
  <van-step>
    <h3>【{{index+1}}】审批人：{{item.title}}</h3>
    <p>手机号：{{ item.content }}</p>
    <p>审批状态：{{ item.examResult }}</p>
    <p>审批时间：{{ item.examResultTimeStr }}</p>
  </van-step>
  
</van-steps>

<van-cell-group inset>
 
  <van-cell v-if="DataEntityState.EditData.examStatus=='已完成'&&(DataEntityState.EditData.examinationFlowDtoHelps.filter((i:any)=>i.examResult!='未审批'))?.length==DataEntityState.EditData.examinationFlowDtoHelps?.length" size="large" title-style="font-weight:900" title="审批结果"  />
</van-cell-group>
<div v-if="DataEntityState.EditData.examStatus=='已完成'&&(DataEntityState.EditData.examinationFlowDtoHelps.filter((i:any)=>i.examResult=='通过'))?.length==DataEntityState.EditData.examinationFlowDtoHelps?.length" class="PassTaskMark">
    <img :src="passpic" alt="" srcset="" />
  </div>
<div v-if="DataEntityState.EditData.examStatus=='已完成'&&DataEntityState.EditData.examinationFlowDtoHelps.filter((i:any)=>i.examResult=='驳回')?.length>0" class="PassTaskMark">
    <img :src="nopasspic" alt="" srcset="" />
  </div>
<van-cell-group inset>
  <van-cell title="状态" :value="DataEntityState.EditData.useStatus" />
  <van-cell title="流程编号" :value="DataEntityState.EditData.flowNo" />
  <van-cell title="通知类型" :value="DataEntityState.EditData.noticeType" />
  <van-cell title="创建时间" :value="DataEntityState.EditData.createTimeStr" />
  <van-cell title="内容描述" value="内容" :label="DataEntityState.EditData.taskDesc" />
  <!-- <van-cell title="开始时间" :value="DataEntityState.EditData.startTimeStr" /> -->
  <!-- <van-cell title="结束时间" :value="DataEntityState.EditData.endTimeStr" />
  <van-cell title="内容描述" value="内容" :label="DataEntityState.EditData.taskDesc" /> -->
</van-cell-group>
<van-divider>结尾</van-divider>
  </div>
  <van-back-top target=".productDetailContainer"  bottom="16vh" />




</template>

<script lang="ts">
import { onMounted,ref,reactive,toRefs} from "vue";
import { GetExaminationTaskById } from "@/Request/ExaminationRequest";
 import {
ExaminationTaskEntity
} from "@/TypeInterface/IExaminationInterface";
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
      let products = reactive<any>({
      detail: {},
      like_products: [],
      comments: [],
    });


    let passpic = ref(require("../../../assets/passe.png"));
    let nopasspic = ref(require("../../../assets/nopasse.png"));


    let DataEntityState = reactive(new ExaminationTaskEntity());
    onMounted(() => {
      // getProductDetailById(props.Id).then((res) => {
      //     srcImg.value=res.productData.data[0].cover_url;
      //    (srcImg).value= (srcImg).value.indexOf('http')>-1?srcImg.value:require('../../' + srcImg.value)
      //    products.detail=res.productData.data[0];
     
      // });


     
let i:any=router.currentRoute.value.params.Id;
console.log(i);

  
GetExaminationTaskById({ Id: i }).then((res: any) => {
                  if (res.isSuccess) {
                   
                 DataEntityState.EditData=res.datas;

             console.log("aduitDetail",DataEntityState.EditData);
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
    let collectProduct = (id:any) => {
      // getProductById(id).then((res) => {
      //   let result = res.productData.data[0];
      //   let Title = result.title;
      //   let Price = result.price;
      //   let cover_url = result.cover_url;
      //  let ProductId = result.id;
      //  let params={Title,Price,cover_url,ProductId}
      //    store.dispatch("addCollect",{content:params});
      //    showSuccessToast('收藏成功');
      // });

   


    };
    //添加购物车
    const handleAddCart = () => {
     
        store.dispatch("AddCart", {
          id: products.detail.id,
          num: 1,
          IsCheck: true,
          goods: products.detail,
        }); 
        showSuccessToast("添加成功");
           
    };

  const goToCart = () => {
    
        var result = store.dispatch("AddCart", {
          id: products.detail.id,
          num: 1,
          IsCheck: true,
          goods: products.detail,
        });
        result.then((res) => {
          if (res) {
            showSuccessToast("添加成功,显示购物车");

            router.push({ path: "/ShopCart" });
          }
        });
      
    };


    return { ProductDetailActive,onClickLeft,srcImg ,...toRefs(products),htmlDesc,
      collectProduct,handleAddCart,goToCart,DataEntityState,passpic,nopasspic};
  },
};
</script>

<style >
.productDetailContainer{
    border:0px solid red;
    width:100%;
    height: calc(100vh - 100px);
 

     overflow-y:auto; 
}
.productDetailContainer .TagInfo
{
    width:100%;
    height:40px;
    background-color: rgba(168, 166, 166, 0.301);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:9px;
    font-weight: 700;
    font-size: 13px;;
}
.ProductDetailContent{
    display: flex;
    flex-direction: column;
    padding:5px;
   
}
.ProductDetailContent p{
    border:0px solid red !important;
    text-align:left;
    letter-spacing: 1px;;
    text-indent: 20px;
    margin-top:5px;
   font-weight: 500;
    font-size: 15px;;
    line-height: 20px;
  
}

.productDetailContainer .van-card__title {
  font-weight: 900;
  color: #333;
  font-size: 14px;
  padding-top: 5px;
  padding-bottom: 5px;
 
}
.van-card__footer{
  position: relative;
 
}
.TagCollect{
position: absolute;
left:3px;
bottom:3px



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