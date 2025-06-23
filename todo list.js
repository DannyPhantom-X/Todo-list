Notification.requestPermission()
console.log('this is it!!')
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
    console.log(list)
    list.todoList.forEach((todoX, i) => {
        info = `<div class="js-todo-display todo-display"><div class="info${i} gen undone-info"><button class="edit-button" onclick="onclickEdit(${i})"><i class="fas fa-edit"></i></button> <span style="text-align: center;" >${todoX}</span></div>
        <div class="date${i} gen">${list.dueDateList[i]}</div>
        <div class="time${i} gen">${list.dueTimeList[i]}</div> 
        <button class="deletebutton deletebutton${i}" onclick='onclickDelete(${i})'><i class="fas fa-trash" title="Delete"></i></button></div>
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
    checkComplete()
    console.log(document.querySelector('.infoto'))
}
todoHtml();

let blab;
function onclickAdd () {
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
function onclickDelete(j) {
    list.todoList.splice(j, 1)
    list.dueDateList.splice(j, 1)
    list.dueTimeList.splice(j, 1)
    todoDisplay.innerHTML = '';
    info = '';
    localStorage.setItem('savedlist', JSON.stringify(list))
    todoHtml();
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
        console.log(timediff)
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
                        icon: "thumbnails/TODO LOGO.png"
                    });
                }
            }, timediff)
        }else {
            console.log('less than timediff')
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
    const info = document.querySelector(`.info${i} span`).innerHTML
    document.querySelector(`.info${i} span`).innerHTML = `<input class="edit-info${i}">`
    document.querySelector(`.edit-info${i}`).value = info
}