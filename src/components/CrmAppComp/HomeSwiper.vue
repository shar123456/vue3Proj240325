<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item class="swipe" v-for="item in banners" :key="item.id">                                             
        <!-- <img v-lazy="item.img_url" alt="" srcset="" /> -->
          <img v-lazy="((item.img_url).indexOf('http')>-1||(item.img_url).indexOf('https')>-1)?item.img_url:require('@/assets/images/' + item.img_url)" alt="" srcset="" /> 
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    return {};
  },
};
</script>

<style  scoped>
.my-swipe {
  width: 100%;
  height:200px;
  border:0px solid red 
}
.swipe img {
  width: 100%!important;
  height:100%!important;
}
img[lazy="loading"] {
  width: 100%;
  height: 100%;
}
</style>