import instance from '../../Request/request'

export function GetFollowRecordManagementDatas(param:any):any {
    
    return instance({
        url: '/FollowRecord/SearchByQuery',
        method: 'post',
        data:param,
        transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
            let ret = ''
            for (const it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
    })
  }



  export function GetProduct():any {
    
    return instance({
        url: '/ProductManagement/GetProduct',
        method: 'get',
        //data:param,
       
    })
}


export function AddFollowRecord(param:any):any {
    
    return instance({
        url: '/FollowRecord/AddFollowRecord',
        method: 'post',
        data:param,
        transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
            let ret = ''
            for (const it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
    })
}

export function UpdateProduct(param:any):any {
    
  return instance({
      url: '/ProductManagement/UpdateProduct',
      method: 'post',
      data:param,
      transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
  })
}

export function SetSaleOrderState(param:any):any {
    
  return instance({
      url: '/SaleOrderManagement/SetSaleOrderState',
      method: 'post',
      data:param,
      transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
  })
}
export function DeleteById(param:any):any {
    
  return instance({
      url: '/FollowRecord/DeleteById',
      method: 'post',
      data:param,
      transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
  })
}

export function GeFollowRecordById(param: any): any {

    return instance({
        url: '/FollowRecord/GeFollowRecordById',
        method: 'post',
        data: param,
        transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
            let ret = ''
            for (const it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
    })
}




export function BatchDelete(param:any):any {
    
  return instance({
      url: '/FollowRecord/BatchDelete',
      method: 'post',
      data:param,
      transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
  })
}

export function BatchExport(param:any):any {
    
  return instance({
      url: '/FollowRecord/BatchExport',
      method: 'post',
      data:param,
    
      responseType: 'blob',
      transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
  })
}


export function CopyDataById(param:any):any {
    
  return instance({
      url: '/ProductManagement/CopyDataById',
      method: 'post',
      data:param,
      transformRequest: [function (data) {//加这个post发送数据到后台才能接收到数据，否则接收不到
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
  })
}
