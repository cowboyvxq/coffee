<template>
  <div class="aboutme">
    <div class="head">
      <BackNav left-arrow left-text="返回" title="地址管理" />
    </div>
    <div class="bg"></div>
    <div class="conent">
      <div class="conent-c">
        <van-address-list
        :switchable="false"
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="addSite"
          @edit="edit"
        />
        <span v-show="hint" class="font">你还没有添加地址哦~~</span>
      </div>
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";

export default {
  name: "MyOrder",
  components: {
    BackNav,
  },
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      hint: false,
    };
  },
  methods: {
    //获取所有地址
    siteAll() {
      this.axios({
        method: "get",
        url: "/findAddress",
      })
        .then((res) => {
          // console.log("res==>", res);
          if (res.data.code === 20000) {
            // this.arr = res.data.result;
            // console.log(res.data.result);
            res.data.result.forEach((item, index) => {
              //默认值转换
              if (item.isDefault === 1) {
                item.isDefault = true;
              } else if (item.isDefault === 0) {
                item.isDefault = false;
              }
              this.list.push({
                index: index,
                id: item.id,
                name: item.name,
                tel: item.tel,
                address: item.city + item.county + item.addressDetail,
                isDefault: item.isDefault,
                aid: item.aid,
              });
            });
            if (this.list.length === 0) {
              this.hint = true;
            }
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    // 添加地址
    addSite() {
      this.$router.push({ name: "Address" });
    },
    //跳转编辑地址
    edit(item,index) {
      this.$router.push({name: 'MyAddress', params: {aid:item.aid}});
    },
  },
  created() {
    this.siteAll();
  },

};
</script>

<style lang="less" scoped>
.aboutme {
  width: 100%;
  .head{
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 100;
  }
  .bg {
   position: relative;
   top: 46px;
    width: 100%;
    height: 150px;
    background-color: #0c34ba;
    overflow: auto;
  }
  .conent {
    position: absolute;
   top: 200px;
    padding: 0 10px;
    clear: both;
 
    .conent-c {
      width: 100%;
      margin-top: -40px;

      border-radius: 10px;
      //   background-color: red;
      // overflow: hidden;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 10px;
      box-sizing: border-box;
      padding-top: 10px;
      .font {
        flex: 1;
        text-align: center;
        color: #999;
      }
    }
  }
  /deep/ .van-radio-group {
    border-bottom: 1px solid #f0f0f0;
  }

  /deep/ .van-address-list {
    height: 100%;
  }
  /deep/ .van-address-list__bottom {
    button {
      background-color: #0c34ba;
      border-color: #0c34ba;
    }
  }
}
</style>