<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

// const TabBarItem = () => import('./TabBarItem.vue')
export default {
  name: 'TabBar',
  components: {



  }
}
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0px -5px 1px rgba(100, 100, 100, 0.1);
}
</style>