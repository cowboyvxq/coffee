<template>
  <div class="Shopbag">
    <div class="back-nav-box">
      <BackNav
        left-arrow
        left-text="返回"
        title="购物袋"
        :right-text="toggle ? '编辑' : '完成'"
        :boolean="toggle"
        @totab="complete"
      />
    </div>
    <div class="back-cenent">
      <img src="../assets/images/shopbag_bg.png" alt="" />
    </div>

    <div class="center-box">
      <van-checkbox-group ref="checkboxGroup" v-model="result">
        <div v-for="(item, index) in goodsAll" :key="index">
          <GoodsNum
            :opt="item"
            :boo="flag"
            @tab="num"
            @lose="jnum"
            :sub="index"
            :istoggle="checked"
            :rate="amount"
            @del="del"
            @ufunc="add"
            @btnred="reduce"
          />
        </div>
      </van-checkbox-group>
      <span class="text" v-show="istext"
        >你还没有添加商品哦,赶紧去商城逛逛吧!</span
      >
    </div>
    <div class="bottom-box">
      <div v-show="toggle" v-if="to">
        <van-submit-bar
          :price="amount"
          button-text="提交订单"
          @submit="subOrder"
        >
          <van-checkbox v-model="checked" @click="toggleAll" v-show="true"
            >全选</van-checkbox
          >
        </van-submit-bar>
      </div>
      <div v-show="!toggle" v-if="to">
        <van-submit-bar :price="amount" button-text="删除选择" @submit="delsel">
          <van-checkbox v-model="checked" @click="toggleAll">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import GoodsNum from "../components/GoodsNum.vue";

export default {
  name: "Shopbag",
  components: {
    BackNav,
    GoodsNum,
  },
  data() {
    return {
      checked: false,
      goodsAll: [],
      gooodsnum: 0,
      toggle: true,
      flag: false,
      result: [],
      amount: 0,
      istext: true,
      to: true,
      sidArr: [],
      sid: "",
      dell: 0,
    };
  },
  computed: {
    msg() {
      //访问vuex的state
      return this.$store.state.msg;
    },

    nums(){
        var a = this.msg;
        return a;
    }
  },
  watch: {
    result(val) {
      // console.log(val);
      // console.log(this.goodsAll.length);
      if (this.goodsAll.length != val.length) {
        this.checked = false;
      } else {
        this.checked = true;
      }
      this.property(val);
    },
  },
  created() {
    this.getProductList();
    this.getProductAll();
    // this.total()
    // console.log(this.gooodsnum);
    this.gooodsnum = this.msg;
    //  console.log(this.msg);
    console.log(this.gooodsnum);
    console.log(this.nums);
  },
  methods: {
    complete(key) {
      this.toggle = key;
      // console.log(key);
    },

    //获得点击的信息
    property(val) {
      // console.log("this.goodsAll==>", this.goodsAll);
      let sum = 0;
      val.forEach((v) => {
        // console.log(this.goodsAll[v]);
        // console.log(v);
        this.goodsAll[v].price = Number(this.goodsAll[v].price);
        sum += this.goodsAll[v].price * this.goodsAll[v].count;

        //  this.dell += this.goodsAll[v].count;
      });
      // console.log(sum);
      sum *= 100;
      this.amount = sum;
      // console.log('del',this.dell);
    },

    boo() {
      // console.log(this.checked);
      // this.checked = true
    },

    // 查询商品条目
    getProductList() {
      this.axios({
        method: "get",
        url: "/shopcartRows",
      })
        .then((res) => {
          // console.log("res==>", res);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //  查询用户所有购物车数据接口
    getProductAll() {
      this.axios({
        method: "get",
        url: "/findAllShopcart",
      })
        .then((res) => {
          // console.log("res==>", res);
          if (res.data.code === 700) {
            this.$toast(res.data.msg);
            //跳转到登录页面
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 2000);
          }
          if (res.data.code === 5000) {
            //如果购物车没有数据则显示文字
            if (res.data.result.length == 0) {
              this.istext = true;
              this.to = false;
            } else {
              this.istext = false;
            }
            // let arr = [];
            // console.log(res.data.result);
            res.data.result.forEach((v, i) => {
              v.isChecked = false;
              v.index = i;
              // console.log(v.isChecked);
            });

            // console.log(res.data.result);
            this.goodsAll = res.data.result;
            console.log(this.goodsAll);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //接收子组件参数
    num(item, index) {
      item = Math.round(Number(item));
      // console.log(this.result);
      // console.log(item,index);
      // 如果勾选上了再点击加减数量总数就进行当前点击的单价进行加减
      if (this.result.length != 0) {
        this.result.forEach((v, i) => {
          if (this.result[i] != index) {
            return;
          } else {
            this.amount = (this.amount / 100 + item) * 100;
          }
        });
      }
    },
    //接收子组件参数
    jnum(item, index) {
      item = Math.round(Number(item));
      // console.log(item);
      // 如果勾选上了再点击加减数量总数就进行当前点击的单价进行加减
      if (this.result.length != 0) {
        this.result.forEach((v, i) => {
          if (this.result[i] != index) {
            return;
          } else {
            this.amount = (this.amount / 100 - item) * 100;
          }
        });
      }
    },
    // 点击单个删除重新渲染页面购物车
    del() {
      this.getProductAll();
    },
    // 全选,反选
    toggleAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    //删除所选
    delsel() {
      console.log(this.result);
      // console.log(this.goodsAll);
      if (this.result.length != 0) {
        this.result.forEach((v, i) => {
          this.axios({
            method: "post",
            url: "/deleteShopcart",
            data: {
              sids: JSON.stringify([this.goodsAll[v].sid]),
            },
          })
            .then((res) => {
              console.log("res==>", res);
              if (res.data.code == 7000) {
                this.result = [];
                //重新渲染页面
                this.getProductAll();
                var j = 0;
                j = this.nums-this.goodsAll[v].count;
                // console.log(j);
                //修改vux值
                this.$store.commit("shopbagnum", { data: j });
              }
            })
            .catch((err) => {
              console.log("err ==> ", err);
            });
        });
      } else {
        this.$toast("您还没有选择要删除的商品!");
      }
      // console.log(this.result);
    },
    //提交订单
    subOrder() {
      console.log("qq");
      if (this.result.length != 0) {
        this.result.forEach((v, i) => {
          this.sidArr.push(this.goodsAll[v].sid);
          this.sid += this.goodsAll[v].sid;
        });
        console.log("this.sidArr ==> ", this.sidArr);

        this.$router.push({
          name: "tallyOrder",
          params: { sids: this.sidArr.join("-") },
        });
      } else {
        this.$toast("您还没有选择要提交的商品!");
      }
    },
    //修改购物袋左下角小图标
    add() {
      this.gooodsnum++;
      this.$store.commit("shopbagnum", { data: this.gooodsnum });
    },
    reduce() {
      this.gooodsnum--;
      this.$store.commit("shopbagnum", { data: this.gooodsnum });
    },
  },
};
</script>

<style lang="less" scoped>
.Shopbag {
  // padding-bottom: 134px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.back-cenent {
  width: 100%;
  img {
    width: 100%;
  }
}
.center-box {
  position: fixed;
  padding: 0 10px;
  box-sizing: border-box;
  top: 113px;
  left: 0;
  right: 0;
  bottom: 101px;
  overflow-y: auto;
  .text {
    display: block;
    text-align: center;
    margin-top: 200px;
    font-size: 16px;
    color: #999;
  }
}
.bottom-box {
  div {
    .van-submit-bar {
      bottom: 51px;
    }
  }
}
/deep/ .van-card__price {
  color: #0c34ba;
}
</style>