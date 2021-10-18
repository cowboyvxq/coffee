<template>
  <div class="home">
    <div class="head">
      <div class="head-left">
        <span class="left">{{ this.time }}好</span>
        <router-link :to="{ name: 'AboutMe' }"
          ><span class="right">{{ this.myAll.nickName }}</span></router-link
        >
      </div>
      <div class="head-right">
        <van-search
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="search"
        />
      </div>
    </div>

    <div class="center-box">
      <div class="center-topbox">
        <van-swipe :autoplay="3000" class="center-img">
          <van-swipe-item
            v-for="(item, index) in products"
            @click="viewDetail(item.pid)"
            :key="index"
          >
            <img :src="item.largeImg" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="center-title">
        <div class="content">
          <span>热卖推荐</span>
        </div>
      </div>

      <div class="menu-content">
        <div class="menu-products">
          <div
            class="menu-pro"
            v-for="(item, index) in products"
            :key="index"
            @click="viewDetail(item.pid)"
          >
            <Product :pro="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入组件
import Product from "../components/Product.vue";
export default {
  name: "Home",
  //注册组件
  components: {
    Product,
  },
  // 监听
  // watch: {
  //   value() {
  //     // console.log("dd");
  //     if (this.value.length != 0) this.serch();
  //   },
  // },
  data() {
    return {
      value: "",
      activeIndex: 0,
      menuList: [],
      products: [],
      images: [],
      myAll: [],
      show: true,
      time: "",
    };
  },
  created() {
    this.getProductType();
    this.aboutMe();
    //得到当前时间
    var myDate = new Date();
    var mytime = myDate.getHours();
    this.time =
      mytime < 6
        ? "深夜"
        : mytime < 12
        ? "早上"
        : mytime < 18
        ? "下午"
        : mytime < 24
        ? "晚上"
        : "深夜";
    // console.log(mytime);
    // console.log(this.time);
  },

  //方法
  methods: {
    //个人资料接口
    aboutMe() {
      this.axios({
        method: "get",
        url: "/findAccountInfo",
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code === "B001") {
            this.myAll = res.data.result[0];
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //获取商品类型
    getProductType() {
      //如果是get请求, 参数需要写在params字段, 如果是post请求, 需要把参数写在data字段中
      this.axios({
        method: "get",
        url: "/type",
      })
        .then((res) => {
          // console.log("getProductType res ==> ", res);
          if (res.data.code === 400) {
            res.data.result.unshift({ type: "isHot", typeDesc: "热卖推荐" });
            this.menuList = res.data.result;
            // console.log(res.data.result);
            this.getProductByType(this.menuList[this.activeIndex].type);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    //搜索
    search() {
      console.log(this.value);
      this.axios({
        method: "get",
        url: "/search",
        params: {
          name: this.value,
        },
      })
        .then((res) => {
          console.log("getProductType res ==> ", res);
          if (res.data.code === "Q001") {
            this.$toast(res.data.msg);
            this.$router.push({
              name: "search",
              params: { names: this.value },
            });
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    //根据商品类型获取商品数据
    getProductByType(type) {
      //type: 商品类型

      // console.log('type ==> ', type);

      let key = "";
      let value = "";

      if (type === "isHot") {
        key = "isHot";
        value = 1;
      } else {
        key = "type";
        value = type;
      }

      this.axios({
        method: "get",
        url: "/typeProducts",
        params: {
          key,
          value,
        },
      })
        .then((res) => {
          // console.log('getProductByType res ==> ', res);
          if (res.data.code === 500) {
            this.products = res.data.result;
            this.products.forEach((item) => {
              this.images.push(item.largeImg);
            });
            // console.log("this.products==>", this.products);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //点击查看商品详情
    viewDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  // padding: 0 10px;
  .head {
    //  position: fixed;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 100;
    .head-left {
      display: flex;
      width: 100px;
      // justify-content: space-between;
      .right {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 0px;
        font-size: 14px;
        color: #0c34ba;
        font-weight: 700;
      }
      .left {
        width: 50px;
        font-size: 14px;
        color: #999;
        font-weight: 700;
      }
      span {
        width: 50px;
        display: block;
      }
    }
    .head-right {
      width: 250px;
    }
  }
  .center-box {
    top: 54px;
    right: 0;
    left: 0;
    bottom: 0px;
    padding: 10px;
    padding-bottom: 50px;
    // background-color: aquamarine;
    .center-topbox {
      // padding: 10px;
      box-sizing: border-box;
      border-radius: 20px;
      .center-img {
        overflow: hidden;
        border-radius: 10px;
      }
      img {
        height: 250px;
        width: 100%;
      }
    }
    .center-title {
      margin-top: 10px;
      height: 50px;
      background-color: #fff;
      display: flex;
      align-items: center;
      .content {
        width: 100px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0c34ba;
        border-top-right-radius: 20px;
        span {
          color: #fff;
          font-size: 14px;
        }
      }
    }
    .menu-content {
      flex: 1;
      height: 100%;
      //
      // padding: 10px;
      box-sizing: border-box;
      overflow-y: auto;
      margin-top: 10px;
      .menu-pro {
        width: calc(~"50% - 5px");
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 10px;
        background-color: #fff;

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
      .menu-products {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>