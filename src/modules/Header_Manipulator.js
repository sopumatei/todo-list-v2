export const activateHeader = () => {
    const menuBtn = document.getElementById('nav-btn');
    const mainNav = document.getElementById('main-nav');
 
    menuBtn.addEventListener('click', () => {
        if(menuBtn.classList.contains('active')) {
            menuBtn.classList.remove('active');
            mainNav.style.height = '0';
            mainNav.style.transform = 'scale(0)';
        }
        else {
            menuBtn.classList.add('active');
            mainNav.style.height = '100%';
            mainNav.style.transform = 'scale(1)';
        }
    })
}