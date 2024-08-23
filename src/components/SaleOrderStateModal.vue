<template>
    <div  id="ClueShiftModalT">
 <a-modal
    cancelText="关闭"
     okText="确认"
    
    wrapClassName="ClueShiftModal"
    v-model:visible="visibleConfigGrid"
    class="ClueShiftConfig"
    :title="titleConfigGrid"
    :ok-button-props="{ disabled: okButtonDisabled }"
    @Cancel="onCancel"
      @ok="handleOk"
      :maskClosable="maskClosable"
      :confirm-loading="confirmLoading"
  >
 <a-spin :spinning="spinning" tip="Loading...">
     <a-row style="border:0px solid red;background-color:#f7f7f7;">
         <a-col :span="7" class="configCol"> 订单状态： </a-col>
         <a-col :span="17" class="configCol">

             <a-radio-group v-model:value="radiovalue" name="radioGroup">
                 <a-radio value="未回款">未回款</a-radio>
                 <a-radio value="部分回款">部分回款</a-radio>
                 <a-radio value="已完成">已完成</a-radio>

             </a-radio-group>



         </a-col>
         <a-col :span="7" class="configCol"> 订单备注： </a-col>
         <a-col :span="17" class="configCol">
             <a-input    v-model:value="radioRemark"
                      placeholder="请输入备注" />
           



         </a-col>
     </a-row>


    
    </a-spin>
  
  </a-modal>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs,ref,onMounted,watch } from 'vue'
import { UserDataEntity,IUserInfo } from "../TypeInterface/IUserInterface";
import { message} from "ant-design-vue";
import {
        SetSaleOrderState
 
    } from "../Request/CrmRequest/SaleOrderManagementRequest";

import { InboxOutlined } from '@ant-design/icons-vue';
import { string } from 'vue-types';



export default defineComponent({
      props: { Data:Object,SelectkeysData:Object,
       visibleModelConfigGrid:Boolean,modalTitleConfigGrid: String,configType:String},
       components: {
    InboxOutlined,
  },
    setup (props,context) {

       

      

      let noticeTypeArray=ref<any>([]);

      noticeTypeArray.value=["","",""]
        const state = reactive({
            count: 0,spinning :false,
            confirmLoading:false,
            maskClosable:false,
            IsCustomerDisabled:false,

          
            IsContactDisabled:false,
            IsBuinessDisabled:false,
            okButtonDisabled: false
            
        })
          let visibleConfigGrid = ref<boolean>(props.visibleModelConfigGrid);
          let titleConfigGrid = ref<string|undefined>(props.modalTitleConfigGrid);
           let LData=ref<any>(props.Data);
            let LSelectkeysData=ref<any>(props.SelectkeysData);

        const radiovalue = ref<string>(LData.value.saleOrderState);
        let radioRemark = ref<string>(LData.value.remark);
        


 let configType = ref<string|undefined>(props.configType);
const handleOk = (e: MouseEvent) => {
    
  
    SetSaleOrderState({ Id: LData.value.id, OrderState: radiovalue.value, Remark:radioRemark.value }).then((res: any) => {
            if (res.isSuccess) {
              state.confirmLoading = false;
            state.spinning== false;

            context.emit("CloseConfigGridMoadl");
            message.success("订单状态设置成功.");
            }
            state.confirmLoading = false;
            state.spinning== false;
          });




   
  };

 
 
    const onCancel = (e: MouseEvent) => {
   context.emit("CloseConfigGridMoadl");
    };
    watch(
      () => props.visibleModelConfigGrid,
      (newValue) => {
           
        state.spinning = false;
        state.confirmLoading = false;
          
            visibleConfigGrid.value=newValue;
      }
    );
     watch(
      () => props.modalTitleConfigGrid,
      (newValue) => {
           
       
          state.spinning = false;
        state.confirmLoading = false;
            titleConfigGrid.value=newValue;
      }
    );
     watch(
      () => props.Data,
      (newValue) => {
           state.spinning = false;
        state.confirmLoading = false;
      
          console.log("newValue",newValue);  LData.value=newValue;
          radiovalue.value = LData.value.saleOrderState;
          radioRemark.value = LData.value.remark;
      }
    );
    watch(
      () => props.SelectkeysData,
      (newValue) => {
           
        state.spinning = false;
        //state.confirmLoading = false;
          
        LSelectkeysData.value=newValue;
        console.log("SelectkeysData",LSelectkeysData.value)
      }
    );
        return {
            ...toRefs(state),visibleConfigGrid,titleConfigGrid,onCancel,handleOk,LData,
            noticeTypeArray, radiovalue, radioRemark
   
        }
    }
})
</script>

<style  >

.modalEditRow {
  
  border: 0px solid red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 45px;
}
.modalEditCol {
  display: flex;
  width: 45%;
  align-items: center;
}
.modalEditCol label {
  width: 120px;
  text-align: left;
}
.modalEditCol div {
  flex-grow: 1;
}
.ClueShiftModal .ant-modal-title {
  font-size: 16px;
  color: #1890ff !important;
  font-weight: 400;
}
.configCol{
  border:2px solid #f0f0f0;height:40px;text-align:center;line-height:40px;color:black;
    font-size:14px
}
.ClueShiftConfig {
    overflow: auto;max-width: 500px!important;width: 500px!important;
}
</style>