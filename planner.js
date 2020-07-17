const main = document.querySelector('.main')
const tbody = document.querySelector('tbody')
const planForm = document.querySelector('#plan-form')
const contents = document.querySelector('#input-contents')
const time = document.querySelector('#input-time')

let planJSON = []

function createTableData(th, td0='', td1='') {
	const tr = document.createElement('tr')
	const th_in = document.createElement('th')
	const td0_in = document.createElement('td')
	const td1_in = document.createElement('td')

	th_in.setAttribute('scope', 'row')
	th_in.setAttribute('id', th)
	th_in.innerText = th
	td0_in.innerText = td0
	td1_in.innerText = td1

	tr.appendChild(th_in)
	tr.appendChild(td0_in)
	tr.appendChild(td1_in)

	tbody.appendChild(tr)
}

function savePlan(plan) {
	console.log(JSON.stringify(plan))
	localStorage.setItem('tableList', JSON.stringify(plan))
}

function drawTables() {
	for(var i=6; i<24; i++) {
		createTableData(i)
	}
}

function drawTable(time, contents) {
	const timeTable = document.getElementById(time)
	timeTable.nextSibling.innerText = contents

	const plan = {
		planTime: time,
		planContents: contents
	}
	planJSON.push(plan)
	savePlan(planJSON)
}

function handleSubmit() {
	event.preventDefault()	
	drawTable(time.value, contents.value)
	contents.value=''
}

function loadTables() {
	const tableList = localStorage.getItem('tableList')
	if (tableList !== null) {
		console.log(tableList, JSON.parse(tableList))
		const parsedTable = JSON.parse(tableList)
		parsedTable.forEach(function(plan) {
			console.log(plan)
			drawTable(plan.planTime, plan.planContents)
		})
	}
}

function init() {
	drawTables()
	loadTables()
	planForm.addEventListener('submit', handleSubmit)
}

init()