
import {dateFormat} from '../../utility/commonFunc'
import dayjs, { Dayjs } from 'dayjs';
interface ICustomerInfo {
    id: string;
    customerCode:string; //客户编号
    clueCode:string; //线索编号
    customername:string;//客户姓名
    
    mobilePhone:string;//备注
    phone:string;//备注
    industry:string;//备注
    email:string;//备注

    customerType:string;//备注
    customerOrigin:string;//备注
    customerLevel:string;//备注
    address:string;//备注
    contactPerson: string;//备注

    city:string;//备注
    province:string;//备注
    nextContactTimeStr:any;//备注

    lastFollowTimeStr:any;//备注

remark:string;//备注
createrStr: string;//创建人
     createTimeStr: string;
    key: string;
    TmStamp:string[];
  }

  interface ICustomerQueryInfo {
    customerCode: string;
    customername: string;
    industry: string;
    
    phone:string;
}

const CustomerColumns = [
  
  {  oldTitle: '客户编号',title: '客户编号',width:130, dataIndex: 'customerCode', isUse: true,configOrder: 1 ,resizable: true,ellipsis: true,}, 
    { oldTitle: '客户名称', title: '客户名称',width:170, dataIndex: 'customername', isUse: true,configOrder: 2  ,resizable: true,ellipsis: true },
    
   


    {  oldTitle: '手机号',title: '手机号',width:105,  dataIndex: 'mobilePhone', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true,},
    {  oldTitle: '电话',title: '电话',width:110,  dataIndex: 'phone', isUse: true,configOrder: 4 ,resizable: true,ellipsis: true,},
    { oldTitle: '联系人', title: '联系人', width: 110, dataIndex: 'contactPerson', isUse: true, configOrder: 5, resizable: true, ellipsis: true, },
    
    {  oldTitle: '行业',title: '行业',width:120,  dataIndex: 'industry', isUse: true,configOrder: 6 ,resizable: true,ellipsis: true,},
   
    {  oldTitle: '线索类型',title: '客户类型',width:80, dataIndex: 'customerType', isUse: true,configOrder: 7 ,resizable: true,ellipsis: true},
    {  oldTitle: '线索来源 ',title: '客户来源 ',width:100, dataIndex: 'customerOrigin',isUse: true,configOrder:8 ,resizable: true,ellipsis: true},
  
    {  oldTitle: '客户级别 ',title: '客户级别 ',width:80, dataIndex: 'customerLevel',isUse: true,configOrder: 9 ,resizable: true,ellipsis: true},


   
    {  oldTitle: '线索编号',title: '线索编号',width:130,  dataIndex: 'clueCode', isUse: true,configOrder: 10 ,resizable: true,ellipsis: true,},

   
  
  
    
 
    
    {  oldTitle: '地址',title: '详细地址',width:160,  dataIndex: 'address', isUse: true,configOrder: 18 ,resizable: true,ellipsis: true,},
    
    {  oldTitle: '省份',title: '省份',width:100,  dataIndex: 'province', isUse: true,configOrder: 19 ,resizable: true,ellipsis: true,},
    {  oldTitle: '城市',title: '城市',width:100,  dataIndex: 'city', isUse: true,configOrder: 20 ,resizable: true,ellipsis: true,},
   
 
    {  oldTitle: '创建人',title: '创建人',width:110,  dataIndex: 'createrStr', isUse: true,configOrder: 22 ,resizable: true,ellipsis: true,},
    {  oldTitle: '创建时间',title: '创建时间',width:110,  dataIndex: 'createTimeStr', isUse: true,configOrder: 23 ,resizable: true,ellipsis: true,},
    {  oldTitle: '备注',title: '备注',width:170,  dataIndex: 'remark', isUse: true,configOrder:24,resizable: true,ellipsis: true,},
    {  oldTitle: '操作',title: '操作',dataIndex: 'id', key: 'operation',width:153, slots: { customRender: 'action' } ,isUse: true,configOrder:25,fixed: 'right', },

  ];
  



const CustomerDatas=[
    {
        id:"TT2205280001",
       
        customerCode: "MD1586587",

        customername: "D669985",
        stockCode: "济南通合制造",
        industry: "电子",
        currency: "暂无",
        employeeQty: 12,
        customerSource:"线索转换",
      createTimeStr:"2022-06-23 12:36:52",
      key: "0001",
    }]
    class CustomerEntity{
        BtnConfigInfo:any={
          RefreshBtn:true,
          ClearQueryBtn:true,
          SearchBtn:true,
          ConfigExport:true,
          ExportExcel:true,
          ConfigGridBtn:true,
          CreateBtn:true,
          BatchDeleteBtn:true,

          ClueShiftBtn:false,
          ImportExcel:true,
        }


        EditData:ICustomerInfo={
          id: "",
          clueCode:"", //线索编号
          customerCode:"",  //线索所有者
          customername:"",//姓名
      
         
          
          industry:"其他",//行业
        
          mobilePhone:"",//行业
          phone:"",//行业
          email:"",//行业
          customerType:"手动",//行业
          customerOrigin:"其他",//行业
          customerLevel:"普通客户",//行业
          address:"",//行业
          city:"",//行业
            contactPerson: "",//行业
          province:"",//行业
            
          nextContactTimeStr: dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),"YYYY-MM-DD HH:mm:ss"),
      
          lastFollowTimeStr: dayjs(dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),"YYYY-MM-DD HH:mm:ss"),
      remark:"",//备注
      createrStr: "",//创建人
         


  createTimeStr:  dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),
  key:  "",
  TmStamp:[]
    }








    

        QueryConditionInfo:any={
           
          customerCode: "",
          customername: "",
        
          industry: "",
        
          phone:"",
          }
          QueryConditionInfoConfig:any={
            customerCode:{
              name:"客户编号",
              type:"text"
            },
            
            customername:{
              name:"客户姓名",
              type:"text"
            },
            industry:{
              name:"行业",
              type:"text"
            },
            phone:{
              name:"电话",
              type:"text"
            },
           
          }

         
         
        DataList:Array<ICustomerInfo>=[];
        
        ListColumns:any=[];
        ListGridColumns:any=[];
        selectedRowKeys:string[]= [];
        selectedRows:ICustomerInfo[]= [];
        ClueDatas:any=CustomerDatas;
        ExportColumns:any=[];

      


      }


      const ExportColumns = [
    
        { name:"CustomerCode",oldTitle: '客户编号', currentTitle: '客户编号', isUse: true,configOrder: 1 },
        { name:"Customername",oldTitle: '客户名称', currentTitle: '客户名称', isUse: true,configOrder: 2 },
          { name: "MobilePhone", oldTitle: '手机号', currentTitle: '手机号', isUse: true,configOrder: 3 },
          { name: "Phone", oldTitle: '电话', currentTitle: '电话', isUse: true,configOrder: 4 },
        { name:"Industry",oldTitle: '行业', currentTitle: '行业', isUse: true,configOrder: 5 },
          { name: "Email", oldTitle: 'Email', currentTitle: 'Email', isUse: true,configOrder: 6},
          { name: "CustomerType", oldTitle: '客户类型', currentTitle: '客户类型', isUse: true,configOrder: 7},
          { name: "CustomerOrigin", oldTitle: '客户来源', currentTitle: '客户来源', isUse: true,configOrder: 8 },
          { name: "CustomerLevel", oldTitle: '客户级别', currentTitle: '客户级别', isUse: true,configOrder: 9 },
        
        { name:"Address",oldTitle: '地址', currentTitle: '地址', isUse: true,configOrder: 12 },
        { name:"Province",oldTitle: '省份', currentTitle: '省份', isUse: true,configOrder: 13 },
        { name:"City",oldTitle: '城市', currentTitle: '城市', isUse: true,configOrder: 14 },
    

        
      ];









   
   
    export {ICustomerInfo,CustomerColumns,CustomerEntity,ExportColumns}