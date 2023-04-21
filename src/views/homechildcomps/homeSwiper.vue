<template>

  <Swiper>
    <SwiperItem v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt=""></a>
    </SwiperItem>
  </Swiper>

</template>

<script>
// const  Swiper  = () => import('components/common/swiper/Swiper')
// const  SwiperItem  = () => import('components/common/swiper/SwiperItem')
//以下方法代替上面方法
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
}
</script>

<style>
</style>