<template>
  <div class="aboutme">
    <div class="head">
      <BackNav left-arrow left-text="返回" title="编辑地址" />
    </div>
    <div class="center">
      <!-- :area-list="areaList" -->
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        :tel-validator="yztel"
        :postal-validator="yzpostal"
        :address-info="aInfo"
     
      />
    </div>
  </div>
</template>

<script>
import BackNav from "../components/BackNav.vue";
import { areaList } from "@vant/area-data";
export default {
  name: "MyAddress",
  components: {
    BackNav,
  },
  data() {
    return {
      areaList,
      searchResult: [],
      user: {},
      aid: "",
      aInfo: {},
    };
  },
  created() {
    this.aid = this.$route.params.aid;
    // console.log(this.aid);
    this.enquiry();
  },
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
        url: "/editAddress",
        data: {
          aid: this.aid,
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
    //删除地址
    onDelete() {
      console.log("dd");
      this.axios({
        method: "post",
        url: "/deleteAddress",
        data: {
          aid: this.aid,
        },
      })
        .then((res) => {
          // console.log("res ==> ", res);
          if (res.data.code === 10000) {
            this.$toast(res.data.msg);
            //跳转到上一级
           this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },

    //通过aid查询地址
    enquiry() {
      this.axios({
        method: "get",
        url: "/findAddressByAid",
        params: {
          aid: this.aid,
        },
      })
        .then((res) => {
          console.log("res ==> ", res);
          let item = res.data.result[0];
          if (res.data.code === 40000) {
            //渲染时需要的数据
            this.aInfo = {
              id: item.id,
              name: item.name,
              tel: item.tel,
              city: item.city,
              addressDetail: item.addressDetail,
              county: item.county,
              postalCode: item.postalCode,
              isDefault: item.isDefault,
              aid: item.aid,
              areaCode:item.areaCode
            };
          }
          console.log(this.aInfo);
        })
        .catch((err) => {
          console.log("err ==> ", err);
        });
    },
    //验证手机号
    yztel(e) {
      // console.log("e", e);
      let phoneReg = /^1[3-9]\d{9}$/;
      if (!phoneReg.test(e)) {
        this.$toast("手机号格式不正确");
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
        this.$toast("邮政编码格式不正确");
        return false;
      } else {
        return true;
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
  },
};
</script>

<style lang="less" scoped>
.aboutme {
  width: 100%;
}
</style>