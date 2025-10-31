// 时间转换为时-分
export const formatTime = (apiTimeString) => {
  const date = new Date(apiTimeString);
  if (date instanceof Date && !isNaN(date)) {
    return date.toLocaleTimeString('zh-CN',{ hour: '2-digit', minute: '2-digit' })
  } else {
    console.log('日期转换失败');
  }
}
// 将日期字符串或Date对象转换为星期几
export const getWeekday = (date, locale = 'zh-CN', format = 'long') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(dateObj);
}

export const formatDateToMonthDay = (apiTimeString) => {
  const date = new Date(apiTimeString);
  if (date instanceof Date && !isNaN(date)) {
    // 获取月份和日期，月份需要+1（因为getMonth()返回0-11）
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // 格式化为 MM-DD 形式，确保两位数
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  } else {
    console.log('日期转换失败，参数：', apiTimeString);
    return '无效日期';
  }
}
