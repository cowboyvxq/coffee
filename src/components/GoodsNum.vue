<template>
  <div class="goodsPcs">
    <div class="left">
      <van-checkbox
        @change="security"
        :name="sub"
        v-model="checked"
      ></van-checkbox>
    </div>
    <div class="box-conten">
      <van-swipe-cell>
        <van-card
          :price="price"
          :desc="opt.enname"
          class="goods-card"
          :thumb="opt.small_img"
        >
          <template #title>
            <span class="c-left">{{ opt.name }}</span>
            <span class="c-right">{{ opt.rule }}</span>
          </template>
        </van-card>

        <van-stepper
          class="btn"
          v-model="opt.count"
          theme="round"
          button-size="22"
          disable-input
          @plus="add"
          @minus="subtract"
        />
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opt: {
      type: Object,
      //默认值, 当属性的值为数组或者对象时, 默认值需要使用函数返回
      default() {
        return {
          text: "",
        };
      },
    },
    rate: {
      type: Number,
    },
    sub: {
      type: Number,
    },
    istoggle: {
      type: Boolean,
    },
    sum: {
      type: Number,
    },
  },
  computed: {
    msg() {
      //访问vuex的state
      return this.$store.state.msg;
    },
  },
  data() {
    return {
      count: 0,
      subtractnum: 0,
      checked: false,
      price: 0,
      total: 0,
      // per:0
    };
  },

  methods: {
    // 增加数量
    add() {
      this.opt.count++;
      this.revise();
      this.price = Number(this.price);
      this.price = (this.opt.price * this.opt.count).toFixed(2);
      //  this.$store.commit("shopbagnum", { data: this.opt.count });
      this.$emit("tab", this.opt.price, this.opt.index);
      this.$emit("ufunc");
    },
    //减少数量
    subtract() {
      // this.price--
      // this.opt.subtractnum--;
      this.opt.count--;
      this.revise();
      // this.subtractnum--;
      this.price = Number(this.price);
      // this.$emit("tab", this.subtractnum);
      this.price = (this.opt.price * this.opt.count).toFixed(2);
      // this.$emit("ufunc", this.price);
      this.$emit("lose", this.opt.price, this.opt.index);
      // this.$store.commit("shopbagnum", { data: this.count });
      this.$emit("btnred");
    },
    //  修改购物车商品数量接口
    revise() {
      this.axios({
        method: "post",
        url: "/modifyShopcartCount",
        data: {
          sid: this.opt.sid,
          count: this.opt.count,
        },
      })
        .then((res) => {
          //  console.log("res==>", res);
          if (res.data.code === 6000) {
            // this.$store.commit("shopbagnum", { data: this.count });
            this.count = this.opt.count;
            // console.log(this.opt.count);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    security() {},
  },
  created() {
    // console.log(this.opt);
    // console.log(this.rate);
    this.total = this.msg;

    this.price = (this.opt.price * this.opt.count).toFixed(2);
  },
  mounted() {},
  updated() {},
};
</script>

<style lang="less" scoped>
.goodsPcs {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  /deep/ .van-stepper--round .van-stepper__minus {
    color: #0c34ba;
    border-color: #0c34ba;
  }
  /deep/ .van-stepper--round .van-stepper__plus {
    background-color: #0c34ba;
  }
  .left {
    width: 30px;
    padding-left: 8px;
    box-sizing: border-box;
  }

  .box-conten {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    .btn {
      position: absolute;
      top: 70px;
      right: 20px;
    }
    .c-left {
      font-size: 14px;
      margin-right: 15px;
      color: #4f4f4f;
      //  font-weight: 500;
    }
    .c-right {
      color: #646566;
    }
  }
}
.goods-card {
  margin: 0;
  background-color: #fff;
}
.delete-button {
  height: 100%;
}
</style>