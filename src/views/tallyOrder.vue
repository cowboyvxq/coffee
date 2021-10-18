<template>
  <div class="aboutme">
    <div class="head">
      <BackNav left-arrow left-text="返回" title="订单结算" />
    </div>
    <div class="hcontent">
      <div class="left">
        <div class="nav">
          <div class="top" @click="isShow">
            <span class="t-left">选择地址</span>
            <span class="t-right bi bi-chevron-right"></span>
          </div>
          <div class="center" v-show="hint">
            <span class="c-left">{{ this.def.name }}</span>
            <span class="c-center">{{ this.def.tel }}</span>
            <span class="c-right" v-show="flag">默认</span>
          </div>
          <div class="bottom" v-show="hint">
            <span>{{ this.def.address }}</span>
          </div>
          <div class="nav-foot" v-show="!hint">
            <span>你还没有添加地址哦!</span>
          </div>
        </div>
      </div>
    </div>
    <div class="or">
      <Order :goodsArr="shopbagArr"  :time="time"/>
    </div>
    <div class="btn">
      <div>
        <van-button
          round
          block
          native-type="button"
          color="#0C34BA"
          @click="goPage"
          >立&nbsp;即&nbsp;结&nbsp;算</van-button
        >
      </div>
    </div>
    <van-action-sheet v-model="show" title="选择地址">
      <div class="nav-foot" v-show="reveal">
        <span>你还没有添加地址哦!</span>
      </div>
      <div class="content">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="addSite"
          @select="elect"
          @edit="edit"
        />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import Order from "../components/Order.vue";

export default {
  name: "tallyOrder",
  components: {
    BackNav,
    Order,
  },
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      hint: false,
      def: {},
      sid: "",
      sidArr: [],
      shopbagArr: [],
      unit: 0,
      sum: 0,
      show: false,
      flag: false,
      reveal: true,
      isflag: true,
      sum: 0,
      unit: 0,
      time: "",
    };
  },
  created() {
    this.siteAll();
    //截取参数
    this.sid = this.$route.params.sids;
    console.log(this.sid);
    //循环所需要的参数
   this.sidArr = this.sid.split('-');
    this.gain();

    //得到当前时间
    var times = new Date();
    var year = times.getFullYear();
    var month = change(times.getMonth() + 1);
    var day = change(times.getDate());
    var hour = change(times.getHours());
    var minute = change(times.getMinutes());
    var second = change(times.getSeconds());
    function change(t) {
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    }
    this.time =
      year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    console.log(this.time);
  },
  methods: {
    //获取所有地址
    siteAll() {
      this.axios({
        method: "get",
        url: "/findAddress",
      })
        .then((res) => {
          // console.log("res==>", res);
          if (res.data.code === 20000) {
            // this.arr = res.data.result;
            // console.log(res.data.result);
            res.data.result.forEach((item, index) => {
              this.list.push({
                index: index,
                id: item.id,
                name: item.name,
                tel: item.tel,
                address: item.city + item.county + item.addressDetail,
                isDefault: item.isDefault,
                aid: item.aid,
              });
            });
            console.log(this.list);
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i].isDefault === 1) {
                this.def = this.list[i];
              } else {
                this.flag = false;
                this.hint = false;
              }
            }
            if (res.data.result.length != 0) {
              this.reveal = false;
            }
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    //获取订单详情
    gain() {
      this.axios({
        method: "get",
        url: "/commitShopcart",
        params: {
          sids: JSON.stringify(this.sidArr),
        },
      })
        .then((res) => {
          console.log("res ==> ", res);
          if (res.data.code === 50000) {
            this.shopbagArr = res.data.result;
            //订单无商品禁止跳转
            if (this.shopbagArr.length === 0) {
              this.isflag = false;
            }
            //添加当前时间
            // this.shopbagArr.forEach((v, i) => {
            //   v.tiem = this.time;
            // });
            console.log("this.shopbagArr", this.shopbagArr);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    // 添加地址
    addSite() {
      this.$router.push({ name: "Address" });
    },

    //跳转编辑地址
    edit(item, index) {
      // console.log("qwe");
      this.$router.push({ name: "MyAddress", params: { aid: item.aid } });
      // console.log(this.list);
    },
    //进入选择地址时
    elect(item, index) {
      this.def = item;
      this.hint = true;
      if (this.def.isDefault != 1) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      // console.log(item,index);
      // console.log("index");
    },
    //立即结算
    goPage() {
      if (this.hint) {
        console.log("dd");
        this.axios({
          method: "post",
          url: "/pay",
          data: {
            phone: this.def.tel,
            address: this.def.address,
            receiver: this.def.name,
            sids: JSON.stringify(this.sidArr),
          },
        })
          .then((res) => {
            // console.log("res ==> ", res);
            if (res.data.code === 60000) {
              //订单无商品禁止跳转
              if (this.isflag) {
                this.$toast(res.data.msg);
                this.$router.push({ name: "MeOrders" });
              } else {
                this.$toast("您还没有可结算的商品哦!");
              }
            }
          })
          .catch((err) => {
            console.log("err ==> ", err);
          });
      } else {
        this.$toast("您还没有选择地址");
      }
    },

    // 点击选择地址
    isShow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.aboutme {
  width: 100%;
  .or {
    margin-top: 15px;
    padding: 0 10px;
  }
  .head {
    width: 100%;
    top: 0;
    z-index: 100;
    position: fixed;
  }
  .hcontent {
    padding: 0 10px;
    margin-top: 61px;

    .left {
      .nav {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #fff;
        height: 100px;
        padding: 10px;
        box-sizing: border-box;
        .top {
          width: 100px;
          span {
            font-size: 14px;
            color: #999;
            margin-right: 15px;
          }
        }
        .center {
          margin-top: 13px;
          display: flex;
          span {
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 8px;
          }
          .c-left {
            width: 50px;
            color: #0c34ba;
            font-weight: 600;
          }
          .c-center {
            width: 100px;
            color: #999;
          }
          .c-right {
            display: block;
            width: 50px;
            background-color: #0c34ba;
            border-radius: 20px;
            text-align: center;
            color: #fff;
          }
        }
        .bottom {
          margin-top: 13px;
          span {
            font-size: 14px;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .right {
      width: 50px;
      background-color: #fff;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  .btn {
    padding: 20px 10px;
    margin-top: 30px;
  }
  .content {
    // padding: 16px 16px 160px;
  }
  .nav-foot {
    text-align: center;
    span {
      font-size: 14px;
      color: #999;
      line-height: 60px;
    }
  }
}
/deep/ .van-address-item__name {
  span {
    background-color: #0c34ba;
  }
}
/deep/ .van-address-list__bottom {
  button {
    border-color: #0c34ba;
    background-color: #0c34ba;
  }
}
</style>