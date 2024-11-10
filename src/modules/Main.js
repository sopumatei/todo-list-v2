// Importing image URLs for project icons and close button
import inboxUrl from '../img/inbox.png';
import todayUrl from '../img/today.png';
import thisWeekUrl from '../img/this_week.png';
import projectUrl from '../img/to-do-list.png';
import closeUrl from '../img/close.png';

// Importing functions and variables from other modules to manage projects and tasks
import { getCurrentProject, setCurrentProject, Project, Projects, InboxProject, TodayProject, WeekProject, loadTasks, updateStorage } from '..';

// Load and display all projects in the UI
export const loadProjects = () => {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = ''; // Clear any existing projects

    Projects.forEach((project) => {
        const projectExample = document.createElement('li');
        projectExample.classList.add('project');
        projectExample.id = `${project.name}`;

        // Creating an icon container for each project with a name and image
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('iconContainer');
        const projectExampleImg = document.createElement('img');
        projectExampleImg.src = projectUrl;
        iconContainer.appendChild(projectExampleImg);

        const projectExampleName = document.createElement('p');
        projectExampleName.textContent = project.name;
        iconContainer.appendChild(projectExampleName);

        projectExample.appendChild(iconContainer);

        // Add a delete button to each project
        const deleteProjectBtn = document.createElement('img');
        deleteProjectBtn.classList.add('deleteBtn');
        deleteProjectBtn.src = closeUrl;

        let canDelete = false;
        deleteProjectBtn.addEventListener('click', () => {
            canDelete = true;
            const index = Projects.indexOf(project);
            if (index > -1) {
                console.log('Deleting a project');
                
                // Remove project tasks from other predefined projects
                project.tasks.forEach((currentTask) => {
                    InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== currentTask.title);
                    TodayProject.tasks = TodayProject.tasks.filter((task) => task.title !== currentTask.title);
                    WeekProject.tasks = WeekProject.tasks.filter((task) => task.title !== currentTask.title);
                });

                // If the current project is being deleted, reset view to Inbox
                if (getCurrentProject() === project) {
                    const homeEl = document.getElementById('inbox');
                    activateProject(InboxProject, homeEl);
                    loadTasks(InboxProject);
                }

                Projects.splice(index, 1); // Remove the project from the array
                updateStorage();
            }
            loadProjects(); // Reload the projects to update the UI
        });

        projectExample.appendChild(deleteProjectBtn);

        // Set project as active when clicked if not being deleted
        projectExample.addEventListener('click', () => {
            if (!canDelete) {
                document.getElementById('add-task-btn').style.display = 'Block';
                activateProject(project, projectExample);
                loadTasks(project);
            }
        });

        projectsContainer.appendChild(projectExample); // Add project element to the container
    });
};

// Activate the selected project by setting it as current and styling it as active
export const activateProject = (project, el) => {
    setCurrentProject(project);

    const projectElements = document.getElementsByClassName('project');

    // Remove 'active' class from all projects
    for (let i = 0; i < projectElements.length; ++i) {
        projectElements[i].classList.remove('active');
    }

    el.classList.add('active'); // Set the selected element as active
};

// Load the main content structure and UI elements
export const loadMain = () => {
    const main = document.createElement('main');
    main.id = 'main';

    // Navigation Bar creation
    const navBar = document.createElement('nav');
    navBar.id = 'main-nav';
    main.appendChild(navBar);

    // Creating the main categories (Inbox, Today, This Week)
    const mainCategories = document.createElement('ul');
    mainCategories.id = 'main-categories';

    const inbox = document.createElement('li');
    setCurrentProject(InboxProject);
    inbox.classList.add('active', 'project');
    inbox.id = 'inbox';

    inbox.addEventListener('click', () => {
        if (!inbox.classList.contains('active')) {
            setCurrentProject(InboxProject);
            document.getElementById('add-task-btn').style.display = 'Block';
            activateProject(InboxProject, inbox);
            loadTasks(InboxProject); // Load tasks for Inbox
        }
    });

    const inboxImg = document.createElement('img');
    inboxImg.src = inboxUrl;
    inbox.appendChild(inboxImg);

    const inboxTxt = document.createElement('p');
    inboxTxt.textContent = 'Inbox';
    inbox.appendChild(inboxTxt);
    mainCategories.appendChild(inbox);

    // Today and This Week categories with similar setup
    const today = document.createElement('li');
    today.id = 'today';
    today.classList.add('project');
    today.addEventListener('click', () => {
        if (!today.classList.contains('active')) {
            setCurrentProject(TodayProject);
            document.getElementById('add-task-btn').style.display = 'none';
            activateProject(TodayProject, today);
            loadTasks(TodayProject); // Load tasks for Today
        }
    });

    const todayImg = document.createElement('img');
    todayImg.src = todayUrl;
    today.appendChild(todayImg);
    const todayTxt = document.createElement('p');
    todayTxt.textContent = 'Today';
    today.appendChild(todayTxt);
    mainCategories.appendChild(today);

    const thisWeek = document.createElement('li');
    thisWeek.id = 'this-week';
    thisWeek.classList.add('project');
    thisWeek.addEventListener('click', () => {
        if (!thisWeek.classList.contains('active')) {
            setCurrentProject(WeekProject);
            document.getElementById('add-task-btn').style.display = 'none';
            activateProject(WeekProject, thisWeek);
            loadTasks(WeekProject); // Load tasks for This Week
        }
    });

    const thisWeekImg = document.createElement('img');
    thisWeekImg.src = thisWeekUrl;
    thisWeek.appendChild(thisWeekImg);
    const thisWeekTxt = document.createElement('p');
    thisWeekTxt.textContent = 'This Week';
    thisWeek.appendChild(thisWeekTxt);
    mainCategories.appendChild(thisWeek);

    navBar.appendChild(mainCategories);

    // Projects section creation
    const projects = document.createElement('div');
    projects.id = 'projects';

    const projectsTitle = document.createElement('h2');
    projectsTitle.id = 'projects-title';
    projectsTitle.textContent = 'Projects';
    projects.appendChild(projectsTitle);

    const projectsContainer = document.createElement('ul');
    projectsContainer.id = 'projects-container';
    projects.appendChild(projectsContainer);

    Projects.forEach((project) => {
        const projectExample = document.createElement('li');
        projectExample.classList.add('project');

        const iconContainer = document.createElement('div');
        iconContainer.classList.add('iconContainer');
        const projectExampleImg = document.createElement('img');
        projectExampleImg.src = projectUrl;
        iconContainer.appendChild(projectExampleImg);

        const projectExampleName = document.createElement('p');
        projectExampleName.textContent = project.name;
        iconContainer.appendChild(projectExampleName);

        projectExample.appendChild(iconContainer);

        const deleteProjectBtn = document.createElement('img');
        deleteProjectBtn.classList.add('deleteBtn');
        deleteProjectBtn.src = closeUrl;

        let canDelete = false;
        deleteProjectBtn.addEventListener('click', () => {
            canDelete = true;
            const index = Projects.indexOf(project);
            if (index > -1) {
                console.log('Deleting a project');
                
                project.tasks.forEach((currentTask) => {
                    InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== currentTask.title);
                    TodayProject.tasks = TodayProject.tasks.filter((task) => task.title !== currentTask.title);
                    WeekProject.tasks = WeekProject.tasks.filter((task) => task.title !== currentTask.title);
                });

                if (getCurrentProject() === project) {
                    const homeEl = document.getElementById('inbox');
                    activateProject(InboxProject, homeEl);
                    loadTasks(InboxProject);
                }
                Projects.splice(index, 1);
                updateStorage();
            }
            loadProjects();
        });

        projectExample.appendChild(deleteProjectBtn);

        projectExample.addEventListener('click', () => {
            if (!canDelete) {
                document.getElementById('add-task-btn').style.display = 'Block';
                activateProject(project, projectExample);
                loadTasks(project);
            }
        });

        projectsContainer.appendChild(projectExample);
    });

    const createProjectBtn = document.createElement('button');
    createProjectBtn.id = 'create-project-btn';
    createProjectBtn.textContent = '+ Add Project';
    projects.appendChild(createProjectBtn);

    navBar.appendChild(projects);

    // Project Preview section with tasks list and add task button
    const projectPreview = document.createElement('div');
    projectPreview.id = 'project-preview';
    main.appendChild(projectPreview);

    const projectName = document.createElement('h1');
    projectName.id = 'project-name';
    projectName.textContent = 'Inbox';
    projectPreview.appendChild(projectName);

    const tasksList = document.createElement('ul');
    tasksList.id = 'tasks-list';
    projectPreview.appendChild(tasksList);

    const addTaskBtn = document.createElement('button');
    addTaskBtn.id = 'add-task-btn';
    addTaskBtn.textContent = '+ Add Task';
    projectPreview.appendChild(addTaskBtn);

    main.appendChild(projectPreview);

    // Load initial tasks in the Inbox
    InboxProject.tasks.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
                
        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const taskTitle = document.createElement('h2');
        taskTitle.textContent = task.title;
        taskHeader.appendChild(taskTitle);

        const removeBtn = document.createElement('button');
        taskHeader.appendChild(removeBtn);

        removeBtn.addEventListener('click', () => {
            InboxProject.tasks = InboxProject.tasks.filter((task) => task.title !== taskTitle.textContent);
            TodayProject.tasks = TodayProject.tasks.filter((task) => task.title !== taskTitle.textContent);
            WeekProject.tasks = WeekProject.tasks.filter((task) => task.title !== taskTitle.textContent);
            
            Projects.forEach((proj) => {
                proj.tasks = proj.tasks.filter((task) => task.title !== taskTitle.textContent);
            });
            
            updateStorage();
            loadTasks(InboxProject);
        });

        taskElement.appendChild(taskHeader);

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.description;
        taskElement.appendChild(taskDescription);

        const taskDate = document.createElement('h4');
        taskDate.textContent = task.date;
        taskElement.appendChild(taskDate);

        tasksList.appendChild(taskElement);
    });

    return main;
};
