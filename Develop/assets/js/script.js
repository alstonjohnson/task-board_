// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskFormInputEl = $('#taskForm');
const taskTitleInputEl = $('#taskTitle');
const taskDueDateInputEl = $('#taskDueDate');
const taskDescriptionInputEl = $('#taskDescription');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return crypto.randomUUID();
}

function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) {
        tasks = [];
    }

    return tasks = [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
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
    const tasks = readTasksFromStorage();
    // const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // $('.taskCard').remove();

    // tasks.forEach(task => {
    //     const taskCard = createTaskCard(task);
    //     const column = $(`#${task.progress}`);
    //     column.append(taskCard);
    // });

    // $('.draggable').draggable({
    //     opacity: 0.7,
    //     zIndex: 100,
    //     helper: 'clone'
    // });

     // ? Empty existing task cards out of the lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // ? Loop through tasks and create task cards for each status
  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createtaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createtaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createtaskCard(task));
    }
  }

  // ? Use JQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
   
}

// Todo: create a function to handle adding a new task
// function handleAddTask(title, description, dueDate){
    function handleAddTask(event) {
        event.preventDefault()

        const taskTitle = taskTitleInputEl.val().trim();
        const taskDescription = taskDescriptionInputEl.val();
        const taskDate = taskDueDateInputEl.val();

    // const task = {
    //     id: generateTaskId(),
    //     title: $('#taskTitle').val(),
    //     description: $('#taskDueDate').val(),
    //     dueDate: $('#taskDescription').val(),
    //     progress: 'to-do'
    // };

    const task = {
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDate,
        status: 'to-do',
    };

    const tasks = readTasksFromStorage();
        tasks.push(task);

    saveTasksToStorage(tasks);

    renderTaskList();


    // localStorage.setItem('tasks', JSON.stringify(taskList));


  // ? Pull the tasks from localStorage and push the new task to the array
    // let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // ? Save the updated tasks array to localStorage


  // ? Print task data back to the screen

  // ? Clear the form inputs
//   $('#taskTitle').val('');
//   $('#taskDueDate').val('');
//   $('#taskDescription').val('');

    taskTitleInputEl.val('');
    taskDescriptionInputElInputEl.val('');
    taskDueDateInputElDateInputEl.val('');
}

    // renderTaskList();

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

  renderTaskList();
}

$('#addTaskForm').on('submit', function(event) {
    event.preventDefault();

    const form = $('#taskForm').val();
    const title = $('#taskTitle').val();
    const dueDate  = ('#taskDueDate').val();
    const description = $('#taskDescription').val();
    

    addNewTask(title, description, dueDate)

    $('#taskForm').val('');
    $('#taskTitle').val('');
    $('#taskDescription').val('');
    $('#taskDueDate').val('');
});




// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();

    const taskID = ui.draggable[0].dataset.taskID;

    const newStatus = event.target.id

    for (let task of tasks) {
        if (task.id === taskID) {
            task.status = newStatus;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();

}

// $('#taskForm').on('submit', handleAddTask);


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // renderTaskList();
    renderTaskList();

    
    $('#taskForm').on('submit', handleAddTask); 


    $('lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    $('#taskDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    })

   
});
