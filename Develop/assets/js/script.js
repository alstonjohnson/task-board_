// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return crypto.randomUUID();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h3').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.type);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('button')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'MM/DD/YYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn)
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    $('.taskCard').remove();

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        const column = $(`#${task.progress}`);
        column.append(taskCard);
    });

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: 'clone'
    });
   
}

// Todo: create a function to handle adding a new task
function handleAddTask(title, description, dueDate){
    const newTask = {
        id: generateTaskId(),
        title: title,
        description: description,
        dueDate: dueDate,
        progress: 'not-started'
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    renderTaskList();
}

$('#addTaskForm').on('submit', function(event) {
    event.preventDefault();

    const title = $('#taskTitle').val();
    const description = $('#taskDescription').val();
    const dueDate  = ('#taskDueDate').val();

    addNewTask(title, description, dueDate)

    $('#taskTitle').val('');
    $('#taskDescription').val('');
    $('#taskDueDate').val('');
});

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

  taksks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

  saveTasksToStorage(tasks);

  printTaskData();
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
