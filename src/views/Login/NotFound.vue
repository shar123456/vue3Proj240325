<template>
  <div>Not Found Page

    <div
        style="
          width: 100%;
          height: 50px;
          border: 1px solid #dedede;
          display: flex;
          justify-content: space-around;
          align-items: center;
        "
      >
        <button @click="startRecognize">扫一扫</button>
        <span> 扫描结：{{ sacnResult }} </span>
      </div>

      <div id="bcid" :style="{ zIndex: zIndex }">

            

      </div>
                   <a-button
                   style="margin-left:3px;margin-right:3px"
                    type="primary"
                   
                    size="large"
                   @click="startRecognize"
                  >
                   sacn
                  </a-button>

  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs, watch, computed } from "vue";
export default {

  setup() {

    const state = reactive({
      count: 0,
      text: "",
      codeUrl: "",
      scan: "",
      zIndex: -1,
      longitude: "***",
      latitude: "***",
      sacnResult: "***",
      scanDiv:"none"
    });


    function startRecognize() {
      state.zIndex = 9999;
      console.log(1);
      if (!window.plus) {
        return;
      }
      console.log(2);
      // 初始化扫描控件
      state.scan = new plus.barcode.Barcode("bcid");
      state.scan.onmarked = onmarked;
      // 调用开始扫描
      startScan();
      // 扫描后回调
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        state.codeUrl = result;
        state.sacnResult = result;
        // 返回值
        //Toast(result);
        state.zIndex = -1;
        closeScan();
      }
    }
    //开始扫描
    function startScan() {
      if (!window.plus) return;
      state.scan.start();
      state.scanDiv="";
    }
    //关闭扫描
    function cancelScan() {
      if (!window.plus) return;
      state.zIndex = -1;
      state.scan.cancel();
    }
    //关闭条码识别控件
    function closeScan() {
      if (!window.plus) return;
       state.zIndex = -1;
      state.scan.close();
       state.scanDiv="none";
    }
 
 
    return {startRecognize};
 
  }

 

}
</script>

<style>

</style>