import { findCountryFlag, showMemberDetail, getTotalPages, getPageData } from './module/display.js'

  ; (function () {
    const displayMembersPanel = document.querySelector('#members .row')
    const favoriteNumber = document.querySelector('#header .favorite-number')
    const mobilefavoriteNumber = document.querySelector('#mobile-nav .favorite-number')
    const data = JSON.parse(localStorage.getItem('favoriteMembers')) || []


    //my favorites 數量 
    favoriteNumber.textContent = data.length
    //mobile-nav 裡 my favorites 數量
    mobilefavoriteNumber.textContent = data.length
    if (checkListLength()) return //check if list.length equals zero
    function checkListLength() {
      if (data.length === 0) {
        displayMembersPanel.innerHTML =
          `<div class="my-5 mx-auto animated fadeInUp">
                            <h3>There is no results in your favorites, please go back to <a href="index.html" style="color: #111; text-decoration-line: underline;">homepage</a>.</h3>
                          </div>
                          `
        return true
      }
    }

    getTotalPages(data) //製作分頁
    getPageData(1, data) // 將 members display 到畫面上 

    // listen to pagination click event
    pagination.addEventListener('click', e => {
      let clickedPage = Number(e.target.dataset.page)
      if (e.target.tagName === 'A') {
        getPageData(clickedPage)
      }
    })
    function removeFavoriteMember(id) {
      const favoriteMember = data.find(member => member.id === Number(id))
      const index = data.findIndex(member => member.id === Number(id))
      if (index === -1) return
      data.splice(index, 1)
      alert(` ${favoriteMember.name} ${favoriteMember.surname}  is removed from your favorite list.`)
      getTotalPages(data) //製作分頁
      getPageData(1, data) // 將 members display 到畫面上 
      favoriteNumber.textContent = data.length
      mobilefavoriteNumber.textContent = data.length
      checkListLength() //check if list.length equals zero
      localStorage.setItem('favoriteMembers', JSON.stringify(data))
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
        removeFavoriteMember(id)
      }
    })
  })()


