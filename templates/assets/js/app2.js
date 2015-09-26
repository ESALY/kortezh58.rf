var app = {
    carousel:"",
    nav:"",

    init:function () {
        var self = this;

        this.carousel = $('.carousel');
        this.nav = $('.nav li');
        this.carousel.iosSlider({
            snapToChildren:true,
            desktopClickDrag:true,
            infiniteSlider:true,
            navPrevSelector:$('.btn-left'),
            navNextSelector:$('.btn-right'),
            onSlideChange:slideChangeCallback,
            onSliderLoaded:slideChangeCallback
        });
        this.removedSlide = '';

        function slideChangeCallback(args) {

            $('.nav li:visible')
                .removeClass('current')
                .eq(args.currentSlideNumber).addClass('current');

        }

        if (window.location.pathname == 'index.html') {
            this.initNav();
        }

        this.weddingCars();
        this.switchTheme();
        this.submitForm();

        var theme = this.getCookie('theme');

        $.fn.datepicker.dates['en'] = {
            days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск"],
            daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
            months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            today: "Сегодня"
        };

        $('#dp1').datepicker({
            format: 'dd-mm-yyyy'
        });


        if (theme!=null && theme!="")
        {
            $('.switch').click();
        }

        var $scrollingDiv = $(".btns");
        var elemTop = $scrollingDiv.offset().top -300;

        $(window).scroll(function(){
            $scrollingDiv.stop();

            if ($(window).scrollTop()>elemTop) {
                $scrollingDiv.animate({"marginTop": ($(window).scrollTop()-elemTop) + "px"}, "slow" );
            } else {
                $scrollingDiv.animate({"marginTop": "0px"}, "slow");
            }
        });

        $('a.popup').live('click', function(){
            var url = $(this).attr('href');

            $('#textPopup .modal-load').load(url, function () {
                $('#textPopup').modal('show')
            });

            return false;
        })
    },

    switchTheme:function () {
        var self = this;

        $('.switch').click(function () {

            $(this).find('div').toggleClass('black');
            $('body').toggleClass('cartezh-black');

            var whiteSlide = $('.site-section.white-img:first');

            if($('body').is('.cartezh-black'))
            {
                self.setCookie('theme', 'black', 365);
                if(typeof whiteSlide[0] != "undefined")
                {
                    self.removedSlide = $('<article class="site-section" />').append(whiteSlide.clone()).html();
                    self.carousel
                        .iosSlider('removeSlide', 3)
                        .iosSlider('goToSlide', 1);
                }

            }

            else
            {
                self.setCookie('theme', '', 365);
                if(typeof whiteSlide[0] != "undefined")
                    self.carousel
                        .iosSlider('addSlide',self.removedSlide, 3)
                        .iosSlider('goToSlide', 1);
            }

            return false;
        })
    },

    setCookie:function (c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    },

    getCookie:function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    },

    submitForm:function () {

        $("#order-form").live('submit', function (event) {

            event.preventDefault();

            if (!valid_feedform($(this)[0]))
                return false;

            $.post($(this).attr('action'), $(this).serialize(), function () {
                alert('Сообщение отправлено');
                $('#orderPopup').modal('hide');
                $('#order-form')[0].reset();
            });
        });
    },

    initNav:function () {
        var self = this;

        $('.btns a').click(function () {
            return false;
        })

        self.nav.click(function () {
            var index = $('.nav li:visible').index($(this)) + 1;
            self.carousel.iosSlider('goToSlide', index);

            return false;
        });

        function getKey(key){
            if ( key == null ) {
                keycode = event.keyCode;
            } else {
                keycode = key.keyCode;
            }
            return keycode;
        }

        $(document).keydown(function (eh) {
            var key = getKey(eh);
            if(key == 39) {
                $('.btn-right').click();
            } else if (key == 37) {
                $('.btn-left').click();
            }
        });
    },

    weddingCars:function () {
        var handlers = $('.cat-container li > a');

        handlers.each(function () {
            $(this).unbind().bind('click', function () {
                var handler = $(this),
                    parent = $(this).parent();

                container = $(this).parents('ul').next();

                if (parent.hasClass('act')) {
                    container.slideUp('normal', function () {
                        parent.removeClass('act');
                    });
                }
                else {
                    $('.cat-block').slideUp(function () {

                    })

                    container.load(handler.attr('href'), function () {
                        $('.cat-container li').removeClass('act');
                        container.slideDown();
                        parent.addClass('act');
                    });

                }


                return false
            })
        })


    }
}

$(document).ready(function () {
    app.init();
});