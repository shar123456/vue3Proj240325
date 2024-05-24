<template>
<div style="border: 0px solid red;margin-top: -24px;">
  <a-collapse v-model:activeKey="activeKey" style="border:0">
    <a-collapse-panel key="1" header="" style="border:0">

      <div class="userListPad_Crm" style="width: 100%;">
        <div class="upPad_Crm"  style="width: 100%;">
          <div class="upPad-up_Crm"  >

            <a-row style="width: 100%;border:0px solid red;">
              <a-col style="border:0px solid red;margin-left:5px;line-height:40px;"
                v-for="(index, item) in QueryConditionInfo" :key="item" class="col" :xs="{ span: 23 }" :lg="{ span: 7 }">
                <a-row>
                  <a-col span="8" style="border:0px solid red;width: 100%;display:flex;align-items: center;">
                    <label>{{ QueryConditionInfoConfig[item].name }}：</label></a-col>
                  <a-col v-if="QueryConditionInfoConfig[item].type == 'text'" span="16">
                    <div>

                  <a-input v-model:value="QueryConditionInfo[item]"
                        :placeholder="QueryConditionInfoConfig[item].name" /> 


                    </div>
                  </a-col>
                  <a-col v-if="QueryConditionInfoConfig[item].type == 'select'" span="17">
                    <div style="border:0px solid red">
                      <a-select ref="select" v-model:value="QueryConditionInfo[item]" style="width: 100%;">

                        <a-select-option v-for="ioption in QueryConditionInfoConfig[item].optionValueArray"
                          :key="ioption" :value="ioption">{{ ioption }}</a-select-option>

                      </a-select>
                    </div>
                  </a-col>
                </a-row>

              </a-col>
            </a-row>




          </div>
        </div>
        <div class="centerPad_Crm"></div>
        <div class="downPad_Crm">

          <a-row>
            <a-col style="border:0px solid red;line-height:0px;" class="col" :xs="{ span: 23 }" :lg="{ span: 10 }">
              <div>&nbsp;

              </div>
            </a-col>
            <a-col style="line-height:40px;" class="col" :xs="{ span: 23 }" :lg="{ span: 14 }">
              <div
                style="border:0px solid red;display:flex;width:100%;justify-content:flex-end;align-items: center;flex-wrap: wrap;">
               
               
              
               
             
                <a-button type="primary" style="margin-left: 4px;margin-top: 4px;margin-right: 4px;"  @click="SearchBtn">
                  <template #icon>
                    <SearchOutlined />
                  </template>
                  搜索
                </a-button>
                <a-button type="primary"     style="margin-left: 4px;margin-top: 4px;background-color: goldenrod; border-color: goldenrod"  @click="ClearQueryBtn"><template #icon>
                    <clear-outlined />
                  </template>清空筛选</a-button>
               
              </div>
            </a-col>


          </a-row>
















        </div>
      </div>

    </a-collapse-panel>

  </a-collapse>


</div>



</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, ref, onMounted } from "vue";

import { LayoutOutlined,ProfileOutlined,SearchOutlined,PlusOutlined, 
  DeleteOutlined,BarChartOutlined,RedoOutlined,ClearOutlined,
  AppstoreAddOutlined,DownloadOutlined,CloudUploadOutlined,InteractionOutlined} from "@ant-design/icons-vue";
import { dateFormat } from '../utility/commonFunc'
export default defineComponent({
  components: {
        SearchOutlined,PlusOutlined,DeleteOutlined,BarChartOutlined,RedoOutlined,
    ClearOutlined,AppstoreAddOutlined,DownloadOutlined,CloudUploadOutlined,ProfileOutlined,LayoutOutlined,InteractionOutlined
    
  },

  setup(props, context) {

    const activeKey = ref(['1']);

    
  



    const QueryConditionInfo:any=ref({
           
           productName: "",
           productCode: "",
       
          
         
         })
         const  QueryConditionInfoConfig:any=ref({
           productName:{
             name:"产品名称",
             type:"text"
           },
           productCode:{
             name:"产品代码",
             type:"text"
           },
          
          
         })







    onMounted(()=>{

});





    const SearchBtn = () => {


      context.emit("SearchBtn", { ...QueryConditionInfo.value });
    };

    const ClearQueryBtn = () => {



      for (let item in QueryConditionInfo.value) {
        if (QueryConditionInfoConfig.value[item].type == "text") {
          QueryConditionInfo.value[item] = "";
        }
        if (QueryConditionInfoConfig.value[item].type == "select") {
          QueryConditionInfo.value[item] = "未选择";
        }
      }


    };

    const batchDeleteBtn = () => {
      context.emit("BatchDelete");
    };
    const fileUploadBtn = () => {
      context.emit("fileUploadBtn");
    };


    const configGridBtn = () => {
      context.emit("ShowConfigGrid");
    };





    const refreshBtn = () => {
      ClearQueryBtn();
      context.emit("RefreshBtn");
    };


    const exportExcel = () => {

      context.emit("ExportExcel");

    };



    const CreateBtn = () => {

      context.emit("CreateBtn");
    }

    const importExcel = () => {

      context.emit("ImportExcel");
    }



   

 const configExport = () => {

 context.emit("ConfigExport");
    }




    const ClueShiftBtn = () => {

context.emit("ShowClueShiftBtn");
   }







    return {
      activeKey,
      //...toRefs(state),
      QueryConditionInfo, QueryConditionInfoConfig,
      SearchBtn,
      CreateBtn,
      ClearQueryBtn,
      exportExcel, batchDeleteBtn, refreshBtn, importExcel, configGridBtn, fileUploadBtn,configExport,ClueShiftBtn,
      
    };
  },
});
</script>

<style  scoped>
</style>