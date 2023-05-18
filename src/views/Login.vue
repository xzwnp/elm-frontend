<template>
  <div class="wrapper">

    <input class="mobile-input" v-model="mobile" placeholder="请输入手机号"/>
    <div style="margin-bottom: 5vw"></div>
    <!--      <el-input size="large" v-model="code" placeholder="请输入验证码"-->
    <!--      >-->
    <!--        <template #append>-->
    <!--        </template>-->
    <!--      </el-input>-->
    <div class="password-area" v-if="type==='code'">
      <input class="password-input" v-model="code" style="flex: 1" placeholder="请输入验证码"/>
      <el-button size="large" type="primary" color="#02b6fd" plain style="border-radius: 6vw"
                 v-if="codeCD===0" @click="getCode" :disabled="mobile.length!==11">获取验证码
      </el-button>
      <el-button size="large" type="primary" color="#02b6fd" plain style="border-radius: 6vw" v-else>{{
          codeCD
        }}
      </el-button>

    </div>
    <div class="password-area" v-else>
      <input class="password-input" v-model="password" placeholder="请输入密码" type="password"/>
    </div>
    <div class="divider"></div>

    <el-button size="large" color="#02b6fd" class="login-btn" type="primary" :disabled="!canLogin" @click="login">
      同意协议并登录
    </el-button>
    <el-popover
        placement="top-start"
        title="提示"
        :width="200"
        trigger="none"
        v-model:visible="showAgreementWarning"
        content="请先同意用户协议"
    >
      <template #reference>
        <el-checkbox class="agreement" v-model="agree">
          <label class="agreement-text">已阅读并同意</label>
          <a href="https://terms.alicdn.com/legal-agreement/terms/suit_bu1_other/suit_bu1_other201903201642_21599.html?spm=a1z3id.21372903.0.0.77f16c591OiMYG"
             target="_blank">《用户服务协议》</a>
          <a href="https://terms.alicdn.com/legal-agreement/terms/suit_bu1_other/suit_bu1_other201903051859_43484.html"
             target="_blank">《隐私权政策》</a>
        </el-checkbox>
      </template>
    </el-popover>
    <div style="margin-top:4vw;display: flex;justify-content: center;align-items: center;width: 100%">
      <el-link href="/" style="margin-right: 3vw;color:#02b6fd">回到首页</el-link>

      <div>
        <el-link v-if="type==='code'" icon="view" @click="type='password'" style="color:#02b6fd">其他登录方式</el-link>
        <el-link v-if="type==='password'" icon="view" @click="type='code'" style="color:#02b6fd">
          其他登录方式
        </el-link>
      </div>
    </div>

  </div>
</template>

<script>
import {computed, reactive, toRefs} from "vue";
import LoginApi from "@/api/LoginApi";
import {ElMessage} from "element-plus";
import cookie from "js-cookie";
import {useRouter} from "vue-router";

export default {
  name: "Login",
  setup() {
    const router = useRouter()
    let data = reactive({
      mobile: "",
      password: "",
      code: "",
      canLogin: computed(() => {
        return data.mobile.length === 11 && (data.code.length === 6 || data.password.length >= 6)
      }),
      type: "code",
      codeCD: 0,
      showAgreementWarning: false,
      agree: false
    })

    function login() {
      if (!data.agree) {
        data.showAgreementWarning = true
        setInterval(() => {
          data.showAgreementWarning = false
          clearInterval()
        }, 1500)
        return
      }
      LoginApi.login(data.mobile, data.type === 'code' ? data.code : data.password, data.type)
          .then(res => {
            if (res.data.code == "20000") {
              let token = res.data.data
              cookie.set('token', token)
              ElMessage.success("登录成功!已为您跳转")
              router.push({
                path: '/'
              })
            } else {
              ElMessage("密码错误")
            }
          }).catch(err => {
        console.log(err)
      })

    }

    function getCode() {
      LoginApi.sendCode(data.mobile).then(res => {
        if (res.data.code === 20000) {

          ElMessage.success("发送成功,请留意短信通知")
        }
      }).catch(err => {
        ElMessage.error("发送失败!")
      })
      data.codeCD = 10
      let timer = setInterval(() => {
        if (data.codeCD >= 1) {
          data.codeCD--
        } else {
          clearInterval(timer)
        }
      }, 1000)

    }


    return {
      ...toRefs(data),
      login,
      getCode
    }
  }

}
</script>

<style scoped>
.wrapper {
  box-sizing: border-box;
  padding: 8vw;
}

.wrapper input:focus {
  /*去除选中时的金框*/
  outline: none;

}

.wrapper input {
  padding-bottom: 0;
}

.mobile-input {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #999999;
  height: 15vw;
  width: 100%;
  font-size: 1.3em;
  color: #666666;
}

.el-input__inner {
  border: 0 white;
}

.login-btn {
  color: white;
  margin-top: 5vw;
  width: 90%;
  border-radius: 5vw;
  font-size: 1.2em;
  font-weight: bold;
}

.agreement {
  margin-top: 5vw;
  width: 100%;
  text-align: left;
}

.agreement a {
  color: #02b6fd;
}

.password-area {
  height: 15vw;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
}

.password-input {
  border: 0;
  height: 12vw;
  width: 100%;
  font-size: 1.3em;
  color: #666666;
}

.password-area .el-button {
  height: 60%;

}

.divider {
  display: inline-block;
  width: 100%;
  padding: 0;
  height: 0;
  margin: 0;
  border-top: 1px solid #666666;

  position: relative;
  bottom: 2vw;
  left: 0;
}
</style>
