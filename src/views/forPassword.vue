<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <div class="logo-box">
          <div class="logo">
            <img
              class="auto-img"
              src="../assets/images/home_active.png"
              alt=""
            />
          </div>
          <div class="logo-text">Luckin Coffee</div>
        </div>
      </template>
      <template #right>
        <div class="guang" @click="goPage('Login')">回到登录页面</div>
      </template>
    </van-nav-bar>

    <div class="user-box">
      <div>
        <div class="welcome-zhtitle">找回密码</div>
      </div>
      <div class="form-box">
        <van-form @submit="reset" v-show="isflag">
          <div class="email">
            <div class="btn">
              <van-button type="info" @click="login">验证码</van-button>
            </div>
            <van-field
              v-model="email"
              name="email"
              label="邮箱号"
              placeholder="邮箱号"
              autocomplete="off"
              :rules="[
                { required: true, message: '请填写邮箱号' },
                { pattern: emailReg, message: '邮箱号格式不正确' },
              ]"
            />
            <van-field
              v-model="res"
              name="email"
              label="验证码"
              placeholder="验证码"
              autocomplete="off"
              :rules="[
                { required: true, message: '请填写验证码' },
                { pattern: resReg, message: '验证码格式不正确' },
              ]"
            />
          </div>

          <div class="login-btn">
            <van-button
              round
              block
              color="#0C34BA"
              native-type="submit"
              @submit="btn"
              >下&nbsp;&nbsp;一&nbsp;&nbsp;步</van-button
            >
          </div>
        </van-form>

        <van-form @submit="resetpas" v-show="!isflag">
          <div class="email">
            <van-field
              v-model="phone"
              name="phone"
              label="注册时手机号"
              placeholder="注册时手机号"
              autocomplete="off"
              :rules="[
                { required: true, message: '请填写手机号' },
                { pattern: phoneReg, message: '手机号格式不正确' },
              ]"
            />
            <van-field
              v-model="password"
              :type="isOpen ? 'text' : 'password'"
              name="password"
              label="密码"
              placeholder="密码(6-16位)"
              :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
              autocomplete="off"
              @click-right-icon="togglePasswordStatus"
              :rules="[
                { required: true, message: '请填写密码' },
                {
                  pattern: passwordReg,
                  message:
                    '密码格式不正确,数字字母下划线组合并且以字母开头6-16位',
                },
              ]"
            />
          </div>

          <div class="login-btn">
            <van-button
              round
              block
              color="#0C34BA"
              native-type="submit"
              @submit="btn"
              >重&nbsp;&nbsp;置&nbsp;&nbsp;密&nbsp;&nbsp;码</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forPassword",
  data() {
    return {
      isOpen: false,
      isflag: true,
      //验证手机号
      phoneReg: /^1[3-9]\d{9}$/,
      //验证密码(数字字母下划线组合并且以字母开头6-16位)
      passwordReg: /^[A-Za-z]\w{5,15}$/,
      //验证邮箱
      emailReg: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      // 验证码
      resReg: /^\d{6}$/,
      index: 0,
      phone: "",
      password: "",
      active: 1,
      email: "",
      res: "",
    };
  },

  methods: {
    btn() {
      this.index += 1;
      console.log(this.index);
    },
    togglePasswordStatus() {
      this.isOpen = !this.isOpen;
    },

    //跳转页面
    goPage(name) {
      this.$router.push({ name });
    },

    // 发送验证码
    login() {
      // console.log("userInfo.email==>",userInfo);
      this.axios({
        method: "post",
        url: "/emailValidCode",
        data: {
          email: this.email,
        },
      })
        .then((res) => {
          console.log("res ==> ", res);
          this.$toast(res.data.msg);
          if (res.data.code === "J001") {
            //将token保存在sessionStorage
            // setTimeout(() => {
            //   this.$router.push({ name: "Home" });
            // }, 2000);
          }
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    },

    // 验证码验证
    reset() {
      this.axios({
        method: "post",
        url: "/checkValidCode",
        data: {
          validCode: this.res,
        },
      })
        .then((res) => {
          console.log("res ==> ", res);
          this.$toast(res.data.msg);
          if (res.data.code === "K001") {
            this.isflag = false;
          }
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    },
    //重置密码
    resetpas() {
      this.axios({
        method: "post",
        url: "/retrievePassword",
        data: {
          phone: this.phone,
          password: this.password,
        },
      })
        .then((res) => {
          console.log("res ==> ", res);
          this.$toast(res.data.msg);
          if (res.data.code === "L001") {
            // this.isflag = true
            //将token保存在sessionStorage

            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 2000);
          }
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  .forgot-box {
    margin-top: 10px;
    // display: flex;
  }
  .forgot-text {
    margin-left: auto;
    font-size: 14px;
    color: #666;
  }
  .login-btn {
    margin-top: 50px;
  }
  .form-box {
    margin-top: 50px;
    .email {
      width: 100%;
      position: relative;
      .btn {
        position: absolute;
        top: 10px;
        right: 0;
        z-index: 1000;
        /deep/ .van-button {
          width: 70px;
          height: 30px;
          font-size: 8px;
          background-color: #0c34ba;
        }
      }
    }
    .jdt {
      margin-top: 10px;
    }
  }
  .welcome-zhtitle {
    font-size: 22px;
    color: #666;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .welcome-entitle {
    font-size: 16px;
    color: #999;
  }
  .user-box {
    margin-top: 80px;
    padding: 15px;
  }
  .guang {
    color: #0c34ba;
    font-weight: bold;
    font-size: 14px;
  }
  .logo-box {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .logo-text {
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }
  /deep/ .van-cell {
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>