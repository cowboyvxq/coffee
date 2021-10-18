<template>
  <div class="app">
    <div class="order">
      <div class="con">
        <div class="head">
          <!-- 插槽一 -->
          <slot name="left"></slot>
          <!-- 插槽二 -->
          <slot name="right"></slot>
        </div>
        <div v-for="(item, index) in goodsArr" :key="index">
          <van-card
            :num="item.count"
            :price="item.price"
            :desc="item.enname"
            :thumb="item.small_img || item.smallImg"
          >
            <template #title>
              <span class="c-left">{{ item.name }}</span>
              <span class="c-right">{{ item.rule }}</span>
            </template>
          </van-card>
        </div>
      </div>
      <div class="foot">
        <div class="f-box">
          <p class="f-top">{{ time || isTime }}</p>
          <p>
            <span class="f-left">共计{{ unit }}件</span>
            <span class="f-right">合计￥{{ sum }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsArr: {
      type: Array,
      default() {
        return [];
      },
    },
    time: {
      type: String,
    },
  },
  data() {
    return {
      isTime: "",
    };
  },
  created() {
    console.log("this.goodsArr==>", this.goodsArr);
    // console.log(this.isTime);
    if (this.goodsArr.length != 0) {
      this.isTime = this.goodsArr[0].createdAt;

      this.isTime = this.data();
      console.log(this.isTime);
    }
  },

  computed: {
    unit() {
      let a = 0;
      for (let i = 0; i < this.goodsArr.length; i++) {
        a += this.goodsArr[i].count;
      }

      return a;
    },

    sum() {
      let a = 0;
      for (let i = 0; i < this.goodsArr.length; i++) {
        a += this.goodsArr[i].count * this.goodsArr[i].price;
      }
      return a;
    },
  },
  methods: {
    // 格式化时间
    data() {
      function rTime(date) {
        var json_date = new Date(date).toJSON();
        return new Date(new Date(json_date) + 8 * 3600 * 1000)
          .toISOString()
          .replace(/T/g, " ")
          .replace(/\.[\d]{3}Z/, "");
      }
      let date = rTime(this.isTime);
      // console.log(date);
      return date;
    },
  },
};
</script>

<style lang="less" scoped>
.app {
  .head {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
  }
  .order {
    // padding: 0 10px;
    margin-bottom: 10px;
    .con {
      background-color: #fff;
      border-radius: 10px;
      background: linear-gradient(-45deg, transparent 10px, #fff 0) right,
        linear-gradient(45deg, transparent 10px, #fff 0) left;
      background-size: 50% 100%;
      background-repeat: no-repeat;
      padding: 10px 0;
      .text {
        margin-left: 16px;
      }
      span {
        color: #6a6464;
        font-size: 14px;
        display: block;
      }
    }
    .foot {
      background: linear-gradient(225deg, transparent 10px, #fff 0) right,
        linear-gradient(135deg, transparent 10px, #fff 0) left;
      background-size: 50% 100%;
      background-repeat: no-repeat;
      height: 80px;
      background-color: #f7f7f7;
      padding: 0 13px;
      .f-box {
        border-top: 1px dashed #e4e4e4;
        p {
          font-size: 12px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }

        .f-top {
          color: #676262;
        }

        .f-left {
          font-size: 13px;
          color: #676262;
        }
        .f-right {
          font-size: 14px;
          color: #0c34ba;
          font-weight: 700;
        }
      }
    }
  }
  /deep/ .van-card__price {
    > div {
      display: flex;
    }
  }
  /deep/ .van-card {
    // margin-top: 10px;
    background-color: #fff;
  }
  /deep/ .van-card__header,
  .van-card__thumb {
    background-color: #fff;
  }
  /deep/ .van-card__title {
    font-size: 14px;
    margin-top: 3px;
  }
  /deep/ .van-card__price {
    > div {
      span {
        color: #0c34ba !important;
        font-weight: 700;
      }
    }
  }
  /deep/ .van-card__content {
    > div {
      span {
        display: inline !important;
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
    // display: inline
  }
}
</style>