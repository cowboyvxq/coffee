<template>
  <div class="aboutme">
    <div class="head">
      <div class="left">
        <span class="bi bi-chevron-left" @click="back">返回</span>
      </div>
      <div class="right">
        <van-search
          v-model="searchtext"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="searchAll"
        />
      </div>
    </div>
    <div class="bg"></div>
    <div class="conent" v-show="flag">
      <div class="conent-c">
        <div
          class="box"
          v-for="(item, index) in products"
          :key="index"
          @click="viewDetail(item.pid)"
        >
          <Product :pro="item" />
        </div>
      </div>
    </div>
    <div class="bottom" v-show="!flag">
      <span>抱歉没有找到您想要的商品</span>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import Product from "../components/Product.vue";
export default {
  name: "serach",
  components: {
    BackNav,
    Product,
  },
  data() {
    return {
      products: [],
      //   isflag: true,
      flag: true,
      searchtext: "",
    };
  },
  methods: {
    //获取所有搜索
    searchAll() {
      // console.log(this.value);
      this.axios({
        method: "get",
        url: "/search",
        params: {
          name: this.searchtext,
        },
      })
        .then((res) => {
          if (res.data.code == "Q001") {
            this.products = res.data.result;
            // console.log(this.products);
            if (this.products.length === 0) {
              this.flag = false;
            } else {
              this.flag = true;
            }
          }
          //   console.log("getProductType res ==> ", res);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    // 返回上一级
    back() {
      this.$router.go(-1);
    },
     //点击查看商品详情
  viewDetail(pid) {
    this.$router.push({ name: "Detail", params: { pid } });
  },
  },
  created() {
    this.searchtext = this.$route.params.names;
    this.searchAll();
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
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .left {
      width: 60px;
      color: #0c34ba;
      font-size: 14px;
      padding-left: 10px;
      box-sizing: border-box;
    }
    .right {
      flex: 1;
    }
  }
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
      // height: 200px;
      border-radius: 10px;
      background-color: #fff;
      overflow: hidden;
      display: flex;
      //   justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 10px;
      box-sizing: border-box;
      padding-top: 10px;
      .box {
        width: 30%;
        margin-left: 8px;
        margin-bottom: 15px;
      }
    }
  }
  .bottom {
    margin-top: 100px;
    text-align: center;
    span {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>