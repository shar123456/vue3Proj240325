<template>
    <div class="detailMain">
 <div class="level level_1">
{{datas[0].name}}
 </div>
  <div class="level level_2">
    <div class="level_2_up">
  <div>
线索来源
  </div>
   <div>
    手机号
  </div>
   <div>
    负责人
  </div>
   <div>
    创建时间
  </div>
    </div>
    <div class="level_2_down">
    <div >
{{datas[0].clueOrigin}}
  </div>
   <div>
 {{datas[0].mobilePhone}}
  </div>
   <div>
    暂无
  </div>
   <div>
     {{datas[0].createTimeStr}}
  </div>
    </div>
 </div>
  <div class="level level_3">

 </div>
  <div class="level level_4">

 </div>
    </div>
</template>

<script lang="ts">

import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  watch,
  createVNode,
} from "vue";
export default defineComponent({
   props: { DetailDatas:Object},

     setup (props) {
      
  onMounted( () => {



  })
  const datas =ref<any>(props.DetailDatas);
 watch(
      () => props.DetailDatas,
      (newValue) => {
           
     
          console.log("newValue",newValue);
           
      }
    );


return {datas}
     }
})
</script>

<style scoped>
.detailMain{
    border: 0px outset #94a7ba33;width: 99%;height: 99%;
    display: flex;
    flex-direction: column;
  justify-content:flex-start;
    align-items: center;
}
.level{
    width:99%;border:0px solid red
}
.level_1{
    height:3rem; display: flex; justify-content:flex-start;font-size: 1.22rem;font-weight: 900;color: rgb(63, 96, 146);
    align-items: center;
}
.level_2{
    height:5rem;background-color: #dfdfdf71; display: flex;
    flex-direction: column;
  justify-content:center;
    align-items: center;
}
.level_2 div{
border:0px solid red;width: 100%;height: 100%;display: flex;
  justify-content:space-around;
    align-items: center;
}
.level_2 div div{
    height: 100%;width:24%;display: flex;
  justify-content:flex-start;
    align-items: center;
}
.level_2_down div{
 font-size: 0.9rem;font-weight: 900;color: rgb(101, 95, 95);
}
.level_3{
    height:10rem;
}
.level_4{
    height:calc(99% - 18rem)
}
</style>