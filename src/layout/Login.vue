<template>
  <div id="login">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="login-form">
          <el-form ref="loginForm" :model="formData" :rules="rules">
            <el-form-item>
              <div class="title">{{$lang('系统设置')}}</div>
            </el-form-item>
            <el-form-item prop="userName">
              <el-input
                :placeholder="$t('请输入账号')"
                prefix-icon="el-icon-s-custom"
                v-model="formData.userName">
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :placeholder="$t('请输入密码')"
                prefix-icon="el-icon-s-goods"
                show-password
                v-model="formData.password">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary" :loading="loading" @click="submitForm">{{$t('登录')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div class="select-lang">
      <el-select v-model="selectLang" placeholder="请选择" @change="changeLang">
        <el-option
          v-for="item in langOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>

import {RULES} from "@utils/validators"
import {LOGIN} from "@api/api"
import md5 from 'md5'
// import _ from "lodash"
import {mapActions, mapGetters} from "vuex"
import {DICT} from "@utils/dict"
export default {
    data() {
        return {
            formData: {
              userName: "gupao",
              password: '123123'
            },
            loading: false,
            rules: {
                password: [RULES.require, RULES.tenNumStrChar]
            },
            selectLang: '',
            langOptions: DICT.langOptions
        }
    },
    computed: {
      ...mapGetters('base', ["lang"])
    },
    methods: {
      ...mapActions({
        "LOGIN_INIT": "base/LOGIN_INIT",
        "SET_LANGUAGE": "base/SET_LANGUAGE",
        "initData": "base/initData",
        "changeLangByChoice": "base/changeLangByChoice"
      }),
      submitForm() {
          const obj =  this.$lodash.cloneDeep(this.formData)
          obj.password =  md5(obj.password)
          LOGIN(obj).then(res=>{
              const {code ,data={}, msg} = res.data
              console.log(res)
              if(code === 1) {
                const user = data.userName
                const token = data.token
                const systemMeuns = data.menuList
                this.LOGIN_INIT({user,token,systemMeuns}).then(()=>{
                   // 登录成功
                   this.$router.push('/')
                })
                this.$message.success(msg)
              }
          })
      },
      changeLang() {
         this.$i18n.locale = this.selectLang
         // 修改vuex中的lang值，以及localstorage中的lang
         this.SET_LANGUAGE(this.selectLang)
         this.changeLangByChoice()
      }
    },
    watch: {
      lang: {
        immediate: true,
        handler(n) {
          this.selectLang = n
        }
      }
    },
    created() {
      this.initData()
    }
}
</script>
<style lang="scss" scoped>
  #login {
    background: #2D3B4B;
    width: 100vw;
    height: 100vh;
    .login-form{
      width: 100%;
      height: 300px;
      margin-top: 25vh;
      min-width: 400px;
      .title{
        font-size: 30px;
        text-align: center;
        color: white;
      }
      .el-button{
        display: block;
        width: 100%;
      }
    }
    .select-lang{
      position: absolute;
      right: 20px;
      top:10px;
      width: 90px;
    }
  }
</style>