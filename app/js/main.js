'use strict';
import * as $ from 'jquery';
import './jquery.validate.min.js';
import './slick.min';
import './select2.min';


const mobileWidth = 767;
let isMobile = checkWidth();

window.addEventListener('resize', () => {
    isMobile = checkWidth();
});

setTimeout(() => {
    if (!document.querySelector('.loader')) {
        return;
    }

    const loader = document.querySelector('.loader');
    if (loader.classList.contains('active')) {
        loader.classList.remove('active');

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 300)
    }
}, 2500);

window.addEventListener('load', function () {

    (function loader() {
        if (!document.querySelector('.loader')) {
            return;
        }

        const loader = document.querySelector('.loader');

        if (loader.classList.contains('active')) {
            loader.classList.remove('active');
        }

        setTimeout(() => {
            loader.parentElement.removeChild(loader);
        }, 1500);

    })();

    (function mobMenu() {
        if (!document.querySelector('.menu')) {
            return;
        }

        const menu = document.querySelector('.menu');
        const menuBtn = document.querySelector('.mob-menu-btn');

        menuBtn.addEventListener('click', function (e) {
            e.preventDefault();

            this.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('no-scrolling');
        })
    })();

    (function menu() {
        if (!document.querySelector('.menu')) {
            return;
        }

        if (!document.getElementById('presents')) {
            return;
        }

        const prizes = document.getElementById('presents');
        let sticky = prizes.offsetTop;

        const prizesMenuItem = [...document.querySelectorAll('.menu__item > a')]
            .filter(h => h.innerHTML === 'Призы')[0];

        const mainMenuItem = [...document.querySelectorAll('.menu__item > a')]
            .filter(h => h.innerHTML === 'Главная')[0];

        prizesMenuItem.addEventListener('click', function(e) {
            e.preventDefault();

            console.log(sticky);

            if (isMobile) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: 1568
                }, 850);
            } else {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#presents").offset().top - 71
                }, 850);
            }

            if (document.querySelector('.menu').classList.contains('active')) {

                document.querySelector('.menu').classList.remove('active');
                document.body.style.overflowY = 'scroll';
                document.querySelector('.header').classList.remove('active');
                document.querySelector('.mob-menu-btn').classList.remove('active');
            }

            if (!this.classList.contains('active')) {
                this.classList.add('active');
            }
        });

        if (window.pageYOffset > sticky) {
            mainMenuItem.parentElement.classList.remove("active");
            prizesMenuItem.parentElement.classList.add("active");
        }

        window.addEventListener('scroll', scrollPrizes);

        function scrollPrizes() {
            if (window.pageYOffset > sticky) {
                mainMenuItem.parentElement.classList.remove("active");
                prizesMenuItem.parentElement.classList.add("active");
            } else {
                prizesMenuItem.parentElement.classList.remove("active");
                mainMenuItem.parentElement.classList.add("active");
            }
        }
    })();

    (function questions() {
        if (!document.querySelector('.questions')) {
            return;
        }

        const questions = [...document.querySelectorAll('.question')];
        questions.forEach(q => {
           q.addEventListener('click', accordion)
        });

        function accordion(e) {
            e.preventDefault();

            this.classList.toggle('active');
        }
    })();

    (function select() {
        if($('.select').length > 1) {
            $('select').each(function() {
                let $this = $(this).not('.select-search');
                let parent = $(this).not('.select-search').parents('.select');
                $this.select2({
                    minimumResultsForSearch: Infinity,
                    dropdownParent: parent
                });
            });
            $('.select-search').each(function() {
                let $this = $(this);
                let parent = $(this).parents('.select');
                $this.select2({
                    dropdownParent: parent
                });
            });
        } else {
            console.log(123);
            $('select').select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: $('.select')
            });
        }
    })();

    (function accountSlider() {
        if (!document.querySelector('.slider')) {
            return;
        }

        $('.slider').slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            dots: false,
            prevArrow: '<span class="slider-arrow prev"></span>',
            nextArrow: '<span class="slider-arrow next"></span>',
        })
    })();

    (function validate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    modal_email: {
                        required: true,
                        email: true
                    },
                    modal_email_reg: {
                        required: true,
                        email: true
                    },
                    modal_email_forgot_pass: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true
                    },
                    check1: {
                        required: true
                    },
                    check2: {
                        required: true
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                }
            });
        });

        $.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
    })();

    (function modals() {
        if (!document.querySelector('.modal')) {
            return;
        }

        const popupBtns = [...document.querySelectorAll('[data-popup]')];
        const popups = [...document.querySelectorAll('.modal')];

        popupBtns.forEach(p => {
            p.addEventListener('click', popupShow);
        });

        popups.forEach(p => {
            p.addEventListener('click', popupHide);
        });

        function popupShow(e) {
            e.preventDefault();
           const currentPopupName = this.dataset.popup;
           const currentPopup = document.querySelector(`.modal[data-modal="${currentPopupName}"]`);

           if (document.querySelector('.modal.active')) {
               document.querySelector('.modal.active')
                   .classList
                   .remove('active');
           }

           currentPopup.classList.add('active');
        }

        function popupHide(e) {
            if (e.target.dataset.close) {
                this.classList.remove('active');
            }
        }
    })();

    (function toys() {
        if (!document.querySelector('.toy__more')) {
            return;
        }

        const toys = [...document.querySelectorAll('.toy')];
        const toysWithMoreText = toys.filter(t => t.querySelector('.toy__more'));

        toysWithMoreText.forEach(t => {
            const moreBtn = t.querySelector('.toy__more');
            const lessBtn = t.querySelector('.toy__less');

            moreBtn.addEventListener('click', function (e) {
                e.preventDefault();
                this.parentElement.classList.add('active');
            });

            lessBtn.addEventListener('click', function (e) {
                e.preventDefault();
                this.parentElement.classList.remove('active');
            })
        });
    })();

});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}