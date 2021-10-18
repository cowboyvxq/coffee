<template>
  <div class="main">
    <!-- {{msg}} -->
    <div>
      <router-view></router-view>
    </div>

    <!-- 底部栏组件 -->
    <van-tabbar
      v-model="activeTabIndex"
      active-color="#0C34BA"
      inactive-color="#646566"
      route
    >
      <van-tabbar-item
        v-for="(item, index) in navArr"
        :key="index"
        :to="item.to"
        :badge="item.badge"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      activeTabIndex: 0,
      tarbbarData: [],
    };
  },
  computed: {
    //组件需要使用计算属性关联vuex的state
    msg() {
      //访问vuex的state
      return this.$store.state.msg;
    },

    navArr() {
      let tarbbarData = [];
      //   底部导航
      tarbbarData = [
        {
          title: "首页",
          activeIcon: require("../assets/images/home_active.png"),
          inactiveIcon: require("../assets/images/home.png"),
          to: { name: "Home" },
        },
        {
          title: "菜单",
          activeIcon: require("../assets/images/menu_active.png"),
          inactiveIcon: require("../assets/images/menu.png"),
          to: { name: "Menu" },
        },
        {
          title: "购物袋",
          activeIcon: require("../assets/images/shopbag_active.png"),
          inactiveIcon: require("../assets/images/shopbag.png"),
          to: { name: "Shopbag" },
          badge: this.msg==0?'':this.msg,
        },
        {
          title: "我的",
          activeIcon: require("../assets/images/my_active.png"),
          inactiveIcon: require("../assets/images/my.png"),
          to: { name: "My" },
        },
      ];
      return tarbbarData;
    },
  },
  created() {
    this.findUserShopbagCount();
    // console.log(this.msg);
  },
  mounted() {},
  // updated(){
  //   this.findUserShopbagCount();
  //   console.log(this.msg);
  // },
  methods: {
    //查询用户的购物袋数量
    findUserShopbagCount() {
      this.axios({
        method: "get",
        url: "/shopcartCount",
      })
        .then((res) => {
          // console.log("findUserShopbagCount res ==> ", res);
          if (res.data.code === 4000) {
            this.$store.commit("shopbagnum", { data: res.data.result });
            // this.tarbbarData[2].badge = this.msg;

            // console.log(res.data.result);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //修改vuex中的购物数量
    // shopbagnum() {
    //   //提交mutations, 组件需要执行commit方法提交mutations
    //   //this.$store.commit(mutations方法名称)
    //   //提交mutations并且携带载荷
    //   this.$store.commit("shopbagnum", { data: this.num });
    // },
  },
};
</script>

<style lang="less" scoped>
</style>