<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active:index===currentIndex}" @click="itemclick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.active {
  color: red;
}
.active span {
  padding-bottom: 5px;
  border-bottom: 2px red solid;
}
</style>