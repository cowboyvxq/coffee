<template>
  <div class="menu">
    <div class="seach-box">
      <van-search
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"
        @search="search"
      />
    </div>
    <div class="menu-box">
      <div class="menu-list">
        <div
          class="menu-list-item"
          :class="{ active: activeIndex === index }"
          v-for="(item, index) in menuList"
          :key="index"
          @click="toggleMenuList(index, item.type)"
        >
          {{ item.typeDesc }}
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
import Product from "../components/Product.vue";
export default {
  name: "Menu",

  data() {
    return {
      value: "",
      activeIndex: 0,
      menuList: [],
      products: [],
    };
  },

  //注册组件
  components: {
    Product,
  },
  
  // 钩子函数，程序加载完成
  created() {
    this.getProductType();
  },

  // 方法
  methods: {
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
            // console.log(this.menuList);
            this.getProductByType(this.menuList[this.activeIndex].type);
            // console.log( this.menuList[this.activeIndex].type);
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
            // console.log(res.data.result);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    //切换类型列表
    toggleMenuList(index, type) {
      if (this.activeIndex === index) {
        return;
      }
      this.activeIndex = index;
      //根据商品类型获取商品数据
      this.getProductByType(type);
    },

    //点击查看商品详情
    viewDetail(pid) {
      this.$router.push({ name: "Detail", params: { pid } });
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
  },
};
</script>

<style lang="less" scoped>
.menu-pro {
  width: calc(~"50% - 5px");
  margin-right: 10px;
  margin-bottom: 10px;
  &:nth-child(2n) {
    margin-right: 0;
  }
}
.menu-products {
  display: flex;
  flex-wrap: wrap;
}
.seach-box {
  position: sticky;
  top: 0;
}

.menu-box {
  position: fixed;
  top: 54px;
  right: 0;
  left: 0;
  bottom: 50px;
  display: flex;
}

.menu-list {
  width: 80px;
  height: 100%;
  font-size: 14px;
  overflow-y: auto;
}

.menu-list-item {
  height: 40px;
  text-align: center;
  line-height: 40px;
}

.menu-list-item.active {
  background-color: #fff;
  color: #0c34ba;
}

.menu-content {
  flex: 1;
  height: 100%;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>