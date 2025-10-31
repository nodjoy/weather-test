<template>
  <div @mouseenter="setIsBig(true)" @mouseleave="setIsBig(false)"
    :class="[weather?.weatherClass, { 'small-card': !isHover, 'magnify-card': isHover }]"
    style="  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
    <!-- 大图样式 -->
    <template v-if="isHover">
      <div class="header">
        <i :class="'qi-' + `${weather?.icon || '0'}`" style="display: block;"></i>
        <span class="text">{{ weather?.text || '0'}}</span>&nbsp;
        <span class="time">{{ weather?.fxTime || '0'}}</span>
      </div>
      <div class="main">
        <span>{{ weather?.temp || '0'}}℃</span>

      </div>
      <div class="footer">
        <div class="pressure">
          <span class="title">大气压</span>
          <span class="text">{{ weather?.windSpeed || '0'}}公里/时</span>
        </div>
        <div class="humidity">
          <span class="title">相对湿度</span>
          <span class="text">{{ weather?.humidity || '0'}}%</span>
        </div>
      </div>
    </template>
    <!-- 小图样式 -->
    <template v-else>
      <div><i :class="'qi-' + `${weather?.icon}`"></i></div>
      <div>{{ weather?.text || '0'}}</div>
      <div>{{ weather?.temp || '0'}}℃</div>
      <span>{{ weather?.fxTime || '0'}}</span>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({

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
  /* background: white; */
  /* box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0 0 0 2px rgb(190, 190, 190),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3); */
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
  /* background: white; */
  /* box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0 0 0 2px rgb(190, 190, 190),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3); */
  transition: border-radius 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transition-duration: 0.2s;
  /* transition-property: all; */
  flex: 0 0 30%;
  margin: 10px;
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
