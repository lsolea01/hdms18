jQuery(function ($) {

    'use strict';
    // --------------------------------------------------------------------
    // PreLoader
    // --------------------------------------------------------------------

    var engImgLink = "./img/gb.gif";
    var grImgLink = "./img/gr.gif";

    var imgBtnSel = $('#imgBtnSel');
    var imgBtnEng = $('#imgBtnEng');
    var imgBtnGr = $('#imgBtnGr');

    var imgNavSel = $('#imgNavSel');
    var imgNavEng = $('#imgNavEng');
    var imgNavGr = $('#imgNavGr');

    var spanNavSel = $('#lanNavSel');
    var spanBtnSel = $('#lanBtnSel');

    imgBtnSel.attr("src", grImgLink);
    imgBtnEng.attr("src", engImgLink);
    imgBtnGr.attr("src", grImgLink);

    imgNavSel.attr("src", grImgLink);
    imgNavEng.attr("src", engImgLink);
    imgNavGr.attr("src", grImgLink);

    $(".language").on("click", function (event) {
        var currentId = $(this).attr('id');

        if (currentId == "navEng") {
            imgNavSel.attr("src", engImgLink);
            spanNavSel.text("ENG");
        } else if (currentId == "navGr") {
            imgNavSel.attr("src", grImgLink);
            spanNavSel.text("Gr");
        }

        if (currentId == "btnEng") {
            imgBtnSel.attr("src", engImgLink);
            spanBtnSel.text("ENG");
        } else if (currentId == "btnGr") {
            imgBtnSel.attr("src", grImgLink);
            spanBtnSel.text("GR");
        }

    });


    /*==========  Alerts  ==========*/
    $('.alert').on('inview', function (event, isInView) {
        if (isInView) {
            $(this).addClass('in');
        }
    });

    $('[data-hide]').on('click', function () {
        $(this).closest('.' + $(this).attr('data-hide')).fadeOut();
    });

    (function () {
        /*==========  Validate Email  ==========*/
        function validateEmail($validate_email) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!emailReg.test($validate_email)) {
                return false;
            } else {
                return true;
            }
        }

        /*==========  Contact Form  ==========*/
        $('.contact-form').on('submit', function () {
            var contactForm = $(this);
            contactForm.find('.contact-error').fadeOut();
            contactForm.find('.contact-success').fadeOut();
            contactForm.find('.contact-loading').fadeOut();
            contactForm.find('.contact-loading').fadeIn();
            if (validateEmail(contactForm.find('.contact-email').val()) && contactForm.find('.contact-email').val().length !== 0 && contactForm.find('.contact-name').val().length !== 0 && contactForm.find('.contact-message').val().length !== 0) {
                var action = contactForm.attr('action');
                $.ajax({
                    type: "POST",
                    url: action,
                    data: {
                        contact_name: contactForm.find('.contact-name').val(),
                        contact_email: contactForm.find('.contact-email').val(),
                        contact_message: contactForm.find('.contact-message').val()
                    },
                    success: function () {
                        contactForm.find('.contact-loading').fadeOut();
                        contactForm.find('.contact-success').find('.message').html('Success! Thanks for contacting us!');
                        contactForm.find('.contact-success').fadeIn();
                    },
                    error: function () {
                        contactForm.find('.contact-loading').fadeOut();
                        contactForm.find('.contact-error').find('.message').html('Sorry, an error occurred.');
                        contactForm.find('.contact-error').fadeIn();
                    }
                });
            } else if (!validateEmail(contactForm.find('.contact-email').val()) && contactForm.find('.contact-email').val().length !== 0 && contactForm.find('.contact-name').val().length !== 0 && contactForm.find('.contact-message').val().length !== 0) {
                contactForm.find('.contact-error').fadeOut();
                contactForm.find('.contact-success').fadeOut();
                contactForm.find('.contact-loading').fadeOut();
                contactForm.find('.contact-error').find('.message').html('Please enter a valid email.');
                contactForm.find('.contact-error').fadeIn();
            } else {
                contactForm.find('.contact-error').fadeOut();
                contactForm.find('.contact-success').fadeOut();
                contactForm.find('.contact-loading').fadeOut();
                contactForm.find('.contact-error').find('.message').html('Please fill out all the fields.');
                contactForm.find('.contact-error').fadeIn();
            }
            return false;
        });

    }());


    (function () {
        $('#preloader').delay(200).fadeOut('slow');
    }());

    // --------------------------------------------------------------------
    // One Page Navigation
    // --------------------------------------------------------------------

    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() >= 50) {
                $('nav.navbar').addClass('sticky-nav');
            }
            else {
                $('nav.navbar').removeClass('sticky-nav');
            }
        });
    }());

    // --------------------------------------------------------------------
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    // --------------------------------------------------------------------

    (function () {
        $('a.page-scroll').on('click', function (e) {
            e.preventDefault();
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
        });
    }());

    // --------------------------------------------------------------------
    // Closes the Responsive Menu on Menu Item Click
    // --------------------------------------------------------------------

    (function () {
        $('.navbar-collapse ul li a').on('click', function () {
            if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
                $('.navbar-toggle:visible').trigger('click');
            }
        });
    }());

    // --------------------------------------------------------------------
    // Google Map
    // --------------------------------------------------------------------

    (function () {
        if ($('#googleMap').length > 0) {

            //set your google maps parameters
            var $latitude = 35.1458238, //If you unable to find latitude and longitude of your address. Please visit http://www.latlong.net/convert-address-to-lat-long.html you can easily generate.
                $longitude = 33.4081827,
                $map_zoom = 18;
            /* ZOOM SETTING */

            //google map custom marker icon
            var $marker_url = 'img/google-map-marker.png';

            //we define here the style of the map
            var style = [{
                "stylers": [{
                    "hue": "#000"
                }, {
                    "saturation": 100
                }, {
                    "gamma": 1.15
                }, {
                    "lightness": 5
                }]
            }];

            //set google map options
            var map_options = {
                center: new google.maps.LatLng($latitude, $longitude),
                zoom: $map_zoom,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                // styles: style,
            };
            //initialize the map
            var map = new google.maps.Map(document.getElementById('googleMap'), map_options);
            //add a custom marker to the map
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($latitude, $longitude),
                map: map,
                visible: true,
                icon: $marker_url
            });
        }
    }());


    $('[data-toggle=search-form]').click(function () {
        $('.search-form-wrapper').toggleClass('open');
        $('.search-form-wrapper .search').focus();
        $('html').toggleClass('search-form-open');
    });
    $('[data-toggle=search-form-close]').click(function () {
        $('.search-form-wrapper').removeClass('open');
        $('html').removeClass('search-form-open');
    });
    $('.search-form-wrapper .search').keypress(function (event) {
        if ($(this).val() == "Search") $(this).val("");
    });

    $('.search-close').click(function (event) {
        $('.search-form-wrapper').removeClass('open');
        $('html').removeClass('search-form-open');
    });

    //Preload images first
    // $.fn.preload = function () {
    //     this.each(function () {
    //         $('<img/>')[0].src = this;
    //     });
    // }

    // var images = [];
    // images[0] = "img/photo-ucy1.jpg";
    // images[1] = "img/photo-ucy2.jpg";
    // images[2] = "img/gbh1.jpg";
    // images[3] = "img/gbh2.jpg";
    // $(images).preload();
// Usage:
//     var currimg = 0;

    // function loadimg() {
    //     var jumbotron = $('.jumbotron');
    //     jumbotron.animate({opacity: 1}, 500, function () {
    //         //finished animating, minifade out and fade new back in
    //         jumbotron.animate({opacity: 0.7}, 100, function () {
    //
    //             currimg++;
    //             if (currimg > images.length - 1) {
    //                 currimg = 0;
    //             }
    //             var newimage = images[currimg];
    //             //swap out bg src
    //             jumbotron.css('background', 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(\'' + newimage + '\')  no-repeat fixed center top');
    //             jumbotron.css('background-size', 'auto 100%');
    //             jumbotron.css('-webkit-background-size', 'auto 100%');
    //             //animate fully back in
    //             jumbotron.animate({opacity: 1}, 400, function () {
    //                 //set timer for next
    //                 setTimeout(loadimg, 5000);
    //             });
    //         });
    //     });
    // }
    //
    // setTimeout(loadimg, 5000);

    $('a.popup').click(function () {   //bind handlers
        var url = $(this).attr('href');

        showDialog(url, $(this).html(), url.indexOf("htm") < 0);

        return false;
    });


    $("#main-dialog").dialog({  //create dialog, but keep it closed
        autoOpen: false,
        closeOnEscape: true,
        height: $(window).height(),
        width: "90%",
        modal: true,
        open: function (event, ui) {
            $('.ui-widget-overlay').bind('click', function () {
                $("#main-dialog").dialog('close');
            });
        }

    });

    function showDialog(url, title, download) {  //load content and open dialog
        var buttons = {
            Close: function () {
                $(this).dialog("close");
            },
            Print: function () {
                window.frames["printf"].focus();
                window.frames["printf"].print();

            }
        };

        if (download) {
            buttons["Download"] = function (e) {
                {
                    var url = $("#main-dialog").dialog("option", "url");
                    var a = document.createElement('a');
                    a.download = '';
                    a.href = url;
                    a.click();

                }

            }
        }
        $('#main-dialog').html('<div class="scroll-wrapper"><iframe id="printf" name="printf" style="border: 0px; " src="' + url + '" width="100%" height="100%"></iframe><div')
            .dialog({title: title, url: url, buttons: buttons})
            .dialog("open");

    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


}); // JQuery end
function fixNavbarIssue() {
    var hash = window.location.hash;
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('.nav-bar a').click(function (e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
    });
}

$('a[data-toggle^="collapse"]').click(function (e) {
    var id = $(this).attr('href');
    e.preventDefault();
});


function greek() {
    window.location.replace("index.el.html" + $(location).attr('hash'));
    //window.location.href="index.el.html" + window.location.hash;
}
function english() {
    window.location.replace("index.en.html" + $(location).attr('hash'));
   // window.location.href="index.en.html" + window.location.hash;
}
