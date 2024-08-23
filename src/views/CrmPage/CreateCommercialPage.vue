<template>
    <a-spin :spinning="spinning">
        <div class="mainSpContent">
            <div style="padding: 5px">
                <a-row>
                    <a-col :span="24" class="title">{{title}}</a-col>
                </a-row>
                <a-row style="height: 23px"></a-row>

                <a-form ref="formRef"
                        :model="EditData"
                        :rules="rules"
                        v-bind="layout">



                    <a-row style="height: 2px"></a-row>
                    <a-row type="flex" justify="start">
                        <a-col class="col" :span="24" style="text-align:left">
                            <a-button v-show="IsShowSubmit" type="primary" @click="handleFinishBtn">
                                {{
              submitDesc
                                }}
                            </a-button>&nbsp;

                            <a-button style="background-color: #CAB872; border-color: #CAB872" type="primary" v-show="IsShowContinueAdd" @click="continueAdd">继续创建</a-button>  &nbsp;
                            <a-button @click="goBackBtn">返回商机列表</a-button>
                        </a-col>
                    </a-row>
                    <a-row style="height: 15px"></a-row>






                    <a-row type="flex" justify="center">
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

                            <a-form-item label="商机编号" name="commercialCode">
                                <a-input 
                                        
                                         disabled="true"
                                         v-model:value="EditData.commercialCode"
                                         placeholder="请输入商机编号" />
                            </a-form-item>

                        </a-col>
                        <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
                            <a-form-item label="商机名称" name="commercialName">
                                <a-input :disabled="IsDisabled"
                                         v-model:value="EditData.commercialName"
                                         placeholder="请输入商机名称" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <a-row style="height: 0px"></a-row>

                    <a-row type="flex" justify="center">
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
                            <a-form-item label="客户名称" name="customername">
                                <a-input-search :disabled="IsDisabled"
                                                v-model:value="EditData.customername"
                                                placeholder="请输入客户名称"
                                                enter-button
                                                @search="onCustomerSearch" />



                            </a-form-item>



                        </a-col>
                        <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">





                            <a-form-item label="客户编号" name="customerCode">
                                <a-input v-model:value="EditData.customerCode" disabled="true"
                                         placeholder="请输入客户编号" />
                            </a-form-item>




                        </a-col>
                    </a-row>



                    <a-row style="height: 0px"></a-row>


                    <a-row type="flex" justify="center">
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">



                            <!--<a-form-item label="预期收入" name="prospectionIncome">
                                <a-input-number style="width:100%"
                                                :disabled="IsDisabled"
                                                v-model:value="EditData.prospectionIncome"
                                                placeholder="请输入预期收入" />
                            </a-form-item>-->



                            <a-form-item label="联系人" name="contactName">
                                <a-input v-model:value="EditData.contactName" :disabled="IsDisabled"
                                         placeholder="请输入联系人" />
                            </a-form-item>



                        </a-col>
                        <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">





                            <a-form-item label="手机号" name="contactPhone">
                                <a-input :disabled="IsDisabled"
                                         v-model:value="EditData.contactPhone"
                                         placeholder="请输入手机号" />
                            </a-form-item>


                        </a-col>
                    </a-row>



                    <a-row style="height: 0px"></a-row>







                    <a-row type="flex" justify="center">
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
                            <a-form-item label="金额" name="amount">
                                <a-input-number style="width:100%"
                                                :disabled="IsDisabled"
                                                v-model:value="EditData.amount"
                                                placeholder="请输入金额" />
                            </a-form-item>


                        </a-col>
                        <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">


                            <a-form-item label="货币" name="currency">
                                <a-select :disabled="IsDisabled"
                                          v-model:value="EditData.currency"
                                          style="width: 100%"
                                          placeholder="请选择货币">
                                    <a-select-option value="未选择">未选择</a-select-option>
                                    <a-select-option value="人民币">人民币</a-select-option>
                                    <a-select-option value="欧元">欧元</a-select-option>
                                    <a-select-option value="英镑">英镑</a-select-option>
                                    <a-select-option value="港元">港元</a-select-option>
                                    <a-select-option value="日元">日元</a-select-option>
                                    <a-select-option value="美元">美元</a-select-option>
                                </a-select>
                            </a-form-item>








                        </a-col>
                    </a-row>



                    <a-row style="height: 0px"></a-row>





                    <a-row type="flex" justify="center">
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">




                            <a-form-item label="商机类型" name="commercialType">
                                <a-select :disabled="IsDisabled"
                                          v-model:value="EditData.commercialType"
                                          style="width: 100%"
                                          placeholder="请选择商机类型">
                                    <a-select-option value="未选择">未选择</a-select-option>
                                    <a-select-option value="已有业务">已有业务</a-select-option>
                                    <a-select-option value="新业务">新业务</a-select-option>


                                </a-select>
                            </a-form-item>




                        </a-col>
                        <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
                            <!--<a-form-item label="概率" name="probability">
                                <a-input :disabled="IsDisabled"
                                         v-model:value="EditData.probability"
                                         placeholder="请输入概率" />
                            </a-form-item>-->



                            <a-form-item label="概率" name="probability">
                                <a-select :disabled="IsDisabled"
                                          v-model:value="EditData.probability"
                                          style="width: 100%"
                                          placeholder="请输入概率">
                                    <a-select-option value="未选择">未选择</a-select-option>
                                    <a-select-option value="10%">10%</a-select-option>
                                    <a-select-option value="30%">30%</a-select-option>
                                    <a-select-option value="60%">60%</a-select-option>
                                    <a-select-option value="90%">90%</a-select-option>
                                    <a-select-option value="100%">100%</a-select-option>


                                </a-select>
                            </a-form-item>





                        </a-col>
                    </a-row>









                    <a-row style="height: 0px"></a-row>




                    <a-row type="flex" justify="center">
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">




                            <a-form-item label="阶段" name="commercialStage">
                                <a-select :disabled="IsDisabled"
                                          v-model:value="EditData.commercialStage"
                                          style="width: 100%"
                                          placeholder="请输入阶段">
                                    <a-select-option value="未选择">未选择</a-select-option>
                                    <a-select-option value="资质审查">资质审查</a-select-option>
                                    <a-select-option value="价值建议">价值建议</a-select-option>
                                    <a-select-option value="确定决策者">确定决策者</a-select-option>
                                    <a-select-option value="提案/报价">提案/报价</a-select-option>
                                    <a-select-option value="谈判/复审">谈判/复审</a-select-option>
                                    <a-select-option value="赢单关闭">赢单关闭</a-select-option>
                                    <a-select-option value="丢单关闭">丢单关闭</a-select-option>
                                    <a-select-option value="因竞争丢单关闭">因竞争丢单关闭</a-select-option>
                                </a-select>
                            </a-form-item>







                        </a-col>
                        <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">


                            <a-form-item label="商机状态" name="commercialState">
                                <a-select :disabled="IsDisabled"
                                          v-model:value="EditData.commercialState"
                                          style="width: 100%"
                                          placeholder="请选择商机状态">
                                    <a-select-option value="未选择">未选择</a-select-option>
                                    <a-select-option value="启用">启用</a-select-option>
                                    <a-select-option value="禁用">禁用</a-select-option>


                                </a-select>
                            </a-form-item>



                        </a-col>
                    </a-row>












                    <a-row style="height: 0px"></a-row>

                    <a-row type="flex" justify="center">
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

                            <a-form-item label="产品" name="workScheduleStatus">
                                <a-button @click="addProductBtn"
                                          type="primary"
                                          block>
                                    <template #icon>
                                        <PlusCircleTwoTone />
                                    </template>

                                    添加产品
                                </a-button>

                            </a-form-item>



                        </a-col>
                        <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
                        <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
                            <a-form-item label="备注" name="remark">
                                <a-textarea :disabled="IsDisabled" v-model:value="EditData.remark" placeholder="请输入备注" :rows="4" />
                            </a-form-item>
                        </a-col>
                    </a-row>













                    <a-row style="height: 0px"></a-row>




                    <a-row style="height: auto"></a-row>
                    <a-row type="flex"
                           justify="center"
                           align="middle"
                           style="
          border: 1px dotted #71a6e7;
     
          background-color: white;overflow: auto;
        ">

                        <div v-if="ProductDataList == undefined || ProductDataList.length <= 0">
                            <a-empty description="暂无产品信息" />
                        </div>





                        <div id="DataList" v-if="!(ProductDataList == undefined || ProductDataList.length <= 0)">
                            <a-table bordered
                                     :rowClassName="(index:number) => (index % 2 == 1 ? 'table-striped' : null)"
                                     id="yy"
                                     :columns="ListGridColumns"
                                     :data-source="ProductDataList"
                                     :scroll="{ x: 1000, y: 'calc(100vh - 310px)' }"
                                     :pagination="false">


                                <template #bodyCell="{ column, record }">
                                    

                                    <template v-if="column.dataIndex === 'productName'">
                                        <span>
                                            <a-tag :color="record.productName=='未选择' ? 'blue' :'blue' ">

                                                {{ record.productName}}
                                            </a-tag>
                                        </span>
                                    </template>
                                    <template v-if="column.dataIndex === 'productCode'">
                                        <span>
                                            <a-tag :color="record.productCode=='未选择' ? 'blue' :'blue' ">

                                                {{ record.productCode}}
                                            </a-tag>
                                        </span>
                                    </template>



                                </template>




                                <template #action="{ record }">






                                    <a @click="DeleteProductBth(record.id,record.productCode)"
                                       style="
  /*  color: #fff;
    font-size: 14px;
    font-weight: 600;
    border:1px solid #dedede;
     padding-top:1px;
       padding-bottom:3px;
     padding-left:7px;
       padding-right:3px;
    background-color:#dd4b39 ;
    border-radius: 4px;*/
  "
                                       title="删除">
                                        <delete-two-tone mark="delete" />&nbsp;
                                    </a>




                                    <a @click="ShowClueShiftRow(record.id)"
                                       s
                                       title="编辑数量">
                                        <edit-outlined mark="delete" />&nbsp;
                                    </a>



                                </template>






                            </a-table>

                          
                        </div>











                    </a-row>







                </a-form>







            </div>
        </div>
    </a-spin>



    <SearchDataModal2 :visibleModelConfigGrid="visibleCustomerModal"
                      :modalTitleConfigGrid="modalTitleCustomerModal"
                      configType="CustomerUser"
                      configName="客户"
                      @CloseConfigGridMoadl="CloseConfigCustomerModal"
                      :ListColumns="CustomerColumns"
                      :ListDatas="CustomerDatas"
                      @addStepsFunc="addCustomerStepsFunc" />



    <SearchDataModal2 :visibleModelConfigGrid="visibleProductModal"
                      :modalTitleConfigGrid="modalTitleProductModal"
                      configType="product"
                      configName="产品"
                      @CloseConfigGridMoadl="CloseConfigProductModal"
                      :ListColumns="ProductColumns"
                      :ListDatas="ProductDatas"
                      @addStepsFunc="addProductStepsFunc" />




</template>

<script lang="ts">
    import { reactive, toRefs, defineComponent, onMounted, ref, createVNode } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { CommercialEntity } from "../../TypeInterface/ICrm/ICommercialManagement";
import SearchDataModal2 from "../../components/SearchDataModal2.vue";
    import { GetUsers } from "../../Request/userRequest";

    import { GetCustomers } from "../../Request/CrmRequest/CustomerManagementRequest";

    import { GetProduct } from "../../Request/CrmRequest/ProductManagementRequest";
    
    import { SearchUserColumns, SearchFlowColumns, SearchCustomerColumns, SearchProductColumns } from "../../TypeInterface/ISearchDataModalInterface";
 import {dateFormat} from '../../utility/commonFunc'
 import {
  ExaminationFlowEntity,ExaminationFlowColumns
} from "../../TypeInterface/IExaminationInterface";
import {
        AddCommercial, UpdateCommercial, GetCommercialById, AddCommercialProdRelation, GetCommercialRelationById, UpdateCommercialProdRelation
} from "../../Request/CrmRequest/CommercialManagementRequest";
 import { useStore } from "vuex";
 import { message, Modal } from "ant-design-vue";
   import type { FormInstance } from 'ant-design-vue';
    import dayjs, { Dayjs } from 'dayjs';


    import {
        ProductEntity, ProductColumnsMin, ExportColumns
    } from "../../TypeInterface/ICrm/IProductManagement";

    import {
        GetProductManagementDatas, AddProduct, UpdateProduct, DeleteById, BatchDelete, BatchExport, CopyDataById
    }
        from "../../Request/CrmRequest/ProductManagementRequest";
    import { deepClone } from "../../utility/commonFunc";


    import {

        DeleteFilled, EditOutlined, DeleteTwoTone, PlusOutlined,
        ExclamationCircleOutlined, SearchOutlined, CloseOutlined, BellOutlined, CopyFilled, InteractionOutlined, UndoOutlined

    } from "@ant-design/icons-vue";


export default defineComponent({
    components: { UploadOutlined, SearchDataModal2, DeleteFilled, DeleteTwoTone, PlusOutlined, EditOutlined },
  setup() {
    const state = reactive({
      count: 0,
      spinning: false,
      delayTime: 1,
      IsDisabled: false,
      IsShowSubmit: true,
      IsShowContinueAdd: false,
       title: "新建商机",
      submitDesc: "提交",
      IsDisabledCommercialCode: false,
    });
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 30 },
    };
       const goBackBtn = () => {
      router.push({ path: "/Home/CommercialManagementPage", query: {} });
    };
    const route = useRoute();
    const router = useRouter();
      const store = useStore();
    let DataEntityState = reactive(new CommercialEntity());

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


      let CustomerColumns = ref<any[]>([]);
      let CustomerDatas = ref<any[]>([]);

      CustomerColumns.value = SearchCustomerColumns;



      let ProductColumns = ref<any[]>([]);
      let ProductDatas = ref<any[]>([]);

      ProductColumns.value = SearchProductColumns;


      let ProductDataList = ref<any[]>([]);

      let ListGridColumns = ref<any>();


    
  

   


















    onMounted(async () => {

        
        let CustomerDatasList = await GetCustomers();
       
        CustomerDatas.value.push(...CustomerDatasList);


        let ProductDatasList = await GetProduct();

        ProductDatas.value.push(...ProductDatasList);


        



        console.log("CustomerDatas",CustomerDatas.value)

      let pageType = route.query.pageType;
      let Id = route.query.id;
      if ((pageType != undefined && pageType == "add")||pageType==undefined) {
        state.title = "新建商机";
        state.submitDesc = "提交";
         
      }
      if (pageType != undefined && pageType == "edit") {
        state.title = "编辑商机";
        state.submitDesc = "更新";
         state.IsDisabledCommercialCode=true;
          GetCommercialById({ Id: Id }).then((res: any) => {
              if (res.isSuccess) {

                  DataEntityState.EditData = res.datas;

                  GetCommercialRelationById({ Id: Id }).then((ress: any) => {
                      if (ress.isSuccess) {
                          ProductDataList.value = ress.datas;
                      }

                  });







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

   

    let validateCommercialState = async (rule: any, value: any) => {
      if (value === "未选择") {
        return Promise.reject("请选择商机状态");
      }

      return Promise.resolve();
    };


    



    const rules = {
      customername: [
        {
          required: true,
          message: "请输入客户姓名",
          trigger: "blur",
        },
        {
          min: 1,
          max: 50,
          message: "长度在2至50之间",
          trigger: "blur",
        },
      ],
      commercialName: [
        {
          required: true,
          message: "请输入商机姓名",
          trigger: "blur",
        },
        {
          min: 1,
          max: 50,
          message: "长度在2至50之间",
          trigger: "blur",
        },
      ],
      CommercialState: [
        {
          required: true,
          validator: validateCommercialState,
        },
      ],
      rate: [
        {
          required: true,
          validator: validaterate,
        },
      ],
    };
         const formRef = ref<FormInstance>();
    const handleFinishBtn = async (values: any) => {
      //console.log(values);

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

  
        if ((pageType != undefined && pageType == "add") || pageType == undefined) {
            console.log("ProductDataList", ProductDataList.value);

            //var sss = JSON.stringify((ProductDataList.value));


//            var sssss = [{
//                unit
//                    :
//                    "台",

//vendorID
//                    :
//                    "96874444452"
//            },
//                {
//                    unit
//                        :
//                        "台",

//                    vendorID
//                        :
//                        "96874444452"
//                }]







           
        AddCommercial(DataEntityState.EditData).then((res: any) => {
           console.log(res);
           if (res.isSuccess) {


               if (ProductDataList != undefined && ProductDataList.value != undefined && (ProductDataList.value).length > 0) {


                   //debugger;
                   var ccoed = (res.url).split(",");
                   (ProductDataList.value)[0].CommercialCode = ccoed[0];
                   (ProductDataList.value)[0].CommercialId = ccoed[1];
                   AddCommercialProdRelation((ProductDataList.value)).then((res: any) => {


                       //ProductDataList.value.length = 0;


                   });
               }




             message.success(res.msg);
   
   
    
   
    //router.push({ path: "/Home/WorkSchedulePage", query: {} });
     state.IsDisabled=true;
    state.IsShowSubmit=false;
       state.IsShowContinueAdd=true;
      state.IsDisabledCommercialCode=true;
           } else {
             message.error("添加失败.");
           }
            state.spinning = !state.spinning;
         });
        
      
        
        }
         if (pageType != undefined && pageType == "edit") {
           //UpdateorkSchedule
   
   
   
         //DataEntityState.EditData.startTimeStr= dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(values.startTimeStr),0),"YYYY-MM-DD HH:mm:ss");
   UpdateCommercial(DataEntityState.EditData).then((res: any) => {
           console.log(res);
           if (res.isSuccess) {


           console.log("ProductDataList.value", (ProductDataList.value).length);
               if (ProductDataList != undefined && ProductDataList.value != undefined && (ProductDataList.value).length >= 0) {


                
               if ((ProductDataList.value).length > 0)
             {
                 (ProductDataList.value)[0].CommercialCode = DataEntityState.EditData.customerCode;
                 (ProductDataList.value)[0].CommercialId = DataEntityState.EditData.id;
                   }
                   if ((ProductDataList.value).length == 0) {
                   
                       (ProductDataList.value).push({
                           CommercialId: DataEntityState.EditData.id,
                           CommercialCode: "delete"
                       })
                   }
                  
                   UpdateCommercialProdRelation((ProductDataList.value)).then((res: any) => {


                       //ProductDataList.value.length = 0;


                   });
               }









             message.success(res.msg);







             if(DataEntityState.EditData!=undefined)
             {
              DataEntityState.EditData.id="";
     DataEntityState.EditData.clueCode= "";
     DataEntityState.EditData.customerCode= "";
     DataEntityState.EditData.customername="";
     DataEntityState.EditData.commercialName= "";
    
     DataEntityState.EditData.commercialCode="";
  
     DataEntityState.EditData.prospectionIncome=0;
     DataEntityState.EditData.amount=0;
     DataEntityState.EditData.currency="人民币";
     DataEntityState.EditData.commercialType="未选择";
     
     DataEntityState.EditData.commercialSource="";
     DataEntityState.EditData.contactName="";
     DataEntityState.EditData.commercialState="启用",
     DataEntityState.EditData.probability="";
     DataEntityState.EditData.commercialStage="未选择"
  
     DataEntityState.EditData.clueCode="",
         DataEntityState.EditData.contactPhone = "",
     DataEntityState.EditData.remark="",
     DataEntityState.EditData.createTimeStr= dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0);
     DataEntityState.EditData.key= "";
                 DataEntityState.EditData.TmStamp = [];
                 ProductDataList.value.length = 0;
             }
             
   
     router.push({ path: "/Home/CommercialManagementPage", query: {} });
   
   
   
           } else {
             message.error(res.msg);
           }
            state.spinning = !state.spinning;
         });
         }
   









       
    };
  
    const continueAdd=()=>{
       state.IsDisabled=false;
        state.IsDisabledCommercialCode=false;
       
        state.IsShowSubmit=true;
    state.IsShowContinueAdd=false;

    if(DataEntityState.EditData!=undefined)
             {
              DataEntityState.EditData.id="";
     DataEntityState.EditData.clueCode= "";
     DataEntityState.EditData.customerCode= "";
     DataEntityState.EditData.customername="";
     DataEntityState.EditData.commercialName= "";
    
     DataEntityState.EditData.commercialCode="";
  
     DataEntityState.EditData.prospectionIncome=0;
     DataEntityState.EditData.amount=0;
     DataEntityState.EditData.currency="人民币";
        DataEntityState.EditData.commercialType ="新业务";
     
     DataEntityState.EditData.commercialSource="";
     DataEntityState.EditData.contactName="";
     DataEntityState.EditData.commercialState="启用",
         DataEntityState.EditData.probability ="10%";
        DataEntityState.EditData.commercialStage ="提案/报价"
        DataEntityState.EditData.contactPhone = "",
     DataEntityState.EditData.clueCode="",
         
     DataEntityState.EditData.remark="",
     DataEntityState.EditData.createTimeStr= dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0);
     DataEntityState.EditData.key= "";
        DataEntityState.EditData.TmStamp = [];
        (ProductDataList.value).length = 0;
             }
             







    }



      let visibleCustomerModal = ref<boolean>(false);
      let modalTitleCustomerModal = ref<string>("");

      const CloseConfigCustomerModal = () => {
          visibleCustomerModal.value = false;
          modalTitleCustomerModal.value = "";
      };

      //客户弹窗
      const onCustomerSearch = (searchValue: string) => {
        
          visibleCustomerModal.value = true;
          modalTitleCustomerModal.value = "【信息搜索】";
          // console.log('or use this.value', value.value);
      };
      let addCustomerStepsFunc = (item: any) => {
          CloseConfigCustomerModal();
          console.log("or use this.value", item);
          item.forEach((i: any) => {
              console.log("or use this.value", i);
              DataEntityState.EditData.customerCode = i.customerCode;
              DataEntityState.EditData.customername = i.customername;
              DataEntityState.EditData.contactName = i.contactPerson;
              DataEntityState.EditData.contactPhone = i.mobilePhone;
          });
      };
      //产品弹窗



      let visibleProductModal = ref<boolean>(false);
      let modalTitleProductModal = ref<string>("");

      const CloseConfigProductModal = () => {
          visibleProductModal.value = false;
          modalTitleProductModal.value = "";
      };


      let addProductBtn = () => {
          visibleProductModal.value = true;
          modalTitleProductModal.value = "【信息搜索】";
      };
      ListGridColumns.value = deepClone(ProductColumnsMin);
      let addProductStepsFunc = (item: any) => {
          CloseConfigProductModal();
        
          item.forEach((i: any) => {
              var ProductDataListT = (ProductDataList.value).filter(j => j.id == i.id)
              console.log("ProductDataListT1", ProductDataListT.length);
              if (ProductDataListT.length <= 0) {
              
                  (ProductDataList.value).push(i);
                 
              }
             
          });

          var amountTemp: number = 0;
          (ProductDataList.value).forEach((t: any) => {

              t.qty = 1;
              t.CommercialCode = DataEntityState.EditData.commercialCode;
              t.CommercialId = DataEntityState.EditData.id;
              t.productId = t.id;
            
              if (t.unitPrice != undefined)
                  amountTemp = amountTemp + (t.unitPrice * t.qty);




          });

          DataEntityState.EditData.amount = amountTemp;
        

         
      };

      const DeleteProductBth = (item: any, productCode: any) => {
         
          Modal.confirm({
              title: "您确定要删除这条记录吗?",
              icon: createVNode(ExclamationCircleOutlined),
              content: `产品编号：${productCode}`,
              okText: "Yes",
              okType: "danger",
              cancelText: "No",
              onOk() {
                  var amountTemp1 = 0;
                  const index = (ProductDataList.value).findIndex(
                      (i: any) => i.id == item);
                  (ProductDataList.value).splice(index, 1);


                 
                  (ProductDataList.value).forEach((t: any) => {

                      t.qty = 1;
                      if (t.unitPrice != undefined)
                          amountTemp1 = amountTemp1 + (t.unitPrice * t.qty);




                  });

                  DataEntityState.EditData.amount = amountTemp1;


                  //DeleteById({ Id: item }).then((res: any) => {
                  //    if (res.isSuccess) {
                  //        refreshMark.value = new Date().getTime().toString();
                  //        message.success("删除成功.");
                  //    }
                  //});
              },
              onCancel() {
                  message.error("已取消.");
              },
          });

      };



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

        CloseConfigSearchModal_FlowNo, FlowColumns, FlowDatas,

        CloseConfigCustomerModal, onCustomerSearch, visibleCustomerModal, modalTitleCustomerModal, addCustomerStepsFunc,   CustomerColumns,
        CustomerDatas,
        CloseConfigProductModal, addProductBtn, visibleProductModal, modalTitleProductModal, addProductStepsFunc, ProductColumns,
        ProductDatas,
        ProductDataList, ListGridColumns, DeleteProductBth
        
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