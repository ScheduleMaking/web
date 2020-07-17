// class를 만들지 않으면 안된다. 
// 1. spa를 위해서는 함수와 변수가 페이지마다 따로 할당되야함 -> 원하는 페이지에 맞는 querySelector가 할당되야함(없으면 오류) 
// 2. 그러기 위해서는 원하는 페이지인 것을 확인(hash이용) 그리고 변수 할당이 되어야함(순서 중요)
// 결론 : spa를 구현하는 방법을 위해서는 다른 frame work들을 사용하거나 ajax를 이용할거면 class를 이용해야하지 않을까 의심중

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
		console.log(parsedToDos, loadedToDos)
		console.log('hihihihi')
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