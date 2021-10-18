<template>
  <div class="mynav">
    <div class="top-left">
      <!-- 插槽一 -->
      <slot name="left"></slot>
    </div>
    <div class="top-right">
      <!-- 插槽三 -->
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.mynav{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    height: 50px;
    .top-left{
        font-size: 14px;
        color: #726f83;
    }
    .top-right{
         font-size: 14px;
        color: #726f83;
    }
}

</style>