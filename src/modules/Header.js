export const loadHeader = () => {
    // Creating the header
    const header = document.createElement('header');
    header.id = 'header';

    // Creating the title
    const title = document.createElement('h1');
    title.id = 'menu-title';
    title.textContent = 'Todo List';
    header.appendChild(title);

    return header;
}