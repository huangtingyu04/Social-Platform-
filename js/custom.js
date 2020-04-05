(function ($) {
  //#header ul li
  $('#header li').on('click', function () {
    if ($(this).hasClass('modal-display')) return
    $(this).addClass('current')
    $(this).siblings().removeClass('current')
  })
  // Mobile Navigation

  if ($('#nav-menu-container').length) {
    let $mobileNav = $('#nav-menu-container').clone().attr('id', 'mobile-nav')//複製#nav-menu-container裡的內容並取代原本的id -> id = 'mobile-nav'
    $mobileNav.find('> ul').attr({ 'id': '', class: '' })
    $('body').append($mobileNav)
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>')
    $('body').append('<div id="mobile-body-overly"></div>')

  }
  $('#mobile-nav-toggle').on('click', function () {
    $('body').toggleClass('mobile-nav-active')
    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars')
    $('#mobile-body-overly').toggle()
  })

  $(document).click(function (e) {
    let container = $('#mobile-nav, #mobile-nav-toggle')
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active')
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars')
        $('#mobile-body-overly').fadeOut()
      }
      // else if ($("#mobile-nav, #mobile-nav-toggle").length) {
      //   $("#mobile-nav, #mobile-nav-toggle").hide();
      // }
    }
  })

  /************wow動畫***********************/
  new WOW().init()

  /************owlCarousel*****************/
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,  //自動輪播 
    autoplayTimeout: 1500,  //輪播速度 
    autoplayHoverPause: true,
    nav: false,//不顯示前後頁按鈕
    dots: false,//分頁按鈕不顯示分頁按鈕
    responsive: {
      0: {
        items: 1
      },
      700: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  })
  /***************client-area count***********************/
  $('#client-area .counter').each(function () {
    $(this).attr('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 4000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
  $('#services .counter').each(function () {
    $(this).attr('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 4000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
  //////////////Backtotop Button///////////////////////////
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1000) {
      $('.back-to-top').fadeIn('slow')
    } else {
      $('.back-to-top').fadeOut('slow')
    }
  })

  $('.back-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 1500)
    return false
  })













})($)