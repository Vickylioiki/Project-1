const navigation = document.querySelector('.navbar-wrapper')
const navbarWrapper = document.querySelector('.navbar-header')

document.querySelector('.toggle').onclick = function () {
    this.classList.toggle('active')
    navigation.classList.toggle('active')
    navbarWrapper.classList.toggle('active')
}

let p = document.querySelector('.welcome');
p.innerHTML = '';
let n = 0;
let str = 'Welcome to my personal website.';
let typeTimer = setInterval(function () {
    n = n + 1;
    p.innerHTML = str.slice(0, n);
    if (n === str.length) {
        clearInterval(typeTimer);
        p.innerHTML = str;
        n = 0;
        setInterval(function () {

            if (n === 0) {
                p.innerHTML = str
                n = 1;
            } else {
                p.innerHTML = str
                n = 0;
            };
        }, 500);
    };
}, 75)


