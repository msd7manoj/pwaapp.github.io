/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/



var isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
var isiPod = /ipod/i.test(navigator.userAgent.toLowerCase());
var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
var isBlackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
var isWebOS = /webos/i.test(navigator.userAgent.toLowerCase());
var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
(function($) {

	$.fn.appTabs = function(params) {

		// merge default and user parameters
		params = $.extend( { active: 0 }, params);

		this.each(function() {
      let tabMenu = $(this).children('ul');
      let tabContent = $(this).children('div');

      tabContent.each(function( index ) { (index == params.active) ? $(this).show() : $(this).hide() });

      $(tabMenu).find('a').click(function(e) {
        e.preventDefault();
        let target = $(this).attr('href')
        tabMenu.find('a').removeClass('active')
        $(this).addClass('active')
        tabContent.each(function(index) { $(this).hide() })
        $(target).fadeIn()
      })

    });
    
		return this;
  };
})(jQuery);

//verticalTab
(function($) {

	$.fn.verticalTab = function(params) {

		params = $.extend( { active: 0 }, params);

		this.each(function() {
      let self = $(this);
      let tabMenu = $(this).find('a');
      let tabContentWrap = $(this).attr('data-contentWrap');
      let tabContent = $('#'+tabContentWrap).find("[data-vid]");
      console.log('verticalTab', tabContent)

      tabContent.each(function( index ) { (index == params.active) ? $(this).show() : $(this).hide() });

      $(tabMenu).click(function(e) {
        e.preventDefault();
        let content = $(this).attr('href').substring(1);
        self.find('a').removeClass('active')
        $(this).addClass('active')
        $('#'+tabContentWrap).children('div').hide()
        console.log('verticalTab', tabContentWrap)
        console.log('verticalTab', $('#'+tabContentWrap))
        console.log('verticalTab', $('#'+tabContentWrap).children('div'))
        $("[data-vid='"+content+"']").fadeIn();
      })
    });
    
		return this;
  };
})(jQuery);



$(document).ready(function(){
  commonMethod();
    //Event for Contact PopOver
    $('.headerContactIcon a').click(function(e) {
        e.preventDefault()
        $(this).toggleClass('active');
        $('.contactInfoPopOver').toggleClass('opened')
    });
    
    //Event forSEarch Icon
    $('.searchBtnIcon').click(function(e) {
      e.preventDefault();
      $('.siteSearchInput').toggleClass('expand')
      $('.navBarWrap').hide()
    });
    $('.searchSelectBox').click(function(e) {
      e.preventDefault();
      $('.searchSelect').toggleClass('opened')
    })
    $('.searchSelectOption li').click(function(e) {
      e.preventDefault();
      var option = $(this).attr('data-option')
      var label = $(this).text()
      $('.searchSelectBox').find('label').html(label);
      $('.searchSelect').removeClass('opened');
      $('.searchNativeSelect').val(option)
    })




    //Event for Account PopOver
    $('.accountIcon').click(function(e) {
        e.preventDefault()
        $(this).toggleClass('active');
        $('.deskTopAccountDD').toggleClass('opened')
    });
    $('.accountButtonIcon').click(function(e) {
        e.preventDefault()
        $(this).toggleClass('active');
        $('.mobAccountDD').toggleClass('opened');
    });
    $('.accountMenuLink').click(function(e) {
        e.preventDefault()
        $(this).toggleClass("opened");
        $(this).siblings('.accountSubMenu').slideToggle();
    })


    //Event For Mobile Hamburger Menu
    $('.mobHamMenuLink').click(function(e) {
        e.preventDefault()
        $('.hamMenuSection').addClass('opened')
    })
    $('.hamMenuLinks .subMenuLink').click(function(e) {
        e.preventDefault()
        $(this).siblings('.subMenuSection').addClass('opened')
    })
    $('.subMenuBC > a, .closePlanMenu').click(function(e) {
        e.preventDefault();
        $(this).parents('.subMenuSection').removeClass('opened')
    })
    $('.closeHamMenu').click(function(e) {
        e.preventDefault();
        $(this).parents('.hamMenuSection').removeClass('opened')
    })


    $(document).mouseup(function(e) {
        //Hide Account DropDown
        var accountDropDown = $(".deskTopAccountDD");
        if ( (!accountDropDown.is(e.target) && accountDropDown.has(e.target).length === 0) ) {
            accountDropDown.removeClass('opened');
        }

        //Hide Contact Info PopOver 
        var contactInfoPopOver = $(".contactInfoPopOver");
        if ( (!contactInfoPopOver.is(e.target) && contactInfoPopOver.has(e.target).length === 0) ) {
            contactInfoPopOver.removeClass('opened');
        }

        //Hide HeaderSearch  
        var headerSearch = $(".siteSearchInput");
        if ( (!headerSearch.is(e.target) && headerSearch.has(e.target).length === 0) ) {
          headerSearch.removeClass('expand');
          $('.navBarWrap').show() 
            // setTimeout(function() { 
            //   headerSearch.removeClass('expand');
            //   $('.navBarWrap').show() 
            // },300)
        }

        //Hide HeaderSearch  Dropdown
        var headerSearchDD = $(".searchSelectOption");
        if ( (!headerSearchDD.is(e.target) && headerSearchDD.has(e.target).length === 0) ) {
          headerSearchDD.removeClass('opened');
          $('.searchSelect').removeClass('opened')
        } 
    });
    
    $('.aboutTabWrap').appTabs()

    //Vertical Tab
    $('.verticalTab').verticalTab()
    //Owl Carousel Function
    const initiateOwlCarosel = function (ele, options) {
        const carouselOption = Object.assign({}, options);
        // console.log('carouselOption', carouselOption)
        $(ele).owlCarousel(carouselOption);
    }
    //Philosophy List Carousel
    initiateOwlCarosel('.philosophyLists ul', {
      responsiveClass:true,
      responsive: {
        0:{
          items:1,
          autoWidth: true,
          loop:true,
          center: false,
          nav: true,
          dots: true,
          margin: 10,
          navContainer: '#mobPhilosophyNav',
          dotsContainer: '#mobPhilosophyDot'
        },
        600:{
          items:2,
          autoWidth: true,
          loop:true,
          center: false,
          nav: false,
          dots: false,
          margin: 10,
        },
        1000:{
          items:3,
          autoWidth: true,
          loop:true,
          center: false,
          nav: true,
          dots: true,
          margin:24,
        }
      }
    })
    //Awards List Carousel
    initiateOwlCarosel('.awardsLists ul', {
      responsiveClass:true,
      responsive: {
        0:{
          items: 1,
          autoWidth: true,
          loop:true,
          center: false,
          margin: 10,
          dots: true,
          nav: true,
          navContainer: '#awardCarouselNav',
          dotsContainer: '#awardCarouselDot',
        },
        600:{
          items: 2,
          autoWidth: true,
          loop:true,
          center: false,
          margin:10,
          dots: true,
          nav: true,
          navContainer: '#awardCarouselNav',
          dotsContainer: '#awardCarouselDot',
        },
        1000:{
          items: 3,
          autoWidth: true,
          loop:true,
          center: false,
          margin:24,
          dots: true,
          nav: true,
          navContainer: '#awardCarouselNav',
          dotsContainer: '#awardCarouselDot',
        }
      }
    })
    //Activity List Carousel
    initiateOwlCarosel('.activitySecList ul', {
      responsiveClass:true,
      responsive: {
        0:{
          items: 1,
          autoWidth: true,
          loop:true,
          center: true,
          nav: true,
          dots: true,
          margin: 10,
          navContainer: '#activityCarouselNav',
          dotsContainer: '#activityCarouselDot'
        },
        600:{
          items: 2,
          autoWidth: true,
          loop:true,
          center: true,
          margin:10,
          dots: true,
          nav: true,
          navContainer: '#activityCarouselNav',
          dotsContainer: '#activityCarouselDot'
        },
        1000:{
          items: 2,
          autoWidth: true,
          loop:true,
          center: false,
          margin:24,
          dots: true,
          nav: true,
          navContainer: '#activityCarouselNav',
          dotsContainer: '#activityCarouselDot',
        }
      }
    })
    //Social Media Carousel
    initiateOwlCarosel('.socialSectionList ul', {
      responsiveClass:true,
      responsive: {
        0:{
          items: 1,
          autoWidth: true,
          loop:true,
          center: false,
          nav: true,
          dots: true,
          margin: 10,
          navContainer: '#mobSocialCarouselNav',
          dotsContainer: '#mobSocialCarouselDot'
        },
        600:{
          items: 2,
          autoWidth: true,
          loop:true,
          center: false,
          margin:10,
          dots: false,
          nav: true,
        },
        1000:{
          items: 3,
          autoWidth: true,
          loop:true,
          center: false,
          margin:24,
          dots: false,
          nav: true,
        }
      }
    })
    

    //Board Of Director Content Event
    $('.bodList .bodImage').click( function(e) {
      e.preventDefault();
      var bodContentID = $(this).attr('data-bod');
      var bodContentEl = "[data-bod='" + bodContentID + "']";
      $('html, body').animate({
          scrollTop: $(bodContentEl).offset().top + 400
      }, 400);
      $(this).parent('li').siblings('li').show();
      $(this).parent('li').hide();
      $('.bodDetailContent').removeClass('contentVisible');
      $(".bodContentWrap").find(bodContentEl).addClass('contentVisible'); 
    });

    //View More Btn
    $('.viewMoreBtn').click(function(e) {
      e.preventDefault();
      let hiddenContent = $(this).attr('data-hidden')
      $(this).toggleClass("viewLessBtn")
      $(this).text( $(this).hasClass('viewLessBtn') ? 'View Less' : 'View More') 
      $('.'+ hiddenContent).slideToggle()
    })


    //For Mobile Device
    if(isMobileDevice) {
      $('.bodList .bodImage').off("click").on('click', function(e) { e.preventDefault() })
      $('.mobileContentBtn').on('click', function(e) {
        e.preventDefault()
        $(this).toggleClass("opened")
        $(this).siblings('.bodContent').slideToggle()
      })

      //Mobile Search Button
      $('.mobSearchBtn').click(function(e){ 
        e.preventDefault();
        $('.mobHeaderSearchWrp').fadeIn();
      })
      //Mobile Search Close Button
      $('.mobSearchClose').click(function(e){ 
        e.preventDefault();
        $('.mobHeaderSearchWrp').fadeOut();
      })
      
    }
 
    
})

function commonMethod() {
  $('.cust-accordion .accordion-head').click(function () {
    var parent = $(this).parent('.cust-accordion');
    var isOpen = $(parent).hasClass('open');
    if (isOpen) {
      $(parent).find('.accordion-content').slideUp();
      $(parent).removeClass('open');
    } else {
      $('.accordion-content').slideUp();
      $('.cust-accordion').removeClass('open');
      $(parent).find('.accordion-content').slideDown();
      $(parent).addClass('open');
    }
  });
  $('.disclaimer-sec .disclaimer-head').click(function () {
    var isOpen = $('.disclaimer-sec').hasClass('open');
    if (isOpen) {
      $('.disclaimer-sec').find('.disclaimer-cont').slideUp();
      $('.disclaimer-sec').removeClass('open');
    } else {
      $('.disclaimer-cont').slideDown();
      $('.disclaimer-sec').addClass('open');
    }
  });
  $('.cust-accordion.open .accordion-content').slideDown();
  $('.tab li').click(function () {
    var listParent = $(this).parent('ul');
    var parent = $(listParent).closest('.tab-wrap');
    $(parent).find('.tab li').removeClass('active');
    $(this).addClass('active');
    var content = $(this).attr('rel');
    $(parent).find('.tab-content > div').fadeOut();
    $(parent).find('.tab-content .' + content).fadeIn();
  });
  $('.product-search-autofill li').click(function() {
    $('.product-search-autofill').fadeOut();
    $('.net-assessment-cont').fadeOut();
    $('.fund-performance-search-cont').fadeIn();
    $('.accordion-section, .re-discover-sec').hide();
  });
  $('.search-label-txt .search-close').click(function() {
    $('.fund-performance-search-cont').fadeOut();
    $('.net-assessment-cont').fadeIn();
    $('.accordion-section, .re-discover-sec').show();
  });
  $( ".product-search-form input" ).keyup(function() {
    var val = $(this).val();
    if(val.length > 0) {
      $('.product-search-autofill').slideDown();
    } else {
      $('.product-search-autofill').slideUp();
    }
  });
  $('.view-product-report').click(function (e) {
    $('.equity-funds-wrap').addClass('show-graph')
    $('.product-graph-wrap').show();
    e.preventDefault();
    return;
  });
  $('.product-graph-wrap .close-product-graph').click(function (e) {
    $('.product-graph-wrap').hide();
    $('.equity-funds-wrap').removeClass('show-graph')
    e.preventDefault();
    return;
  });
  if(!isMobile()) {
    // $('.owl-slider').addClass('owl-carousel');
    // $('.owl-carousel').owlCarousel({
    //   loop: false,
    //   margin: 15,
    //   nav: true,
    //   responsive: {
    //     1200: {
    //       items: 3
    //     },
    //     1024: {
    //       items: 2
    //     },
    //     770: {
    //       items: 1
    //     }
    //   }
    // });
  } else {
    // $('.cust-accordion.open .accordion-content').slideUp();
    // $('.cust-accordion').removeClass('open');
    // $('.strategy-frameworks').addClass('owl-carousel');
    // $('.product-reports-lists').addClass('owl-carousel');
    // $('.owl-carousel').owlCarousel({
    //   loop: false,
    //   margin: 15,
    //   nav: true,
    //   items: 1,
    //   responsive: {
    //     770: {
    //       items: 1
    //     }
    //   }
    // });
  }
}

function isMobile() {
  var winWidth = $( window ).width();
  if(winWidth<=736)
    return true;
  return false;
}