<template>
  <div class="aboutme">
    <div class="head">
      <BackNav left-arrow left-text="返回" title="新增地址" />
    </div>
    <div class="center">
      <van-address-edit
        :area-list="areaList"
        show-postal
        :show-delete="false"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        :tel-validator="yztel"
        :postal-validator="yzpostal"
      />
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import { areaList } from "@vant/area-data";
export default {
  name: "Address",
  components: {
    BackNav,
  },
  data() {
    return {
      areaList,
      searchResult: [],
      user: {},
    };
  },
  created() {},
  methods: {
    // 点击保存触发
    onSave(content) {
      if (content.isDefault) {
        content.isDefault = 1;
      } else {
        content.isDefault = 0;
      }

      this.user = content;
      this.axios({
        method: "post",
        url: "/addAddress",
        //得到所需要数据
        data: {
          name: content.name,
          tel: content.tel,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode: content.areaCode,
          postalCode: content.postalCode,
          isDefault: content.isDefault,
        },
      })
        .then((res) => {
          // console.log("res ==> ", res);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
      // console.log(content);
    },
    //验证手机号
    yztel(e) {
      // console.log("e", e);
      let phoneReg = /^1[3-9]\d{9}$/;
      if (!phoneReg.test(e)) {
        this.$toast("手机号格式不正确")
        return false;
      } else {
        return true;
      }
    },
    //验证邮政编码
    yzpostal(e) {
      console.log("e", e);
      let postalReg = /^[0-9]{6}$/;
      if (!postalReg.test(e)) {
        this.$toast("邮政编码格式不正确")
        return false;
      } else {
        return true;
      }
    },
    onDelete() {
      // Toast("delete");
      return{
        content:{}
      }
    },
    onChangeDetail(val) {
      console.log(val);
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
          {
            name: "海淀北一街",
            address: "北京海淀区",
          },
          {
            name: "科技园飞亚达大厦3-10楼",
            address: "深圳市南山区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },

    //个人资料接口
    aboutMe() {
      this.axios({
        method: "get",
        url: "/findAccountInfo",
      })
        .then((res) => {
          this.myAll = res.data.result[0];
          this.nickName = this.myAll.nickName;
          this.desc = this.myAll.desc;
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //修改昵称
    amendName() {
      this.axios({
        method: "post",
        url: "/updateNickName",
        data: {
          nickName: this.nickName,
        },
      })
        .then((res) => {
          //   console.log(" res ==> ", res);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //修改简介
    amendBrief() {
      this.axios({
        method: "post",
        url: "/updateDesc",
        data: {
          desc: this.desc,
        },
      })
        .then((res) => {
          // console.log(" res ==> ", res);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
  },
  created() {
    // this.aboutMe();
  },
};
</script>

<style lang="less" scoped>
.aboutme {
  width: 100%;
}
</style>