import { Collapse } from 'ant-design-vue';
import { deburr } from 'lodash';
import { createStore } from 'vuex'
import {login,register,getCode} from '../Request/login'
export default createStore({
  state: {
    TOKEN: "",
    USERNAME:(localStorage.getItem("UserName")==''||localStorage.getItem("UserName")==undefined||localStorage.getItem("UserName")==null)?[] :localStorage.getItem("UserName"),
    CollapseMark:true,
    NewMessageMark:false,
    allRoutes:[],
    AduitTaskCount:0,
    CollectList: localStorage.getItem("starCollect") ? JSON.parse(localStorage.getItem("starCollect")??"") : [],
  },
  //如果state中的值需要过滤或者有其他操作，那么就放在getter中处理
getters:{
  reverseUserName:function(state){
   // return state.USERNAME?.split('').reverse().join('');
  },
  reverseUserNameLength:function(state,getters)//getters这个参数表示当前store中的getters对象
  {
    return getters.reverseUserName.length;
  }
},


  mutations: {
    set_allRoutes(state, payLoad){
      //console.log("payLoadallRoutes",payLoad)
      state.allRoutes=payLoad
    }
    ,
    SetToken(state, payLoad) {
      state.TOKEN = payLoad;
    },
    SetUserName(state, payLoad) {
      console.log("Current Use Info",payLoad);
      state.USERNAME = payLoad;
      localStorage.setItem("UserName",   JSON.stringify(payLoad));
   
    },
    SetAduitTaskCount(state, payLoad) {
      console.log("SetAduitTaskCount",payLoad);
      state.AduitTaskCount = payLoad;
    },
  },
  actions: {
     LoginSys({commit},payLoad){
     return new Promise((resolve)  => {
        const {user,password,loginType}=payLoad;
        setTimeout(  ()  => {          
           login({user,password,loginType}).then((res:any)=>{
       
              if (!res.result) {
                resolve({result:false,msg:res.msg});
              } else {
                commit("SetToken",res.token);
                commit("SetUserName",res.userEntity);
               
                localStorage.setItem("starToken","Bearer "+res.token);
                resolve({result:true,msg:""});
               }
            }).catch((err:any)=>{
              console.log(err);
              resolve({result:false,msg:"网络异常,通讯失败."});
            });
        }, 200);
      });
    },
    LoginSysApp({commit},payLoad){
      return new Promise((resolve)  => {
         const {user,password,loginType}=payLoad;
         setTimeout(  ()  => {          
          commit("SetToken","1234567");
          commit("SetUserName",user);
          
          localStorage.setItem("starToken","Bearer "+"1234567");
          resolve({result:true,msg:""});
         }, 200);
       });
     },
    RegisterSys({commit},payLoad){
      return new Promise((resolve)  => {
         
         setTimeout(  ()  => {          
          register(payLoad).then((res:any)=>{
               if (!res.result) {
                 resolve({result:false,msg:res.msg});
               } else {
                commit("SetToken","");
                commit("SetUserName","***");
                 resolve({result:true,msg:""});
                }
             }).catch((err:any)=>{
               console.log(err);
               resolve({result:false,msg:"网络异常,通讯失败."});
             });
         }, 1);
       });
     },
     GetCodeSys({commit}){
      return new Promise((resolve)  => {
         
         setTimeout(  ()  => {          
          getCode().then((res:any)=>{
               if (!res.success) {
                 resolve(false);
               } else {
                
                 resolve(res);
                }
             }).catch((err:any)=>{
               console.log(err);
               resolve(false);
             });
         }, 1);
       });
     }
,
     addCollect({ commit, state }, payLoad) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (payLoad) {
                  var collectId = state.CollectList.map(((i:any) => {
                      return i.id
                  }));

                  collectId.sort((a:any, b:any) => {
                      return b - a;
                  })
                  let id = 0;
                  if (collectId && collectId.length > 0) {
                      id = collectId[0];
                  }
                  let Pid = payLoad.content.ProductId;
                  if (state.CollectList.findIndex((i:any) => i.ProductId == Pid) >= 0) {
                      resolve(true)

                  } else {
                      state.CollectList.push({
                          ...payLoad.content,
                          id: id + 1

                      });
                      localStorage.setItem(
                          "starCollect",
                          JSON.stringify(state.CollectList)
                      );
                      resolve(true)
                  }


              }
          }, 100);
      });

  },
  GetCollectList({ commit, state }, payLoad) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {

              resolve(state.CollectList)

          }, 100);
      });
  },


  },
  modules: {
  }
})
