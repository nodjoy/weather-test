import { defineStore } from "pinia";
import {ref} from 'vue'
import {cityApi} from '@/apis/cityApi'
export const useCityStore = defineStore('city',()=>{

const cityInfo = ref({})
const getCityInfo = async (cityName)=>{
  const res = await cityApi.searchCity(cityName)
  cityInfo.value = res.data.location[0]
  // console.log('@@@@@city的数据',res.data.location[0]);
}

return {
  cityInfo,
  getCityInfo
}
})
