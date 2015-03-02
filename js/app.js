// Angular application definition
var app = angular.module('app', []);

// Angular main controller
app.controller('dataController', ['$scope', '$sce', function dataController($scope, $sce){
  
  var prtflDt = portfolioData.portfolio.reverse(),
      gncyDt = agencyData.agencies,
      rcmmdtnDt = recommendationData.recommendations,
      portfolioDataColl = '',
      agencyDataColl = '',
      recommendationDataColl = '';

  for(var i = 0; i < prtflDt.length; i++){

    var hasScreenShot = '',
        screenshotAddition = '',
        techsUsed = '',
        clickTxt = '';

    if(typeof prtflDt[i].image !== 'undefined' && prtflDt[i].image !== ''){
      hasScreenShot = 'screenshot';
      screenshotAddition = '<img src="' + prtflDt[i].spot + '" alt="' + prtflDt[i].header + '"/>';
      clickTxt = '<a>Click here for a screenshot...</a>';
    }else{
      screenshotAddition = '<img src="img/portfolio/spot/no_image.png" alt="No image"/>'
    }

    if(typeof prtflDt[i].techs !== 'undefined' && prtflDt[i].techs !== ''){
      var techArray = prtflDt[i].techs;
      
      for(var j = 0; j < techArray.length; j++){
        techsUsed = techsUsed + '<img src="' + technologyData.technologyIcons[techArray[j]].img + '" alt="' + technologyData.technologyIcons[techArray[j]].header + '"/>';
      }

    }

    var dataItem = '<li class="portfolio-item ' + hasScreenShot + '" data-itemindex="' + i + '">' +
                   '  <div class="ss">' +
                   '    <div class="ss-img">' + screenshotAddition + '</div>' +
                   '    <div class="ss-txt">' +
                   '      <img src="' + prtflDt[i].logo + '" alt="' + prtflDt[i].header + '"/>' +
                   '      <h3>' + prtflDt[i].header + '</h3>' +
                   '      <p>' + prtflDt[i].p + '</p>' +
                   '      <h4>Technologies used:</h4>' +
                   '      <div class="techs-used">' + techsUsed + '</div>' +
                   '      ' + clickTxt +
                   '    </div>' +
                   '  </div>' +
                   '</li>';

    portfolioDataColl = portfolioDataColl + dataItem;
  }

  for(var i = 0; i < gncyDt.length; i++){
    var dataItem = '<li class="agency-item">' +
                   ' <img src="' + gncyDt[i].logo + '" alt="' + gncyDt[i].header + '"/>' +
                   ' <p>' + gncyDt[i].p + '</p>' +
                   '</li>'

    agencyDataColl = agencyDataColl + dataItem;
  }

  for(var i = 0; i < rcmmdtnDt.length; i++){
    var dataItem = '<li class="recommendation-item text-box beige">' +
                   ' <img src="' + rcmmdtnDt[i].img + '" alt="' + rcmmdtnDt[i].header + '"/>' +
                   ' <p class="person-name">' + rcmmdtnDt[i].header + '</p>' +
                   ' <sub>' + rcmmdtnDt[i].title + '</sub>' +
                   ' <p>' + rcmmdtnDt[i].p + '</p>' +
                   '</li>'

    recommendationDataColl = recommendationDataColl + dataItem;
  }

  $scope.data = {
    home: {
      header: 'Who we are, what we do',
      content: $sce.trustAsHtml('<div class="text-box">' +                                 
                                  '<strong>Netclipper IT Solutions Limited is a consultancy specialising in Front End Development contracts.</strong>' + 
                                  '<p>The “Net” is an ocean. An ocean, any business is obliged to sail through. Its waters are treacherous, there are numerous routes and the competition is fierce. Regardless, we strive to be the vessel to get you where you need to be; in time, in one piece. We will navigate you through the options and help your business to prosper.</p>' +
                                  '<strong>We build beautiful websites and amazing web applications.</strong>' + 
                                  //'<p>We will provide you with a simple and clear plan, as well as a satisfying user journey, on how to build an efficient site or help you build a web application. Together we will decide which technology and/or design is best for your purposes. We offer our clients affordable, high quality design that will perform for their businesses.</p>' +
                                  '<p>Having years of experience in our field, we are very adept in turning user journeys and concepts into reality. Regardless of the duration of the contract, we build W3C and cross browser compliant, performance and seo optimised, responsive websites. Likewise, we observe and apply the latest trends in client side frameworks and libraries while developing secure, multi-tiered applications.</p>' +
                                '</div>')
    },
    portfolio: {
      header: 'Our portfolio',
      content: $sce.trustAsHtml('<div class="portfolio-slider-nav"><a href="#" id="portfolioSliderPrevious"><i class="fa fa-chevron-circle-left"></i> Previous</a><a href="#" id="portfolioSliderNext">Next <i class="fa fa-chevron-circle-right"></i></a></div>' +
                                '<div class="portfolio-slider-wrapper">' +
                                  '<ul class="portfolio-slider" data-currentindex="0">' +
                                    portfolioDataColl +
                                  '</ul>' +
                                '</div>' )
    },
    agencies: {
      header: 'Agencies we\'ve done work for',
      content: $sce.trustAsHtml('<ul class="agency-list">' + agencyDataColl + '</ul>')
    },
    recommendations: {
      header: 'People who liked our work',
      content: $sce.trustAsHtml('<div class="recommendation-slider-nav"><a href="#" id="recommendationSliderPrevious"><i class="fa fa-chevron-circle-left"></i></a><a href="#" id="recommendationSliderPlay" class="active"><i class="fa fa-play"></i></a><a href="#" id="recommendationSliderNext"><i class="fa fa-chevron-circle-right"></i></a></div><div class="recommendation-slider-wrapper">' +
                                ' <ul class="recommendation-slider" data-currentindex="0">' + recommendationDataColl + '</ul>' +
                                '</div>')
    },
    contact: {
      header: 'Our details',
      content: $sce.trustAsHtml('<div class="text-box">' +
                                ' <h3>Netclipper IT Solutions Limited</h3>' +
                                ' <p>86-90 Paul Street, London EC2A 4NE</p>' +
                                ' <p><strong>Phone:</strong> +44 20 8144 7990 </p><p><strong>Mobile:</strong> +44 75 7718 9427</p>' +
                                ' <div class="contact-buttons">' +
                                '   <a href="mailto:netclipper@netclipper.co.uk" rel="nofollow" target="_blank" title="Send us an E-mail">' +
                                '     <img src="img/contact_social//email.png" alt="Send us an E-mail" title="Send us an E-mail"/>' +
                                '   </a>' +
                                '   <a href="http://uk.linkedin.com/pub/adnan-akgun/14/32a/13" rel="nofollow" target="_blank" title="Connect with Adnan on Linkedin">' +
                                '     <img src="img/contact_social//linkedin.png" alt="Connect with Adnan on Linkedin" title="Connect with Adnan on Linkedin"/>' +
                                '   </a>' +
                                '   <a href="https://www.facebook.com/pages/Netclipper-It-Solutions/360843503932036" rel="nofollow" target="_blank" title="Follow Us on Facebook">' +
                                '     <img src="img/contact_social/facebook.png" alt="Follow Us on Facebook" title="Follow Us on Facebook"/>' +
                                '   </a>' +
                                '   <a href="https://twitter.com/#!/netclipperit" rel="nofollow" target="_blank" title="Follow Us on Twitter">' +
                                '     <img src="img/contact_social/twitter.png" alt="Follow Us on Twitter" title="Follow Us on Twitter"/>' +
                                '   </a>' +
                                ' </div>' +
                                '</div>')
    }
  };

}]);

app.directive('customSection', function() {
  return {
      restrict: 'A',
      scope: {
        model: '='
      },
      template: '<div class="col-md-2"></div>' +
                '<div class="col-md-8">' +
                ' <h1>{{model.header}}</h1>' +
                ' <div class="content" ng-bind-html="model.content"></div>' +
                '</div>' +
                '<div class="col-md-2"></div>',
      controller: ['$scope', '$http', function($scope, $http){
        
      }],
      link: function($scope, element, attr) {
        $(window).resize();
      }
  };
});