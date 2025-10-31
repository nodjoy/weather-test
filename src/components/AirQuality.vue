<template>
  <div class="air-quality-container">
    <div class="dashboard-section">
      <div class="dashboard-content">
        <el-progress type="dashboard" :percentage="aqiPercentage" :color="aqiColor" :width="200" :stroke-width="20">
          <template #default>
            <div class="aqi-value">
              <div class="aqi-number">{{ airQualityIndex || "0" }}</div>
              <div class="aqi-label">空气指数</div>
              <div class="quality-indicator" :style="{ color: aqiColor }">{{ aqiDescription|| '0' }}</div>
            </div>
          </template>
        </el-progress>
      </div>
    </div>

    <div class="pollutants-section">
      <div v-for="pollutant in pollutantList" :key="pollutant.name" class="pollutant-item">
        <div class="pollutant-info">
          <span class="pollutant-label">{{ pollutant.name || '0'}}</span>
          <span class="pollutant-value">{{ pollutant.value || '0'}} <span class="unit">{{ pollutant.unit || '0'}}</span></span>
        </div>
        <div class="pollutant-progress">
          <el-progress :percentage="pollutant.percentage" :color="pollutant.color" :show-text="false"
            :stroke-width="10">
          </el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useWeatherStore } from '@/store/weather'
const weatherStore = useWeatherStore()
const airQualityIndex = computed(() =>  weatherStore.airQualityInfo?.[0]?.components.pm2_5)

console.log('空气质量信息:', weatherStore.airQualityInfo);

// 污染物配置
const pollutantConfigs = [
  { name: 'PM2.5', key: 'pm2_5', unit: 'μg/m³', max: 75 },
  { name: 'PM10', key: 'pm10', unit: 'μg/m³', max: 150 },
  { name: 'SO₂', key: 'so2', unit: 'μg/m³', max: 80 },
  { name: 'NO₂', key: 'no2', unit: 'μg/m³', max: 100 },
  { name: 'O₃', key: 'o3', unit: 'μg/m³', max: 200 }
]

// 污染物列表
const pollutantList = ref([])

// 计算属性
const aqiPercentage = computed(() => {
  return Math.min(100, (airQualityIndex.value / 300) * 100);
});

const aqiDescription = computed(() => {
  if (airQualityIndex.value <= 50) return '优';
  if (airQualityIndex.value <= 100) return '良';
  if (airQualityIndex.value <= 150) return '轻度污染';
  if (airQualityIndex.value <= 200) return '中度污染';
  return '重度污染';
});

const aqiColor = computed(() => {
  if (airQualityIndex.value <= 50) return '#67C23A';
  if (airQualityIndex.value <= 100) return '#E6A23C';
  if (airQualityIndex.value <= 150) return '#F56C6C';
  if (airQualityIndex.value <= 200) return '#8B0000';
  return '#4B0082';
});

// 更新污染物数据的函数
const updatePollutants = () => {
  pollutantList.value = pollutantConfigs.map(config => {
    const value = weatherStore.airQualityInfo?.[0]?.components?.[config.key] || 0;
    const percentage = Math.min(100, (value / config.max) * 100);

    let color = '#67C23A'; // 绿色
    if (percentage >= 80) {
      color = '#F56C6C'; // 红色
    } else if (percentage >= 60) {
      color = '#E6A23C'; // 黄色
    }

    return {
      ...config,
      value,
      percentage,
      color
    };
  });
};

// 生命周期钩子
onMounted(() => {
  updatePollutants();
});

// 监听 AQIStore 数据变化
watch(
  () => weatherStore.airQualityInfo,
  () => {
    updatePollutants();
  },
  { deep: true }
);
</script>

<style scoped>
.air-quality-container {
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding-top: 20px;
  max-width: 800px;
}

.dashboard-section {
  display: flex;
  justify-content: center;

}

.dashboard-content {
  text-align: center;
  position: relative;
}

.aqi-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.aqi-number {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 5px;
}

.aqi-label {
  font-size: 16px;
  color: #666;
}

.pollutants-section {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pollutant-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pollutant-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pollutant-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.pollutant-value {
  font-size: 14px;
  color: #666;
}

.unit {
  font-size: 12px;
  color: #999;
}

.pollutant-progress {
  width: 100%;
}

.quality-indicator {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}
</style>
