<template>
  <van-nav-bar
    title="产品详情"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="productDetailContainer">
       <!-- <div  v-if="!detail.cover_url_video" > <van-image -->
        <div  > <van-image
        style="margin:0;border:0px solid red"
        width="100%"
        height="310px"
        lazy-load
        :src="srcImg"
      /></div>
 <!-- <video  v-else  style="margin:0;border:0px solid red;width:100%;height:310px;background-color:#dedede"
  :src="detail.cover_url_video" autoplay controls="controls"></video> -->
      <div class="TagInfo"  style="margin-top:-5px">
          <span>信誉第一</span>
          <span>质量至上</span>
          <span>服务一流</span>
      </div>
 <van-card
        style="text-align: left;margin-top:0px;border:0px solid red"
     
        :price="detail.unitPrice"
        :desc="detail.description"
        :title="detail.productName" 
        origin-price="2130.00"
      >
        <template #tags>
          <van-tag plain type="danger">热销</van-tag>
          <van-tag plain type="danger">推荐</van-tag>
        </template>
        <template #num>
              <!-- <van-icon
                @click.stop="collectProduct(item.id)"
                :name="collectImg"
              /> -->

              <van-tag class="TagCollect" @click.stop="collectProduct(detail.id)" plain type="primary">收藏</van-tag>
            </template>
        <!-- <template #footer>
          
          <van-button type="warning" @click="collectProduct(detail.id)">收藏</van-button>
      
        </template> -->





      </van-card>
      <van-divider>基本信息</van-divider>
      <van-cell-group inset>

  <van-cell title="制造厂" :value="detail.manufactory" />
  <van-cell title="供应商名" :value="detail.vendorName" />
  <van-cell title="供应商编号" :value="detail.vendorID" />
  <van-cell title="产品代码" :value="detail.productCode" />
  <van-cell title="产品类别" :value="detail.productCategory" />

  <van-cell title="体积" :value="detail.volume" />
  <van-cell title="体积单位" :value="detail.volumeSize" />
  <van-cell title="重量" :value="detail.weight" />
  <van-cell title="重量单位" :value="detail.weightUnit" />
  <van-cell title="毛重" :value="detail.grossWeight" />
  <van-cell title="净重" :value="detail.netWeight" />

  <van-cell title="创建时间" :value="detail.createTimeStr" />
  
      </van-cell-group>


     <div style="min-height:100px">
 <van-tabs v-model="ProductDetailActive">
        <van-tab title="概述">
          <div class="ProductDetailContent" v-html="detail.description"></div>
        </van-tab>
        <van-tab title="热评">
          <div style="padding-top:10px;color:rgb(109, 96, 96)">
             暂无评论.
          </div>
        </van-tab>
        <van-tab title="相关产品">
          <div style="padding-top:10px;color:rgb(109, 96, 96)">
             暂无推荐产品.
          </div>
        </van-tab>
      </van-tabs>

     </div>
     
  </div>

</template>

<script lang="ts">
import { onMounted,ref,reactive,toRefs} from "vue";
import { GetProductManagementDatas,GetProductById } from "@/Request/CrmRequest/ProductManagementRequest";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showSuccessToast  } from 'vant';
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
    });htmlDesc.value=` <p>BRESSER Researcher Trino 显微镜，放大范围为 40x1000x，基于4个镜头和一对（可更换）目镜，显著的微镜。 </p>
<p>这款高品质半光显微镜配有可调光的 LED 照明，可调节*距离和一个 360° 旋转的三目筒，用于连接微摄像头。</p>
<p>通过带有Nonius刻度的同轴十字桌，可以精确对齐对象，并用于粗和细驱动。 此外，镜片可防止损坏。</p>
<p>规格：280x175x360 mm / 重量：3.8 kg / 电源接口</p>
<p>供货范围：三目镜显微镜；1 对 DIN 观光镜；WF 10x 直径23毫米；4 倍镜头转向器；4 个 DIN 
镜头：4x/0.1，10x/0.25，40x/0.65, 100x/1.25 油；避风圈传感器；</p>
`; 
    onMounted(() => {

      let i:any=router.currentRoute.value.params.Id;
      console.log("i",i);
      GetProductById({ Id: i}).then((res: any) => {
        //   srcImg.value=res.productData.data[0].cover_url;
        //  (srcImg).value= (srcImg).value.indexOf('http')>-1?srcImg.value:require('../../' + srcImg.value)
        srcImg.value=require("../../../assets/images/default8.jpg")
        products.detail=res.datas;
     
      });

     



    });
    let onClickLeft = () => {
      router.go(-1);
    };
    let collectProduct = (id:any) => {
      console.log("GetProductById", id);

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
   
    return { ProductDetailActive,onClickLeft,srcImg ,...toRefs(products),htmlDesc,collectProduct};
  },
};
</script>

<style scoped>
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
.ProductDetailContent {
    border:0px solid red !important;
    text-align:left;
    letter-spacing: 1px;;
    text-indent: 20px;
    margin-top:5px;
   font-weight: 500;
    font-size: 15px;;
    line-height: 20px;color: #969799;
  
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


</style>