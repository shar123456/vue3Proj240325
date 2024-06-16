import {dateFormat} from '../../utility/commonFunc'
import dayjs, { Dayjs } from 'dayjs';
interface IClueInfo {
    id: string;
    clueCode:string; //线索编号
    code: string;  
    name:string;
    mobilePhone:string;
    phone:string;
    industry:string;
    email:string;
    clueType:string;
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

  interface IClueQueryInfo {
   clueCode: string;
    name: string;
    mobilePhone: string;
    
    rate:string; firm?:string;
}

const ClueColumns = [
  
  {  oldTitle: '线索编号',title: '线索编号',width:120, dataIndex: 'clueCode', isUse: true,configOrder: 1 ,resizable: true,ellipsis: true,}, 
  { oldTitle: '名称', title: '名称',width:180, dataIndex: 'name', isUse: true,configOrder: 2  ,resizable: true,ellipsis: true },
  {  oldTitle: '手机',title: '手机',width:105, dataIndex: 'mobilePhone', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
   
  {  oldTitle: '电话',title: '电话',width:110, dataIndex: 'phone', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
  {  oldTitle: '行业',title: '行业',width:100, dataIndex: 'industry', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
  {  oldTitle: '邮箱',title: '邮箱',width:150, dataIndex: 'email', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
  {  oldTitle: '线索类型',title: '线索类型',width:70, dataIndex: 'clueType', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
  {  oldTitle: '线索来源 ',title: '线索来源 ',width:100, dataIndex: 'clueOrigin',isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

  {  oldTitle: '客户级别 ',title: '客户级别 ',width:80, dataIndex: 'customerLevel',isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

  {  oldTitle: '详细地址 ',title: '详细地址 ',width:150, dataIndex: 'address', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

  {  oldTitle: '城市 ',title: '城市 ',width:70, dataIndex: 'city', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
  {  oldTitle: '省会 ',title: '省会 ',width:70, dataIndex: 'province', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

  {  oldTitle: '下次联系时间 ',title: '下次联系时间 ',width:130, dataIndex: 'nextContactTimeStr', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
  {  oldTitle: '最后跟进时间 ',title: '最后跟进时间 ',width:130, dataIndex: 'lastFollowTimeStr', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

  {  oldTitle: '创建时间 ',title: '创建时间 ',width:130, dataIndex: 'createTimeStr', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},

    {  oldTitle: '操作',title: '操作',dataIndex: 'id', key: 'operation',width:163, slots: { customRender: 'action' } ,isUse: true,configOrder: 33,fixed: 'right', },

  ];
  



const ClueDatas=[
    {
        id:"TT2205280001",
       
        clueCode: "MD1586587",

        clueOwner: "D669985",
        name: "济南通合制造",
        position: "电子",
        company: "暂无",
        employeeQty: 12,
        contactShiftMark:true,
        customerShiftMark:true,
        businessShiftMark:true,
        belongArea:"华北",
      createTimeStr:"2022-06-23 12:36:52",
      key: "0001",
    }]
    class ClueEntity{
        BtnConfigInfo:any={
          RefreshBtn:true,
          ClearQueryBtn:true,
          SearchBtn:true,
          ConfigExport:false,
          ExportExcel:false,
          ConfigGridBtn:true,
          CreateBtn:true,
          BatchDeleteBtn:false,

          ClueShiftBtn:true,
          ImportExcel:true,
        }


        EditData:any={
          id: "",
          clueCode: "",
          name:"",
   mobilePhone:"",
    phone:"",
        
  
          

    industry: "",
    email: "",
    clueType: "手动",
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
           
          // clueCode: "",
          name: "",
        
          mobilePhone: "",
        
          clueType: "未选择",
 

          }
          QueryConditionInfoConfig:any={
            // clueCode:{
            //   name:"线索编号",
            //   type:"text"
            // },
            
            name:{
              name:"姓名",
              type:"text"
            },
            mobilePhone:{
              name:"手机号",
              type:"text"
            },
            clueType:{
              name:"线索类型",
              type:"select",
              optionValueArray:["未选择","手动","导入","领取"]
            },
          
           
          }

         Selectkeys: string[] = [];
         
        DataList:Array<IClueInfo>=[];
        
        ListColumns:any=[];
        ListGridColumns:any=[];
        selectedRowKeys:string[]= [];
        selectedRows:IClueInfo[]= [];
        ClueDatas:any=ClueDatas;
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

   
   
    export {IClueInfo,ClueColumns,ClueEntity,ExportColumns}