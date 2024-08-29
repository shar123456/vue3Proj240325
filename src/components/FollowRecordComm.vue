<template>
    <div class="detailMain">
        <div class="level level_1">
            {{datas[0].name||datas[0].customername}}
        </div>
  <div class="level level_2">
    <div class="level_2_up">
  <div>
客户来源
  </div>
   <div>
    手机号
  </div>
   <div>
    联系人
  </div>
   <div>
    创建时间
  </div>
    </div>
    <div class="level_2_down">
        <div>
            {{datas[0].customerOrigin}}
        </div>
   <div>
 {{datas[0].mobilePhone}}
  </div>
   <div>
       {{datas[0].contactPerson}}
   </div>
   <div>
     {{datas[0].createTimeStr}}
  </div>
    </div>
 </div>
  <div class="level level_3">
      <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="跟进记录" tab="跟进记录">


              <a-textarea v-model:value="FRContent" placeholder="添加跟进记录..." :rows="4" />


              <a-date-picker style="" format="YYYY-MM-DD HH:mm:ss" v-model:value="FRTime" />
              <a-select ref="select"
                        v-model:value="FRType"
                        style="">
                  <a-select-option value="微信">微信</a-select-option>
                  <a-select-option value="QQ">QQ</a-select-option>
                  <a-select-option value="邮件">邮件</a-select-option>
                  <a-select-option value="电话">电话</a-select-option>
                  <a-select-option value="见面约谈">见面约谈</a-select-option>
                  <a-select-option value="腾讯会议">腾讯会议</a-select-option>
                  <a-select-option value="其他">其他</a-select-option>
              </a-select>
              <a-select ref="select"
                        v-model:value="FRState"
                        style="">
                  <a-select-option value="意向客户">意向客户</a-select-option>
                  <a-select-option value="商务洽谈">商务洽谈</a-select-option>
                  <a-select-option value="初步联系">初步联系</a-select-option>
                  <a-select-option value="无意向">无意向</a-select-option>
                  <a-select-option value="正式报价">正式报价</a-select-option>
                  <a-select-option value="见面拜访">见面拜访</a-select-option>
                  <a-select-option value="成交客户">成交客户</a-select-option>
                  <a-select-option value="无意向">无意向</a-select-option>
                  <a-select-option value="流失客户">流失客户</a-select-option>
                  <a-select-option value="其他">其他</a-select-option>
              </a-select>
              <a-input v-model:value="FRPerson" style="width:20%" placeholder="跟进人员" />
              <a-button type="primary" @click="AddFollowRecordBtn" style="margin-left:5px">提交</a-button>


              <div style="width:100%;border:1px solid #dedede;margin-top:5px;padding:5px;overflow-y:auto;max-height:500px">
                  <div style="margin-bottom: 15px; font-weight: bold; font-size: 15px; color: rgb(101, 95, 95); ">跟进历史记录明细：</div>
                  <a-timeline v-if="FollowRecordList!=undefined&&FollowRecordList.length>0">
                      <a-timeline-item v-for="item in FollowRecordList">
                          <div>
                              <text style="font-weight:bold;font-size:14px">{{item.followRecordPerson}}</text>，<text style="font-weight: bold; font-size: 14px; background-color: #cac4c476;">{{item.followRecordType}}</text>，<text style="font-size: 14px;font-weight: bold; background-color: #3c809d3e; color: #2185d9">{{item.followRecordState}}</text>
                          </div>
                          <div>
                              <text style="font-weight:bold;">{{item.followRecordTimeStr}}</text>
                          </div>
                          <div style="color: rgb(101, 95, 95)">
                              {{item.followRecordContext}}
                          </div>
                      </a-timeline-item>

                  </a-timeline>


                  <div style="color: rgb(101, 95, 95)" v-else>
                      暂无跟进记录
                  </div>



              </div>








          </a-tab-pane>
          <a-tab-pane key="详细信息" tab="详细信息" force-render>

              <a-row>
                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">客户编号：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].customerCode}}</text></a-col>
                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">行业：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].industry}}</text></a-col>
              </a-row>
              <a-row style="height:7px">

              </a-row>
              <a-row>
                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">客户类型：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].customerType}}</text></a-col>
                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">线索编号：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].clueCode}}</text></a-col>
              </a-row>
              <a-row style="height:7px">    </a-row>
              <a-row>
                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">客户级别：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].customerLevel}}</text></a-col>

                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">客户来源：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].customerOrigin}}</text></a-col>
              </a-row>
              <a-row style="height:7px">    </a-row>
              <a-row>
                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">创建人：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].createrStr}}</text></a-col>

                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">电话：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].phone}}</text></a-col>
              </a-row>   <a-row style="height:7px">    </a-row>
              <a-row>
                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">省份：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].province}}</text></a-col>

                  <a-col :span="12"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">城市：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].city}}</text></a-col>
              </a-row>   <a-row style="height:7px">    </a-row>
              <a-row>
                  <a-col :span="24"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">详细地址：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].address}}</text></a-col>


              </a-row>   <a-row style="height:7px">    </a-row>
              <a-row>
                  <a-col :span="24"><text style="color: rgb(101, 95, 95); width:70px;display:inline-block;text-align:right">备注：</text><text style=" font-size: 0.9rem; font-weight: 900; color: rgb(101, 95, 95);"> {{datas[0].remark}}</text></a-col>


              </a-row>
          </a-tab-pane>
          <a-tab-pane key="销售订单" tab="销售订单" force-render>


              <a-table :columns="columns" :data-source="SaleOrderList" :pagination="{ pageSize: 5 }" bordered>

                  <template #bodyCell="{ column, record }">
                      <template v-if="column.dataIndex === 'saleOrderState'">
                          <span>
                              <a-tag :color="(record.saleOrderState=='未回款') ? '#b0b0b0' :(record.saleOrderState=='已完成')?'green':'volcano' ">

                                  {{ record.saleOrderState}}
                              </a-tag>
                          </span>
                      </template>
                      <template v-if="column.dataIndex === 'orderAmount'">
                          <span style="color: #CFC831; font-size: larger; font-weight: bold ">
                              {{ record.orderAmount}}
                              <!--<a-tag color='#D8CE08'>


                </a-tag>-->
                          </span>
                      </template>

                      <template v-if="column.dataIndex === 'customername'">
                          <span>
                              <a-tag color='geekblue'>

                                  {{ record.customername}}
                              </a-tag>
                          </span>
                      </template>
                      <template v-if="column.dataIndex === 'commercialStage'">
                          <span>
                              <a-tag :color="record.commercialStage=='未选择' ? '#b0b0b0' :'geekblue' ">

                                  {{ record.commercialStage}}
                              </a-tag>
                          </span>
                      </template>


                  </template>


              </a-table>



          </a-tab-pane>
      </a-tabs>
  </div>
  <div class="level level_4">

 </div>
    </div>
</template>

<script lang="ts">
    import { message, Modal } from "ant-design-vue";
    import {
        AddFollowRecord, GeFollowRecordById
    }
        from "../Request/CrmRequest/FollowRecordManagementRequest";

    import {
        GetSaleOrderById
    }
        from "../Request/CrmRequest/SaleOrderManagementRequest";
    


    import { dateFormat } from '../utility/commonFunc'
    import dayjs, { Dayjs } from 'dayjs';
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  watch,
  createVNode,
    } from "vue";
    import store from '../store'

   

export default defineComponent({
   props: { DetailDatas:Object},

     setup (props) {
         const datas = ref<any>(props.DetailDatas);
         const activeKey = ref('跟进记录');
        
         const FRContent = ref<string>('');
         const FRTime = ref<Dayjs>(dayjs(dateFormat("YYYY-mm-dd HH:MM:SS", new Date(), 0), "YYYY-MM-DD HH:mm:ss"));
         const FRType = ref<string>('电话');
         const FRState = ref<string>('正式报价');
         let FRPerson = ref<string>('');

        let FollowRecordList = ref<any>([]);
         let SaleOrderList = ref<any>([]);
         
         const columns = [
             {
                 title: '订单编号',
                 dataIndex: 'saleOrderCode',
             },
             {
                 title: '订单状态',
               
                 dataIndex: 'saleOrderState',
             },
             {
                 title: '客户名称',
                 dataIndex: 'customername',
             },
             
             {
                 title: '订单日期',
                 dataIndex: 'saleOrderTimeStr',
             },
             
             {
                 title: '订单金额',
                 dataIndex: 'orderAmount',
             },

             {
                 title: '销售人员',
                 dataIndex: 'salePerson',
             },
         ];

         //const data = [
         //    {
         //        key: '1',
         //        saleOrderCode: 'John Brown',
         //        saleOrderState: '￥300,000.00',
         //        customername: 'New York No. 1 Lake Park',
         //    }
         //];



     
         onMounted(() => {

             const token = localStorage.getItem("starToken");
            
             let userinfoStr: string = localStorage.getItem("UserName") || "";
             let UserInfo: any = JSON.parse(userinfoStr);
             FRPerson.value = UserInfo.Name;


             var cusId = (datas.value[0]).id;

             GeFollowRecordById({ Id: cusId }).then((res: any) => {
                 FollowRecordList.value = res

                 console.log("FollowRecordList.value", FollowRecordList.value);
             });
             var customerCode = (datas.value[0]).customerCode;
             GetSaleOrderById({ CustomerCode: customerCode }).then((res: any) => {
                 SaleOrderList.value = res

                 console.log("FollowRecordList.value", FollowRecordList.value);
             });


        


             //FollowRecordList.value.push({
             //    Customername: "1",
             //    FollowRecordPerson: "1",
             //    FollowRecordState: "1",
             //    FollowRecordType: "1",
             //    FollowRecordContext: "1",
             //    FollowRecordTimeStr: "1"

             //})
         })
 watch(
      () => props.DetailDatas,
      (newValue) => {
           
          FRContent.value = "";
          console.log("newValue",newValue);
          datas.value = newValue;

          var cusId = (datas.value[0]).id;
        
          GeFollowRecordById({ Id:cusId  }).then((res: any) => {
              FollowRecordList.value = res
          });

          var customerCode = (datas.value[0]).customerCode;
          GetSaleOrderById({ CustomerCode: customerCode }).then((res: any) => {
              SaleOrderList.value = res

              console.log("FollowRecordList.value", FollowRecordList.value);
          });


      }
    );

         let AddFollowRecordBtn = () => {
           
             let params:any = {
                 followRecordContext: FRContent.value,
                 followRecordTimeStr: FRTime.value,
                 followRecordType: FRType.value,
                 followRecordState: FRState.value,
                 followRecordPerson: FRPerson.value,
                 customerCode: (datas.value)[0].customerCode,
                 customername: (datas.value)[0].customername,
                 followRecordTime: FRTime.value,
                 id: (datas.value)[0].id
             }
             

             AddFollowRecord(params).then((res: any) => {
                
                 if (res.isSuccess) {

                     message.success(res.msg);

                     var cusId = (datas.value[0]).id;

                     GeFollowRecordById({ Id: cusId }).then((res: any) => {
                         FollowRecordList.value = res
                     });
                     FRContent.value = "";

                  
                 } else {
                     message.error(res.msg);
                 }
                 
             });

         }





         return {
             datas, activeKey, FRContent, FRTime, FRType, FRState, FRPerson, AddFollowRecordBtn, FollowRecordList,
             SaleOrderList, columns
}
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