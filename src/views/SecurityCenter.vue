<template>
  <div class="aboutme">
    <div class="head">
      <BackNav left-arrow left-text="返回" title="安全中心" />
    </div>
    <div class="bg"></div>
    <div class="conent-h">
      <div class="conent-c">
        <div class="top-c" @click="revamp">
          <MyNav>
            <template v-slot:left>
              <span>修改密码</span>
            </template>
            <template v-slot:icon>
              <span class="bi bi-chevron-right"></span>
            </template>
          </MyNav>
        </div>
        <van-form @submit="changePassword">
          <van-action-sheet v-model="show" title="修改密码" @cancel="abolish">
            <div class="content">
              <van-field
                v-model="oldPassword"
                :type="isOpen ? 'text' : 'password'"
                name="password"
                label="旧密码"
                placeholder="密码(6-16位)"
                :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
                autocomplete="off"
                @click-right-icon="togglePasswordStatus"
                :rules="[
                  { required: true, message: '请填写密码' },
                  {
                    pattern: passwordReg,
                    message: '支持数字字母下划线组合并且以字母开头',
                  },
                ]"
              />
              <van-field
                v-model="password"
                :type="isOpens ? 'text' : 'password'"
                name="password"
                label="新密码"
                placeholder="密码(6-16位)"
                :right-icon="isOpens ? 'eye-o' : 'closed-eye'"
                autocomplete="off"
                @click-right-icon="newTogglePassword"
                :rules="[
                  { required: true, message: '请填写密码' },
                  {
                    pattern: passwordReg,
                    message: '支持数字字母下划线组合并且以字母开头',
                  },
                ]"
              />
              <van-button
                round
                block
                color="#0C34BA"
                native-type="submit"
            
                >提&nbsp;&nbsp;&nbsp;交</van-button
              >
            </div>
          </van-action-sheet>
        </van-form>

        <div class="bottom-c" @click="TipDialog">
          <MyNav>
            <template v-slot:left>
              <span>注销账号</span>
            </template>
            <template v-slot:icon>
              <span class="bi bi-chevron-right"></span>
            </template>
          </MyNav>
        </div>
      </div>
      <div class="btn">
        <van-button
          round
          block
          color="#0C34BA"
          native-type="submit"
          @click="Logout"
          >退&nbsp;出&nbsp;登&nbsp;录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import MyNav from "../components/MyNav.vue";
export default {
  name: "SecurityCenter",
  components: {
    BackNav,
    MyNav,
  },
  data() {
    return {
      show: false,
      isOpen: false,
      isOpens: false,
      message: "提示",

      //验证密码(数字字母下划线组合并且以字母开头6-16位)
      passwordReg: /^[A-Za-z]\w{5,15}$/,

      oldPassword: "",
      password: "",
    };
  },
  methods: {
    revamp() {
      //   console.log("dd");
      this.show = true;
    },
    abolish() {
      this.show = false;
      //   console.log(this.show);
    },
    togglePasswordStatus() {
      this.isOpen = !this.isOpen;
    },

    newTogglePassword() {
      this.isOpens = !this.isOpens;
    },

    //退出登录
    Logout() {
      this.axios({
        method: "post",
        url: "/logout",
      })
        .then((res) => {
          // console.log("res==>", res);
          if (res.data.code === "F001") {
            //跳转到登录页面
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 2000);
          }
          this.$toast(res.data.msg);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    //提交修改密码
    changePassword() {
      this.axios({
        method: "post",
        url: "/updatePassword",
        data: {
          password: this.password,
          oldPassword: this.oldPassword,
        },
      })
        .then((res) => {
          // console.log("res==>", res);
          if (res.data.code === "E001") {
            //跳转到登录页面
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 2000);
          }
          this.$toast(res.data.msg);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    // 弹窗
    TipDialog() {
      this.$dialog
        .confirm({
          title: "注销账号",
          message: "是否注销账号,一旦注销无法恢复!!!",
          confirmButtonColor: "red",
        })
        .then(() => {
          console.log("点击了确认");
          //确认注销账号
          this.axios({
            method: "post",
            url: "/destroyAccount",
          })
            .then((res) => {
              console.log("res==>", res);
              if (res.data.code === "G001") {
                //跳转到登录页面
                setTimeout(() => {
                  this.$router.push({ name: "Login" });
                }, 2000);
              }
              this.$toast(res.data.msg);
            })
            .catch((err) => {
              console.log("err ==> ", err);
            });
        })
        .catch(() => {
          //   console.log("点击了取消");
        });
    },

    // 添加地址
    addSite() {
      this.$router.push({ name: "Address" });
    },
  },
  created() {
    // this.siteAll();
  },
  mounted() {},
  beforeUpdate() {
    // this.pocketAll();
  },
  updated() {
    // this.pocketAll();
  },
};
</script>

<style lang="less" scoped>
.aboutme {
  width: 100%;
  .bg {
    width: 100%;
    height: 150px;
    background-color: #0c34ba;
    overflow: auto;
  }
  .conent-h {
    padding: 0 10px;
    clear: both;
    .conent-c {
      width: 100%;
      margin-top: -40px;
      //   height: 100px;
      background-color: #fff;
      border-radius: 10px;

      padding: 10px;
      box-sizing: border-box;
      padding-top: 10px;
      .top-c {
        width: 100%;
        flex: 1;
      }
      .bottom-c {
        width: 100%;
        flex: 1;
      }
    }
  }
}
.content {
  padding: 16px 16px 160px;
  > button {
    margin-top: 50px;
  }
}
/deep/ .van-popup--bottom {
  height: 300px;
}

.btn {
  margin-top: 130px;
}
</style>