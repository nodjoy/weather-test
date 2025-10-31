<template>
  <div style="display: flex;">
    <el-button :icon="User" circle style="width: 40px;height: 40px;; text-align: center;" />
    <span>Hello,</span>
    <span>Jack Grealish</span>
    <div style="display: flex;">
      <Location style="width: 24px; height: 24px; margin-left: 12px;" /><span
        style="display: block; margin-left: 8px;">{{ cityStore?.cityInfo?.name || '0'}}</span>
    </div>
  </div>
  <el-switch @click="emitter.emit('showOne', show)" v-model="show" inline-prompt style=" margin-right: 10px;"
    active-text="七天" inactive-text="今天" />

  <div class="header" style="margin-right: 20px;">
    <el-input style="width: 240px;" placeholder="Please input" clearable :prefix-icon="Search" class="myInput"
      v-model="cityName" @keyup.enter="handleSearch" />
  </div>
  <el-button :icon="Bell" circle style="width: 40px;height: 40px;" />
</template>
<script setup>
import { Search, Bell, User } from '@element-plus/icons-vue'
import { ref,computed,nextTick} from 'vue'
import { useCityStore } from '@/store/city'
const cityStore = useCityStore()
import { fetchCityAndWeather } from '@/utils/weatherHelper'
import { useWeatherStore } from '@/store/weather'
import emitter from '@/utils/emitter'
const weatherStore = useWeatherStore()
const cityName = ref('')
let show = ref(false)
// 创建加载状态
const isLoading = ref(false)

// 检查是否有数据的计算属性
const hasWeatherData = computed(() => {
  return weatherStore.weatherNowInfo?.length > 0 ||
    weatherStore.weatherDaysInfo?.length > 0 ||
    weatherStore.weatherHoursInfo?.length > 0
})

async function handleSearch() {
  if (!cityName.value.trim()) return

  isLoading.value = true
  // 发出开始加载的信号
  emitter.emit('loadingShow', true)

  try {
    const data = await fetchCityAndWeather(cityName.value)
    console.log('📊 所有数据:', data)

    // 等待数据更新后检查
    await nextTick()

    if (hasWeatherData.value) {
      console.log('✅ 数据加载完成，有天气数据')
    } else {
      console.log('⚠️ 数据加载完成，但没有天气数据')
    }

  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    // 无论成功失败，都解除加载状态
    isLoading.value = false
    emitter.emit('loadingShow', false)
  }
}
</script>

<style scoped>
div:nth-child(1) {
  margin-right: auto;
}

span {
  line-height: 40px;
}

svg {
  margin-top: 4px;
}
</style>
