import { checkIntersectionCircle } from './intersection.js';

function random(min, max) {
	let num = Math.floor(Math.random() * (max - min)) + min;
	return num;
}

function optionCircle() {

	let result = []
	let n = random(1, 100);

	for (let i = 0; i <= n; i++) {

		let color1 = random(0, 255);
		let color2 = random(0, 255);
		let color3 = random(0, 255);
		let color = `rgb(${color1},${color2},${color3})`;

		let radiusCircle = random(20, 50);

		let xCircle = random(0 + radiusCircle, 800 - radiusCircle);
		let yCircle = random(0 + radiusCircle, 600 - radiusCircle);

		result.push({
			id : `${i}`,
			radius: radiusCircle,
			x : xCircle,
			y : yCircle,
			color: color,
			visible: true,
			dragUp: false
		});
	};

	return result;
}

let c = optionCircle()

// Удаляем из массива optionCircle() объекты с пересекающимися границами и экспартируем новый массив hideCircle () в socket.js 5 строка
let hideCircle = () => {
	for (let i = c.length; i >= 0; i--){ //перебираем с конца, иначе пропускает элементы
		for (let j = c.length - 1; j >= i + 1; j--){
			if (checkIntersectionCircle(c, i, j)) {
				c.splice(c[j], 1)
			}
		}
	} return c
}

function createCircle(data){
	let updateCircle = document.querySelectorAll('#circle').length;

	for (let i = 0; i <= data.length; i++){

		let circleObj = data[i];

		let id = circleObj.id;
		let x = circleObj.x;
		let y = circleObj.y;
		let radius = circleObj.radius;
		let color = circleObj.color;

		let newCircle = document.createElement("div");
		newCircle.setAttribute(`id`, `circle`);
		newCircle.setAttribute(`class`, `circle-${+id + updateCircle}`);
		document.getElementById("wrap").append(newCircle);

		newCircle.style.left = x + 'px';
		newCircle.style.top = y + 'px';
		newCircle.style.height = radius + 'px';
	    newCircle.style.width = radius + 'px';
	    newCircle.style.background = color;
	}
}

function upPositionCircle(data){

	let upClass = data[0].upClass
	let circle = document.querySelector(`.${upClass}`)

	circle.style.left = data[0].upX + 'px';
	circle.style.top = data[0].upY + 'px';
}




export { optionCircle, createCircle, upPositionCircle, hideCircle }

