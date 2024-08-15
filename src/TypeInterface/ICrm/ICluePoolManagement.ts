import {dateFormat} from '../../utility/commonFunc'
import dayjs, { Dayjs } from 'dayjs';
interface ICluePoolInfo {
    id: string;
    code: string;  
    name:string;
    mobilePhone:string;
    phone:string;
    industry:string;
    email:string;
    clueState:string;
    clueOrigin: string;

    customerLevel: string;
    address: string;
    province: string;
    city: string;
    nextContactTimeStr:  any;


    lastFollowTimeStr: any;
    remark: string;

    
    createrStr: string;
    createTimeStr: string;

    key: string;
    TmStamp:string[];
  }

  interface ICluePoolQueryInfo {
    code: string;
    name: string;
    
   
}



       

      








const CluePoolColumns = [
  
  {  oldTitle: '编号',title: '编号',width:120, dataIndex: 'code', isUse: true,configOrder: 1 ,resizable: true,ellipsis: true,}, 
    { oldTitle: '名称', title: '名称',width:180, dataIndex: 'name', slots: { customRender: 'action1' },isUse: true,configOrder: 2  ,resizable: true,ellipsis: true },
    {  oldTitle: '手机',title: '手机',width:105, dataIndex: 'mobilePhone', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
   
    {  oldTitle: '电话',title: '电话',width:110, dataIndex: 'phone', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
    {  oldTitle: '行业',title: '行业',width:100, dataIndex: 'industry', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
    {  oldTitle: '邮箱',title: '邮箱',width:150, dataIndex: 'email', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
    {  oldTitle: '线索状态',title: '线索状态',width:80, dataIndex: 'clueState', slots: { customRender: 'clueState' },isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
    {  oldTitle: '线索来源 ',title: '线索来源 ',width:100, dataIndex: 'clueOrigin', slots: { customRender: 'clueOrigin' },isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

    {  oldTitle: '客户级别 ',title: '客户级别 ',width:84, dataIndex: 'customerLevel', slots: { customRender: 'customerLevel' },isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

    {  oldTitle: '详细地址 ',title: '详细地址 ',width:150, dataIndex: 'address', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

    {  oldTitle: '城市 ',title: '城市 ',width:70, dataIndex: 'city', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
    {  oldTitle: '省会 ',title: '省会 ',width:70, dataIndex: 'province', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

    {  oldTitle: '下次联系时间 ',title: '下次联系时间 ',width:130, dataIndex: 'nextContactTimeStr', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
    {  oldTitle: '最后跟进时间 ',title: '最后跟进时间 ',width:130, dataIndex: 'lastFollowTimeStr', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

    {  oldTitle: '创建时间 ',title: '创建时间 ',width:130, dataIndex: 'createTimeStr', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

    {  oldTitle: '操作',title: '操作',dataIndex: 'id', key: 'operation',width:240, slots: { customRender: 'action' } ,isUse: true,configOrder: 10,fixed: 'right', },

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
    class CluePoolEntity{
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


        EditData:ICluePoolInfo={
          id: "",
          code: "",
          name:"",
   mobilePhone:"",
    phone:"",
        
  
          

            industry: "其他",
    email: "",
    clueState: "正常",
    clueOrigin:  "其他",

    customerLevel: "普通客户",
    address:  "",
    province: "",
    city:  "",
    nextContactTimeStr:   dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),"YYYY-MM-DD HH:mm:ss"),


    lastFollowTimeStr:   dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),"YYYY-MM-DD HH:mm:ss"),
    remark: "",

    
    createrStr:  "",



  createTimeStr:  dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),
  key:  "",
  TmStamp:[]
    }










        QueryConditionInfo:any={
           
          code: "",
          name: "",
        
          
          }
          QueryConditionInfoConfig:any={
            code:{
              name:"编号",
              type:"text"
            },
            name:{
              name:"名称",
              type:"text"
            },
           
           
          }

         
         
        DataList:Array<ICluePoolInfo>=[];
        
        ListColumns:any=[];
        ListGridColumns:any=[];
        selectedRowKeys:string[]= [];
        selectedRows:ICluePoolInfo[]= [];
        ProductDatas:any=ProductDatas;
        ExportColumns:any=[];

      


      }


      
      

   
   
    export {ICluePoolInfo,CluePoolColumns,CluePoolEntity}