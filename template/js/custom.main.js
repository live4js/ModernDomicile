$(document).ready(function() {
    initialize();
});

function initialize() {
    firstRun = true, COOKIE_NAME = 'darkroom_menu', COOKIE_OPEN = 'open', COOKIE_CLOSED = 'close', COOKIE_CREATED = 'defined', DEBUG = false;
    setupAppleVariables();
    setupSnap();   

    if (checkCookie()) {
        if ( ( ( $.cookie(COOKIE_NAME) ) == COOKIE_OPEN ) && ( !mobile() ) ) {
            snapper.open('left');
        }
        else {
            updateLogo();
        }
    }
    else {
        createCookie();
    }
	
	if(isIE()){
		/*if (!menuOpen()) {
			snapper.open('left');
			toggleMenuIcon("close");
		}*/
		
		//$('#content').css("position", "relative");
	}
	

    setupMenuButton();
    setupIsotope();
    setupLogoFade();
    setupScrollTo();
    setupSalesItems();
    productAnimations();
    $("#HomeRecentBlogs").length && newsItem.init();
    setupLogoSize();
    updateLayout();
    
    $(window).resize(function() {
        updateLayout();
        updateLogo();
    }); 
}

var newsItem = {
        init: function() {
            this.recentBlogs = $("#HomeRecentBlogs"), newsItem.recentBlogs.find("ul > li > a").each(function() {
                var e = $(this),
                    t = e.closest("li"),
                    a = e.prop("pathname");
                newsItem.getDate(t, a)
            })
        },
        formatDate: function(e, t, a) {
            var s = "<div class='post-date'><i class='fa fa-calendar-o fa-5x'></i><span class='post-day'>" + t + "</span><span class='post-month'>" + a + "</span></div>";
            e.prepend(s)
        },
        getDate: function(e, t) {
            $.ajax({
                url: t,
                success: function(t) {
                    var a = $.trim($(t).find('[itemprop="datePublished"]').text()) || $.trim($(t).find(".NewsDate").text());
                    a = a.replace("Posted on ", "").split(" @")[0].split(" ");
                    var s = a[2].replace(",", ""),
                        r = a[1];
                    newsItem.formatDate(e, s, r)
                },
                error: function() {}
            })
        }
};

function updateLogo() {
    if (DEBUG) {
        console.log("IN UPDATELOGO");
    }

    if (mobile()) {
        if (DEBUG) {
            console.log("IN MOBILE");
        }
        //show logo on top bar
        if ($('#top-logo').hasClass('firstRun')) {
            $('#top-logo').removeClass('firstRun').addClass('fadeIn');      
            $('#drawer-logo').removeClass('firstRun').addClass('fadeOut');  
        }
        else {
            $('#top-logo').removeClass('fadeOut').addClass('fadeIn');      
            $('#drawer-logo').removeClass('fadeIn').addClass('fadeOut'); 
        }
    }
    else {
        if (DEBUG) {
            console.log("IN NOT MOBILE");
        }
        if (menuOpen()) {
            if (DEBUG) {
                console.log("IN MENUOPEN");
            }
            if ($('#top-logo').hasClass('firstRun')) {     
                $('#drawer-logo').removeClass('firstRun').addClass('fadeIn');
                $('#top-logo').removeClass('firstRun').addClass('notFirstRun');
            }
            else if ($('#drawer-logo').hasClass('firstRun')) {
                $('#top-logo').removeClass('firstRun').addClass('fadeIn');
                $('#drawer-logo').removeClass('firstRun').addClass('notFirstRun');
            }
            else if ($('#drawer-logo').hasClass('notFirstRun')) {     
                $('#drawer-logo').removeClass('notFirstRun').addClass('fadeIn');
                $('#top-logo').removeClass('fadeIn').addClass('fadeOut');
            }
            else if ($('#top-logo').hasClass('notFirstRun')) {     
                $('#top-logo').removeClass('notFirstRun').addClass('fadeIn');
            }
            else {
                //hide logo in top bar
                $('#top-logo').removeClass('fadeIn').addClass('fadeOut');
                //show logo in sidebar
                $('#drawer-logo').removeClass('fadeOut').addClass('fadeIn');
            }
        }
        else {
            if (DEBUG) {
                console.log("IN MENUCLOSE");
            }
            if ($('#drawer-logo').hasClass('firstRun')) {     
                $('#drawer-logo').removeClass('firstRun').addClass('notFirstRun');
                $('#top-logo').removeClass('firstRun').addClass('fadeIn');
            }
            else if ($('#top-logo').hasClass('firstRun')) {
                $('#drawer-logo').removeClass('firstRun').addClass('fadeIn');
                $('#top-logo').removeClass('firstRun').addClass('notFirstRun');
            }
            else if ($('#drawer-logo').hasClass('notFirstRun')) {     
                $('#drawer-logo').removeClass('notFirstRun').addClass('fadeIn');
            }
            else if ($('#top-logo').hasClass('notFirstRun')) {     
                $('#top-logo').removeClass('notFirstRun').addClass('fadeIn');
            }
            else {
                $('#top-logo').removeClass('fadeOut').addClass('fadeIn');
                $('#drawer-logo').removeClass('fadeIn').addClass('fadeOut');
            }
        }
    }   
}

function checkCookie(c) {
    if (($.cookie(c)) != 'undefined') {
        return true;
    }
    else {
        return false;
    } 
}
function checkCookie() {
    if (($.cookie(COOKIE_NAME)) != 'undefined') {
        return true;
    }
    else {
        return false;
    } 
}
function createCookie(c) {
    $.cookie(c, COOKIE_CREATED, { path: '/' });
    if (DEBUG) {
        console.log("MENU COOKIE CREATED");
    }
}
function createCookie() {
    $.cookie(COOKIE_NAME, COOKIE_CREATED, { path: '/' });
    if (DEBUG) {
        console.log("MENU COOKIE CREATED");
    }
}
function toggleCookie() {  
    if (($.cookie(COOKIE_NAME)) == 'defined') {
        if (DEBUG) {
            console.log("IN toggleCookie() DEFINED");
        }
        return true;
    }
    else if (($.cookie(COOKIE_NAME)) == 'open') {
        $.cookie(COOKIE_NAME, COOKIE_CLOSED, { path: '/' });
        if (DEBUG) {
            console.log("MENU CLOSED");
        }
        return true;
    }
    else if (($.cookie(COOKIE_NAME)) == 'closed') {
        $.cookie(COOKIE_NAME, COOKIE_OPEN, { path: '/' });
        if (DEBUG) {
            console.log("MENU OPENED");
        }
        return true;
    }
    else {
        if (DEBUG) {
            console.log("IN toggleCookie() ERROR");
        }
        return false;
    }
}
function toggleCookie(c) {  
    if (c == COOKIE_CLOSED) {
        $.cookie(COOKIE_NAME, COOKIE_CLOSED, { path: '/' });
        if (DEBUG) {
            console.log("MENU CLOSED");
        }
        return true;
    }
    else if (c == COOKIE_OPEN) {
        $.cookie(COOKIE_NAME, COOKIE_OPEN, { path: '/' });
        if (DEBUG) {
            console.log("MENU OPENED");
        }
        return true;
    }
    else {
        if (DEBUG) {
            console.log("IN toggleCookie(c) ERROR");
        }
        return false;
    }
}

function setupIsotope() {
    $container = $('#container').imagesLoaded( function() {    $container.isotope({
        // options
        itemSelector: '.product'
      });
    $container.isotope('bindResize');
    });
}

function setupAppleVariables() {
    IS_IPAD = navigator.userAgent.match(/iPad/i) != null;
    IS_IPHONE = (navigator.userAgent.match(/iPhone/i) != null) || (navigator.userAgent.match(/iPod/i) != null);
    if (IS_IPAD) {
      IS_IPHONE = false;
    }
}

function productAnimations() {
    if (IS_IPHONE || IS_IPAD || mobile()) {
        $('.product-box.animated').removeClass('hidden-product');
    }
    else {
		
        $('.product-box.animated').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
			console.log("isInView: "+isInView+", visiblePartX: "+visiblePartX+", visiblePartY: "+visiblePartY);
			
          if (isInView && !IS_IPHONE && !IS_IPAD) {
            // element is now visible in the viewport
            if ( (visiblePartY == 'top') && ($( this ).hasClass('hidden-product')) ) {
              // top part of element is visible
              $( this ).removeClass('hidden-product').addClass('fadeIn');
              
            } else if ( (visiblePartY == 'bottom') && ($( this ).hasClass('hidden-product')) ){
              // bottom part of element is visible
              $( this ).removeClass('hidden-product').addClass('fadeIn');
            } else {
              // whole part of element is visible
              if ($( this ).hasClass('hidden-product')) {
                  $( this ).removeClass('hidden-product').addClass('fadeIn');
              }
            }
          } else {
            // element has gone out of viewport
            //$( this ).removeClass('fadeInUp fadeInDown fadeIn').addClass('hidden-product');
          }
        });
    }
}

function setupSalesItems() {
    $( ".product" ).each(function( index ) {
        if($( this ).find('.SalePrice').length != 0) {
            $( this ).addClass("sale");
        }
    });
}

function setupScrollTo() {
    $('#home a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body,#content').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
}

function setupLogoFade() {
    if (mobile()) {
        $("#home #top-logo #LogoContainer").css("opacity", "100");
    }
    else {
        $("#content").scroll(function(){
          var top=$(this).scrollTop();
          var canvas=$(".slider-wrapper");
          var logoCanvas=$("#home #top-logo #LogoContainer");
          var canvasHeight=canvas.height();
          if(top<canvasHeight){
            var dif=1-top/canvasHeight;
            var showIt=0+top/canvasHeight;
            canvas.css({opacity:dif});
            logoCanvas.css({opacity:showIt});
          }
        })
    }
}

function setupLogoSize() {
    if (mobile()) {

        searchbar = $(".header-secondary").parents("#Header");
        var lastScroll = 0;

        $(window).scroll(function(){
            var thisScroll = $(this).scrollTop();
                if (thisScroll > lastScroll && thisScroll > 0) {
                    searchbar.addClass("off-screen");
                } else {
                    searchbar.removeClass("off-screen");
                }
            lastScroll = thisScroll;
        });

        /*!
        * FitText.js 1.1
        *
        * Copyright 2011, Dave Rupert http://daverupert.com
        * Released under the WTFPL license
        * http://sam.zoy.org/wtfpl/
        *
        * Date: Thu May 05 14:23:00 2011 -0600
        */
        // Modified and added by Miko Ademagic

        $.fn.fitText = function( k, o ) {

            // Setup options
            var compressor = k || 1,
                    settings = $.extend({
                        'minFontSize' : Number.NEGATIVE_INFINITY,
                        'maxFontSize' : Number.POSITIVE_INFINITY
                    }, o);

            return this.each(function(){
                // Store the object
                var $this = $(this);

                // Resizer() resizes items based on the object width divided by the compressor * 10
                var resizer = function () {
                    var sl = $this.text().length;
                    $this.css('font-size', Math.max(Math.min(($this.width() / sl) * compressor, parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
                };

                // Call once to set.
                resizer();

                // Call on resize. Opera debounces their resize by default.
                $(window).bind('resize.fittext orientationchange.fittext', resizer);
            });
        };

        $('#LogoContainer h1').fitText(1.6, { minFontSize: '14px', maxFontSize: '28px' });
    }
}

function setupMenuButton() {
    snapperToggleButtonLeft = document.getElementById('open-left');
    snapperToggleButtonLeft.addEventListener('click', function(){
        if(menuOpen()){
            snapper.close();       
        } else {
            snapper.open('left');
        }
    });
}

function mobile() {
    if (matchMedia("screen and (max-width: 768px)").matches) {
        return true;
    }
    else {
        return false;
    }
}

function menuOpen() {
    if (snapper.state().state=="left") {
        return true;
    }
    else {
        return false;
    }
}

function toggleMenuIcon(state) {
    if (state == "open") {
        $('#open-left').html("<i class='fa fa-times fa-lg'></i> <span>Menu</span>");
        return true;
    }
    else if (state == "close") {
        $('#open-left').html("<i class='fa fa-bars fa-lg'></i> <span>Menu</span>");
        return true;
    }    
    return false;
}

function setupSnap() {
    snapper = new Snap({
        element: document.getElementById('content'),
        dragger: null,
        disable: 'right',
        addBodyClasses: true,
        hyperextensible: true,
        resistance: 0.5,
        flickThreshold: 50,
        transitionSpeed: 0.3,
        easing: 'ease',
        maxPosition: 266,
        minPosition: -266,
        tapToClose: false,
        touchToDrag: true,
        slideIntent: 40,
        minDragDistance: 5,
        hyperextensible: false
    });
    
    snapper.on('open', function(){ 
        toggleMenuIcon("open");
        toggleCookie(COOKIE_OPEN);
        
    });
    
    snapper.on('close', function(){ 
        toggleMenuIcon("close");
        toggleCookie(COOKIE_CLOSED);
    });
    
    snapper.on('animated', function(){ 
        updateLayout();
        updateLogo();
        $container.isotope('layout'); 
		if(isIE()){
			console.log("menuOpen(): "+menuOpen());
			//$('#content').css("transform", "none").css("margin-left", "266px");
			//toggleMenuIcon("close");
		}
		
    });
}   

function updateLayout() {
    if (mobile()) {
        if (menuOpen()) {
            $('#content').css("margin-right", "0");
        }
        else {
            $('#content').css("margin-right", "0");
        }
    }
    else {
		if(isIE()){
			//We just need to do here for IE
			if (menuOpen()) {
				$('#content').css("margin-right", "266px");
			}
			else {
				$('#content').css("margin-right", "0");
			}
		}
		else{
			if (menuOpen()) {
				$('#content').css("margin-right", "266px");
			}
			else {
				$('#content').css("margin-right", "0");
			}
		}
	
        
    }
}



function isIE()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv == -1 ? false: true;
}