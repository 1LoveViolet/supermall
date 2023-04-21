<template>
  <div>
    <NavBar class="home_nav">
      <div slot="middle">购物车</div>
      <div slot="left">返回</div>
    </NavBar>

    <homeSwiper :banners="banners"></homeSwiper>
    <homeRecommendView :recommends="recommends"></homeRecommendView>
  </div>
</template>

<script>

const NavBar = () => import('components/common/navbar/NavBar')
const homeSwiper = () => import('views/homechildcomps/homeSwiper')
const homeRecommendView = () => import('views/homechildcomps/homeRecommendView')
import { getHomeMultidata } from 'network/home'

export default {
  components: {
    NavBar,
    homeSwiper,
    homeRecommendView
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: []
    }
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      // this.result = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },

}
</script>

<style>
.home_nav {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>