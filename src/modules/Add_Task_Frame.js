export const loadTaskFrame = () => {
    // Creating the frame container
    const container = document.createElement('div');
    container.id = 'add-task-container';

    // Creating the frame
    const frame = document.createElement('form');
    frame.id = 'add-task-frame';

    // Creating the title
    const title = document.createElement('h2');
    title.textContent = 'Task'
    title.id = 'add-task-title';
    frame.appendChild(title);

    // Creating the input fields
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text'
    inputTitle.placeholder = 'Title: Pay bills';
    inputTitle.id = 'input-title';
    frame.appendChild(inputTitle);

    const inputDescription = document.createElement('textarea');
    inputDescription.placeholder = 'Description: e.g. internet, phone, rent';
    inputDescription.id = 'input-description';
    frame.appendChild(inputDescription);

    const dateContainer = document.createElement('div');
    dateContainer.id = 'date-container';

    const dateText = document.createElement('p');
    dateText.textContent = 'Due Date:';
    dateContainer.appendChild(dateText);

    const inputDate = document.createElement('input');
    inputDate.id = 'input-date';
    inputDate.type = 'date';
    dateContainer.appendChild(inputDate); 
    frame.appendChild(dateContainer);

    // Creating the button container along with the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'add-task-btn-container';

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('add-task-btn');
    submitBtn.textContent = 'Submit';
    submitBtn.id = 'submit-btn';
    buttonContainer.appendChild(submitBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('add-task-btn');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.id = 'cancel-btn';
    buttonContainer.appendChild(cancelBtn);

    frame.appendChild(buttonContainer);

    container.appendChild(frame);

    return container;
}