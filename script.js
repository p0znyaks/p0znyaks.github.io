const burgerToggle = document.getElementById('burger-toggle');
const burgerMenu = document.querySelector('.burger-menu');

burgerToggle.addEventListener('change', function() {
    if (burgerToggle.checked) {
        burgerMenu.style.display = 'block';
    } else {
        burgerMenu.style.display = 'none';
    }
});
