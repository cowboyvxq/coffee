<template>
  <div class="back-nav">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      @click-left="back"
      @click-right="compile"
    />

  </div>
</template>

<script>
export default {
  name: "BackNav",
  props: {
    title: {
      type: String,
      default: "",
    },

    leftArrow: {
      type: Boolean,
      default: false,
    },

    leftText: {
      type: String,
      default: "",
    },

    rightText: {
      type: String,
      default: "",
    },

    boolean: {
      type: Boolean,
    },
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    compile() {
      this.$emit("totab", !this.boolean);
      // console.log("Q");
    },
  },
  created() {
    // console.log(this.boolean);
  },
};
</script>

<style lang="less" scoped>
.back-nav {
  
  /deep/ .van-nav-bar .van-icon {
    color: #0c34ba;
  }

  /deep/ .van-nav-bar__text {
    color: #0c34ba;
  }
}
</style>