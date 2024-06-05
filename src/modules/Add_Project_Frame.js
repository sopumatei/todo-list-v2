export const loadProjectFrame = () => {
    // Creating the frame container
    const container = document.createElement('div');
    container.id = 'add-project-container';

    // Creating the frame
    const frame = document.createElement('div');
    frame.id = 'add-project-frame';

    // Creating the title
    const title = document.createElement('h2');
    title.textContent = 'Project'
    title.id = 'add-project-title';
    frame.appendChild(title);

    // Creating the input fields
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text'
    inputTitle.placeholder = 'Title: Gym';
    inputTitle.id = 'project-title';
    frame.appendChild(inputTitle);

    // Creating the button container along with the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'add-project-btn-container';

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('add-task-btn');
    submitBtn.textContent = 'Submit';
    submitBtn.id = 'project-submit-btn';
    buttonContainer.appendChild(submitBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('add-task-btn');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.id = 'project-cancel-btn';
    buttonContainer.appendChild(cancelBtn);

    frame.appendChild(buttonContainer);

    container.appendChild(frame);

    return container;
}