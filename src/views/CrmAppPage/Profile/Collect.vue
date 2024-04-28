<template>
  <div class="collectTitleBar">
    <van-nav-bar
      title="收藏"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="">
    <ProductList :productArray="collectInfo" />
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";
import ProductList from "@/components/CrmAppComp/ProductList.vue";
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
export default {
  components: { ProductList },
  setup() {
    let NavHideRight = ref(true);
    let NavHideLeft = ref(false);
    let router = useRouter();
      const store = useStore();
    let collectInfo = ref([]);
    onMounted(() => {

      let result=  store.dispatch("GetCollectList");
      result.then((res)=>{
collectInfo.value=res;
      })
          
    });
    function onClickLeft() {
      router.go(-1);
    }
    return { NavHideRight, NavHideLeft, onClickLeft, collectInfo };
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
</style>