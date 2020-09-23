const hand = document.querySelector('.minute')
const secretMenuBtn = document.querySelector('.cheat-menu-btn');
const userName = document.querySelector('h1');
const petName = document.querySelector('#pet-name');

const hungerStat = document.querySelector('#hunger');
const sleepStat = document.querySelector('#sleepiness');
const happinessStat = document.querySelector('#happiness');

console.log(userName);
console.log(petName);
console.log(hungerStat);
console.log(sleepStat);
console.log(happinessStat);



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

secretMenuBtn.addEventListener('click', function(){
    console.log('found me!');
})      