$(function() {
  configureScroll();
  configureOffcanvas();
  toggleSpeakers();
  animateNav();

  new WOW().init();
  setupCountdown('2019/10/24 16:00:00', ['dias', 'horas', 'minutos', 'segundos'], $('#countdown-template'), $('#countdown-container'));
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
    
    /*
    if (scroll >= 30) {
        navbar.removeClass('navbar-top');
        links.addClass('link-on-scroll');
    } else {
        navbar.addClass('navbar-top');
        links.removeClass('link-on-scroll');
    }*/

  });
}

(function (d, s, id) {
    if ('https:' == document.location.protocol || d.getElementById(id)) return;
    var js, fjs = d.getElementsByTagName(s)[0]; js = d.createElement(s); js.id = id;
    js.src = "http://bettercontactform.com/contact/media/d/6/d6ae80b1b686bc01ef3f667f33e40fa5c4bb1ae1.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "bcf-render"));

function setupCountdown(targetDate, labels, templateElement, targetElement) {
    var template = _.template(templateElement.html()),
        currDate = '00:00:00:00:00',
        nextDate = '00:00:00:00:00',
        parser = /([0-9]{2})/gi;

    // Parse countdown string to an object
    function strfobj(str) {
        var parsed = str.match(parser),
            obj = {};
        labels.forEach(function (label, i) {
            obj[label] = parsed[i]
        });
        return obj;
    }

    // Return the time components that diffs
    function diff(obj1, obj2) {
        var diff = [];
        labels.forEach(function (key) {
            if (obj1[key] !== obj2[key]) {
                diff.push(key);
            }
        });
        return diff;
    }

    // Build the layout
    var initData = strfobj(currDate);
    labels.forEach(function (label, i) {
        targetElement.append(template({
            curr: initData[label],
            next: initData[label],
            label: label
        }));
    });

    // Starts the countdown
    targetElement.countdown(targetDate)
        .on('update.countdown', function (event) {
            var newDate = event.strftime('%D:%H:%M:%S'),
                data;
            if (newDate !== nextDate) {
                currDate = nextDate;
                nextDate = newDate;
                // Setup the data
                data = {
                    'curr': strfobj(currDate),
                    'next': strfobj(nextDate)
                };
                // Apply the new values to each node that changed
                diff(data.curr, data.next).forEach(function (label) {
                    var selector = '.%s'.replace(/%s/, label),
                        $node = targetElement.find(selector);
                    // Update the node
                    $node.removeClass('flip');
                    $node.find('.curr').text(data.curr[label]);
                    $node.find('.next').text(data.next[label]);
                    // Wait for a repaint to then flip
                    _.delay(function ($node) {
                        $node.addClass('flip');
                    }, 50, $node);
                });
            }
        });
        /*.on('update.countdown', function (event) {
            if (event.offset.seconds === 0) {
                _.delay(function (title) {
                    title.removeClass('fadeOut').addClass('fadeIn');
                }, 550, $('.title').addClass('fadeOut'));
            }
        });*/
}
