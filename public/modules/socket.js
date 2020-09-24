import { optionCircle, createCircle, upPositionCircle, hideCircle } from './circle.js';
import { addHiddenClass, removeHiddenClass } from './hidden.js';

const socket = new WebSocket('ws://localhost:8080/');

let f = hideCircle();

//Переписываем id элементов массив f по порядку: "0, 1, 2, ..., N"

f.forEach((num, i) => {
	if (num.id != i){
		num.id = i
	}
})

button1.addEventListener('click', () => {
	socket.send(JSON.stringify(f));
	createCircle(f)
});


function upOptions (x, y, upClass){
	let newOptions = [{
		upX: x,
		upY: y,
		upClass: upClass
	}]
	socket.send(JSON.stringify(newOptions));
}


function upHiddenCircle(circleClass){
	let newHiddenCircle = [{
		upHiddenClass:circleClass
	}]
	socket.send(JSON.stringify(newHiddenCircle));
}

function upVisibleCircle(circleClass){
	let newVisibleCircle = [{
		upVisibleClass:circleClass
	}]
	socket.send(JSON.stringify(newVisibleCircle));
}

function inboxData() {
	socket.onmessage =  event => {
		let data = JSON.parse(event.data);

		if (data.find(item => item.id == 0)){
			createCircle(data);
		} else if (data.find(item => item.upX >= 0)) {
			upPositionCircle(data)
		} else if (data.find(item => item.upHiddenClass >= 0)){
			hideCircleSocket(data)
		} else{
			visibleCircleSocket(data)
		}

	}
}

function hideCircleSocket (data){
  let newClass = `.circle-${data[0].upHiddenClass}`
  addHiddenClass(newClass)
}

function visibleCircleSocket (data){
  if (data === undefined){
    return
  } else{
    let newClass = `.circle-${data[0].upVisibleClass}`
    removeHiddenClass(newClass)
  }
}

export { upVisibleCircle, upHiddenCircle, upOptions, inboxData, f }

