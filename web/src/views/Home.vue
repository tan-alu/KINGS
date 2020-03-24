<template>
  <div class="home">
    <!-- 首页 -->
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img
          src="../assets/images/1c77369aa3fdac6bbea79b03c87031ad.1582289071.9e65100f4a17495865ecac00703fb17e.184x124_14454.jpg"
          class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img
          src="../assets/images/1c77369aa3fdac6bbea79b03c87031ad.1582289071.9e65100f4a17495865ecac00703fb17e.184x124_14454.jpg"
          class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img
          src="../assets/images/1c77369aa3fdac6bbea79b03c87031ad.1582289071.9e65100f4a17495865ecac00703fb17e.184x124_14454.jpg"
          class="w-100">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
</style>
