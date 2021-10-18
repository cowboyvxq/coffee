<template>
  <div class="aboutme">
    <div class="head">
      <BackNav left-arrow left-text="返回" title="我的订单" />
    </div>
    <div class="bg"></div>
    <div class="body">
      <van-tabs sticky animated swipeable @click="orderAll" color="#0c34ba">
        <van-tab title="全部" name="0">
          <div v-for="(item, index) in marchOrder" :key="index">
            <Order :goodsArr="item.children">
              <template v-slot:left>
                <span class="icon">{{ item.oid }}</span>
              </template>
              <template v-slot:right>
                <span
                  class="icon"
                  @click="affirm(item.oid, 0)"
                  v-show="item.children[0].status == 1 ? true : false"
                  >确认收货</span
                >
                <span
                  class="icon"
                  @click="del(item.oid, 0)"
                  v-show="item.children[0].status == 2 ? true : false"
                  >已完成<i class="bi bi-trash"></i
                ></span>
              </template>
            </Order>
          </div>
          <span class="b-text">抱歉,没有更多数据了...</span>
        </van-tab>
        <van-tab title="进行中" name="1">
          <div v-for="(item, index) in marchOrder" :key="index">
            <Order :goodsArr="item.children">
              <template v-slot:left>
                <span class="icon">{{ item.oid }}</span>
              </template>
              <template v-slot:right>
                <span class="icon" @click="affirm(item.oid, 1)">确认收货</span>
              </template>
            </Order>
          </div>
          <span class="b-text">抱歉,没有更多数据了...</span>
        </van-tab>
        <van-tab title="已完成" name="2">
          <div v-for="(item, index) in marchOrder" :key="index">
            <Order :goodsArr="item.children">
              <template v-slot:left>
                <span class="icon">{{ item.oid }}</span>
              </template>
              <template v-slot:right>
                <span class="icon" @click="del(item.oid, 2)"
                  >已完成<i class="bi bi-trash"></i
                ></span>
              </template>
            </Order>
          </div>
          <span class="b-text">抱歉,没有更多数据了...</span>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import Order from "../components/Order.vue";
export default {
  name: "MeOrders",
  data() {
    return {
      i: 0,
      active: 0,
    };
  },
  components: {
    BackNav,
    Order,
  },
  data() {
    return {
      marchOrder: [],
      isflag: 1,
 
    };
  },
  created() {
    this.orderAll(0);
    // this.fulhOrder();
  },
  methods: {
    //订单
    orderAll(i) {
      // console.log(i);

      // console.log("12");
      this.axios({
        method: "get",
        url: "/findOrder",
        params: {
          status: i,
        },
      })
        .then((res) => {
          // console.log("res==>", res);
          if (res.data.code === 70000) {
            this.marchOrder = res.data.result;
            console.log(this.marchOrder.length);
         
            this.comm();
            //找到完成和未完成的数据
            // 分类
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    comm() {
      //找到订单号分类
      function fenlei(arr) {
        let newArr = [];
        let oids = [];
        arr.forEach((item, i) => {
          // console.log(item.oid); // 未找到
          if (oids.indexOf(item.oid) == -1) {
            newArr.push({
              oid: item.oid,
              children: [item],
            });
            oids.push(item.oid);
          } else {
            newArr[oids.indexOf(item.oid)].children.push(item);
          }
        });
        return newArr;
      }
      this.marchOrder = fenlei(this.marchOrder);
      // console.log(this.marchOrder);
    },
    //确认收货
    affirm(oid, index) {
      this.axios({
        method: "post",
        url: "/receive",
        data: {
          oid: oid,
        },
      })
        .then((res) => {
          // console.log("res==>", res);
          this.orderAll(index);
          // this.orderAll(0);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    // 删除订单
    del(oid, index) {
      this.axios({
        method: "post",
        url: "/removeOrder",
        data: {
          oid: oid,
        },
      })
        .then((res) => {
          // console.log("res==>", res);
          this.orderAll(index);
          // this.orderAll(0);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
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
  .bg {
    width: 100%;
    height: 150px;
    background-color: #0c34ba;
  }
  .body {
    padding: 0 10px;
    margin-top: -20px;
    .b-text {
      display: block;
      font-size: 14px;
      color: #999;
      text-align: center;
      margin: 50px auto;
    }
  }
}
/deep/ .van-tabs__wrap {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/deep/ .van-tabs__content {
  margin-top: 10px;
}
</style>