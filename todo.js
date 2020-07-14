const toDoForm = document.querySelector('.js-toDoForm')
const toDoInput = document.querySelector('input')
const toDoList = document.querySelector('.js-toDoList')

const TODOS_LS = 'toDos'

let toDos = [] 

function completeToDo(event) {
	const comBtn = event.target
	const uncomBtn = comBtn.nextSibling
	const li = comBtn.parentNode

	li.setAttribute('class', 'row alert alert-danger line')
	comBtn.setAttribute('class', 'd-none')
	uncomBtn.setAttribute('class', 'col-md-1 btn btn-outline-primary')
}
function uncompleteToDo(event) {
	const uncomBtn = event.target
	const comBtn = uncomBtn.previousSibling
	const li = uncomBtn.parentNode

	li.setAttribute('class', 'row alert alert-secondary')
	comBtn.setAttribute('class', 'col-md-1 btn btn-outline-primary')
	uncomBtn.setAttribute('class', 'd-none')
}
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
	const comBtn = document.createElement('button')
	const uncomBtn = document.createElement('button')
	const newId = toDos.length + 1

	li.setAttribute('class', 'row alert alert-secondary')
	delBtn.innerText = 'X'
	delBtn.addEventListener('click', deleteToDo)
	delBtn.setAttribute('class', 'col-md-1 btn btn-outline-danger')
	comBtn.innerText = '완료'
	comBtn.addEventListener('click', completeToDo)
	comBtn.setAttribute('class', 'col-md-1 btn btn-outline-primary')
	uncomBtn.innerText = '아직..'
	uncomBtn.addEventListener('click', uncompleteToDo)
	uncomBtn.setAttribute('class', 'd-none')
	span.innerText = text
	span.setAttribute('class', 'col-md-10')

	li.appendChild(span)
	li.appendChild(delBtn)
	li.appendChild(comBtn)
	li.appendChild(uncomBtn)

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
	event.preventDefault()	
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