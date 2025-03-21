let taskInput=document.querySelector('.input-textarea');
let addTaskBtn=document.querySelector('.add-task');
let taskList=document.querySelector('.task-list');
let cleanBtn=document.querySelector('.clean-list');

addTaskBtn.addEventListener('click', addTask);
cleanBtn.addEventListener('click', cleanTaskList);

function addTask () {
    let inputText=taskInput.value.trim();
    if(!inputText) return;
    let tasks=JSON.parse(localStorage.getItem('tasks'))||[]; 
    // берем из хранилища либо уже существующий массив объектов, либо если его там нет, то пустой массив
    let newTask={
        id: Date.now(),
        // создается уникальный массив в милисекундах от 1970;
        text: inputText,
        completed: false,
    }
    tasks.push(newTask);
    // запихиваем в массив новую задачу
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // массив приводим снова к строке и отправляем в хранилище
    renderTasks();
    // рендерим задачи
}

function renderTasks() {
    let tasks=JSON.parse(localStorage.getItem('tasks'))||[]; 
    // снова берем задачи из хранилища и превращаем строку в массив объектов или пустой массив
    taskList.textContent='';
    // очищаем перед рендером весь тасклист

    tasks.forEach(task=> {
        let li=document.createElement('li');
        // создаем пустой ли
        let span=document.createElement('span');
        span.textContent=task.text;
        // создаем спан и отправляем в него текст из инпута
        let checkbox=document.createElement('input');
        // создаем пустой инпут
        checkbox.type='checkbox';
        // говорим что он будет типа чекбокс;
        checkbox.checked=task.completed;
        // если состояние чекбокса тру, то отмечаем в объекте статус выполнено
        checkbox.addEventListener('change', function() {toggleCheckbox(task.id)})
        // при нажатии на чекбокс обращаемся к функции тоглчекбокс и передаем в нее айди задачи, для которой нужно изменить состояние
        taskList.prepend(li);
        // прикручиваем ли к тасклисту в начало а не в конец
        li.appendChild(span);
        li.appendChild(checkbox);
        taskInput.value=''
    })
}
renderTasks();
// чтобы рендерилось сразу при загрузке страницы;

function cleanTaskList() {
    localStorage.clear();
    taskList.textContent='';   
}

function toggleCheckbox(taskId) {
    let tasks=JSON.parse(localStorage.getItem('tasks'))||[];
    tasks.forEach(task=> {
        if (task.id===taskId) {
            // перебираем весь массив в поисках объекта с тем же айди у которого сменилось значение
            task.completed=!task.completed;
            // меняется статус задачи невыполнено-выполнено и наоборот
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    // изменили статус задачи в хранилище и сразу же отрисовали задачи заново
}