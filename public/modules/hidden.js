import { f } from './socket.js';
import { checkIntersectionCircle } from './intersection.js';

function hideCircle () {
  f.forEach((crcle) => {
    if (crcle.visible){
      document.querySelector(`.circle-${crcle.id}`).classList.remove("hidden");
    } else {
        document.querySelector(`.circle-${crcle.id}`).classList.add("hidden");
    }
  })
}

function hideCircleCollision () {
  f.forEach((crcle) => {
    if (crcle.dragUp){
      for (let i = 0; i < f.length; i++){
       if (checkIntersectionCircle(f, i, crcle.id) && i !=crcle.id ) {
        document.querySelector(`.circle-${f[i].id}`).classList.add("hidden");
        }
      }
    }
  })
}

export { hideCircle, hideCircleCollision }