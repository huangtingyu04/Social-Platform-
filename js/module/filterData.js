//動態增加 search 裡的 location 選單
// 將 data 裡的所有國家找出
function selectRegionArray(data) {
  let regionArray = data.reduce((arr, content) => {
    if (!arr.includes(content.region)) arr.push(content.region)
    return arr
  }, [])
  return regionArray
}
export function displaySelectedLocation(data) {
  const locationSelected = document.querySelector('#search .select-location')
  let sortedRegionArray = selectRegionArray(data).sort()// 將國家依照字母開頭排序
  sortedRegionArray.forEach(region => {
    let span = document.createElement('span')
    span.textContent = region
    span.setAttribute("class", "custom-option")
    locationSelected.appendChild(span)
  })
  //資料傳進來後才在 option 上綁監聽器
  for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', selectPreferences)
  }
}
//點擊時更改偏好內容 及 css 樣式
function selectPreferences() {
  if (!this.classList.contains('selected')) {
    this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
    this.classList.add('selected');
    this.closest('.custom-select-search').querySelector('.custom-select__trigger span').textContent = this.textContent;
  }
}
//找出 data 裡的年紀的最大最小值 並 寫在 rangeslider裡
export function displayRangeSlider(data) {
  const rangeSlider = document.querySelectorAll('.range-slider-container input')
  const ageRange = document.querySelectorAll('.range-slider-container span')
  let maxValue = Math.max(...data.map(member => member.age))
  let minValue = Math.min(...data.map(member => member.age))
  for (let i = 0; i < 2; i++) {
    rangeSlider[i].max = maxValue
    rangeSlider[i].min = minValue
    rangeSlider[i].value = Math.ceil((maxValue - minValue) * (i + 1) / 3 + minValue)
    ageRange[i].textContent = Math.ceil((maxValue - minValue) * (i + 1) / 3 + minValue)
  }
}
