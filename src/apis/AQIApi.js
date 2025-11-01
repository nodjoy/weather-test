import httpInstance from "@/utils/http.js"
export const AQIApi = {
  getAQIInfo(lat, lon) {
    // console.log(lat, lon);
    if (typeof lat !== 'number' || typeof lon !== 'number' || isNaN(lat) || isNaN(lon)) {
      // console.log('当前类型为', typeof (lat), typeof (lon));
      // console.error('AQIapi参数必须是number!')
      return Promise.reject(new Error('经纬度不能为空'))
    }
    return httpInstance({
      url: `/api/airquality/v1/current/${lat}/${lon}`,
      // url: '/air_pollution',
      // params: {
      //   lat: lat,
      //   lon: lon
      // }
    })
  },
}
