import { computed } from 'vue'
// import { useWeatherStore } from '@/store/weather.js'
import { formatTime, formatDateToMonthDay, getWeekday } from '@/utils/formatTime.js'


// 天气类型映射函数
const getWeatherTypeByCode = (code) => {
  if (code == 100 || code == 150) return 'sunny'
  if ((code >= 101 && code <= 104) || (code >= 151 && code <= 153)) return 'cloudy'
  if (code >= 300 && code <= 399) return 'rainy'
  if (code >= 400 && code <= 499) return 'snowy'
  if (code == 500 || code == 501 || code == 509 || code == 510 || code == 514 || code == 515) return 'atmosphere'
  if (code == 502 || (code <= 511 && code <= 513)) return 'haze'
  return 'unknown'
}

// 天气类型到CSS类的映射
const weatherClassMap = {
  'haze': 'weather-haze',
  'rainy': 'weather-rainy',
  'snowy': 'weather-snowy',
  'atmosphere': 'weather-foggy',
  'sunny': 'weather-sunny',
  'cloudy': 'weather-cloudy',
  'unknown': 'weather-default'
}

// 合并后的计算属性
export function useWeatherNow(now) {
  // console.log("实时天气处理");

  // 合并后的计算实时天气属性
  const enhancedWeatherNowData = computed(() => {

    if (!now) {
      return 'weather-default'
    }
    const weatherNowInfo = [now]
    return weatherNowInfo.map(item => {
      // 数据是否被处理过
      const isProcessed = true
      const formattedTime = formatTime(item.obsTime)
      const weatherType = getWeatherTypeByCode(+item.icon)
      const weatherClass = weatherClassMap[weatherType] || 'weather-default'
      return {
        ...item,
        obsTime:formattedTime,
        weatherClass,
        weatherType,
        isProcessed
      }
    })
  })
  return enhancedWeatherNowData
}
export function useWeatherHours(hours) {
  // console.log("小时天气处理");

   // 合并后的计算小时天气属性
  const enhancedWeatherHoursData = computed(() => {
    if (!hours || !Array.isArray(hours)) {
      return []
    }

    return hours.map(item => {
      // 数据是否被处理过
      const isProcessed = true
      // 时间格式化
      const formattedTime = formatTime(item.fxTime)

      // 天气类型和CSS类计算
      const weatherType = getWeatherTypeByCode(+item.icon)
      const weatherClass = weatherClassMap[weatherType] || 'weather-default'

      return {
        ...item,
        fxTime: formattedTime,
        weatherClass,
        weatherType,
        isProcessed
      }
    })
  })
  return enhancedWeatherHoursData
}
export function useWeatherDays(days) {
  // console.log("未来7天天气处理");

  // 合并后的计算每天天气属性
  const enhancedWeatherDaysData = computed(() => {
    if (!days || !Array.isArray(days)) {
      return []
    }
    return days.map(item => {
      // 数据是否被处理过
      const isProcessed = true
      // 时间格式化转换为月-日
      const formattedTime = formatDateToMonthDay(item.fxDate)
      // 时间格式化转换为星期几
      const weekDay = getWeekday(item.fxDate)
      // 天气类型和CSS类计算
      const weatherType = getWeatherTypeByCode(+item.iconDay)
      const weatherClass = weatherClassMap[weatherType] || 'weather-default'

      return {
        ...item,
        fxDate: formattedTime,
        weatherClass,
        weatherType,
        weekDay,
        isProcessed
      }
    })
  })
  return enhancedWeatherDaysData
}



