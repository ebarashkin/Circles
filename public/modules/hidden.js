import { upVisibleCircle, upHiddenCircle, f } from './socket.js';
import { checkIntersectionCircle } from './intersection.js';

function addHiddenClass(circle){
  document.querySelector(circle).classList.add("hidden");
}

function removeHiddenClass(circle){
  document.querySelector(circle).classList.remove("hidden");
}

function hideCircle () {
  f.forEach((crcle) => {
    if (crcle.visible){
        removeHiddenClass(`.circle-${crcle.id}`)
        upVisibleCircle(crcle.id)
    } else {
        addHiddenClass(`.circle-${crcle.id}`)
        upHiddenCircle(crcle.id)
    }
  })
}

function hideCircleCollision () {
  f.forEach((crcle) => {
    if (crcle.dragUp){
      for (let i = 0; i < f.length; i++){
        if (checkIntersectionCircle(f, i, crcle.id) && i !=crcle.id ) {
          addHiddenClass(`.circle-${f[i].id}`)
          upHiddenCircle(f[i].id)
        }
      }
    }
  })
}

export { hideCircle, hideCircleCollision, addHiddenClass, removeHiddenClass}