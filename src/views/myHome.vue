<template>
  <div id="home">
    <NavBar class="home_nav">
      <div slot="middle">购物车</div>
      <div slot="left">返回</div>
    </NavBar>
    <TabControl ref="tabControl1" class="tabControl1" :titles="['流行','新款','精选']" @tabClick="tabClick" v-show="isTabFixd"></TabControl>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" @pullingUp="loadMore">

      <homeSwiper class="homeswiper" :banners="banners" @swiperImageLoad="swiperImageLoad"></homeSwiper>
      <homeRecommendView :recommends="recommends"></homeRecommendView>
      <feature-view :features="recommends"></feature-view>
      <TabControl ref="tabControl2" class="" :titles="['流行','新款','精选']" @tabClick="tabClick"></TabControl>
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
      isshow: true,
      tabOffsetTop: 0,
      isTabFixd: false,
      saveY: 0
    }
  },
  destroyed() {
    console.log('home destroyed');
  },
  activated() {
    console.log('activated');
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY()
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
    //   this.debounce(this.fn, 200)
    // })
  },
  mounted() {
    //新方法可以使用observe-image插件来监听图片加载并且自动refresh()
    //3.监听item中图片加载
    // const refresh = this.debounce(this.fn, 200)
    // this.$bus.$on('itemimageLoad', () => {
    //   // refresh()
    //   // this.$refs.scroll.refresh();
    //   this.$refs.scroll.scroll.refresh()
    // })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    swiperImageLoad() {
      //
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabOffsetTop);
    },
    loadMore() {
      console.log('下拉加载');
      this.getHomeGoods(this.currentType)
    },
    // fn() {
    //   this.$refs.scroll.refresh();
    //   console.log('防抖加载');
    // },
    // debounce(fn, delay) {
    //   let timer = null;
    //   return function () {
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       fn();
    //     }, delay)
    //   }
    // },
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
      this.$refs.tabControl2.currentIndex = index
      this.$refs.tabControl1.currentIndex = index
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isshow = (-position.y) > 1400
      //决定tabControl是否吸顶
      this.isTabFixd = (-position.y) > this.tabOffsetTop - 44
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

        this.$refs.scroll.scroll.finishPullUp()
      })
    },
    BackTop() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    }

  }

}
</script >

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

.content {
  position: absolute;
  top: 0px;
  bottom: 49px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
.tabControl1 {
  background-color: #ffffff;
  position: relative;
  top: 44px;
  z-index: 9;
}
</style>