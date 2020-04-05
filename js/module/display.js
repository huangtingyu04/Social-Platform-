const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/api/v1/users/'
const COUNTRY_URL = 'https://restcountries.eu/rest/v2/name/'
const ITEM_PER_PAGE = 12
let paginationData = []
//將 members display 到畫面上
function displayMembers(data) {
  const displayMembersPanel = document.querySelector('#members .row')
  const list = JSON.parse(localStorage.getItem('favoriteMembers')) || []
  let htmlContent = ''
  //if there is no results
  if (data.length === 0) {
    htmlContent = `<div class="my-5 mx-auto animated fadeInUp">
                              <h3>There is no results in your filter, please reset the input.</h3>
                          </div>
                          `
  }
  data.forEach(member => {
    htmlContent += `
          <div class="col-lg-3 col-md-4 col-6">
            <div class="member animated fadeInUp">
              <div class="member-photo">
                <img src="${member.avatar}" alt="">
              </div>
              <div class="member-info">
                <h5>${member.name} ${member.surname}</h5>
                <p>${member.age} / ${AbbrGender(member.gender)} / ${member.region}</p>`
    if (list.some(favoriteMember => favoriteMember.id === member.id)) {
      htmlContent += ` <div class="member-like">
                  <button type="button" class="btn" data-toggle="modal" data-target="#showinfo" data-id=${member.id} data-region="${member.region}">
                    more...
                  </button>
                   <i class="fas fa-heart open" data-id=${member.id}></i>
                </div>
              </div>
            </div>
          </div>`
    } else {
      htmlContent += ` <div class="member-like">
                  <button type="button" class="btn" data-toggle="modal" data-target="#showinfo" data-id=${member.id} data-region="${member.region}">
                    more...
                  </button>
                   <i class="fas fa-heart" data-id=${member.id}></i>
                </div>
              </div>
            </div>
          </div>`
    }
  });
  displayMembersPanel.innerHTML = htmlContent
}
function AbbrGender(gender) {
  switch (gender) {
    case 'male':
      return 'M';
    case 'female':
      return 'F'
  }
}
function genderIcon(data) {
  if (data.gender === 'male') return '<i class="fas fa-mars" style="padding-right: 3px;"></i>'
  else if (data.gender === 'female') return '<i class="fas fa-venus" style="padding-right: 8px;"></i>'
}

export function findCountryFlag(region) {
  const modalCountry = document.getElementById('show-member-country')
  //set request url
  let URL = COUNTRY_URL + region
  axios.get(URL)
    .then(function (response) {
      // handle success
      modalCountry.innerHTML = `<img src="${response.data[0].flag}" style="width: 25px; height: 20px;"></img>${region}`
    })
    .catch(function (error) {
      // handle error    
      modalCountry.innerHTML = `<i class="fas fa-globe"></i>${region}`
    })
}

export function showMemberDetail(id) {
  //get elements
  const modalName = document.getElementById('show-member-name')
  const modalImg = document.getElementById('show-member-img')
  const modalAge = document.getElementById('show-member-age')
  const modalBirth = document.getElementById('show-member-birth')
  const modalEmail = document.getElementById('show-member-email')
  //set request url
  let URL = BASE_URL + id
  //sent request to show api
  axios.get(URL)
    .then(function (response) {
      // handle success
      const data = response.data

      modalName.textContent = `Hi, I am ${data.name} ${data.surname}`
      modalImg.innerHTML = `<img src=${data.avatar} alt="Responsive image">`
      modalAge.innerHTML = `${genderIcon(data)}${data.age}`
      modalBirth.innerHTML = `<i class="fas fa-birthday-cake"></i>${data.birthday}`
      modalEmail.innerHTML = `<i class="fas fa-envelope"></i>${data.email}`
      document.body.className = ''
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      document.body.className = ''
    })
}
export function getTotalPages(data) {
  const pagination = document.getElementById('pagination')
  let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
  let pageItemContent = ''

  pageItemContent += `<li class="page-item">
        <a id="previous-page" class="page-link" href="#members" aria-label="Previous" data-page>
        Previous
        </a>
      </li>`
  for (let i = 0; i < totalPages; i++) {
    pageItemContent += `
         <li class="page-item"><a id="pages" class="page-link" href="#members" data-page="${i + 1}">${i + 1}</a></li>
         `
  }
  pageItemContent += `<li class="page-item">
        <a id="next-page" class="page-link" href="#members" aria-label="Next"  data-page>
        Next
        </a>
      </li>`
  pagination.innerHTML = pageItemContent
}
export function getPageData(pageNum, data) {
  paginationData = data || paginationData
  let offset = (pageNum - 1) * ITEM_PER_PAGE
  let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
  displayMembers(pageData)
  updatePagination(pageNum, paginationData)
}
function updatePagination(clickedPage, data) {
  const previousPage = pagination.querySelector('#previous-page')
  const nextPage = pagination.querySelector('#next-page')
  let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
  let show = 5
  let quotient = Math.floor(clickedPage / show)
  pagination.querySelectorAll('#pages').forEach(item => {
    item.parentElement.classList.add('d-none')
    item.parentElement.classList.remove('active')
  })
  pagination.querySelector(`#pages[data-page="${clickedPage}"]`).parentElement.classList.add('active') //在目前頁數加入 active
  previousPage.parentElement.classList.remove('d-none')
  nextPage.parentElement.classList.remove('d-none')
  //沒有前一頁或下一頁資料時，不顯示前或後一頁
  if (clickedPage === 1) previousPage.parentElement.classList.add('d-none')
  if (clickedPage === totalPages) nextPage.parentElement.classList.add('d-none')

  //更新上下更換頁資訊
  previousPage.dataset.page = clickedPage - 1
  nextPage.dataset.page = clickedPage + 1
  if (previousPage.dataset.page < 1) previousPage.dataset.page = 1
  if (nextPage.dataset.page > totalPages) nextPage.dataset.page = totalPages

  if ((clickedPage >= (show + show * (quotient - 1))) && (clickedPage <= (show + show * quotient))) {
    for (let page = (show + show * (quotient - 1)); page <= (show + show * quotient); page++) {
      if (page === 0) page = 1 //防止page為 第 0 頁
      if (page > totalPages) return //防止頁數超過totalPages
      pagination.querySelector(`#pages[data-page="${page}"]`).parentElement.classList.remove('d-none')
    }
  }
}