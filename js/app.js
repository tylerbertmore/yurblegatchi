
const hand = document.querySelector('.minute')
let timer = 3600;

function startClock() {
  
  console.log(timer);
  const minutesRatio = timer / 3600;
  setRotation(hand, minutesRatio);
  timer--;
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * -360)
}
// setInterval(startClock, 1000)
// startClock()
