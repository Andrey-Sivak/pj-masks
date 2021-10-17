'use strict';
import * as $ from 'jquery';


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

});

function checkWidth() {
    return mobileWidth > document.documentElement.clientWidth;
}