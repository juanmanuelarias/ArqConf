$(function() {
  configureScroll();
  configureOffcanvas();
  toggleSpeakers();
  animateNav();
});

function configureScroll () {
  $('nav a').click(goToScroll);
  $('.register a').click(goToScroll);
  $('.navbar-brand').click(goToScroll);
}

function goToScroll() {
  var offset = 50;
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - offset
      }, 1000);
      return false;
    }
  }
}

function configureOffcanvas () {
 //stick in the fixed 100% height behind the navbar but don't wrap it
 $('#slide-nav.navbar .container').append($('<div id="navbar-height-col" class="visible-xs ">SECCIONES</div>'));

  // Enter your ids or classes
  var toggler = '.navbar-toggle';
  var pagewrapper = '#page-content';
  var navigationwrapper = '.navbar-header';
  var menuwidth = '100%'; // the menu inside the slide menu itself
  var slidewidth = '50%';
  var menuneg = '-100%';
  var slideneg = '-100%';


  $("#slide-nav").on("click", toggler, function (e) {
    var selected = $(this).hasClass('slide-active');

    $('#slidemenu').stop().animate({
      left: selected ? menuneg : '0px'
    });

    $('#navbar-height-col').stop().animate({
      left: selected ? slideneg : '0px'
    });

    $(pagewrapper).stop().animate({
      left: selected ? '0px' : slidewidth
    });

    $(navigationwrapper).stop().animate({
      left: selected ? '0px' : slidewidth
    });

    $(this).toggleClass('slide-active', !selected);
    $('#slidemenu').toggleClass('slide-active');

    $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
  });


  var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';


  $(window).on("resize", function () {
    if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
      $(selected).removeClass('slide-active');
    }
  });
}

function toggleSpeakers () {
  $('.speakers .expand').click(function() {
      $(this).find('.description').slideToggle();
      $(this).find('.more').toggleClass('less');
  });
}

function animateNav () {
  var navbar = $('.navbar');
  var links = $('.link-on-top');
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 30) {
        navbar.removeClass('navbar-top');
        links.addClass('link-on-scroll');
    } else {
        navbar.addClass('navbar-top');
        links.removeClass('link-on-scroll');
    }
  });
}

(function (d, s, id) {
    if ('https:' == document.location.protocol || d.getElementById(id)) return;
    var js, fjs = d.getElementsByTagName(s)[0]; js = d.createElement(s); js.id = id;
    js.src = "http://bettercontactform.com/contact/media/d/6/d6ae80b1b686bc01ef3f667f33e40fa5c4bb1ae1.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "bcf-render"));