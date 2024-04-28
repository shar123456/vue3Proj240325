<template>

    <div class="collectContainer" v-if="productArray.length>0">
 
           
    <ProductListItem   v-for="(item,index) in productArray" :key="index" :products="item"
    @click="GoToProductDetail(item.ProductId)"
     />

  </div>
  <div v-else style="margin-top:20px;color:rgb(100, 93, 93);text-align: center;"> 暂无收藏信息</div>
</template>

<script>
import ProductListItem from "./ProductListItem.vue"
import {useRouter}  from "vue-router"
export default {
    components:{ProductListItem},
     props:{
        productArray:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    setup () {
        let router =useRouter();
        let GoToProductDetail = (Id) => {
    //   router.push({ path: `/ProductDetail/${Id}` });
      router.push({ path: `/Home_App/ProductDetail/${Id}` });
    };

        return {GoToProductDetail}
    }
}
</script>

<style  scoped>
.collectContainer{
    width:100%;
    border:0px solid red;
    height:calc(100vh - 100px);
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
  
    
}

</style>