import httpInstance from "@/utils/http.js"
export const cityApi = {
  // 城市搜索
  searchCity(location) {
    if (!location || typeof location !== 'string') {
      // console.log(typeof(location));
      // console.log(location);
      // console.error('location参数必须是非空字符串')
      return Promise.reject(new Error('城市名称不能为空'))
    }
    return httpInstance({
      // url: '/geo/v2/city/lookup',
      url: '/api/geo/v2/city/lookup',
      params: {
        location: location.trim()
      }
    })
  }
}
