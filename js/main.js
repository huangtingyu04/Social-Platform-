import { findCountryFlag, showMemberDetail, getTotalPages, getPageData } from './module/display.js'
import { displaySelectedLocation, displayRangeSlider } from './module/filterData.js'

  ; (function () {
    const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users/'
    const displayMembersPanel = document.querySelector('#members .row')
    const ageRange = document.querySelectorAll('.range-slider-container span')
    const rangeSlider = document.querySelectorAll('.range-slider-container input')
    const favoriteNumber = document.querySelector('#header .favorite-number')
    const mobilefavoriteNumber = document.querySelector('#mobile-nav .favorite-number')
    const pagination = document.getElementById('pagination')
    const data = []
    const list = JSON.parse(localStorage.getItem('favoriteMembers')) || []
    // ajax 請求資料前加上 loading
    document.body.className = 'loading'
    axios.get(BASE_URL)
      .then(function (response) {
        // handle success
        data.push(...response.data.results)
        displaySelectedLocation(data) // 將 data 裡的所有國家找出
        displayRangeSlider(data) // 將 data 裡的所有成員的年齡做大最小找出
        getTotalPages(data) //製作分頁
        getPageData(1, data)
        // ajax 請求資料成功後移除 loading
        document.body.className = ''
      })
      .catch(function (error) {
        // handle error
        document.body.className = ''
        console.log(error);
      })
    //my favorites 數量  
    favoriteNumber.textContent = list.length
    //mobile-nav 裡 my favorites 數量
    mobilefavoriteNumber.textContent = list.length

    // listen to pagination click event
    pagination.addEventListener('click', e => {
      let clickedPage = Number(e.target.dataset.page)
      if (e.target.tagName === 'A') {
        getPageData(clickedPage)
      }
    })
    function addOrRemoveFavoriteMember(id) {
      const favoriteMember = data.find(member => member.id === Number(id))
      const index = list.findIndex(member => member.id === Number(id))
      if (list.some(member => member.id === Number(id))) {
        list.splice(index, 1)
        alert(` ${favoriteMember.name} ${favoriteMember.surname}  is removed from your favorite list.`)
      } else {
        list.push(favoriteMember)
        alert(`Add  ${favoriteMember.name} ${favoriteMember.surname}  to your favorite list.`)
      }
      localStorage.setItem('favoriteMembers', JSON.stringify(list))
      favoriteNumber.textContent = list.length
      mobilefavoriteNumber.textContent = list.length
    }
    // add listener on displayMembersPanel
    displayMembersPanel.addEventListener('click', (e) => {
      let id = e.target.dataset.id
      let region = e.target.dataset.region
      if (e.target.classList.contains('btn')) {
        document.body.className = 'loading'
        showMemberDetail(id)
        findCountryFlag(region)
      } else if (e.target.classList.contains('fa-heart')) {
        e.target.classList.toggle('open')
        addOrRemoveFavoriteMember(id)
      }
    })
    document.querySelectorAll('.custom-select-search').forEach(dropdown => {
      dropdown.addEventListener('click', function () {
        this.classList.toggle('open')
      })
    })
    window.addEventListener('click', function (e) {
      document.querySelectorAll('.custom-select-search').forEach(select => {
        if (!select.contains(e.target)) {
          select.classList.remove('open')
        }
      })
    });
    rangeSlider.forEach(input => {
      input.addEventListener('input', function () {
        for (let i = 0; i < 2; i++) {
          let nowValue = rangeSlider[i].value
          ageRange[i].textContent = nowValue
        }
        if (ageRange[0].textContent > ageRange[1].textContent) {
          [ageRange[0].textContent, ageRange[1].textContent] = [ageRange[1].textContent, ageRange[0].textContent]
        }
      })
    })
    //當按下 search 按鈕後，
    document.querySelector('#search .btn').addEventListener('click', function () {
      //收集各個偏好資料(性別性別. 國家. 年齡)

      let selectedpreference = []
      let results = []
      document.querySelectorAll('.custom-select__trigger span').forEach(content => {
        selectedpreference.push(content.textContent)
      })
      results = data.filter(function (member) {
        if ((selectedpreference[0] === 'Choose Your Preferences' || selectedpreference[0].toLowerCase() === member.gender.toLowerCase()) && (selectedpreference[1] === 'Choose Your Preferences' || selectedpreference[1].toLowerCase() === member.region.toLowerCase()) && ((member.age >= ageRange[0].textContent) && (member.age <= ageRange[1].textContent))) {
          return true
        }
      })
      getTotalPages(results)
      getPageData(1, results)
    })




























  })()