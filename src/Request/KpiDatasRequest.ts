import instance from './request'
export function GetCommercialProdRelation():any {
    
  return instance({
      url: '/KpiDatas/GetCommercialProdRelation',
      method: 'get',
      //data:param,
     
  })
}



