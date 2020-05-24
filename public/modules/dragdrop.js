import { upOptions, f } from './socket.js'; 
import { optionCircle } from './circle.js'; 
import { checkIntersectionCircle } from './hidden.js';

function dragAndDrop() {

	let wrap = document.querySelector('#wrap') 
	let coordWrap = wrap.getBoundingClientRect() // Получаем координаты контейнера

	document.addEventListener('mousedown', event => {

		let dragElement = event.target.closest('#circle'); // Определяем элемент, по которому произвели клик

		if (!dragElement) return; // Если элемента нет, то начинаем заново

		event.preventDefault();

		let circleCoords = 0;
		let circleRadius = dragElement.offsetWidth;
		


		function moveAt(pageX, pageY) {
			
			

			let coordDrag = dragElement.getBoundingClientRect() // Получаем координаты двигующегося шарика

			let newX = pageX - circleRadius / 2 - coordWrap.x; 
			let newY = pageY - circleRadius / 2 - coordWrap.y;
			let newR = coordWrap.right - circleRadius - coordWrap.x - 2;
			let newB = coordWrap.bottom - circleRadius - coordWrap.y - 2;

			if (newX < 0){
				newX = 0
			}

			if (newY < 0){
				newY = 0
			}

			if (newX > newR){
				newX = newR
			}

			if (newY > newB){
				newY = newB
			}

			dragElement.style.left = newX + 'px';
			dragElement.style.top = newY + 'px';


		}

		function onMouseMove(event) {
			
			moveAt(event.pageX, event.pageY);

			for (let i = 0; i < f.length; i++){
				for (let j = f.length - 1; j >= i; j--){
					if( dragElement.className != `circle-${f[i].id}`){	
						if ( testCollision(i, j) ) {
							document.querySelector(`.circle-${f[i].id}`).hidden = true;
						} else {
							document.querySelector(`.circle-${f[i].id}`).hidden = false;
						}
					}
				}
				

				if (dragElement.className == `circle-${f[i].id}`){
					f[i].x = event.pageX;
					f[i].y = event.pageY;
				}
			}
		}

		function onMouseUp(event){
			finishDrag()
		}

		document.addEventListener('mousemove', onMouseMove)
		dragElement.addEventListener('mouseup', onMouseUp);

		function finishDrag(){
			document.removeEventListener('mousemove', onMouseMove);
			dragElement.removeEventListener('mouseup', onMouseUp);
		}

		function testCollision(i, j) {

			i = document.querySelector(`.circle-${f[i].id}`).getBoundingClientRect()
			j = dragElement.getBoundingClientRect()

			return 	i.top + i.height > j.top &&
					i.left + i.width > j.left &&
					i.bottom - i.height < j.bottom &&
					i.right - i.width < j.right
		}

		function testCollision2(i, j) {

			i = document.querySelector(`.circle-${f[i].id}`).getBoundingClientRect()
			j = document.querySelector(`.circle-${f[j].id}`).getBoundingClientRect()

			return 	i.top + i.height > j.top &&
					i.left + i.width > j.left &&
					i.bottom - i.height < j.bottom &&
					i.right - i.width < j.right
		}
	});
};


export { dragAndDrop }

	

