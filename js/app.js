//-------------------------------QUERY SELECTORS
//GLOBAL SELECTORS
const secretMenuBtn = document.querySelector('.cheat-menu-btn');
const userNameDisplay = document.querySelector('h1');
const petNameDisplay = document.querySelector('#pet-name');
const lightDiv = document.querySelector('#lights-out');

// CLOCK
let timerHour = document.querySelector('#timer2');
let timerMinute = document.querySelector('#timer3');
const timeInfo = document.querySelector('.time-info');
const clock = document.querySelector('.clock');
const numTwelve = document.querySelector('.number12');
const hand = document.querySelector('.minute');


// STATUS SELECTORS
const ageBaby = document.querySelector('#baby');
const ageAdult = document.querySelector('#adult');
const ageFinal = document.querySelector('#final');
const ageDeath = document.querySelector('#death');
let hungerStat = document.querySelector('#hunger');
let sleepinessStat = document.querySelector('#sleepiness');
let happinessStat = document.querySelector('#happiness');

// FORM SELECTORS
const createPetBtn = document.querySelector('#create-pet-button');
const yesRadio = document.querySelector('#yes');
const noRadio = document.querySelector('#no');
const userName = document.querySelector('#userName');
const petName = document.querySelector('#petName');
const basicAnim = document.querySelector('.basic-info');
const createPetAnim = document.querySelector('.create-pet');

// PET SELECTORS
const petPic = document.querySelector('.actual-pet-image');


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
const cheatMenuCont = document.querySelector('.cheat-container');
const timeForward1Btn = document.querySelector('#time-forward1');
const timeForward5Btn = document.querySelector('#time-forward5');
const makeHappyBtn = document.querySelector('#force-stage');
const killBtn = document.querySelector('#kill');
const unlockAbuseBtn = document.querySelector('#unlock-abuse');
  // SELECT ALL CHEAT BUTTONS
const allCheatBtns = document.querySelectorAll('.ch-btn');

class Yurble {
    constructor(name, owner){
      this.name = name;
      this.owner = owner;
      this.age = 1;
      this.happiness = 10;
      this.hunger = 10;
      this.sleepiness = 10;
    }
  
}

// -------------------------------GLOBAL VARS
let yurbleAge = 1;
let timer = 3600;
let timerTwo = 60;
let timerThree = 00;
let cheatMenu = false;
let yourYurble = null;
let currentBase = "url('/imgs/baby/yurble_baby";
let emotion = "";
let currentImagePath = currentBase + emotion + ".png')";
let timerStartVarOne; 
let statDecreasersVarOne; 

//-------------------------------EVENT LISTENERS

// ABUSE PET RADIO BUTTONS
yesRadio.addEventListener('click', function(){
  yesRadio.value = true;
  noRadio.value = false;
});
noRadio.addEventListener('click', function(){
  noRadio.value = true;
  yesRadio.value = false;

});

// CREATE A PET  EVENT LISTENERS
createPetBtn.addEventListener('click', function(){
  cssInit();
  yourYurble = new Yurble(petName.value, userName.value);
  timerStartVarOne = setInterval(startTimerVar, 1000);
  // stat initializer
  statInit();
  statDecreasersVarOne = setInterval(statDecreasersVar, 10000);
  console.log(yourYurble);
});



// ACTION BUTTON EVENT LISTENERS
abuseBtn.addEventListener('click', function(){
  decreaseHappinessBar();
  decreaseHungerBar();
  decreaseSleepinessBar();
  emotion = "_injured1";
  currentImgFunc();
  allActionBtns[4].setAttribute('disabled', 'false')
  setTimeout(abuseAnimationTwo, 3000);
});


feedBtn.addEventListener('click', function(){
  raiseHungerBar();
  decreaseSleepinessBar();
});


napBtn.addEventListener('click', function(){
  raiseSleepinessBar();
  disableButtons();
  lightDiv.classList.toggle('actual-pet-overlay');
  emotion = "_sleep";
  currentImgFunc();
});


playBtn.addEventListener('click', function(){
  raiseHappinessBar();
  decreaseSleepinessBar();
});


lightsBtn.addEventListener('click', function(){
  lightDiv.classList.toggle('actual-pet-overlay');
});




// SECRET CHEAT MENU EVENT LISTENER
secretMenuBtn.addEventListener('click', function(){
  if(cheatMenu === true){
    cheatMenuCont.classList.toggle('hidden');
  } else {
    console.log('This is just a black dot. Nothing to see here!');
  }
});    

timeForward1Btn.addEventListener('click', cheatForwardOne);
timeForward5Btn.addEventListener('click', cheatForwardFive);
makeHappyBtn.addEventListener('click', makeAllHappy);
killBtn.addEventListener('click', killYourYurble);
unlockAbuseBtn.addEventListener('click', unlockAbuse);



// ---------------------------------------------- FUNCTIONS
// CLOCK
const startTimerVar = function() {
  timerCalc();
  yurbleAgeCheck();
  yurbleAgeArtCheck();
  yurbleEmotionCheck();
}
// CLOCK HAND ROTATION
function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * -360);
}

// CORE GAMEPLAY DECREASER
statDecreasersVar = function() {
  const randNumOne = Math.floor(Math.random() * 3);
  const randNumTwo = Math.floor(Math.random() * 3);
  const randNumThree = Math.floor(Math.random() * 3);
  happinessStat.value -= randNumOne;
  yourYurble.happiness -= randNumOne;
  if(lightDiv.classList.value === "actual-pet-overlay"){
    sleepinessStat.value -= 0;
    yourYurble.sleepiness -= 0;
  } else {
    sleepinessStat.value -= randNumTwo;
    yourYurble.sleepiness -= randNumTwo;
  }
  hungerStat.value -= randNumThree;
  yourYurble.hunger -= randNumThree;
  console.log(yourYurble);
}


  function statInit(){
    hungerStat.value = yourYurble.hunger;
    sleepinessStat.value = yourYurble.sleepiness;
    happinessStat.value = yourYurble.happiness;
    yurbleAge = yourYurble.age;
  }


// ACTION BUTTON FUNCTIONS
 function disableButtons() {
   for(let i = 0; i < allActionBtns.length - 1; i++){
    allActionBtns[i].setAttribute('disabled', 'false');
   }
   emotion = "_sad";
   setTimeout(enableButtons, 5000);
   
 }

 function enableButtons(){
  for(let i = 0; i < allActionBtns.length - 1; i++){
    allActionBtns[i].removeAttribute('disabled');
   }
   lightDiv.classList.toggle('actual-pet-overlay');
   emotion = "";
   currentImgFunc();
 }

 function decreaseHungerBar(){
    hungerStat.value--;
    yourYurble.hunger--;
  }
 function raiseHungerBar(){
    hungerStat.value++;
    yourYurble.hunger++;
    
  }
 function decreaseSleepinessBar(){
    sleepinessStat.value--;
    yourYurble.sleepiness--;
    
  }
 function raiseSleepinessBar(){
    sleepinessStat.value+=3;
    yourYurble.sleepiness+=3;
    
  }
 function decreaseHappinessBar(){
    happinessStat.value--;
    yourYurble.happiness--;
    
  }
 function raiseHappinessBar(){ 
    happinessStat.value++;
    yourYurble.happiness++;
    
  }

  //CHEAT MENU FUNCNTIONS
function cheatForwardOne(){
  timer-=60;
}

function cheatForwardFive(){
  timer-=300;
}

function makeAllHappy(){
  sleepinessStat.value+=5;
  yourYurble.sleepiness+=5;
  hungerStat.value+=5;
  yourYurble.hunger+=5;
  happinessStat.value+=5;
  yourYurble.happiness+=5;
}
function makeAllSad(){
  sleepinessStat.value-=10;
  yourYurble.sleepiness-=10;
  hungerStat.value-=10;
  yourYurble.hunger-=10;
  happinessStat.value-=10;
  yourYurble.happiness-=10;
}

function killYourYurble(){
  yurbleAge = 4;
  // game over funciton?
}

function unlockAbuse(){
  allActionBtns[4].removeAttribute('disabled');
}


  function abuseAnimationTwo(){
    emotion = "_injured2";
    currentImgFunc();
    allActionBtns[4].removeAttribute('disabled');
  }

  function yurbleAgeCheck(){
    if(timer === 2999){
      numTwelve.innerHTML = "<i class='fas fa-skull-crossbones'></i>";
      yurbleAge++;
      ageBaby.style.backgroundColor = "#eee";
      ageAdult.style.backgroundColor = "forestgreen";
      console.log(yurbleAge);
    } else if(timer === 1199){
      yurbleAge++;
      ageAdult.style.backgroundColor = "#eee";
      ageFinal.style.backgroundColor = "forestgreen";
      console.log(yurbleAge);
    } else if(timer === -1){
      yurbleAge++;
      ageFinal.style.backgroundColor = "#eee";
      clearInterval(timerStartVarOne);
      clearInterval(statDecreasersVarOne);
      currentImgFunc();
      makeAllSad();
      for(let i = 0; i < allActionBtns.length; i++){
        allActionBtns[i].setAttribute('disabled', 'false');
       }
       if(cheatMenu){
        for(let i = 0; i < allActionBtns.length; i++){
          allCheatBtns[i].setAttribute('disabled', 'false');
         }
       }
    }
  }

  function yurbleAgeArtCheck() {
    if(yurbleAge === 1){
      //baby art
      currentBase = "url('/imgs/baby/yurble_baby";
    } else if (yurbleAge === 2){
      //adult art
      currentBase = "url('/imgs/base/yurble_blue";
      currentImgFunc();
    } else if (yurbleAge ===3){
      //extreme art
      currentBase = "url('/imgs/evolution/yurble_halloween";
      currentImgFunc();
    }
  }

  function yurbleEmotionCheck() {
    if(happinessStat.value <=5 && hungerStat.value <=5){
      emotion = "_sad";
      currentImgFunc();
    } else if(happinessStat.value <= 5){
      emotion = "_sad"
      currentImgFunc();
    } else if(hungerStat.value <=5){
      emotion = "_angry"
      currentImgFunc();
    }
  }

function cssInit(){
  userNameDisplay.innerText = `${userName.value}'s Yurble`;
  petNameDisplay.innerText = petName.value;
  basicAnim.classList.add('slideUp');
  createPetAnim.classList.add('slideDown');
  clock.classList.remove('hidden');
  timeInfo.classList.remove('hidden');
  actionMenu.classList.remove('hidden');
}

function timerCalc(){
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

  function currentImgFunc(){
    currentImagePath = currentBase + emotion + ".png')"
    petPic.style.background = currentImagePath;
    if(yurbleAge === 4){
      petPic.style.background = "url('/imgs/death/tombstone.png')"
    }
  }
