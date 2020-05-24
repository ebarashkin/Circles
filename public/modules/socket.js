import { optionCircle, createCircle, upPositionCircle, hideCircle } from './circle.js';

const socket = new WebSocket('ws://localhost:8080/');

let f = hideCircle();

//Переписываем id элементов массив f по порядку: "0, 1, 2, ..., N"
for (let i = 0; i < f.length; i++){
	if (f[i].id != i){
		f[i].id = i
	}
}

button1.addEventListener('click', () => {
	socket.send(JSON.stringify(f));
});

function upOptions (x, y, upClass){
	let newOptions = [{
		upX: x,
		upY: y,
		upClass: upClass
	}]
	socket.send(JSON.stringify(newOptions));
}


function inboxData() {
	socket.onmessage =  event => {
		let data = JSON.parse(event.data);

		createCircle(data);
	}
}


export { upOptions, inboxData, f }

