<template>
  <div class="aboutme">
    <div class="head">
      <BackNav left-arrow left-text="返回" title="我的收藏" />
    </div>
    <div class="bg"></div>
    <div class="conent" v-show="flag">
      <div class="conent-c">
        <div class="box" v-for="(item, index) in products" :key="index">
          <Product :pro="item" @tab="pocketAll" :flag="isflag" />
        </div>
      </div>
    </div>
    <div class="bottom" v-show="!flag">
      <span>你还没有添加收藏哦,赶紧去添加你喜爱的商品吧!</span>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import Product from "../components/Product.vue";
export default {
  name: "MyPocket",
  components: {
    BackNav,
    Product,
  },
  data() {
    return {
      products: [],
      isflag: true,
      flag: false,
    };
  },
  methods: {
    //获取所有收藏
    pocketAll() {
      this.axios({
        method: "get",
        url: "/findAllLike",
      })
        .then((res) => {
          // console.log("res==>", res);
          if (res.data.code === 2000) {
            this.products = res.data.result;
          }
          if (this.products.length !== 0) {
            this.flag = true;
          } else {
            this.flag = false;
          }
          // console.log(this.products);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

  },
  created() {
    this.pocketAll();
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