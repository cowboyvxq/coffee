<template>
  <div class="product">
    <div class="product-img">
      <img class="auto-img" :src="pro.smallImg" alt="" />
    </div>
    <div class="product-zhname one-text">{{ pro.name }}</div>
    <div class="product-enname one-text">{{ pro.enname }}</div>
    <div class="product-price">
      <span class="left">&yen;{{ pro.price }}</span>
      <span
        class="right bi bi-trash"
        @click="deleteProducts"
        v-show="flag"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    pro: {
      type: Object,
      //默认值, 当属性的值为数组或者对象时, 默认值需要使用函数返回
      default() {
        return {};
      },
    },
    flag: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },

  methods: {
    //删除收藏
    deleteProducts() {
      // console.log(this.pro.pid);
      this.axios({
        method: "POST",
        url: "/notlike",
        data: {
          pid: this.pro.pid,
        },
      })
        .then((res) => {
          this.$emit("tab");
          // console.log("res==>", res);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

  },


};
</script>

<style lang="less" scoped>
.product-img {
  background-color: #e8e8e8;
}

.product-zhname {
  font-size: 14px;
  margin-top: 10px;
}

.product-enname {
  margin-top: 3px;
  color: #999;
}

.product-price {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  .left {
    color: #e4393c;
    font-size: 14px;
    font-weight: bold;
  }
  .right {
    color: #999;
  }
}
</style>