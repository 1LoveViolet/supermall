<template>
  <div class="wrapper" ref="wrapper">

    <div class="content">
      <slot>

      </slot>
    </div>

  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import ObserveImage from '@better-scroll/observe-image'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)
BScroll.use(ObserveImage)
export default {
  data() {
    return {
      scroll: null
    }
  },

  mounted() {
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      click: true,
      pullUpLoad: true,
      observeImage: true
    })
    //监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    //监听scroll滚动到底部
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })

  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>
</style>