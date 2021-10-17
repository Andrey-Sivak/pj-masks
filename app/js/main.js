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

    (function menu() {
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

});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}