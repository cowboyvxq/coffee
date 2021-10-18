<template>
  <div class="my">
    <div class="top">
      <img :src="this.myAll.userBg" v-show="flag" alt="" @click="btnimg" />
       <van-uploader
              v-show="!flag"
              @click="btnimg"
              :after-read="afterRead"
            />
    </div>
    <div class="bottom">
      <div class="bottom-box">
        <div class="bottom-h">
          <div class="left">
            <img :src="this.myAll.userImg" alt="" />
          </div>
          <div class="right">
            <p class="right-t">{{ this.myAll.nickName }}</p>
            <p class="right-b">{{ this.desc }}</p>
          </div>
        </div>
        <div>
          <router-link :to="{ name: 'AboutMe' }">
            <MyNav>
              <template v-slot:left>
                <span>个人资料</span>
              </template>
              <template v-slot:icon>
                <span class="bi bi-chevron-right"></span>
              </template>
            </MyNav>
          </router-link>
          <router-link :to="{ name: 'MeOrders' }">
            <MyNav>
              <template v-slot:left>
                <span>我的订单</span>
              </template>
              <template v-slot:icon>
                <span class="bi bi-chevron-right"></span>
              </template>
            </MyNav>
          </router-link>
          <router-link :to="{ name: 'MyPocket' }">
            <MyNav>
              <template v-slot:left>
                <span>我的收藏</span>
              </template>
              <template v-slot:icon>
                <span class="bi bi-chevron-right"></span>
              </template>
            </MyNav>
          </router-link>
          <router-link :to="{ name: 'MyOrder' }">
            <MyNav>
              <template v-slot:left>
                <span>地址管理</span>
              </template>
              <template v-slot:icon>
                <span class="bi bi-chevron-right"></span>
              </template>
            </MyNav>
          </router-link>
          <router-link :to="{ name: 'SecurityCenter' }">
            <MyNav>
              <template v-slot:left>
                <span>安全中心</span>
              </template>
              <template v-slot:icon>
                <span class="bi bi-chevron-right"></span>
              </template>
            </MyNav>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyNav from "../components/MyNav.vue";
export default {
  name: "My",
  components: {
    MyNav,
  },
  data() {
    return {
      myAll: [],
      desc: "这家伙很懒,什么也没留下",
      flag:true,
      imgType: "",
      bas: "",
    };
  },

  methods: {
    //个人资料接口
    aboutMe() {
      this.axios({
        method: "get",
        url: "/findMy",
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === "A001") {
            this.myAll = res.data.result[0];
            if (this.myAll.desc != "") {
              //  console.log("d");
              this.desc = this.myAll.desc;
              //  console.log(this.myAll.desc);
            }
          }
          if (res.data.code === 700) {
            this.$toast(res.data.msg);
            //跳转到登录页面
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 2000);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //点击切换
    btnimg() {
      this.flag = false;
    },
    //图片转码
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      this.imgType = file.file.type.substring(6);
      // console.log(this.imgType);
      this.bas = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");
      // console.log(this.bas);

      //上传图片
      this.axios({
        method: "post",
        url: "/updateUserBg",
        data: {
          imgType: this.imgType,
          serverBase64Img: this.bas,
        },
      })
        .then((res) => {
          console.log(" res ==> ", res);
          if(res.data.code == 'I001'){
            this.aboutMe(); 
            this.flag = true
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
  },
  created() {
    this.aboutMe();
  },
};
</script>

<style lang="less" scoped>
.my {
  position: fixed;
  top: 0;
  bottom: 50px;
  left: 0;
  right: 0;
  .top {
    width: 100%;
    height: 220px;
    img {
      width: 100%;
      height: 220px;
    }
  }
  .bottom {
    position: relative;
    top: 0;
    padding: 0 10px;
    left: 0;
    right: 0;
    box-sizing: border-box;
    .bottom-box {
      box-sizing: border-box;
      width: 100%;
      margin-top: -30px;
      // height: 200px;
      border-radius: 10px;
      padding-bottom: 10px;
      background-color: rgba(255, 255, 255, 0.5);
      .bottom-h {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        .left {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 80px;
            height: 80px;
          }
        }
        .right {
          margin-left: 20px;
          flex: 1;
          p {
            line-height: 35px;
          }
          .right-t {
            font-size: 20px;
            font-weight: 700;
            color: #0c34ba;
          }
          .right-b {
            color: #a8b0b3;
          }
        }
      }
    }
  }
    /deep/ .van-uploader {
    .van-uploader__wrapper {
      width: 375px;
      height: 220px;
      .van-uploader__upload {
         width: 375px;
      height: 220px;
      }
      input {
        width: 375px;
      height: 220px;
      }
    }
  }
}
</style>