<template>
<a-spin :spinning="spinning" >
  <div class="mainSpContent">
    <div style="padding: 5px">
      <a-row>
        <a-col :span="24" class="title">{{title}}</a-col>
      </a-row>
      <a-row style="height: 23px"></a-row>

      <a-form
        ref="formRef"
        :model="EditData"
        :rules="rules"

        v-bind="layout"
      >



      <a-row style="height: 2px"></a-row>
  <a-row type="flex" justify="start">
          <a-col class="col" :span="24" style="text-align:left">
            <a-button v-show="IsShowSubmit" type="primary"    @click="handleFinishBtn"  >{{
              submitDesc
            }}</a-button>&nbsp;
             
             <a-button  style="background-color: #CAB872; border-color: #CAB872" type="primary"   v-show="IsShowContinueAdd" @click="continueAdd">继续创建</a-button>  &nbsp;
            <a-button  @click="goBackBtn">返回线索列表</a-button></a-col
          >
        </a-row>
        <a-row style="height: 15px"></a-row>






        <a-row type="flex" justify="center">
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

            <a-form-item label="线索名称" name="name">
              <a-input
              :disabled="IsDisabled"
               
                v-model:value="EditData.name"
                placeholder="请输入线索名称"
              />
            </a-form-item>
            
          </a-col>
          <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
            <a-form-item label="手机号" name="mobilePhone">
              <a-input
              :disabled="IsDisabled"
                v-model:value="EditData.mobilePhone"
                placeholder="请输入手机号"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row style="height: 0px"></a-row>

        <a-row type="flex" justify="center">
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

            <a-form-item label="电话" name="phone">
              <a-input
             :disabled="IsDisabled"
               
                v-model:value="EditData.phone"
                placeholder="请输入电话"
              />
            </a-form-item>
            
          </a-col>
          <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
            <a-form-item label="行业" name="industry">
              <a-input
              :disabled="IsDisabled"
                v-model:value="EditData.industry"
                placeholder="请输入行业"
              />
            </a-form-item>
          </a-col>
        </a-row>



        <a-row style="height: 0px"></a-row>




        <a-row type="flex" justify="center">
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

            <a-form-item label="邮箱" name="email">
              <a-input
             :disabled="IsDisabled"
               
                v-model:value="EditData.email"
                placeholder="请输入邮箱"
              />
            </a-form-item>
            
          </a-col>
          <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
            <a-form-item label="线索来源" name="clueOrigin">
             <a-select :disabled="IsDisabled"  v-model:value="EditData.clueOrigin" style="width: 100%" placeholder="请输入线索来源">
            <a-select-option value="转介绍">转介绍</a-select-option>
            <a-select-option value="推广">推广</a-select-option>
         <a-select-option value="电话咨询">电话咨询</a-select-option>
          <a-select-option value="邮件咨询">邮件咨询</a-select-option>
           <a-select-option value="媒体渠道">媒体渠道</a-select-option>
            <a-select-option value="线下活动">线下活动</a-select-option>
             <a-select-option value="广告">广告</a-select-option> <a-select-option value="陌拜">陌拜</a-select-option>
                <a-select-option value="搜索引擎">搜索引擎</a-select-option> <a-select-option value="预约上门">预约上门</a-select-option>
            <a-select-option value="其他">其他</a-select-option>

         
          </a-select>
            </a-form-item>
          </a-col>
        </a-row>



        <a-row style="height: 0px"></a-row>

        <a-row type="flex" justify="center">
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

            

            <a-form-item label="客户级别" name="customerLevel">
              <a-select :disabled="IsDisabled"  v-model:value="EditData.customerLevel" style="width: 100%" placeholder="请输入客户级别">
            <a-select-option value="普通客户">普通客户</a-select-option>
            <a-select-option value="重点客户">重点客户</a-select-option>
            <a-select-option value="VIP客户"> VIP客户</a-select-option>
            


         
          </a-select>
            </a-form-item>



            
          </a-col>
          <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
            

            <a-form-item label="详细地址" name="address">
              <a-input style="width:100%"
                :disabled="IsDisabled"
                v-model:value="EditData.address"
                placeholder="请输入详细地址"
              />
            </a-form-item>




          </a-col>
        </a-row>



        <a-row style="height: 0px"></a-row>




      



        <a-row type="flex" justify="center">
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

            <a-form-item label="省会" name="province">
              <a-input
            
               
                v-model:value="EditData.province"
                placeholder="请输入省会"
              />
            </a-form-item>
            
          </a-col>
          <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
            <a-form-item label="城市" name="city">
              <a-input
              :disabled="IsDisabled"
                v-model:value="EditData.city"
                placeholder="请输入城市"
              />
            </a-form-item>
          </a-col>
        </a-row>



       


       



        <a-row style="height: 0px"></a-row>


<a-row type="flex" justify="center">
  <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">


  <a-form-item label="最后跟进时间" name="lastFollowTimeStr">
               <a-date-picker :disabled="IsDisabled" style="width: 100%"  format="YYYY-MM-DD HH:mm:ss"  v-model:value="EditData.lastFollowTimeStr"
        />
            </a-form-item>

</a-col>
  <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
  <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
    <a-form-item label="下次联系时间" name="nextContactTimeStr">
  <a-date-picker :disabled="IsDisabled" style="width: 100%"  format="YYYY-MM-DD HH:mm:ss"  v-model:value="EditData.nextContactTimeStr"
        />

</a-form-item>
  </a-col>
</a-row>

<a-row style="height: 0px"></a-row>







<a-row type="flex" justify="center">
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
            <a-form-item label="备注" name="remark">
            <a-textarea  :disabled="IsDisabled" v-model:value="EditData.remark" placeholder="请输入备注" :rows="4"
        />
            </a-form-item>
          </a-col>
          <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
          <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
           
         


          </a-col>
        </a-row>




     

       

       



 
 <a-row style="height: 0px"></a-row>








 

      </a-form>

     

    
    

      
    </div>
  </div>
  </a-spin>
  
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted, ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { ClueEntity } from "../../TypeInterface/ICrm/IClueManagement";
import SearchDataModal2 from "../../components/SearchDataModal2.vue";
import { GetUsers } from "../../Request/userRequest";
import { SearchUserColumns ,SearchFlowColumns} from "../../TypeInterface/ISearchDataModalInterface";
 import {dateFormat} from '../../utility/commonFunc'
 import {
  ExaminationFlowEntity,ExaminationFlowColumns
} from "../../TypeInterface/IExaminationInterface";
import {
  AddClue,UpdateClue,GetClueById
} from "../../Request/CrmRequest/ClueManagementRequest";
 import { useStore } from "vuex";
 import { message, Modal } from "ant-design-vue";

   import dayjs, { Dayjs } from 'dayjs';
   import type { FormInstance } from 'ant-design-vue';
import { ANT_MARK } from "ant-design-vue/es/locale-provider";
export default defineComponent({
  components: { UploadOutlined,SearchDataModal2 },
  setup() {
    const state = reactive({
      count: 0,
      spinning: false,
      delayTime: 1,
      IsDisabled: false,
      IsShowSubmit: true,
      IsShowContinueAdd: false,
       title: "新建线索",
      submitDesc: "提交",
      IsDisabledClueCode: true,
    });
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 30 },
    };
       const goBackBtn = () => {
      router.push({ path: "/Home/ClueManagementPage", query: {} });
    };
    const route = useRoute();
    const router = useRouter();
      const store = useStore();
    let DataEntityState = reactive(new ClueEntity());

    let visibleSearchModal = ref<boolean>(false);
    let modalTitleSearchModal = ref<string>("");

    const CloseConfigSearchModal = () => {
      visibleSearchModal.value = false;
      modalTitleSearchModal.value = "";
    };

let visibleSearchModal_FlowNo = ref<boolean>(false);
    let modalTitleSearchModal_FlowNo = ref<string>("");

    const CloseConfigSearchModal_FlowNo = () => {
      visibleSearchModal_FlowNo.value = false;
      modalTitleSearchModal_FlowNo.value = "";
    };


  let FlowColumns = ref<any[]>([]);
    let FlowDatas = ref<any[]>([]);

 FlowColumns.value = SearchFlowColumns;


    let UserColumns = ref<any[]>([]);
    let UserDatas = ref<any[]>([]);

    UserColumns.value = SearchUserColumns;

    onMounted(async () => {
      
      let pageType = route.query.pageType;
      let Id = route.query.id;
      if ((pageType != undefined && pageType == "add")||pageType==undefined) {
        state.title = "新建线索";
        state.submitDesc = "提交";
         
      }
      if (pageType != undefined && pageType == "edit") {
        state.title = "编辑线索";
        state.submitDesc = "更新";
         state.IsDisabledClueCode=true;
        GetClueById({ Id: Id }).then((res: any) => {
                  if (res.isSuccess) {

                     DataEntityState.EditData=res.datas;
                    var times=res.datas.nextContactTimeStr;
        if(res.datas.nextContactTimeStr==null||res.datas.nextContactTimeStr==""||res.datas.nextContactTimeStr==undefined)
        {

        }else
        {
DataEntityState.EditData.nextContactTimeStr= (dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(times),0),"YYYY-MM-DD HH:mm:ss"));
        }
             
             

 var times1=res.datas.lastFollowTimeStr;
         if(res.datas.lastFollowTimeStr==null||res.datas.lastFollowTimeStr==""||res.datas.lastFollowTimeStr==undefined)
        {

        }else
        {
DataEntityState.EditData.lastFollowTimeStr= (dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(times1),0),"YYYY-MM-DD HH:mm:ss"));
        }
                


               
                

                  }
                  else
                  {
                      message.error(res.msg);
                  }
                });

      }

      console.log("Id", Id);


    });



    

    let validaterate = async (rule: any, value: any) => {
      if (value === "未选择") {
        return Promise.reject("请选择评级");
      }

      return Promise.resolve();
    };

   

    let validateclueState = async (rule: any, value: any) => {
      if (value === "未选择") {
        return Promise.reject("请选择线索状态");
      }

      return Promise.resolve();
    };


    



    const rules = {
      name: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
        {
          min: 1,
          max: 50,
          message: "长度在2至50之间",
          trigger: "blur",
        },
      ],
      
      // clueState: [
      //   {
      //     required: true,
      //     validator: validateclueState,
      //   },
      // ],
      // rate: [
      //   {
      //     required: true,
      //     validator: validaterate,
      //   },
      // ],
    };

     const formRef = ref<FormInstance>();
    const handleFinishBtn = async (values: any) => { 
      var doMark=true;
   try{
 const values1 = await formRef.value?.validateFields();
   }
   catch (e:any){
     if(e.errorFields&&e.errorFields.length>0)
     {
      doMark=false;
     }
   }

 if(!doMark){
  return;
 }
   
      
     state.spinning = !state.spinning;
      let pageType = route.query.pageType; 
      //console.log("pageType", pageType);

  
      if ((pageType != undefined && pageType == "add")||pageType==undefined) {
    
        AddClue(DataEntityState.EditData).then((res: any) => {
           console.log(res);
           if (res.isSuccess) {
           
             message.success(res.msg);
            
   
    
   
    //router.push({ path: "/Home/WorkSchedulePage", query: {} });
     state.IsDisabled=true;
    state.IsShowSubmit=false;
       state.IsShowContinueAdd=true;
      state.IsDisabledClueCode=true;
           } else {
             message.error("添加失败.");
           }
            state.spinning = !state.spinning;
         });
        
      
        
        }
         if (pageType != undefined && pageType == "edit") {
           //UpdateorkSchedule
   
   

 
   UpdateClue(DataEntityState.EditData).then((res: any) => {
           console.log(res);
           if (res.isSuccess) {
           
             message.success(res.msg);
   
             if(DataEntityState.EditData!=undefined)
             {
              DataEntityState.EditData.id="";
     DataEntityState.EditData.clueCode= "";
     DataEntityState.EditData.name= "";
     DataEntityState.EditData.mobilePhone="";
     DataEntityState.EditData.phone= "";
     DataEntityState.EditData.industry= "";
     DataEntityState.EditData.email="";

    DataEntityState.EditData.clueState="正常",
    DataEntityState.EditData.clueOrigin= "其他",
    DataEntityState.EditData.customerLevel="普通客户",
     DataEntityState.EditData.address="";
     DataEntityState.EditData.province="";
     DataEntityState.EditData.city="";


     DataEntityState.EditData.lastFollowTimeStr= (dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),"YYYY-MM-DD HH:mm:ss"));
     DataEntityState.EditData.nextContactTimeStr= (dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),"YYYY-MM-DD HH:mm:ss"));
     DataEntityState.EditData.createrStr="";

     DataEntityState.EditData.remark="",
   
     DataEntityState.EditData.createTimeStr= dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0);
     DataEntityState.EditData.key= "";
     DataEntityState.EditData.TmStamp=[];

             }
             
   
     router.push({ path: "/Home/ClueManagementPage", query: {} });
   
   
   
           } else {
             message.error(res.msg);
           }
            state.spinning = !state.spinning;
         });
         }
   









       
    };
  
    const continueAdd=()=>{
       state.IsDisabled=false;
        state.IsDisabledClueCode=true;
       
        state.IsShowSubmit=true;
    state.IsShowContinueAdd=false;

    if(DataEntityState.EditData!=undefined)
             {
                DataEntityState.EditData.id="";
     DataEntityState.EditData.clueCode= "";
     DataEntityState.EditData.name= "";
     DataEntityState.EditData.mobilePhone="";
     DataEntityState.EditData.phone= "";
     DataEntityState.EditData.industry= "";
     DataEntityState.EditData.email="";

    DataEntityState.EditData.clueState="正常",
    DataEntityState.EditData.clueOrigin= "其他",
    DataEntityState.EditData.customerLevel="普通客户",
     DataEntityState.EditData.address="";
     DataEntityState.EditData.province="";
     DataEntityState.EditData.city="";


     DataEntityState.EditData.lastFollowTimeStr= (dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),"YYYY-MM-DD HH:mm:ss"));
     DataEntityState.EditData.nextContactTimeStr= (dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),"YYYY-MM-DD HH:mm:ss"));
     DataEntityState.EditData.createrStr="";

     DataEntityState.EditData.remark="",
   
     DataEntityState.EditData.createTimeStr= dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0);
     DataEntityState.EditData.key= "";
     DataEntityState.EditData.TmStamp=[];
             }
             







    }

    return {
      ...toRefs(state),
      ...toRefs(DataEntityState),
      rules,formRef,
      handleFinishBtn,goBackBtn,
      layout,
     
      visibleSearchModal,
      modalTitleSearchModal,

      CloseConfigSearchModal,

      UserColumns,
      UserDatas,
      continueAdd,
       visibleSearchModal_FlowNo,
      modalTitleSearchModal_FlowNo,

      CloseConfigSearchModal_FlowNo,  FlowColumns,FlowDatas
    };
  },
});
</script>

<style  scoped>
.mainSpContent {
  box-sizing: border-box;
  border: 1px solid rgba(204, 204, 204, 0.644);
  background-color: rgba(223, 223, 223, 0);
  width: 100%;
  height: calc(100vh - 92px);
  overflow: auto;
}

.mainSpContent .col {
  line-height: 30px;
}
.mainSpContent .col span {
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  font-size: 16px;
}

.mainSpContent .title {
  text-align: center;
  line-break: 40px;
  font-size: 22px;
  font-weight: 600;
  color: rgba(51, 108, 161, 0.774);
}
</style>