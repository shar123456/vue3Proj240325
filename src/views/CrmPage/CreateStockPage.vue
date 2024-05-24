<template>
  <a-spin :spinning="spinning">
    <div class="mainSpContent">
      <div style="padding: 5px">

        <a-row>
          <a-col :span="24" class="title">{{ title }}</a-col>
        </a-row>
        <a-row style="height: 23px"></a-row>

        <a-form ref="formRef" :model="EditData" :rules="rules" v-bind="layout">



          <a-row style="height: 2px"></a-row>
          <a-row type="flex" justify="start">
            <a-col class="col" :span="24" style="text-align:left">
              <a-button v-show="IsShowSubmit" type="primary" @click="handleFinishBtn">{{
    submitDesc
  }}</a-button>&nbsp;

              <a-button style="background-color: #CAB872; border-color: #CAB872" type="primary"
                v-show="IsShowContinueAdd" @click="continueAdd">继续创建</a-button> &nbsp;
              <a-button @click="goBackBtn">返回列表</a-button></a-col>
          </a-row>
          <a-row style="height: 15px"></a-row>






          <a-row type="flex" justify="center">
            <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

              <a-form-item label="产品代码" name="productCode">
                <!-- <a-input :disabled="IsDisabledproductCode" v-model:value="EditData.productCode" placeholder="请输入产品代码" /> -->
                <a-input-search
                :disabled="IsDisabled"
                v-model:value="EditData.productCode"
                placeholder="请输入产品代码"
                enter-button
                @search="onProductNoSearch"
                
              />
              </a-form-item>

            </a-col>
            <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
            <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
              <a-form-item label="产品名称" name="productName">
                <a-input :disabled="IsDisabled" v-model:value="EditData.productName" placeholder="请输入产品名称" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row style="height: 0px"></a-row>

          <a-row type="flex" justify="center">
            <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

<a-form-item label="供应商编号" name="vendorID">
  <a-input :disabled="IsDisabled" v-model:value="EditData.vendorID" placeholder="请输入供应商编号" />
</a-form-item>

</a-col>
            <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
            <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
              <a-form-item label="供应商名" name="vendorName">
  <a-input :disabled="IsDisabled" v-model:value="EditData.vendorName" placeholder="请输入供应商名" />
</a-form-item>
            </a-col>
          </a-row>

          <a-row style="height: 0px"></a-row>

         
          <a-row type="flex" justify="center">
            <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

<a-form-item label="批次" name="stockBatchId">
  <a-input :disabled="IsDisabled" v-model:value="EditData.stockBatchId" placeholder="请输入批次" />
</a-form-item>

</a-col>
            <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
            <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
              <a-form-item label="单位" name="unit">
  <a-input :disabled="IsDisabled" v-model:value="EditData.unit" placeholder="请输入单位" />
</a-form-item>
            </a-col>
          </a-row>

          <a-row style="height: 0px"></a-row>


      

         
<a-row type="flex" justify="center">
  <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">

<a-form-item label="剩余库存" name="remainQty">
<a-input :disabled="IsDisabled" v-model:value="EditData.remainQty" placeholder="请输入剩余库存" />
</a-form-item>

</a-col>
  <a-col class="col" :xs="{ span: 0 }" :lg="{ span: 1 }"></a-col>
  <a-col class="col" :xs="{ span: 24 }" :lg="{ span: 11 }">
    <a-form-item label="总库存" name="totalQty">
<a-input :disabled="IsDisabled" v-model:value="EditData.totalQty" placeholder="请输入总库存" />
</a-form-item>
  </a-col>
</a-row>

<a-row style="height: 0px"></a-row>















        </a-form>







      </div>
    </div>
  </a-spin>
  <SearchDataModal2Win
    :visibleModelConfigGrid="visibleSearchModal_ProductNo"
    :modalTitleConfigGrid="modalTitleSearchModal_ProductNo"
    configType="product"
    configName="产品"
    @CloseConfigGridMoadl="CloseConfigSearchModal_ProductNo"
    :ListColumns="ProductColumns"
    :ListDatas="ProductDatas"
    @addStepsFunc="addStepsFunc_ProductNo"
   
  />
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted, ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { StockEntity } from "../../TypeInterface/ICrm/IStockManagement";
import SearchDataModal2Win from "../../components/SearchDataModal2Win.vue";
import { GetUsers } from "../../Request/userRequest";
import { SearchUserColumns, SearchFlowColumns,SearchProductColumns } from "../../TypeInterface/ISearchDataModalInterface";
import { dateFormat } from '../../utility/commonFunc'
import {
  ExaminationFlowEntity, ExaminationFlowColumns
} from "../../TypeInterface/IExaminationInterface";
import {
  AddStock, UpdateStock, GetStockById
} from "../../Request/CrmRequest/StockManagementRequest";

import {
  GetProduct
} from "../../Request/CrmRequest/ProductManagementRequest";



import { useStore } from "vuex";
import { message, Modal } from "ant-design-vue";
import type { FormInstance } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';
export default defineComponent({
  components: { UploadOutlined, SearchDataModal2Win },
  setup() {
    const state = reactive({
      count: 0,
      spinning: false,
      delayTime: 1,
      IsDisabled: false,
      IsShowSubmit: true,
      IsShowContinueAdd: false,
      title: "新建",
      submitDesc: "提交",
      IsDisabledproductCode: false,
    });
    const layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 30 },
    };
    const goBackBtn = () => {
      router.push({ path: "/Home/StockManagementPage", query: {} });
    };
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let DataEntityState = reactive(new StockEntity());

    let visibleSearchModal = ref<boolean>(false);
    let modalTitleSearchModal = ref<string>("");

    const CloseConfigSearchModal = () => {
      visibleSearchModal.value = false;
      modalTitleSearchModal.value = "";
    };

    



    let visibleSearchModal_ProductNo = ref<boolean>(false);
    let modalTitleSearchModal_ProductNo = ref<string>("");

    const CloseConfigSearchModal_ProductNo = () => {
      visibleSearchModal_ProductNo.value = false;
      modalTitleSearchModal_ProductNo.value = "";
    };


  let ProductColumns = ref<any[]>([]);
    let ProductDatas = ref<any[]>([]);

    ProductColumns.value = SearchProductColumns;








    let UserColumns = ref<any[]>([]);
    let UserDatas = ref<any[]>([]);

    UserColumns.value = SearchUserColumns;

    onMounted(async () => {

      let  ProductList = await GetProduct();
      ProductDatas.value.push(... ProductList);

console.log("ProductList",ProductList);


      let pageType = route.query.pageType;
      let Id = route.query.id;
      if ((pageType != undefined && pageType == "add") || pageType == undefined) {
        state.title = "新建";
        state.submitDesc = "提交";

      }
      if (pageType != undefined && pageType == "edit") {
        state.title = "编辑";
        state.submitDesc = "更新";
        // state.IsDisabledproductCode = true;
        GetStockById({ Id: Id }).then((res: any) => {
          if (res.isSuccess) {
            console.log("EditBth111", res.datas)
            DataEntityState.EditData = res.datas;
          }
          else {
            message.error(res.msg);
          }
        });

      }

  


    });














    const rules = {
      productName: [
        {
          required: true,
          message: "请输入产品名",
          trigger: "blur",
        },
        {
          min: 2,
          max: 50,
          message: "长度在2至50之间",
          trigger: "blur",
        },
      ],

      productCode: [
        {
          required: true,
          message: "请输入产品编号",
          trigger: "blur",
        },
        {
          min: 2,
          max: 50,
          message: "长度在2至50之间",
          trigger: "blur",
        },
      ],
      vendorID: [
        {
          required: true,
          message: "请输入供应商编号",
          trigger: "blur",
        },
        {
          min: 2,
          max: 50,
          message: "长度在2至50之间",
          trigger: "blur",
        },
      ],
    };
    const formRef = ref<FormInstance>();
    const handleFinishBtn = async (values: any) => {
      console.log(values);
      var doMark = true;
      try {
        const values1 = await formRef.value?.validateFields();
      }
      catch (e: any) {
        if (e.errorFields && e.errorFields.length > 0) {
          doMark = false;
        }
      }

      if (!doMark) {
        return;
      }
      state.spinning = !state.spinning;
      let pageType = route.query.pageType;
      //console.log("pageType", pageType);


      if ((pageType != undefined && pageType == "add") || pageType == undefined) {

        AddStock(DataEntityState.EditData).then((res: any) => {
          console.log(res);
          if (res.isSuccess) {

            message.success(res.msg);




            //router.push({ path: "/Home/WorkSchedulePage", query: {} });
            state.IsDisabled = true;
            state.IsShowSubmit = false;
            state.IsShowContinueAdd = true;
            state.IsDisabledproductCode = true;
          } else {
            message.error("添加失败.");
          }
          state.spinning = !state.spinning;
        });



      }
      if (pageType != undefined && pageType == "edit") {
        //UpdateorkSchedule



        //DataEntityState.EditData.startTimeStr= dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(values.startTimeStr),0),"YYYY-MM-DD HH:mm:ss");
        UpdateStock(DataEntityState.EditData).then((res: any) => {
          console.log(res);
          if (res.isSuccess) {

            message.success(res.msg);


            DataEntityState.EditData.id = "";
            DataEntityState.EditData.productName = "";
            DataEntityState.EditData.productCode = "";
            DataEntityState.EditData.vendorID = "";
            DataEntityState.EditData.vendorName = "";

           

            DataEntityState.EditData.remainQty = 0;
            DataEntityState.EditData.totalQty = 0;
           
            DataEntityState.EditData.unit = "";
            DataEntityState.EditData.stockBatchId = "";



            

              DataEntityState.EditData.createTimeStr = dateFormat("YYYY-mm-dd HH:MM:SS", new Date(), 0);
            DataEntityState.EditData.key = "";
            DataEntityState.EditData.TmStamp = [];

            router.push({ path: "/Home/StockManagementPage", query: {} });



          } else {
            message.error(res.msg);
          }
          state.spinning = !state.spinning;
        });
      }











    };

    const continueAdd = () => {
      state.IsDisabled = false;
      state.IsDisabledproductCode = false;

      state.IsShowSubmit = true;
      state.IsShowContinueAdd = false;
      DataEntityState.EditData.id = "";
      DataEntityState.EditData.productName = "";
      DataEntityState.EditData.productCode = "";
      DataEntityState.EditData.vendorID = "";
      DataEntityState.EditData.vendorName = "";

      DataEntityState.EditData.remainQty = 0;
            DataEntityState.EditData.totalQty = 0;
           
           
            DataEntityState.EditData.stockBatchId = "";



      DataEntityState.EditData.unit = "",

        DataEntityState.EditData.createTimeStr = dateFormat("YYYY-mm-dd HH:MM:SS", new Date(), 0);
      DataEntityState.EditData.key = "";
      DataEntityState.EditData.TmStamp = [];
    }


    let addStepsFunc_ProductNo = (item: any) => {
      CloseConfigSearchModal_ProductNo();
console.log("or use this.value111", item);
      item.forEach((i: any) => {
        console.log("or use this.value", i);
        DataEntityState.EditData.productCode = i.productCode;
        DataEntityState.EditData.productName = i.productName;
        DataEntityState.EditData.vendorID = i.vendorID;
        DataEntityState.EditData.vendorName = i.vendorName;
        DataEntityState.EditData.unit = i.unit;
      });
    };


    const onProductNoSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      visibleSearchModal_ProductNo.value = true;
      modalTitleSearchModal_ProductNo.value = "【产品搜索】";
      // console.log('or use this.value', value.value);
    };




    return {
      ...toRefs(state),
      ...toRefs(DataEntityState),
      rules, formRef,
      handleFinishBtn, goBackBtn,
      layout,

      visibleSearchModal,
      modalTitleSearchModal,

      CloseConfigSearchModal,

      UserColumns,
      UserDatas,
      continueAdd,
      visibleSearchModal_ProductNo,
      modalTitleSearchModal_ProductNo,

      CloseConfigSearchModal_ProductNo, ProductColumns, ProductDatas,onProductNoSearch,addStepsFunc_ProductNo
    };
  },
});
</script>

<style scoped>
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