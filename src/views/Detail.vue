<template>
  <div id="detail">
    <DetailNavBar class="detail-nav"></DetailNavBar>
    <Scroll class="content" ref="scroll">
      <DetailSwiper class="detail-swiper" :topImages="topImages"></DetailSwiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo"></DetailGoodsInfo>
      <DetailParamInfo ref="param" :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
      <!-- <DetailRecommendInfo ref="recommend" :recommendList="recommendList"></DetailRecommendInfo> -->
    </Scroll>

  </div>
</template>

<script>
const DetailNavBar = () => import('./detailchildcomps/DetailNavBar')
const DetailSwiper = () => import('./detailchildcomps/DetailSwiper')
const DetailBaseInfo = () => import('./detailchildcomps/DetailBaseInfo')
const DetailShopInfo = () => import('./detailchildcomps/DetailShopInfo')
const DetailGoodsInfo = () => import('./detailchildcomps/DetailGoodsInfo')
const DetailParamInfo = () => import('./detailchildcomps/DetailParamInfo.vue')
const DetailCommentInfo = () => import('./detailchildcomps/DetailCommentInfo.vue')
// const DetailRecommendInfo = () => import('./detailchildcomps/DetailRecommendInfo.vue')
const Scroll = () => import('components/common/scroll/Scroll')
import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      isshow: true,
      tabOffsetTop: 0,
      paramInfo: {},
      // recommendList: [],
      commentInfo: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailGoodsInfo,
    // DetailRecommendInfo,
    Scroll
  },
  created() {
    this._getDetailData()
    // this._getRecommend()
  },
  methods: {
    _getDetailData() {
      // 1.获取iid
      this.iid = this.$route.params.iid
      // 2.请求数据
      getDetail(this.iid).then(res => {
        // 2.1.获取结果
        const data = res.result;
        // console.log(res);
        // 2.2.获取顶部信息
        this.topImages = data.itemInfo.topImages;

        // 2.3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 2.4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 2.5.获取商品信息
        this.detailInfo = data.detailInfo

        // 2.6.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 2.7.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })
    },
    // _getRecommend() {
    //   getRecommend().then(res => {
    //     this.recommendList = res.data.list
    //     console.log("商品推荐 : " + res);
    //   })
    // }
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
}
.detail-nav {
  position: relative;
  background-color: #ffffff;
  z-index: 9;
}
.detail-swiper {
  padding-top: 44px;
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