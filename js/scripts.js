
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
    $('html').addClass('ff');
}

if(navigator.userAgent.toLowerCase().indexOf('trident') > -1){
	$('html').addClass('ie');
}

$(document).ready(function() {

	var sectionArr = [],
		portfolioLiElementOuterWidth,
		recommendationLiElementOuterWidth,
	    portfolioContentWidth,
	    recomendationContentWidth,
		portfolioMultiplier,
	    recommendationMultiplier,
    	portfolioAllowMovement = true,
    	recommendationAllowMovement = true,
    	recommendationPlayState = true,
    	infinteslide,
    	msnryContainer = $('.agency-list');

	$(window).resize(function() {
		
		setPortfolioSlider();
		setRecommendationSlider();
		msnryContainer.imagesLoaded( function() {
		 	msnryContainer.masonry({
			  itemSelector: '.agency-item'
			});
		});


		sectionArr = [];

		var winHeight = $(window).outerHeight(),
			headerHeight = $('header').outerHeight();

		$('body').height('');

		$('section').css('position', '').css({
			'min-height': winHeight,
			'padding-top': headerHeight + 25,
			'top': '',
			'width': ''
		});

		clearInterval(infinteslide);
		infinteslide = setInterval(function() {    
			if(recommendationPlayState){
				$('#recommendationSliderNext').click();
			}
		}, 10000);

		homeTransition();
		contactPageBG();
		recommendationPageBG();
		portfolioPageBG();

	});


	$(window).scroll(function(e){
		var scrollTop = $(window).scrollTop(),
			docHeight = $(document).height(),
			winHeight = $(window).height(),
			scrollPercent = (scrollTop) / (docHeight - winHeight);


		msnryContainer.imagesLoaded( function() {

			$('section').each(function(){
				var sectionOffSetTop = $(this).offset().top;

				if (sectionOffSetTop <= scrollTop){
					setCurrentPageMenuItem($('nav ul li').eq($(this).index()));
				}
			});
		});
	});

	$('nav ul li').on('click', function(e) {
		e.preventDefault();
		setCurrentPageMenuItem($(this));
		gotoSection($(this).index());
		if(viewport().width < 992){
			$('.menu-button').click();
		}
	});

	var setCurrentPageMenuItem = function(el) {
		el.find('a').addClass('current-page');
		el.siblings().find('a').removeClass('current-page');
	}

	var gotoSection = function(index) {
		var sTop = $('section').eq(index).offset().top;			
		$('html, body').animate({ scrollTop: sTop });
	}

	var viewport = function() {
	    var e = window, a = 'inner';
	    if (!('innerWidth' in window )) {
	        a = 'client';
	        e = document.documentElement || document.body;
	    }
	    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
	}


	var homeTransition = function(){

		if ($('section#home .backstretch').length){
			$('section#home').backstretch('destroy');			
		}

		var imagesHome = [
			'img/home_image_1.jpg',
			'img/home_image_2.jpg',
			'img/home_image_3.jpg'
		];	
		
		$('section#home').backstretch(imagesHome,{duration: 6000, fade: 750});
	}

	var contactPageBG = function(){
		$('section#contact').backstretch('img/pebbles.jpg');
	}

	var recommendationPageBG = function(){
		$('section#recommendations').backstretch('img/rec_image_1.jpg');
	}

	var portfolioPageBG = function(){
		$('section#portfolio').backstretch('img/port_image_1.jpg');
	}

	var setPortfolioSlider = function(){
		var liElementWidth,
		    numberOfElements,
		    contentWrapperWidth,
		    remainder;

        $('.portfolio-slider').removeAttr('style');
        $('.portfolio-slider li').removeAttr('style');

        liElementWidth = Math.floor($('.portfolio-slider li').eq(0).width());
        portfolioLiElementOuterWidth = Math.floor($('.portfolio-slider li').eq(0).outerWidth(true));
        contentWrapperWidth = $('.portfolio-slider-wrapper').width();
        portfolioMultiplier = 1;
        numberOfElements = $('.portfolio-slider li').length;
        var negativeRemainder = 0;


        if(viewport().width < 768){
            portfolioMultiplier = 1;
        }

		var elementMargin = Math.floor(-(contentWrapperWidth - (portfolioLiElementOuterWidth * portfolioMultiplier)));
        remainder = numberOfElements%portfolioMultiplier;
        
        $('.portfolio-slider li').css('margin-right', elementMargin);

        if(remainder>0){
            negativeRemainder = portfolioMultiplier-remainder;
        }

        portfolioContentWidth = (numberOfElements + negativeRemainder) * portfolioLiElementOuterWidth;

        $('.portfolio-slider').width(portfolioContentWidth);
        $('.portfolio-slider li').width(portfolioLiElementOuterWidth - elementMargin);  
	}

	$('#portfolioSliderNext').on('click', function (e) {
	    e.preventDefault();
	    if (portfolioAllowMovement){
	        portfolioAllowMovement = false;
		    var totalItemCount = $('.portfolio-slider li').length;
		    var currentIndex = $('.portfolio-slider').data('currentindex');
		    if (currentIndex + 3 > totalItemCount) {
		        currentIndex = 1;
		    }
		    else {
		        currentIndex += 3;
		    }
		    $('.portfolio-slider').data('currentindex', currentIndex);
		    showPortfolioItemsFromIndex(currentIndex, 'right');
		}
	});

	$('#portfolioSliderPrevious').on('click', function (e) {
	    e.preventDefault();
	    if (portfolioAllowMovement){
	        portfolioAllowMovement = false;
		    var totalItemCount = $('.portfolio-slider li').length;
		    var currentIndex = $('.portfolio-slider').data('currentindex');
		    if (currentIndex - 3 > 0) {
		        currentIndex -= 3;
		    }
		    else {
		        currentIndex = totalItemCount - 2;
		    }
		    $('.portfolio-slider').data('currentindex', currentIndex);
		    showPortfolioItemsFromIndex(currentIndex, 'left');
		}
	});

	function showPortfolioItemsFromIndex(currentIndex, direction) {

	    if($('.ie8').length){
        	portfolioAllowMovement = true;  
        	var totalOfElements = $('.portfolio-slider li').length;
	        $('.portfolio-slider li').each(function () {
	            var itemIndex = $(this).data("itemindex");
	            if (itemIndex === currentIndex) {
	                $(this).removeClass('visible');

	        		if(direction === 'right'){
	        			if (currentIndex + 2 > numberOfElements){
	        				$(this).first().addClass('visible');
	        			}else{
	        				$(this).next().addClass('visible');
	        			}
	        		}else{
	        			if (currentIndex - 1 < 0){
	        				$(this).last().addClass('visible');
	        			}else{
	        				$(this).previous().addClass('visible');
	        			}
	        		}
	            }
	        });
	    }else{
	        var actualMarginLeft = parseInt($('.portfolio-slider').css('margin-left').replace('px', '')),
	            additionalMargin = portfolioLiElementOuterWidth * portfolioMultiplier,
	            totalMargin;

	        if(direction === 'right'){
	            totalMargin = actualMarginLeft - additionalMargin;
	            if (totalMargin + portfolioContentWidth <= 0){
	                totalMargin = 0;
	            }
	        }else{
	            totalMargin = actualMarginLeft + additionalMargin;
	            if(totalMargin > 0){
	                totalMargin = additionalMargin - portfolioContentWidth;
	            }
	        }

	        $('.portfolio-slider').animate({'margin-left': totalMargin}, 1000, function(){
            	portfolioAllowMovement = true; 	            
	        });
	    }

	}

	var equalHeights = function(elements){
		var t=0; // the height of the highest element (after the function runs)
		$(elements).each(function() {
		    if ($(this).outerHeight() > t){
		    	t = $(this).outerHeight(true);
		    }
		});
		$(elements).height(t);
	}

	var setRecommendationSlider = function(){
		var liElementWidth,
		    numberOfElements,
		    contentWrapperWidth,
		    remainder;

	    if(!$('.ie8').length){
	        $('.recommendation-slider').removeAttr('style');
	        $('.recommendation-slider li').removeAttr('style');

	        liElementWidth = Math.floor($('.recommendation-slider li').eq(0).width());
	        recommendationLiElementOuterWidth = Math.floor($('.recommendation-slider li').eq(0).outerWidth(true));
	        contentWrapperWidth = $('.recommendation-slider-wrapper').width();
	        recommendationMultiplier = 1;
	        numberOfElements = $('.recommendation-slider li').length;

			var elementMargin = Math.floor((contentWrapperWidth - recommendationLiElementOuterWidth)/2);
			
			$('.recommendation-slider li').css('margin-right', elementMargin);
	        $('.recommendation-slider li').css('margin-left', elementMargin);

	        recommendationContentWidth = numberOfElements * contentWrapperWidth;

	        $('.recommendation-slider').width(recommendationContentWidth);
	        $('.recommendation-slider li').width(recommendationLiElementOuterWidth);  
	    }
	}

	$('#recommendationSliderNext').on('click', function (e) {
	    e.preventDefault();
	    if (recommendationAllowMovement){
	        recommendationAllowMovement = false;
		    var totalItemCount = $('.recommendation-slider li').length;
		    var currentIndex = $('.recommendation-slider').data('currentindex');
		    if (currentIndex + 3 > totalItemCount) {
		        currentIndex = 1;
		    }
		    else {
		        currentIndex += 3;
		    }
		    $('.recommendation-slider').data('currentindex', currentIndex);
		    showRecommendationItemsFromIndex(currentIndex, 'right');
		}
	});

	$('#recommendationSliderPrevious').on('click', function (e) {
	    e.preventDefault();
	    if (recommendationAllowMovement){
	        recommendationAllowMovement = false;
		    var totalItemCount = $('.recommendation-slider li').length;
		    var currentIndex = $('.recommendation-slider').data('currentindex');
		    if (currentIndex - 3 > 0) {
		        currentIndex -= 3;
		    }
		    else {
		        currentIndex = totalItemCount - 2;
		    }
		    $('.recommendation-slider').data('currentindex', currentIndex);
		    showRecommendationItemsFromIndex(currentIndex, 'left');
		}
	});

	$('#recommendationSliderPlay').on('click', function (e) {
	    e.preventDefault();
	    if ($(this).hasClass('active')){
	        recommendationPlayState = false;
		    $(this).removeClass('active');
		}else{
	        recommendationPlayState = true;
		    $(this).addClass('active');
		}
	});

	function showRecommendationItemsFromIndex(currentIndex, direction) {

	    if($('.ie8').length){
        	recommendationAllowMovement = true;  

	    }else{
	        var actualMarginLeft = parseInt($('.recommendation-slider').css('margin-left').replace('px', '')),
	            additionalMargin = $('.recommendation-slider-wrapper').width(),
	            totalMargin;

	        if(direction === 'right'){
	            totalMargin = actualMarginLeft - additionalMargin;
	            if (totalMargin + recommendationContentWidth <= 0){
	                totalMargin = 0;
	            }
	        }else{
	            totalMargin = actualMarginLeft + additionalMargin;
	            if(totalMargin > 0){
	                totalMargin = additionalMargin - recommendationContentWidth;
	            }
	        }

	        $('.recommendation-slider').animate({'margin-left': totalMargin}, 1000, function(){
            	recommendationAllowMovement = true; 	            
	        });
	    }

	}

	$('.screenshot').on('click', function (e) {
	    e.preventDefault();
	    var item = portfolioData.portfolio[$(this).data('itemindex')];
	    $('body').css('overflow', 'hidden');
	    $('#lightBox').show();
	    $('#lightBoxImage img').eq(0).attr('src', item.image);
	    $('#lightBoxImage p').eq(0).text('A screenshot of the work we did for ' + item.header);
	});

	$('#lightBoxClose').on('click', function (e) {
	    e.preventDefault();
	   	$('body').css('overflow', 'visible');
		$('#lightBox').hide();
	    $('#lightBoxImage img').eq(0).removeAttr('src');
	    $('#lightBoxImage p').eq(0).text('');
	});
	
	var init = function(){
		$(window).resize();
		$(window).scroll();
	}

	init();
});