(function () {
  const favoriteNumber = document.querySelector('#header .favorite-number')
  const mobilefavoriteNumber = document.querySelector('#mobile-nav .favorite-number')
  const data = JSON.parse(localStorage.getItem('favoriteMembers')) || []

  //my favorites 數量 
  favoriteNumber.textContent = data.length
  //mobile-nav 裡 my favorites 數量
  mobilefavoriteNumber.textContent = data.length
})()