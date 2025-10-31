<template>
  <div @mouseenter="setIsBig(true)" @mouseleave="setIsBig(false)"
    :class="[weather?.weatherClass, { 'small-card': !isHover, 'magnify-card': isHover }]"
    style="  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
    <!-- 大图样式 -->
    <template v-if="isHover">
      <div class="header">
        <i :class="'qi-' + `${weather?.iconDay || '0'}`" style="display: block;"></i>
        <span class="text">{{ weather?.textDay || '0'}}</span>
        <span class="time">{{ weather?.fxDate || '0'}}&nbsp;{{ weather?.weekDay || '0'}}</span>
      </div>
      <div class="main">
        <span>↑{{ weather?.tempMax || '0'}}℃</span>
        <span>{{ weather?.tempMin || '0'}}℃↓</span>
      </div>
      <div class="footer">
        <div class="pressure">
          <span class="title">风速</span>
          <span class="text">{{ weather?.windSpeedDay || '0'}}公里/时</span>
        </div>
        <div class="vis">
          <span class="title">能见度</span>
          <span class="text">{{ weather?.vis || '0'}}公里</span>
        </div>
        <div class="humidity">
          <span class="title">相对湿度</span>
          <span class="text">{{ weather?.humidity || '0'}}%</span>
        </div>
      </div>
    </template>
    <!-- 小图样式 -->
    <template v-else>
      <div>{{ weather?.fxDate || '0'}}</div>
      <div><i :class="'qi-' + `${weather?.iconDay || '0'}`"></i></div>
      <div>{{ weather?.textDay || '0'}}</div>
      <div>↑{{ weather?.tempMax || '0'}}℃</div>
      <div>↓{{ weather?.tempMin || '0'}}℃</div>
      <span>{{ weather?.fxData || '0'}}</span>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  // isHover:number,
  weather: {
    type: Object,
    default: () => { }
  }
})
const isHover = ref(false)
function setIsBig(state) {
  isHover.value = state
}

</script>

<style scoped>
.small-card {
  flex: 0 0 14%;
  height: 200px;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 15%;
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  justify-content: space-around;
}

.small-card i {
  font-size: 40px;
  margin-right: 10px;
}

.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

}

i {
  font-size: 28px;
  margin-right: 10px;


}

.magnify-card {
  height: 200px;
  border-radius: 15%;
  transition: border-radius 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transition-duration: 0.2s;
  flex: 0 0 30%;
  margin: 10px;
}

.header {
  display: flex;
  justify-content: start;
  width: 90%;
}

.header .text {
  font-size: 28px;
}

.header .time {
  margin-left: auto;
  font-size: 16px;
}

.header {
  display: flex;
  justify-content: start;
  width: 90%;
  line-height: 24px;
}

.header .text {
  font-size: 24px;
}

.main {
  display: flex;
  width: 90%;
}

.main span {
  display: inline-block;
  justify-self: start;
  line-height: 24px;
}

.main span:first-child {
  font-size: 24px;
  margin-right: 10px;
}

.main span:last-child {
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  border-radius: 15%;
  transition-duration: 0.2s;
  transition-property: all;
}

.main span:last-child:hover {
  transform: scale(1.15);
}

.footer {
  display: flex;
  width: 95%;
  justify-content: space-evenly;
  align-items: center;

}

.footer div {
  width: 25%;
  height: 45px;
  border-radius: 15%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  transition-duration: 0.2s;
  transition-property: all;
}

.footer div:hover {
  transform: scale(1.15);

}

.footer .title {
  font-size: 12px;
  display: block;

}

.footer .text {
  font-size: 12px;
  display: block;
}


</style>
