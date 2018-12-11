<template>
  <div class="login full">
    <div class="icon-box">
      <div class="icon"></div>
    </div>
    <div class="formbox">
      <form id="form">
        <input type="text" placeholder=" 请输入账号" v-model="formData.name" autocomplete='name'>
        <input type="password" placeholder=" 请输入密码" v-model="formData.password" autocomplete='pwd'>
        <div class='check padding_tb rem_info'>
          <mt-checklist v-model="portSelect" :options="['记住密码']" v-if="webind"></mt-checklist>
        </div>
        <button class="submit" @click='handleLogin' v-if="webind">登 陆</button>
        <button class="submit" @click="webindEv" v-if='!webind'>立即绑定</button>
        <button class="submit" @click="webindOut" v-if='!webind'>取 消</button>
      </form>
    </div>
    <div class="weixin_box" @click="weixinLogin" v-if="webind">微信登陆</div>
  </div>
</template>
<script>
  import { Checklist, Toast } from 'mint-ui'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        portSelect: ['记住密码'],
        formData: {
          name: '',
          password: '',
        },
        auths: [],
        webind: true,
        wechatId: ''
      }
    },
    methods: {
      ...mapActions(['login', 'wechatLogin']),
      webindEv(e) {
        e.preventDefault()
        let data = {}
        data.loginId = this.formData.name
        data.password = this.formData.password
        data.loginType = 9
        data.wechatId = this.wechatId

        if (this.formData.name != '' && this.formData.pwd != '') {
          this.wechatLogin(this.wechatId).then(function (res) {
            if (res) {
              _this.$router.push({
                path: '/main'
              })
            } else {
              Toast('账号或密码有误！')
            }
          })
        } else {
          Toast('账号或密码不能为空！')
        }

      },
			webindOut(e){
				e.preventDefault()
				this.webind = !this.webind
			
			},
				
      handleLogin(e) {
        e.preventDefault()   //阻表单默认提交
        let _this = this
        if (this.formData.name != '' && this.formData.pwd != '') {
          if (this.portSelect.length != 0) {
            localStorage.setItem("name", this.formData.name);
            localStorage.setItem("password", this.formData.password);
          }
          this.login(this.formData).then(function (res) {
            if (res) {
              _this.$router.push({
                path: '/main'
              })
            } else {
              Toast('账号或密码有误！')
            }
          })
        } else {
          Toast('账号或密码不能为空！')
        }
      },
      getPwd() {
        let name = localStorage.getItem("name");
        if (name != null) {
          this.formData.name = name
          this.formData.password = localStorage.getItem('password')
        }
      },
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      weixinLogin() {   //微信登陆
        // 登录操作
        let _this = this
        if (window.plus) {
          let auths = this.auths
          plus.oauth.getServices(function (services) {
            auths = services;
            authLogin()
          }, function (e) {
            Toast("获取登录服务列表失败：" + e.message + " - " + e.code);
          });

          function authLogin() {
            var s;
            for (var i = 0; i < auths.length; i++) {
              if (auths[i].id == 'weixin') {
                s = auths[i];
                break;
              }
            }
            if (!s.authResult) {
              s.login(function (e) {
                console.log("登录认证成功！");
                authUserInfo('weixin');
              }, function (e) {
                console.log("登录认证失败！");
              });
            } else {
              console.log("已经登录认证！");
            }
          }
          //注销
          function authLogout() {
            for (var i in auths) {
              var s = auths[i];
              if (s.authResult) {
                s.logout(function (e) {
                  console.log("注销登录认证成功！");
                }, function (e) {
                  console.log("注销登录认证失败！");
                });
              }
            }
          }
          // 微信登录认证信息
          function authUserInfo(type) {
            var s;
            for (var i = 0; i < auths.length; i++) {
              if (auths[i].id == type) {
                s = auths[i];
                break;
              }
            }
            if (!s.authResult) {
              console.log("未授权登录！");
            } else {
              s.getUserInfo(function (e) {
                var josnStr = JSON.stringify(s.userInfo);
                var jsonObj = s.userInfo;
                _this.wechatId = jsonObj.unionid
                _this.wechatLogin(jsonObj.unionid).then(function (res) {
                  if (res) {
                    _this.$router.push({
                      path: '/main'
                    })
                  } else {
                    Toast('此微信没有登陆权限，请先绑定账号')
                    _this.webind = false
                  }
                })
                authLogout();
              }, function (e) {
                Toast("获取用户信息失败：" + e.message + " - " + e.code);
              });
            }
          }
        } else {
          let wechat = 123
          this.wechatLogin(wechat).then(function (res) {
            if (res) {
              _this.$router.push({
                path: '/main'
              })
            } else {
              Toast('此微信没有登陆权限，请先绑定账号')
              _this.webind = false
            }
          })
        }
      }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    },
    watch: {
      portSelect(val) {
        if (val.length != 0) {
        } else {
          localStorage.removeItem("name");
          localStorage.removeItem("password");
        }
      }
    },
    mounted() {
      this.getPwd()
    },
  }
</script>

<style scoped lang="scss">
  .login {
    overflow: hidden;
    background: white;
    .icon-box {
      width: 100%;
      height: 8rem;
      position: relative;
      .icon {
        width: 3rem;
        height: 3rem;
        background: url('../../images/common/starticon.png') no-repeat;
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .formbox {
      font-size: 0.48rem;
      width: 100%;
      padding: 0 1.4rem;
      input {
        border: 1px solid #169AFF;
        width: 100%;
        height: 1.4rem;
        text-align: left;
        font-size: 0.55rem;
        margin-bottom: -1px;
        padding-left: 0.2rem
      }
      input::-webkit-input-placeholder {
        color: gray;
        font-size: 0.48rem;
        text-align: left
      }
    }
  }

  .submit {
    background: #169AFF;
    width: 100%;
    color: white;
    padding: 0.3rem;
    font-size: 0.55rem;
    margin-top: 0.6rem;
  }

  .weixin_box {
    color: #169AFF;
    text-align: right;
    margin: auto;
    font-size: 0.48rem;
    margin-top: 1rem;
    margin-right: 1.4rem;
  }

  .rem_info {
    width: 3rem;
    margin: auto;
    color: #169AFF;
    margin-right: 0;
  }
</style>