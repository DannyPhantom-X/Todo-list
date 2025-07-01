let info = '';
export let dailyRoutine = JSON.parse(localStorage.getItem('dailyRoutine'))
if (dailyRoutine === null) {
    dailyRoutine = []
}
let selectedDays = []
export function renderDailyRoutinePage() {
    document.querySelector('.menu-daily-routine').addEventListener('click', () => {
        document.querySelector('.todo-list').innerHTML = `
            <audio class="alarm-sound-routine" src="resources/Alarm01.wav"></audio>        
            <div class="general">
                <div class="routine-upload">
                    <div>
                        <label for="routine">Routine:</label>
                        <input type="text" name="routine" class="routine-input">
                    </div>
                    <div>
                        <label for="time">Time:</label>
                        <input type="time" name="time-input" class="time-input">
                    </div>
                    <div>
                        <label class="day">
                            <input type="checkbox" class="checkbox" checked>
                            <span class="day-label">Su</span>
                        </label>
                        <label class="day">
                            <input type="checkbox" class="checkbox" checked>
                            <span class="day-label">Mo</span>
                        </label>
                        <label class="day">
                            <input type="checkbox" class="checkbox" checked>
                            <span class="day-label">Tu</span>
                        </label>
                        <label class="day">
                            <input type="checkbox" class="checkbox" checked>
                            <span class="day-label">We</span>
                        </label>
                        <label class="day">
                            <input type="checkbox" class="checkbox" checked>
                            <span class="day-label">Th</span>
                        </label>
                        <label class="day">
                            <input type="checkbox" class="checkbox" checked>
                            <span class="day-label">Fr</span>
                        </label>
                        <label class="day">
                            <input type="checkbox" class="checkbox" checked>
                            <span class="day-label">Sa</span>
                        </label>
                    </div>
                    <div>
                        <input type="button" name="time" class="routine-add-button add-button" value="Add">
                    </div>
                </div>
                <div class="routine-display"></div>
            </div>
        `
        onclickRoutineAdd()
        renderRoutineDisplay()
    })
    
}
export function onclickRoutineAdd() {
    document.querySelector('.routine-add-button').addEventListener('click', () => {
        console.log('bang')
        const routine = document.querySelector('.routine-input').value
        const time = document.querySelector('.time-input').value
        if (routine && time) {
            document.querySelectorAll('.checkbox').forEach((checkbox) => {
                if (checkbox.checked) {
                    selectedDays.push(checkbox.nextElementSibling.textContent);
                }
            })
            dailyRoutine.push({routine: routine, time: time, selected: selectedDays})
            selectedDays = []
            localStorage.setItem('dailyRoutine', JSON.stringify(dailyRoutine))
        }
        renderRoutineDisplay()    
    })
}
function renderRoutineDisplay() {
    document.querySelector('.routine-display').innerHTML = ''
    dailyRoutine.forEach((droutine, i) => {
        document.querySelector('.routine-display').innerHTML  += `
            <div class="routine-info">
                        <div class="routine-time">${droutine.time}<button class="daily-routine-delete${i}"><i class="fas fa-trash" title="Delete"></i></button></div>
                        <div class="routine">${droutine.routine}</div>
                        <div class="days">
                            <span class="Su${i}">Su</span>
                            <span class="Mo${i}">Mo</span>
                            <span class="Tu${i}">Tu</span>
                            <span class="We${i}">We</span>
                            <span class="Th${i}">Th</span>
                            <span class="Fr${i}">Fr</span>
                            <span class="Sa${i}">Sa</span>
                        </div>
            </div>
        `;
        droutine.selected.forEach((day) => {
            document.querySelector(`.${day + i}`).style.backgroundColor = 'rgb(42, 112, 42)'
            document.querySelector(`.${day + i}`).style.color = 'black'
        })
    })
    deleteRoutine()
}
function deleteRoutine() {
    dailyRoutine.forEach((droutine, i) => {
        document.querySelector(`.daily-routine-delete${i}`).addEventListener('click', () => {
            console.log('delete!!!!')
            dailyRoutine.splice(i, 1)
            localStorage.setItem('dailyRoutine', JSON.stringify(dailyRoutine))
            renderRoutineDisplay()
        })
    })
}
// renderRoutineDisplay()
// onclickRoutineAdd()
// deleteRoutine()