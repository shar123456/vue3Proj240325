<template>
  <a-spin :spinning="spinning" :delay="delayTime">
    <div class="login-container">
      <a-row class="OutRow">
        <a-col class="a" :xs="0" :sm="0" :md="12" :lg="14" :xl="16"></a-col>
        <a-col class="a" :xs="24" :sm="24" :md="12" :lg="10" :xl="5">
          <div class="form-container">
            <header>欢迎使用CRM系统</header>
            <div class="formBox">
              <a-form
                layout="vertical"
                :model="formState"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
              >
                <a-form-item>
                  <a-input
                    v-model:value="formState.user"
                    placeholder="Username"
                  >
                    <template #prefix
                      ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                    /></template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input
                    v-model:value="formState.password"
                    type="password"
                    placeholder="Password"
                  >
                    <template #prefix
                      ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                    /></template>
                  </a-input>
                </a-form-item>
                <a-form-item style="text-align: center">
                  <a-button
                    type="primary"
                    html-type="submit"
                    size="large"
                    :disabled="
                      formState.user === '' || formState.password === ''
                    "
                  >
                    登录
                  </a-button>
                   <a-button
                   style="margin-left:3px;margin-right:3px"
                    type="primary"
                   
                    size="large"
                   @click="registerBtn"
                  >
                    注册
                  </a-button>
                  <a-dropdown  >
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <UserOutlined />
          PC
          </a-menu-item>
          <a-menu-item key="2">
            <UserOutlined />
           APP
          </a-menu-item>
         
        </a-menu>
      </template>
      <a-button   type="primary"
                   
                   size="large">
        {{LoginTypeMaek}}
        <DownOutlined />
      </a-button>
    </a-dropdown>



                </a-form-item>
              </a-form>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined,DownOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, UnwrapRef, ref } from "vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import{useRouter} from 'vue-router'
import {GetUserDemo} from '../../Request/userRequest'
import {IsPCEnd} from '../../../src/utility/commonFunc'

interface FormState {
  user: string;
  password: string;
  loginType:string;
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,DownOutlined
  },
  setup() {
    const store = useStore();
    const router=useRouter();
    const spinning = ref<boolean>(false);
    const delayTime = 1;
    const formState: UnwrapRef<FormState> = reactive({
      user: "Admin",
      password: "123456",
      loginType:"PC"
    });
    const LoginTypeMaek = ref<String>("PC");

    

    const handleMenuClick= (e:any) => {
  console.log('click', e);
  if(e.key==1)
  {
    LoginTypeMaek.value="PC";
    formState.loginType="PC";
  }
  if(e.key==2)
  {
    LoginTypeMaek.value="APP";
    formState.loginType="APP";
  }
};

    const handleFinish = async () => {
      const { user, password } = formState;
      if (user.trim() == "" || password.trim() == "") {
        message.warning("用户名或密码不能为空.");
      }
      spinning.value = !spinning.value;


              // GetUserDemo().then((res:any)=>{
              // console.log("test",res)
              //  })
           
        // let sss=   await  login(formState)
        //   console.log(sss.data);
       var _isPc=IsPCEnd();
//        if(!_isPc){
// formState.loginType="APP";
//        }
       console.log(user);
        if(LoginTypeMaek.value=="APP")
{

  console.log(formState.loginType);
  // let res = await store.dispatch("LoginSysApp", formState);
       //console.log(result);
       let res = await store.dispatch("LoginSys", formState);
      if (!res.result) {
        message.error(res.msg);
      } else {
       router.push({path: '/Home_App/MainApp', query: {selected: "1"}});
      }


}       
else
{
  let res = await store.dispatch("LoginSys", formState);
       //console.log(result);

      if (!res.result) {
        message.error(res.msg);
      } else {
       router.push({path: '/Home/HomePage', query: {selected: "1"}});
      }

}
      


      spinning.value = !spinning.value;
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
      console.log(2);
    };
    const registerBtn=()=>{
       router.push({path: '/register', query: {selected: "1"}});
    }
    return {
      formState,
      handleFinish,
      handleFinishFailed,
      spinning,
      delayTime,
      registerBtn,handleMenuClick,LoginTypeMaek
    };
  },
});
</script>

<style scoped>
.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}
.login-container {
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;
  background-image: url("~@/assets/bg3.jpg");
  background-size: cover;
  border: 1px solid #eee;
}
.a {
  border: 0px solid #eee;
  height: 100%;
}
.OutRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center !important;
  height: 37%;
  margin-top: calc((100vh - 250px) / 2);
}
.form-container {
  width: 95%;
  height: 95%;
  border: 0px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #dbc7db9f;
  border-radius: 10px;
}
.a:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
header {
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #e8eef8;
  border: 0px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  margin-bottom: 20px;
}
.formBox {
  border: 0px solid #eee;
  height: 75%;
  display: flex;

  justify-content: center;
  align-items: center;
}
</style>