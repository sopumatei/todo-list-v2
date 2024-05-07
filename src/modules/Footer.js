export const loadFooter = () => {
    // Creating the footer
    const footer = document.createElement('footer');
    footer.id = 'footer';

    // Creating the text inside the footer
    const footerText = document.createElement('p');
    const date = new Date;
    footerText.textContent = `Copyright © 2024-${date.getFullYear()} sopumatei`
    footer.appendChild(footerText);

    return footer;
}