<template>
  <div class="aboutme">
    <div class="head">
      <BackNav left-arrow left-text="返回" title="个人资料" />
    </div>
    <div class="bg"></div>
    <div class="conent">
      <div class="conent-c">
        <div class="one" id="timg">
          <div class="left">头像</div>
          <div class="right">
            <img
              :src="this.myAll.userImg"
              v-show="flag"
              alt=""
              @click="btnimg"
            />
            <van-uploader
              v-show="!flag"
              @click="btnimg"
              :after-read="afterRead"
              :src="this.myAll.userImg"
            />
          </div>
        </div>
        <div class="one">
          <div class="left">用户id</div>
          <div class="right">{{ this.myAll.userId }}</div>
        </div>
        <div class="one">
          <div class="left">昵称</div>
          <div class="right">
            <input
              type="text"
              v-model="nickName"
              @change="amendName"
              @keyup.enter="amendName"
            />
          </div>
        </div>
        <div class="one">
          <div class="left">简介</div>
          <div class="right">
            <input
              type="text"
              v-model="desc"
              @change="amendBrief"
              placeholder="这个人很懒,什么也没留下"
              @keyup.enter="amendBrief"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
export default {
  name: "AboutMe",
  components: {
    BackNav,
  },
  data() {
    return {
      myAll: "",
      disabled: true,
      nickName: "",
      desc: "",
      flag: true,
      imgType: "",
      bas: "",
    };
  },
  methods: {
    //个人资料接口
    aboutMe() {
      this.axios({
        method: "get",
        url: "/findAccountInfo",
      })
        .then((res) => {
          // console.log(res);
          this.myAll = res.data.result[0];
          this.nickName = this.myAll.nickName;
          this.desc = this.myAll.desc;
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //修改昵称
    amendName() {
      this.axios({
        method: "post",
        url: "/updateNickName",
        data: {
          nickName: this.nickName,
        },
      })
        .then((res) => {
          // console.log(" res ==> ", res);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //修改简介
    amendBrief() {
      this.axios({
        method: "post",
        url: "/updateDesc",
        data: {
          desc: this.desc,
        },
      })
        .then((res) => {
          // console.log(" res ==> ", res);
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
      this.imgType = file.file.type.substring(6);
      this.bas = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");

      //上传图片
      this.axios({
        method: "post",
        url: "/updateAvatar",
        data: {
          imgType: this.imgType,
          serverBase64Img: this.bas,
        },
      })
        .then((res) => {
          // console.log(" res ==> ", res);
          if (res.data.code == "H001") {
            this.aboutMe();
            this.flag = true;
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
  },
  created() {
    //初始化页面
    this.aboutMe();
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
  }
  .conent {
    padding: 0 10px;
    .conent-c {
      width: 100%;
      margin-top: -40px;
      //   height: 200px;
      border-radius: 10px;
      background-color: #fff;
      overflow: hidden;
      #timg {
        padding: 5px;
      }
      .one {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        height: 50px;
        border-bottom: 1px solid #f0f0f0;

        .right {
          color: #726f83;
          position: relative;
          img {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            background-color: #f0f0f0;
            overflow: hidden;
            position: absolute;
            right: 4px;
            bottom: -20px;
            // z-index: 104;
          }
          input {
            border: 0;
            resize: none;
            background-color: #fff;
            text-align: right;
          }
        }
      }
    }
  }
  /deep/ .van-uploader {
    // width: 60px;
    // height: 60px;
    .van-uploader__wrapper {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      .van-uploader__upload {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
      input {
        border-radius: 50%;
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>