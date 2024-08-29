import {dateFormat} from '../../utility/commonFunc'
import dayjs, { Dayjs } from 'dayjs';
interface IFollowRecordInfo {
    id: string;
    customerCode: string;  
    customername:string;
 
    followRecordPerson:string;
    followRecordState:string;
    followRecordType: string;
    followRecordContext: string;
    followRecordTimeStr: string;
  
    key: string;
    TmStamp: string[];

  }

interface IFollowRecordQueryInfo {
    customername: string;
    followRecordStartTime: Dayjs;
    followRecordEndTime: Dayjs;
   
}

const FollowRecordColumns = [
  
  
    { oldTitle: '客户名称', title: '客户名称', width: 95, dataIndex: 'customername', isUse: true,configOrder: 3 ,resizable: true,ellipsis: true},
   
    
   
    { oldTitle: '跟进时间', title: '跟进时间', width: 85, dataIndex: 'followRecordTimeStr', isUse: true, configOrder: 4, resizable: true, ellipsis: true, },
    
    { oldTitle: '跟进方式', title: '跟进方式', width: 50, dataIndex: 'followRecordType', isUse: true,configOrder: 5  ,resizable: true,ellipsis: true,},
  
    { oldTitle: '跟进状态', title: '跟进状态', width: 50, dataIndex: 'followRecordState', isUse: true, configOrder: 6, resizable: true, ellipsis: true, },
   
    { oldTitle: '跟进人员', title: '跟进人员', width: 50, dataIndex: 'followRecordPerson', isUse: true, configOrder: 7, resizable: true, ellipsis: true, },
    { oldTitle: '跟进内容', title: '跟进内容', width: 360, dataIndex: 'followRecordContext', isUse: true, configOrder: 8, resizable: true, ellipsis: true, },
 
   
    
    {  oldTitle: '操作',title: '操作',dataIndex: 'id', key: 'operation',width:33, slots: { customRender: 'action' } ,isUse: true,configOrder: 10,fixed: 'right', },

  ];











const FollowRecordDatas=[
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
class FollowRecordEntity{
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


    EditData:IFollowRecordInfo={
          id: "",
        customerCode:  "",
        customername:  "",
      
      
        followRecordPerson: "",
        followRecordState: "",
        followRecordType: "",
        followRecordContext: "",
        
       
         

        followRecordTimeStr:  dateFormat("YYYY-mm-dd HH:MM:SS",new Date(),0),
  key:  "",
  TmStamp:[]
    }










        QueryConditionInfo:any={
           
            customername: "",
            followRecordStartTime: dayjs(dateFormat("YYYY-mm-dd HH:MM:SS", new Date(), -11), "YYYY-MM-DD HH:mm:ss"),
        
            followRecordEndTime: dayjs(dateFormat("YYYY-mm-dd HH:MM:SS", new Date(), 0), "YYYY-MM-DD HH:mm:ss"),
          
          }
          QueryConditionInfoConfig:any={
              customername:{
              name:"客户名称",
              type:"text"
            },
              followRecordStartTime:{
              name:"开始时间",
                  type:"Day"
            },
              followRecordEndTime:{
              name:"结束时间",
                  type:"Day",
                 
            },
           
          }

         
         
    DataList: Array<IFollowRecordInfo>=[];
    Selectkeys: string[] = [];
        ListColumns:any=[];
        ListGridColumns:any=[];
        selectedRowKeys:string[]= [];
    selectedRows:IFollowRecordInfo[]= [];
   FollowRecordDatas: any =FollowRecordDatas;
        ExportColumns:any=[];

      


      }










      const ExportColumns = [
          { name: "Customername", oldTitle: '客户名称', currentTitle: '客户名称', isUse: true,configOrder: 1 },
          { name: "FollowRecordTimeStr", oldTitle: '跟进时间', currentTitle: '跟进时间', isUse: true,configOrder: 2 },
          { name: "FollowRecordType", oldTitle: '跟进方式', currentTitle: '跟进方式', isUse: true,configOrder: 3 },
          { name: "FollowRecordState", oldTitle: '跟进状态', currentTitle: '跟进状态', isUse: true,configOrder: 4 },
          { name: "FollowRecordPerson", oldTitle: '跟进人员', currentTitle: '跟进人员', isUse: true,configOrder: 5 },
          { name: "FollowRecordContext", oldTitle: '跟进内容', currentTitle: '跟进内容', isUse: true,configOrder: 6},
         
       
      
      ];

   


export { IFollowRecordInfo, FollowRecordColumns, FollowRecordEntity, ExportColumns }