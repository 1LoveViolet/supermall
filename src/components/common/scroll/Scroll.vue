<template>
  <div class="wrapper" ref="wrapper">

    <div class="content">
      <slot>

      </slot>
    </div>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
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

    })
    //监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>

<style>
</style>