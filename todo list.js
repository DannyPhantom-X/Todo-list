import {renderDailyRoutinePage, dailyRoutine, onclickRoutineAdd} from './renderDaiyRoutine.js' 
Notification.requestPermission()
let todo = '';
let list = JSON.parse(localStorage.getItem('savedlist'))
let maxDelay = 2147483647; 
const todoDisplay = document.querySelector('.general-display')
let info = '';
let valueTodo = '';
const addButton = document.querySelector('.js-add-button')
if (list === null) {
    list = {
        todoList: [],
        dueDateList: [],
        dueTimeList: []
    };
}
function todoHtml() {
    list.todoList.forEach((todoX, i) => {
        info = `<div class="js-todo-display todo-display"><div class="info${i} gen undone-info"><button class="edit-button edit-button${i}" onclick="onclickEdit(${i})"><i class="fas fa-edit"></i></button> <span style="text-align: center;" >${todoX}</span></div>
        <div class="date${i} gen">${list.dueDateList[i]}</div>
        <div class="time${i} gen">${list.dueTimeList[i]}</div> 
        <button class="deletebutton deletebutton${i}"><i class="fas fa-trash" title="Delete"></i></button></div>
        ` + info;
        // if (document.querySelector('.deletebutton').innerHTML === 'Done'){
        //     return
        // }
       
        
        // if (timediff <= maxDelay) {
        //     alertTodo(timediff, todoX, i)
        // }else {
        //     setTimeout(() => {
        //         alertTodo((timediff-maxDelay), todoX, i)
        //     }, maxDelay)
        // }
        
    })
    todoDisplay.innerHTML = info
    onclickDelete()
    checkComplete()
}
todoHtml();

let blab;
function onclickAdd() {
    todo = document.querySelector('.js-todo').value;
    let dueDate = document.querySelector('.js-due-date').value;
    let dueTime = document.querySelector('.js-due-time').value;
    list.dueDateList.push(dueDate);
    list.todoList.push(todo);
    list.dueTimeList.push(dueTime);
    todoDisplay.innerHTML = '';
    info = ''
    localStorage.setItem('savedlist', JSON.stringify(list));
    todoHtml();
}
function onclickDelete() {
    list.todoList.forEach((todoX, j) => {
        document.querySelector(`.deletebutton${j}`).addEventListener('click', () => {
            console.log()
            list.todoList.splice(j, 1)
            list.dueDateList.splice(j, 1)
            list.dueTimeList.splice(j, 1)
            localStorage.setItem('savedlist', JSON.stringify(list))
            todoDisplay.innerHTML = '';
            info = ''
            todoHtml(); 
        })
    })
}
addButton.addEventListener('click', () => {
    onclickAdd();
})
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        onclickAdd();
    }
})


function checkComplete() {
    list.todoList.forEach((todoX, i) => {
        let dueDate = list.dueDateList[i]
        let dueTime = list.dueTimeList[i]
        let splitDueDate = dueDate.split('-')
        let splitDueTime = dueTime.split(':')
        const [year, month, day] = splitDueDate;
        const [hour, minute] = splitDueTime;
        const timediff  = new Date(year, (month-1), day, hour, minute) - new Date()
        if (timediff > 0) {
            setTimeout(() => {
                document.querySelector('.alarm-sound').play()
                document.querySelector(`.info${i}`).classList.remove('undone-info')
                document.querySelector(`.info${i}`).classList.add('completed-info')
                document.querySelector(`.info${i}`).innerHTML = `<div class="info${i} info"><span>${todoX}</span></div>`
                document.querySelector(`.date${i}`).classList.add('completed-info')
                document.querySelector(`.time${i}`).classList.add('completed-info')
                document.querySelector('.deletebutton').classList.add('donebutton')
                document.querySelector(`.deletebutton${i}`).innerHTML = '<i class="fas fa-check check-icon" title="Mark as complete"></i>' 
                console.log(`Time to ${todoX}`)
                if (Notification.permission === "granted") {
                    new Notification("Todo List!!!", {
                        body: `${todoX.toUpperCase()}`,
                        icon: "resources/TODO LOGO.png"
                    });
                }
            }, timediff)
        }else {
            document.querySelector(`.info${i}`).classList.remove('undone-info')
            document.querySelector(`.info${i}`).classList.add('completed-info')
            document.querySelector(`.date${i}`).classList.add('completed-info')
            document.querySelector(`.time${i}`).classList.add('completed-info')
            document.querySelector(`.info${i}`).innerHTML = `<div class="info${i} info"><span>${todoX}</span></div>`
            document.querySelector('.deletebutton').classList.add('donebutton')
            document.querySelector(`.deletebutton${i}`).innerHTML = '<i class="fas fa-check check-icon" title="Mark as complete"></i>' 
        }
    })
}
function onclickEdit(i) {
    let info = document.querySelector(`.info${i} span`).innerHTML
    document.querySelector(`.edit-button${i}`).innerHTML = '<i class="fas fa-check check-icon" title="Mark as complete"></i>'
    document.querySelector(`.info${i} span`).innerHTML = `<input class="edit-info${i}">`
    document.querySelector(`.edit-info${i}`).value = info;
    document.querySelector(`.edit-button${i}`).addEventListener('click', () => {
        info = document.querySelector(`.edit-info${i}`).value
        document.querySelector(`.info${i} span`).innerHTML = document.querySelector(`.edit-info${i}`).value
    })
}

document.querySelector('.menu').addEventListener('click', (event) => {
    document.querySelector('.menu-closed').classList.add('menu-opened')
    document.querySelector('.menu-button').style.backgroundColor = 'rgb(51, 51, 51)'
    document.querySelector('.menu-opened').classList.remove('menu-closed')
    document.querySelector('.menu-opened').innerHTML = `<button class="menu-input menu-daily-routine">Daily Routine</div>
                    <button class="menu-input">Settings</div>`;
    event.stopPropagation();
    window.addEventListener('click', (event) => {
        document.querySelector('.menu-button').style.backgroundColor = 'inherit'
        document.querySelector('.menu-opened').innerHTML = '';
        document.querySelector('.menu-opened').classList.add('menu-closed')
        document.querySelector('.menu-closed').classList.remove('menu-opened')
        event.stopImmediatePropagation()
    }, {once: true})
    renderDailyRoutinePage();
})