import { upOptions, f } from './socket.js';
import { optionCircle } from './circle.js';
import { checkIntersectionCircle } from './intersection.js';
import { hideCircle, hideCircleCollision } from './hidden.js';

function dragAndDrop() {
  let wrap = document.querySelector('#wrap');
  let coordWrap = wrap.getBoundingClientRect(); // Получаем координаты контейнера

  document.addEventListener('mousedown', (event) => {

    let dragElement = event.target.closest('#circle'); // Определяем элемент, по которому произвели клик

    if (!dragElement) return; // Если элемента нет, то начинаем заново
    
    const dragElemInArray = f.find(
      (c) => `circle-${c.id}` === dragElement.className
    );

    event.preventDefault();

    let circleCoords = 0;
    let circleRadius = dragElement.offsetWidth;

    function moveAt(pageX, pageY) {
      let coordDrag = dragElement.getBoundingClientRect(); // Получаем координаты двигующегося шарика

      let newX = pageX - circleRadius / 2 - coordWrap.x;
      let newY = pageY - circleRadius / 2 - coordWrap.y;

      let newR = coordWrap.right - circleRadius - coordWrap.x - 2;
      let newB = coordWrap.bottom - circleRadius - coordWrap.y - 2;

      if (newX < 0) {
        newX = 0;
      }

      if (newY < 0) {
        newY = 0;
      }

      if (newX > newR) {
        newX = newR;
      }

      if (newY > newB) {
        newY = newB;
      }

      dragElement.style.left = newX + 'px';
      dragElement.style.top = newY + 'px';

      if (dragElemInArray) {
        dragElemInArray.x = newX;
        dragElemInArray.y = newY;
      }

      upOptions(newX, newY, dragElement.className)
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      f.forEach((crcle) => {
        if (dragElement.className === `circle-${crcle.id}`) {
          return;
        }

        if (testCollision(crcle) ) {
          crcle.visible = false;
          dragElement.dragUp = true

        } else if (!crcle.visible) {
          crcle.visible = true;
        }

        const dragElemeCollisionArr = f.find(
          (c) => `circle-${c.id}` === dragElement.className
          );

        if(crcle.dragUp && !crcle.visible){
          crcle.visible = true;
          crcle.dragUp = false;
        } 

        if (dragElement.dragUp){
          dragElemeCollisionArr.dragUp = true
        } else {
          dragElemeCollisionArr.dragUp = false
        }
      });
     
     hideCircle();
     hideCircleCollision ()

    }
    
    function onMouseUp(event) {
      finishDrag();
    }

    document.addEventListener('mousemove', onMouseMove);
    dragElement.addEventListener('mouseup', onMouseUp);

    function finishDrag() {
      document.removeEventListener('mousemove', onMouseMove);
      dragElement.removeEventListener('mouseup', onMouseUp);
    }


    function testCollision(circle) {
      let i = document
        .querySelector(`.circle-${circle.id}`)
        .getBoundingClientRect();
      let j = dragElement.getBoundingClientRect();

      let maxDistanceCircle = j.width/2 + i.width/2;

      maxDistanceCircle *= maxDistanceCircle;

      let dx = j.x - i.x;
      let dy = j.y - i.y;

      let currentDistanceCircle = dx * dx + dy * dy;

      return currentDistanceCircle < maxDistanceCircle;
    }

  });
}

export { dragAndDrop };
