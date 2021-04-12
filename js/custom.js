jQuery(document).ready(function( $ ) {
  // Preloader
  $(window).on('load', function() {
    $('#preloader').delay(100).fadeOut('slow',function(){$(this).remove();});

    //load home page
    $('#content div').load("/markovify.html", function() {
        loadContentJS();
    });
  });

  // Hero rotating texts
  $("#hero .rotating").Morphext({
    animation: "flipInX",
    separator: ",",
    speed: 3000
  });
  
  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });
  
  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
      
      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });
      
      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });
      
      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }
  
  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  //load content
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash).selector.replace('#','');
        var url = target + '.html';

        $('#content div#contentContainer').load(url, function() {
            var clone = this.cloneNode(true);
            $(this).replaceWith(clone);

            loadContentJS();
        });

        if ( $(this).parents('.nav-menu').length ) {
            $('.nav-menu .menu-active').removeClass('menu-active');
            $(this).closest('li').addClass('menu-active');
        }

        if ( $('body').hasClass('mobile-nav-active') ) {
            $('body').removeClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').fadeOut();
        }
        
        return false;
    }
  });
  
  // Back to top button
  $(window).scroll(function() {

      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
      
  });
  
  $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0}, 1500, 'easeInOutExpo');
      return false;
  });
});

function loadContentJS() {
    loadSliders();
    setUpGenerateWordsButton();
    loadContactForm();
}

function loadSliders() {
    $( ".slider" ).slider({
        min: 1,
        max: 1,
        create: function( event, ui ) {
        getSliderOptions( $(this) );
            $(this).find('.ui-slider-handle').text($( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            $('.slider-counter').text(ui.value);
        },
        start: function( event, ui ) {
            $(this).find('.ui-slider-handle').text('');
            $(this).find('.ui-slider-handle').append("<span class='slider-counter'>"+ui.value+"</span><span class='slider-pointer'></span>");
        }, 
        stop: function( event, ui ) {
            $('.slider-counter').remove();
            $('.slider-pointer').remove();
            $(this).find('.ui-slider-handle').text(ui.value);
        }
    });
}

function getSliderOptions(slider) {
  switch (slider.attr('id')) {
    case 'state-size':
        slider.slider("option", "max", 3);
        slider.slider("option", "value", 2);
        return;
    case 'min-len-word':
        slider.slider("option", "max", 3);
        return;
    case 'num-words':
        slider.slider("option", "min", 50);
        slider.slider("option", "max", 200);
        slider.slider("option", "step", 50);
        return;
  }
}

function setUpGenerateWordsButton() {
    $("#generate-words button").click(function() {
        var validation = $("#corpus-validation");
        validation.text("");
        validation.removeClass("display");

        var corpus = $("#corpus").val();

        if (corpus == '') {
            validation.text("Please enter a corpus");
            validation.addClass("display");
            return;
        }

        var stateSize = $("#state-size").slider("value");
        var minLenWords = $("#min-len-word").slider("value");
        var numOfWords = $("#num-words").slider("value");
        var removeDuplicates = $("#remove-duplicates:checked").length > 0;
        apiGateway.getWords(corpus, numOfWords, stateSize, minLenWords, removeDuplicates, buildWordsTable, "words");
        return false;
    });
}

function buildWordsTable(element, data) {
    if (data['errorMessage'] != null) {
        var validation  = $("#corpus-validation");
        validation.text(data['errorMessage']);
        validation.addClass("display");
        return;
    }

    var parsedData = JSON.parse(data);
	var table = '';
	
	for (var i = 0; i < parsedData.length; i++) {
		table += '<div class="col-sm-2">' + parsedData[i] + '</div>';
	}
    
    document.getElementById(element).innerHTML = table;
    
    var target = $('#'+element).position().top;
    if( $('#header').length ) {
        top_space = $('#header').outerHeight();
      }
      
      $('html, body').animate({
          scrollTop: target - top_space
      }, 1500, 'easeInOutExpo');
}


function loadContactForm() {
    $.getScript("/js/contactform.js");
}