import { defineStore } from "pinia";
import { weatherApi } from '../apis/weatherApi';
import { weatherCacheManager } from '@/utils/weatherCacheManager'
import { ref, } from 'vue'
// import { AQIApi } from "@/apis/AQIApi";
import {cityApi} from '@/apis/cityApi'
export const useWeatherStore = defineStore('weather', () => {
  const weatherNowInfo = ref([])
  const weatherHoursInfo = ref([])
  const weatherDaysInfo = ref([])
  const airQualityInfo = ref([])
  const getWeather = async () => {
    try {
      const apiCallbacks = {
        searchCity: cityApi.searchCity,
        getWeatherNowInfo: weatherApi.getWeatherNowInfo,
        getWeatherHoursInfo: weatherApi.getWeatherHoursInfo,
        getWeatherDaysInfo: weatherApi.getWeatherDaysInfo,
        // getAQINowInfo:AQIApi.getAQIInfo
      }

      const weatherData = await weatherCacheManager.getWeatherWithCache(apiCallbacks);



      weatherNowInfo.value = weatherData.now || [];
      weatherHoursInfo.value = weatherData.hours || [];
      weatherDaysInfo.value = weatherData.days || [];
      airQualityInfo.value = weatherData.aqi || [];

      // console.log(weatherData.fromCache ? '📦 使用缓存数据' : '🌤️ 使用新数据');

    } catch (error) {
      console.error('获取天气数据失败:', error);
      throw error;
    }
  }

  const clearCache = () => {
    weatherCacheManager.clearAllWeatherCache();
  }

  const getCacheStatus = () => {
    return weatherCacheManager.getCacheStatus();
  }

  return {
    weatherNowInfo,
    weatherHoursInfo,
    weatherDaysInfo,
    airQualityInfo,
    getWeather,
    clearCache,
    getCacheStatus,
  }
})
