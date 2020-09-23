//GLOBAL SELECTORS
const hand = document.querySelector('.minute')
const secretMenuBtn = document.querySelector('.cheat-menu-btn');
const userNameDisplay = document.querySelector('h1');
const petNameDisplay = document.querySelector('#pet-name');
let timerHour = document.querySelector('#timer2');
let timerMinute = document.querySelector('#timer3');
const timeInfo = document.querySelector('.time-info');
const clock = document.querySelector('.clock');


// STATUS BAR SELECTORS
const hungerStat = document.querySelector('#hunger');
const sleepinessStat = document.querySelector('#sleepiness');
const happinessStat = document.querySelector('#happiness');

// FORM SELECTORS
const createPetBtn = document.querySelector('#create-pet-button');
const yesRadio = document.querySelector('#yes');
const noRadio = document.querySelector('#no');
const userName = document.querySelector('#userName');
const petName = document.querySelector('#petName');

const basicAnim = document.querySelector('.basic-info');
const createPetAnim = document.querySelector('.create-pet');


// ACTION BUTTON SELECTORS
const actionMenu = document.querySelector('.action-container')
const feedBtn = document.querySelector('#feed');
const napBtn = document.querySelector('#nap');
const playBtn = document.querySelector('#play');
const lightsBtn = document.querySelector('#lights');
const abuseBtn = document.querySelector('#abuse');
    // SELECT ALL ACTION BUTTONS
const allActionBtns = document.querySelectorAll('.ac-btn');


// CHEAT BUTTON SELECTS
const timeForward1Btn = document.querySelector('#time-forward1');
const timeForward5Btn = document.querySelector('#time-forward5');
const forceAgeBtn = document.querySelector('#force-stage');
const killBtn = document.querySelector('#kill');
const unlockAbuseBtn = document.querySelector('#unlock-abuse');



// CREATE A PET BUTTON
createPetBtn.addEventListener('click', function(){
  console.log(yesRadio.value, noRadio.value, userName.value, petName.value);
  userNameDisplay.innerText = `${userName.value}'s Yurble`;
  petNameDisplay.innerText = petName.value;
  basicAnim.classList.add('slideUp');
  createPetAnim.classList.add('slideDown');
  clock.classList.remove('hidden');
  timeInfo.classList.remove('hidden');
  actionMenu.classList.remove('hidden');
  setInterval(startClock, 1000);
  startClock();
});

yesRadio.addEventListener('click', function(){
  yesRadio.value = true;
  noRadio.value = false;
});
noRadio.addEventListener('click', function(){
  noRadio.value = true;
  yesRadio.value = false;

});


let timer = 3600;
let timerTwo = 60;
let timerThree = 00;



feedBtn.addEventListener('click', raiseHungerBar);
abuseBtn.addEventListener('click', decreaseHungerBar);
abuseBtn.addEventListener('click', decreaseHappinessBar);
playBtn.addEventListener('click', raiseHappinessBar);
playBtn.addEventListener('click', decreaseSleepinessBar);
napBtn.addEventListener('click', raiseSleepinessBar);


function decreaseHungerBar(){
    hungerStat.value--;
}
function raiseHungerBar(){
    hungerStat.value++;
}
function decreaseSleepinessBar(){
    sleepinessStat.value--;
}
function raiseSleepinessBar(){
    sleepinessStat.value+=3;
}
function decreaseHappinessBar(){
    happinessStat.value--;
}
function raiseHappinessBar(){
    happinessStat.value++;
}



function startClock() {
  timerThree = timer % 60 ;
  timerTwo = Math.floor(timer / 60);
  const minutesRatio = timer / 3600;
  setRotation(hand, minutesRatio);
  timerHour.textContent = timerTwo;
  timerMinute.textContent = timerThree;
  if(timerThree <= 9){
    timerMinute.textContent = `0${timerThree}`;
  }
  timer--;
  timerThree--;
  
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * -360)
}


secretMenuBtn.addEventListener('click', function(){
    console.log('found me!');
})      
