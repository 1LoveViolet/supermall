<template>
  <div id="home">
    <NavBar class="home_nav">
      <div slot="middle">购物车</div>
      <div slot="left">返回</div>
    </NavBar>

    <Scroll class="content" ref="scroll" @scroll="contentScroll">
      <homeSwiper class="homeswiper" :banners="banners"></homeSwiper>
      <homeRecommendView :recommends="recommends"></homeRecommendView>
      <feature-view :features="recommends"></feature-view>
      <TabControl class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>

    <BackTop @click.native="BackTop" v-show="isshow"></BackTop>
  </div>
</template>

<script>

const NavBar = () => import('components/common/navbar/NavBar')
const homeSwiper = () => import('views/homechildcomps/homeSwiper')
const homeRecommendView = () => import('views/homechildcomps/homeRecommendView')
const FeatureView = () => import('views/homechildcomps/FeatureView')
const TabControl = () => import('components/content/TabControl')
const GoodsList = () => import('components/content/GoodsList')
const Scroll = () => import('components/common/scroll/Scroll')
const BackTop = () => import('components/content/BackTop')
import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  components: {
    NavBar,
    homeSwiper,
    homeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isshow: true
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // //3.监听item中图片加载
    // this.$bus.$on('itemimageLoad', () => {
    //   this.$refs.scroll.refresh()
    // })
  },
  mounted() {
    //3.监听item中图片加载
    this.$bus.$on('itemimageLoad', () => {
      this.$refs.scroll.refresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //事件监听相关的代码
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    contentScroll(position) {
      this.isshow = (-position.y) > 1400
    },

    //网络请求相关的代码
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
      })
    },
    BackTop() {
      this.$refs.scroll.scrollTo(0, 0)
    }

  }

}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.homeswiper {
  padding-top: 44px;
}
.home_nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  z-index: 9;
}
.tab-control {
  background-color: #ffffff;
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  position: absolute;
  top: 0px;
  bottom: 49px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
</style>