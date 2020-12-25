var navBar = document.querySelector('.header');
navBar.style.transition = '.3s';
var lastScrollTop = 0;

window.addEventListener('scroll', function() {
    var scrollTop = window.pageXOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop) {
        navBar.style.top = '-15rem';
    } else {
        navBar.style.top = 0;
    }

    lastScrollTop = scrollTop;
})