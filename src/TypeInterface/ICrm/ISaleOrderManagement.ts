import {dateFormat} from '../../utility/commonFunc'

interface ISaleOrderInfo {
    id: string;
    customerCode: string;  
    customername:string;
    commercialCode:string;
    commercialName:string;
    saleOrderCode:string;
    orderAmount:number;
    saleOrderType: string;
    salePerson: string;
    saleOrderState: string;
    remark: string;
    createrStr:string;
    saleOrderTimeStr: number;
    key: string;
    TmStamp: string[];
  }

interface ISaleOrderQueryInfo {
    customername: string;
    saleOrderCode: string;
    saleOrderState: string;
   
}

const SaleOrderColumns = [
  
    { oldTitle: '订单编号', title: '订单编号', width: 70, dataIndex: 'saleOrderCode', isUse: true,configOrder: 1 ,resizable: true,ellipsis: true,}, 
    { oldTitle: '订单状态', title: '订单状态', width: 55, dataIndex: 'saleOrderState', isUse: true,configOrder: 2  ,resizable: true,ellipsis: true },
    { oldTitle: '客户名称', title: '客户名称', width: 95, dataIndex: 'customername', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
   
    
   
    { oldTitle: '订单日期', title: '订单日期', width: 105, dataIndex: 'saleOrderTimeStr', isUse: true, configOrder: 4, resizable: true, ellipsis: true, },
    
    { oldTitle: '订单金额', title: '订单金额', width: 80, dataIndex: 'orderAmount', isUse: true,configOrder: 5  ,resizable: true,ellipsis: true,},
  
    { oldTitle: '订单类型', title: '订单类型', width: 60, dataIndex: 'saleOrderType', isUse: true, configOrder: 6, resizable: true, ellipsis: true, },
   
    { oldTitle: '商机名称', title: '商机名称', width: 60, dataIndex: 'commercialName', isUse: true, configOrder: 7, resizable: true, ellipsis: true, },
    { oldTitle: '销售人员', title: '销售人员', width: 60, dataIndex: 'salePerson', isUse: true, configOrder: 8, resizable: true, ellipsis: true, },
    { oldTitle: '备注', title: '备注', width: 130, dataIndex: 'remark', isUse: true,configOrder: 9,resizable: true,ellipsis: true},
   
    
    {  oldTitle: '操作',title: '操作',dataIndex: 'id', key: 'operation',width:73, slots: { customRender: 'action' } ,isUse: true,configOrder: 10,fixed: 'right', },

  ];











const SaleOrderDatas=[
    {
        id:"TT2205280001",
        productName:"DSMZ-171-TH(ESD)",
      productCode: "MD1586587",

      vendorID: "D669985",
      vendorName: "济南通合制造",
      productCategory: "电子",
      description: "暂无",
     
      createTimeStr:"2022-06-23 12:36:52",
      key: "0001",
    }]
class SaleOrderEntity{
        BtnConfigInfo:any={
          RefreshBtn:true,
          ClearQueryBtn:true,
          SearchBtn:true,
          ConfigExport:true,
          ExportExcel:true,
          ConfigGridBtn:true,
            CreateBtn: false,
          BatchDeleteBtn:true,
          ClueShiftBtn:false,
          ImportExcel:false,
          
        }


    EditData:ISaleOrderInfo={
          id: "",
        customerCode:  "",
        customername:  "",
        commercialCode:  "",
        commercialName:  "",
        saleOrderCode:  "",
        orderAmount: 0,
  
        saleOrderType:"",
  
        salePerson: "",
        saleOrderState: "",
        remark:  "",
        createrStr: "",
       
         

        saleOrderTimeStr:  dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),
  key:  "",
  TmStamp:[]
    }










        QueryConditionInfo:any={
           
            customername: "",
            saleOrderCode: "",
        
            saleOrderState: "未选择",
          
          }
          QueryConditionInfoConfig:any={
              customername:{
              name:"客户名称",
              type:"text"
            },
              saleOrderCode:{
              name:"订单编号",
              type:"text"
            },
              saleOrderState:{
              name:"订单状态",
              type:"select",
                  optionValueArray: ["未选择","未回款","部分回款","已完成"]
            },
           
          }

         
         
    DataList: Array<ISaleOrderInfo>=[];
    Selectkeys: string[] = [];
        ListColumns:any=[];
        ListGridColumns:any=[];
        selectedRowKeys:string[]= [];
    selectedRows:ISaleOrderInfo[]= [];
   SaleOrderDatas: any =SaleOrderDatas;
        ExportColumns:any=[];

      


      }


      const ExportColumns = [
          { name: "saleOrderCode", oldTitle: '订单编号', currentTitle: '订单编号', isUse: true,configOrder: 1 },
          { name: "saleOrderState", oldTitle: '订单状态', currentTitle: '订单状态', isUse: true,configOrder: 2 },
          { name: "customername", oldTitle: '客户名称', currentTitle: '客户名称', isUse: true,configOrder: 3 },
          { name: "saleOrderTimeStr", oldTitle: '订单日期', currentTitle: '订单日期', isUse: true,configOrder: 4 },
          { name: "orderAmount", oldTitle: '订单金额', currentTitle: '订单金额', isUse: true,configOrder: 5 },
          { name: "saleOrderType", oldTitle: '订单类型', currentTitle: '订单类型', isUse: true,configOrder: 6},
          { name: "commercialName", oldTitle: '商机名称', currentTitle: '商机名称', isUse: true,configOrder: 8 },
          { name: "salePerson", oldTitle: '销售人员', currentTitle: '销售人员', isUse: true,configOrder: 9 },
          { name: "remark", oldTitle: '备注', currentTitle: '备注', isUse: true,configOrder: 10 },
       
      
      ];

   


export { ISaleOrderInfo, SaleOrderColumns, SaleOrderEntity, ExportColumns }