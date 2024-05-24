import {dateFormat} from '../../utility/commonFunc'

interface IStockInfo {
    id: string;
    productName: string;  
    productCode:string;
    vendorID:string;
    vendorName:string;
    remainQty:number;
    totalQty:number;
    stockBatchId:string;
    unit: string;
     
    createTimeStr: string;

    key: string;
    TmStamp:string[];
  }

  interface IStockQueryInfo {
    productName: string;
    productCode: string;
    vendorID: string;
   
}

const StockColumns = [
  
  {  oldTitle: '产品名称',title: '产品名称',width:150, dataIndex: 'productName', isUse: true,configOrder: 1 ,resizable: true,ellipsis: true,}, 
    { oldTitle: '产品代码', title: '产品代码',width:180, dataIndex: 'productCode', isUse: true,configOrder: 2  ,resizable: true,ellipsis: true },
    {  oldTitle: '供应商编号',title: '供应商编号',width:150, dataIndex: 'vendorID', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
   
    
    {  oldTitle: '供应商名',title: '供应商名',width:150,  dataIndex: 'vendorName', isUse: true,configOrder: 4  ,resizable: true,ellipsis: true,},
    {  oldTitle: '批次',title: '批次',width:150,  dataIndex: 'stockBatchId', isUse: true,configOrder: 5  ,resizable: true,ellipsis: true,},
    {  oldTitle: '单位',title: '单位',width:50,  dataIndex: 'unit', isUse: true,configOrder: 6 ,resizable: true,ellipsis: true,},
    {  oldTitle: '剩余库存',title: '剩余库存',width:90,  dataIndex: 'remainQty', isUse: true,configOrder: 7  ,resizable: true,ellipsis: true,},
    {  oldTitle: '总库存',title: '总库存',width:90,  dataIndex: 'totalQty', isUse: true,configOrder: 8  ,resizable: true,ellipsis: true,},
    {  oldTitle: '创建时间',title: '创建时间',width:160, dataIndex: 'createTimeStr', isUse: true,configOrder: 9,resizable: true ,ellipsis: true,},
    
    {  oldTitle: '操作',title: '操作',dataIndex: 'id', key: 'operation',width:123, slots: { customRender: 'action' } ,isUse: true,configOrder: 10,fixed: 'right', },

  ];
  



const ProductDatas=[
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
    class StockEntity{
        BtnConfigInfo:any={
          RefreshBtn:true,
          ClearQueryBtn:true,
          SearchBtn:true,
          ConfigExport:false,
          ExportExcel:false,
          ConfigGridBtn:false,
          CreateBtn:true,
          BatchDeleteBtn:true,
          ClueShiftBtn:false,
          ImportExcel:false,
          
        }


        EditData:IStockInfo={
          id: "",
          productName:  "",
          productCode:  "",
          vendorID:  "",
          vendorName:  "",
        
  
          unit:"",
  
        remainQty: 0,
          totalQty: 0,
          stockBatchId:  "",
         





  createTimeStr:  dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),
  key:  "",
  TmStamp:[]
    }










        QueryConditionInfo:any={
           
            productName: "",
            productCode: "",
        
            vendorID: "",
          
          }
          QueryConditionInfoConfig:any={
            productName:{
              name:"产品名称",
              type:"text"
            },
            productCode:{
              name:"产品代码",
              type:"text"
            },
            vendorID:{
              name:"供应商编号",
              type:"text",
             
            },
           
          }

         
         
        DataList:Array<IStockInfo>=[];
        
        ListColumns:any=[];
        ListGridColumns:any=[];
        selectedRowKeys:string[]= [];
        selectedRows:IStockInfo[]= [];
        ProductDatas:any=ProductDatas;
        ExportColumns:any=[];

      


      }


      const ExportColumns = [
        { name:"ProductName",oldTitle: '产品名称', currentTitle: '产品名称', isUse: true,configOrder: 1 },
        { name:"ProductCode",oldTitle: '产品代码', currentTitle: '产品代码', isUse: true,configOrder: 2 },
        { name:"VendorID",oldTitle: '供应商编号', currentTitle: '供应商编号', isUse: true,configOrder: 3 },
        {name:"VendorName", oldTitle: '供应商名', currentTitle: '供应商名', isUse: true,configOrder: 4 },
        { name:"UnitPrice",oldTitle: '单价', currentTitle: '单价', isUse: true,configOrder: 5 },
        {name:"Volume", oldTitle: '体积', currentTitle: '体积', isUse: true,configOrder: 6},
        { name:"VolumeSize",oldTitle: '体积单位', currentTitle: '体积单位', isUse: true,configOrder: 8 },
        { name:"Weight",oldTitle: '重量', currentTitle: '重量', isUse: true,configOrder: 9 },
        { name:"WeightUnit",oldTitle: '重量单位', currentTitle: '重量单位', isUse: true,configOrder: 10 },
        { name:"GrossWeight",oldTitle: '毛重', currentTitle: '毛重', isUse: true,configOrder: 11 },
        { name:"NetWeight",oldTitle: '净重', currentTitle: '净重', isUse: true,configOrder:12 },
        { name:"ProductCategory",oldTitle: '产品类别', currentTitle: '产品类别', isUse: true,configOrder: 13 },
        { name:"Description",oldTitle: '描述', currentTitle: '描述', isUse: true,configOrder: 14 },
        { name:"CreateTimeStr",oldTitle: '创建时间', currentTitle: '创建时间', isUse: false,configOrder: 15 },
    
      
      ];

   
   
    export {IStockInfo,StockColumns,StockEntity,ExportColumns}