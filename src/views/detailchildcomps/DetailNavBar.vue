<template>
  <div>
    <NavBar>
      <div class="titles" slot="middle">
        <div class="title-item" v-for="(item,index) in titles" :key="index" :class="{active:index===currentIndex}" @click="itemClick(index)">{{ item }}</div>
      </div>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </NavBar>
  </div>
</template>

<script>
const NavBar = () => import('components/common/navbar/NavBar')
export default {
  components: {
    NavBar
  },
  data() {
    return {
      iid: null,
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  created() {
    this.iid = this.$route.params.iid
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    },
    back() {
      // this.$router.go(-1)
      history.go(-1)
    }
  }
}
</script>

<style>
.titles {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  vertical-align: middle;
  text-align: center;
}
</style>