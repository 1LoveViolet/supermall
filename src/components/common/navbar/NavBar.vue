<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="middle">
      <slot name="middle"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.nav-bar {
  display: flex;
  width: 100%;
  line-height: 44px;
  text-align: center;
  box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.1);
}
.left,
.right {
  width: 40px;
}
.middle {
  flex: 1;
}
</style>