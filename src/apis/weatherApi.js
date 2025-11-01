import httpInstance from "@/utils/http.js"
export const weatherApi = {
  // 实时-获取天气信息
  getWeatherNowInfo(locationId) {
    //  || typeof locationId !== 'number'
    if (!locationId || typeof locationId !== 'number') {
      // console.log('当前类型为', typeof (locationId));
      // console.error('天气locationId参数必须是number')
      return Promise.reject(new Error('城市名称不能为空'))
    }
    return httpInstance({
      url: '/v7/weather/now',
      params: {
        location: locationId
      }
    })
  },

  // 逐小时-获取天气信息
  getWeatherHoursInfo(locationId) {
    if (!locationId || typeof locationId !== 'number') {
      // console.log('当前类型为', typeof (locationId));
      // console.error('天气location参数必须是number')
      return Promise.reject(new Error('城市名称不能为空'))
    }
    return httpInstance({
      url: '/v7/weather/24h',
      params: {
        location: locationId
      }
    })
  },

  getWeatherDaysInfo(locationId) {
    if (!locationId || typeof locationId !== 'number') {
      // console.log('当前类型为', typeof (locationId));
      // console.error('天气location参数必须是number')
      return Promise.reject(new Error('城市名称不能为空'))
    }
    return httpInstance({
      url: '/v7/weather/7d',
      params: {
        location: locationId
      }
    })
  },
}
