<template>
  <div style="border: 0px solid red; height: 45px">
    <nav-bar :NavHideRight="NavHideRight" :NavHideLeft="NavHideLeft">
      <template v-slot:default>
        <van-search
          input-align="center"
          v-model="searchData"
          @search="SearchBtn"
          placeholder="请输入搜索关键词"
        />
      </template>
      <template v-slot:Right></template>
    </nav-bar>
  </div>
  <div class="ProductContainer">
    <van-tabs class="ProductTap" v-model="ProductActive">
      <van-tab title="综合">
        <div
          v-if="IsShowLoading"
          style="margin-top: 20px; color: rgb(100, 93, 93)"
        >
          加载中...
        </div>
        <div
          v-if="IsShowNoData"
          style="margin-top: 20px; color: rgb(100, 93, 93)"
        >
          暂无数据信息
        </div>

        <div v-if="productsList.length > 0">
          <van-card
            v-for="item in productsList"
            :key="item.id"
            :tag="item.price > 1000 ? '新品' : ''"
            :price="item.price"
            :desc="item.description"
            :title="item.title"
            :thumb="
              item.cover_url.indexOf('http') > -1 ||
              item.cover_url.indexOf('https') > -1
                ? item.cover_url
                : require('../../../assets/images/' + item.cover_url)
            "
            origin-price="10.00"
            @click="GoToProductDetail(item.id)"
          >
            <template #tags>
              <van-tag plain type="danger">打折</van-tag>
              <van-tag plain type="danger">热销</van-tag>
            </template>
            <template #num>
              <van-icon
                @click.stop="collectProduct(item.id)"
                :name="collectImg"
              />
            </template>
          </van-card>
        </div>
      </van-tab>
      <van-tab title="价格">暂无数据信息</van-tab>
      <van-tab title="好评">暂无数据信息</van-tab>
      <van-tab title="销量">暂无数据信息</van-tab>
      <van-tab title="库存">暂无数据信息</van-tab>
      <van-tab title="收藏">暂无数据信息</van-tab>
      <van-tab title="月销量">暂无数据信息</van-tab>
      <van-tab title="年销量">暂无数据信息</van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";
import { showSuccessToast } from "vant";
import { useStore } from "vuex";
import NavBar from "@/components/NavBar.vue";
// import {
//   getProductBySC_Type,
//   getProductById,
// } from "@/assets/Network-Mock/CategoryInterface.js";
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
    let ProductActive = ref(2);
    let productsList = ref<any[]>([]);
    let collectImg = ref(require("../../../assets/images/collect.png"));
    onMounted(() => {
      IsShowNoData.value = false;
      let SC_Type = route.query.SC_Type;
      let GoodsList:any = [

{
    "id": 1,
    "title": "AmScope120X-1200X",
    "price": 1245,
    "stock": 62,
    "sales": 0,
    "type": "new",
    "collects_count": 0,
    "cover": "product/2020-0820-5f3e17d6ed7e8.png",
    "description": "精密美观 / 《使用手册》,附带软件，及系统光盘等资料",
    "cover_url": "1.jpg",
    "cover_url_video": "http://tbm-auth.alicdn.com/e99361edd833010b/rcAt2YS5XVTz0CZ8Cgu/GrqSjoim1eD9Yt4aImM_317896894548_mp4_264_hd.mp4?auth_key=1631005435-0-0-bfdf09d753ff7ebfd8c292493237e529",

    "category_id": 1,
    "SC_Type": "SC_00001",
    "overview": ""
},
{
    "id": 2,
    "title": "Bresser Erudit ICD 立体",
    "price": 3415,
    "stock": 23,
    "sales": 0,
    "type": "new",
    "collects_count": 0,
    "cover": "product/2020-0820-5f3e177b79824.png",
    "description": "云诊断 / 《远程连接》，精密美观 / 《使用手册》,附带软件，及系统光盘等资料",
    "cover_url": "http://img3.app17.com/products/big/20121122/201211220441014028.jpg",


    "category_id": 1,
    "SC_Type": "SC_00001"
},
{
    "id": 3,
    "title": "Cokin to3-ic120 m 电子显微镜",
    "price": 553,
    "stock": 1,
    "sales": 0,
    "type": "sales",
    "collects_count": 0,
    "cover": "product/2020-0820-5f3e177b79824.png",
    "description": "云诊断 / 《远程连接》，精密美观 / 《使用手册》,附带软件，及系统光盘等资料",
    "cover_url": "http://img3.cntrades.com/201209/28/13-44-32-17-479877.jpg.middle.jpg",
    "cover_url_video": "http://tbm-auth.alicdn.com/e99361edd833010b/wAizpkGZlaLz5WlLjdZ/WoVbJXM52gO2XsIplpO_302425907016_mp4_264_hd.mp4?auth_key=1630897444-0-0-933aef3d615307a90996e5357491e5c5",
    "category_id": 2,
    "SC_Type": "SC_00001"
},
{
    "id": 4,
    "title": "LCD 数码显微镜摄像机",
    "price": 9762,
    "stock": 452,
    "sales": 0,
    "type": "sales",
    "collects_count": 0,
    "cover": "product/2020-0820-5f3e177b79824.png",
    "description": "云计算 / 光学显微镜",
    "cover_url": "http://pic.baike.soso.com/p/20130617/20130617112751-541414650.jpg",
    "category_id": 2,
    "SC_Type": "SC_00002"
}


]


      // getProductBySC_Type(SC_Type).then((res) => {
      //   productsList.value = res.products.data;
      //   if (productsList.value.length > 0) {
      //     IsShowNoData.value = false;
      //   } else {
      //     IsShowNoData.value = true;
      //   }
      //   IsShowLoading.value = false;
      // });

      productsList.value=GoodsList; IsShowLoading.value = false;


    });
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

    let SearchBtn = () => {
      let txt = searchData.value;

      if (txt == "") {
        return;
      }
      router.push({ path: "/SearchProduct", query: { PName: txt } });
    };
    return {
      searchData,
      NavHideRight,
      NavHideLeft,
      IsShowLoading,
      IsShowNoData,
      ProductActive,
      productsList,
      collectImg,
      collectProduct,
      GoToProductDetail,
      SearchBtn,
    };
  },
};
</script>

<style scoped>
.ProductContainer {
  width: 100%;
  height: calc(100vh - 100px) !important;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  border: 0px solid red;
  margin-top: 4px;
}
.ProductTap {
  width: 100%;
}

.ProductContainer .van-card__content {
  text-align: left;
  margin-left: 5px;
  justify-content: center;
}
.ProductContainer .van-card__title {
  font-weight: 900;
  color: #333;
  font-size: 14px;
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
  background-color: rgba(238, 238, 238, 0.09);
}
.van-card {
  background-color: rgba(238, 238, 238, 0);
}
.van-card__header {
  background-color: rgba(238, 238, 238, 0.01);
}
.van-card__price {
  color: red;
}
.van-card__thumb {
  background-color: rgba(238, 238, 238, 0);
}
.van-tabs__content {
  margin-top: 10px;
}
.ProductContainer .van-icon__image {
  margin-left: 5px;
  margin-right: 5px;
  width: 15px;
  height: 15px;
}
</style>