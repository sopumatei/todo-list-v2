export const loadHeader = () => {
    // Creating the header
    const header = document.createElement('header');
    header.id = 'header';

    // Creating the title
    const title = document.createElement('h1');
    title.id = 'menu-title';
    title.textContent = 'Todo List';
    header.appendChild(title);

    // Creating the nav bar btn
    const navBtn = document.createElement('div');
    navBtn.id = 'nav-btn';

    const line1 = document.createElement('div');
    line1.classList.add('btnLine');
    navBtn.appendChild(line1);

    const line2 = document.createElement('div');
    line2.classList.add('btnLine');
    navBtn.appendChild(line2);

    const line3 = document.createElement('div');
    line3.classList.add('btnLine');
    navBtn.appendChild(line3);

    header.appendChild(navBtn);

    return header;
}