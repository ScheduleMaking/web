const toDoForm = document.querySelector('.js-toDoForm')
const toDoInput = document.querySelector('input')
const toDoList = document.querySelector('.js-toDoList')

const TODOS_LS = 'toDos'

let toDos = []

function deleteToDo(event) {
	const btn = event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id)
	})
	toDos = cleanToDos
	saveToDos()
}
function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}
function paintToDo(text) {
	const li = document.createElement('li')
	const delBtn = document.createElement('button')
	const span = document.createElement('span')
	const newId = toDos.length + 1

	delBtn.innerText = 'X'
	delBtn.addEventListener('click', deleteToDo)
	span.innerText = text
	li.appendChild(delBtn)
	li.appendChild(span)
	li.id = newId
	console.log(toDoList, li)
	toDoList.appendChild(li)
	const toDoObj = {
		text : text,
		id : newId
	}
	toDos.push(toDoObj)
	saveToDos()
}
function handleSubmit(event) { // 방금 input된 값을 넣는다. 
	event.preventDefault()	// ?????????????????
	const currentValue = toDoInput.value
	paintToDo(currentValue)
	toDoInput.value = ''
}
function loadToDos() {		// 기존의 local에저장된 값을 불러온다. 
	const loadedToDos = localStorage.getItem(TODOS_LS)
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos)
		parsedToDos.forEach(function(toDo) {
			paintToDo(toDo.text)
		})
	}
}
function init() {
	loadToDos()
	toDoForm.addEventListener('submit', handleSubmit)
}
init();