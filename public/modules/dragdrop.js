import { upOptions, f } from './socket.js';
import { optionCircle } from './circle.js';
import { checkIntersectionCircle } from './hidden.js';

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
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      f.forEach((crcle) => {
        if (dragElement.className === `circle-${crcle.id}`) {
          return;
        }

        if (testCollision(crcle)) {
          //console.log('пересечение', crcle);
          document.querySelector(`.circle-${crcle.id}`).style.visibility = 'hidden'
        } else {
          //console.log('не пересечение', crcle);
          document.querySelector(`.circle-${crcle.id}`).style.visibility = '';
        }
      });
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

      let jX = j.x - coordWrap.x - 1 + j.width/2
      let jY = j.y - coordWrap.y - 1 + j.width/2

      let iX = i.x - coordWrap.x - 1 + i.width/2
      let iY = i.y - coordWrap.y - 1 + i.width/2

      console.log(Math.abs(jX - iX));
      



      return (
        Math.abs(jX - iX) <= i.width/2 + i.width/2 &&
        Math.abs(jY - iY) <= i.width/2 + i.width/2 

        //Math.round(i.top) + i.height > Math.round(j.top) &&
        //Math.round(i.left) + i.width > Math.round(j.left) &&
        //Math.round(i.bottom) - i.height < Math.round(j.bottom) &&
        //Math.round(i.right) - i.width < Math.round(j.right)
      );
    }
  });
}

export { dragAndDrop };
