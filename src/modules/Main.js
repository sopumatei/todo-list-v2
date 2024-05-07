import inboxUrl from '../img/inbox.png'
import todayUrl from '../img/today.png'
import thisWeekUrl from '../img/this_week.png'
import projectUrl from '../img/to-do-list.png'
import closeUrl from '../img/close.png' 

export const loadMain = () => {
    // Creating the main element
    const main = document.createElement('main');
    main.id = 'main';

    // Navigation Bar
    // Creating the navigation bar
    const navBar = document.createElement('nav')
    navBar.id = 'main-nav';
    main.appendChild(navBar);

    // Creating the main categories
    const mainCategories = document.createElement('ul');
    mainCategories.id = 'main-categories'

    const inbox = document.createElement('li');
    inbox.classList.add('active');
    inbox.id = 'inbox';
    const inboxImg = document.createElement('img');
    inboxImg.src = inboxUrl;
    inbox.appendChild(inboxImg);
    const inboxTxt = document.createElement('p');
    inboxTxt.textContent = 'Inbox';
    inbox.appendChild(inboxTxt);
    mainCategories.appendChild(inbox);

    const today = document.createElement('li');
    today.id = 'today';
    const todayImg = document.createElement('img');
    todayImg.src = todayUrl;
    today.appendChild(todayImg);
    const todayTxt = document.createElement('p');
    todayTxt.textContent = 'Today';
    today.appendChild(todayTxt);
    mainCategories.appendChild(today);

    const thisWeek = document.createElement('li');
    thisWeek.id = 'this-week';
    const thisWeekImg = document.createElement('img');
    thisWeekImg.src = thisWeekUrl;
    thisWeek.appendChild(thisWeekImg);
    const thisWeekTxt = document.createElement('p');
    thisWeekTxt.textContent = 'This Week';
    thisWeek.appendChild(thisWeekTxt);
    mainCategories.appendChild(thisWeek);

    navBar.appendChild(mainCategories);

    // Creating the projects emlements
    const projects = document.createElement('div');
    projects.id = 'projects';

    const projectsTitle = document.createElement('h2');
    projectsTitle.id = 'projects-title';
    projectsTitle.textContent = 'Projects';
    projects.appendChild(projectsTitle);

    const projectsContainer = document.createElement('ul');
    projectsContainer.id = 'projects-container'
    projects.appendChild(projectsContainer);

    const projectExample = document.createElement('li');

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('iconContainer');
    const projectExampleImg = document.createElement('img');
    projectExampleImg.src = projectUrl;
    iconContainer.appendChild(projectExampleImg);

    const projectExampleName = document.createElement('p');
    projectExampleName.textContent = 'Gym';
    iconContainer.appendChild(projectExampleName);

    projectExample.appendChild(iconContainer);

    const deleteProjectBtn = document.createElement('img');
    deleteProjectBtn.classList.add('deleteBtn');
    deleteProjectBtn.src = closeUrl;
    projectExample.appendChild(deleteProjectBtn);

    projectsContainer.appendChild(projectExample);

    const createProjectBtn = document.createElement('button');
    createProjectBtn.id = 'create-project-btn';
    createProjectBtn.textContent = '+ Add Project';
    projects.appendChild(createProjectBtn);

    navBar.appendChild(projects);

    // Project Preview
    // Creating the project preview
    const projectPreview = document.createElement('div');
    projectPreview.id = 'project-preview';
    main.appendChild(projectPreview);

    // Creating the project name
    const projectName = document.createElement('h1');
    projectName.id = 'project-name';
    projectName.textContent = 'Inbox';
    projectPreview.appendChild(projectName);

    // Creating the task list
    const tasksList = document.createElement('ul');
    tasksList.id = 'tasks-list';
    projectPreview.appendChild(tasksList);

    // Creating the add task button
    const addTaskBtn = document.createElement('button');
    addTaskBtn.id = 'add-task-btn';
    addTaskBtn.textContent = '+ Add Task'
    projectPreview.appendChild(addTaskBtn);

    main.appendChild(projectPreview);

    return main;
}