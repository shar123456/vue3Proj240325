const SearchUserColumns = [
    {title: '名字',width:100, dataIndex: 'name',},
 
    { title: '性别',width:100, dataIndex: 'gender', },
    { title: '手机号',width:100, dataIndex: 'phone',  },
  
    { title: '操作', dataIndex: 'sysUserId', key: 'operation',width:60, slots: { customRender: 'action' } },
  ];


  const SearchFlowColumns = [

 
    { title: '流程编号',width:100, dataIndex: 'flowNo', },
    {title: '流程名称',width:100, dataIndex: 'flowName',},
 
  
    { title: '操作', dataIndex: 'flowId', key: 'operation',width:60, slots: { customRender: 'action' } },
  ];


  const SearchProductColumns = [

    // { title: '操作', dataIndex: 'action:', key: 'operation',width:20, slots: { customRender: 'action' },fixed:'left' },
    { title: '产品名称',width:100, dataIndex: 'productName', },
    {title: '产品代码',width:100, dataIndex: 'productCode',},
    { title: '操作', dataIndex: 'id', key: 'operation',width:60, slots: { customRender: 'action' } },
 
  
 
  ];

  const SearchCustomerColumns = [

   
    { title: '客户名称',width:100, dataIndex: 'customername', },
    {title: '客户编号',width:100, dataIndex: 'customerCode',},
 
      { title: '操作', dataIndex: 'id', key: 'operation', width: 60, slots: { customRender: 'action' } },
 
  ];
  export {SearchUserColumns,SearchFlowColumns,SearchProductColumns,SearchCustomerColumns}