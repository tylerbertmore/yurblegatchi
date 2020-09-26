//-------------------------------QUERY SELECTORS
//GLOBAL SELECTORS
const secretMenuBtn = document.querySelector('.cheat-menu-btn');
const userNameDisplay = document.querySelector('h1');
const petNameDisplay = document.querySelector('#pet-name');
const lightDiv = document.querySelector('#lights-out');
const gameOverScreen = document.querySelector('.game-over');
const questionTop = document.querySelector('.question-top');
const tutorial = document.querySelector('.tutorial');
const closeIcon = document.querySelector('#info-close');

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
const hungerSelector = document.querySelector('#hunger-selector');
const sleepinessSelector = document.querySelector('#sleepiness-selector');
const happinessSelector = document.querySelector('#happiness-selector');
let hungerSpan = document.querySelector('#hunger-level');
let happinessSpan = document.querySelector('#happiness-level');
let sleepinessSpan = document.querySelector('#sleepiness-level');

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
let napTime = false;

//-------------------------------EVENT LISTENERS

questionTop.addEventListener('click', function(){
  tutorial.classList.toggle('hidden');
});

closeIcon.addEventListener('click', function(){
  tutorial.classList.toggle('hidden');
});

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
  animationCheck();
  statDecreasersVarOne = setInterval(statDecreasersVar, 11000);
  console.log(yourYurble);
});



// ACTION BUTTON EVENT LISTENERS
abuseBtn.addEventListener('click', function(){
  decreaseHappinessBar();
  decreaseHungerBar();
  decreaseSleepinessBar();
  emotion = "_injured1";
  removeClasses();
  currentImgFunc();
  disableButtons();
  setTimeout(enableButtons, 3000);
  setTimeout(removeClasses, 3000);
  setTimeout(abuseAnimationTwo, 3001);
  
});


feedBtn.addEventListener('click', function(){
  removeClasses();
  petPic.classList.add('feed-anim');
  disableButtons();
  setTimeout(enableButtons, 5000);
  setTimeout(removeClasses, 5001);
  setTimeout(raiseHungerBar, 2500);
  setTimeout(animationCheck, 5003);
});


napBtn.addEventListener('click', function(){
  raiseSleepinessBar();
  disableButtons();
  setTimeout(enableButtons, 5000);
  lightDiv.classList.toggle('actual-pet-overlay');
  emotion = "_sleep";
  currentImgFunc();
  setTimeout(removeClasses, 5000)
  setTimeout(animationCheck, 5001)
});


playBtn.addEventListener('click', function(){
  raiseHappinessBar();
  removeClasses();
  disableButtons();
  setTimeout(enableButtons, 1000)
  petPic.classList.add('play-anim');
  setTimeout(removeClasses, 1001);
  setTimeout(animationCheck, 1002);
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
  gameOverCheck();
  timerCalc();
  yurbleAgeCheck();
  yurbleAgeArtCheck();
  yurbleStatusCheck();
  statSpan();
}
// CLOCK HAND ROTATION
function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * -360);
}

// CORE GAMEPLAY DECREASER
statDecreasersVar = function() {
  const randNumOne = Math.floor(Math.random() * 3);
  const randNumTwo = Math.floor(Math.random() * 3);
  const randNumThree = Math.floor(Math.random() * 3) + 1;
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
  statSpan();
  if(hungerStat.value <= 0 || sleepinessStat <=0 || happinessStat <=0){
    gameOverCheck();
  }
}


  function statInit(){
    hungerStat.value = yourYurble.hunger;
    sleepinessStat.value = yourYurble.sleepiness;
    happinessStat.value = yourYurble.happiness;
    yurbleAge = yourYurble.age;
  }


// ACTION BUTTON FUNCTIONS
 function disableButtons() {
   for(let i = 0; i < allActionBtns.length; i++){
    allActionBtns[i].setAttribute('disabled', 'false');
   }
 }

 function disableNapBtn(){
  allActionBtns[1].setAttribute('disabled', 'false');
 }
function enableNapBtn(){
  allActionBtns[1].removeAttribute('disabled');
}


 function enableButtons(){
  for(let i = 0; i < allActionBtns.length - 1; i++){
    allActionBtns[i].removeAttribute('disabled');
   }
   if(napTime === true){
    lightDiv.classList.toggle('actual-pet-overlay');
    emotion = "";
    napTime = false;
   }
   currentImgFunc();
 }

 function removeClasses(){
   petPic.className = 'actual-pet-image';
 }

 function decreaseHungerBar(){
    hungerStat.value--;
    yourYurble.hunger--;
    statSpan();
  }
 function raiseHungerBar(){
    hungerStat.value+=4;
    yourYurble.hunger+=4;
    statSpan();
    
  }
 function decreaseSleepinessBar(){
    sleepinessStat.value--;
    yourYurble.sleepiness--;
    statSpan();
  }
 function raiseSleepinessBar(){
    sleepinessStat.value+=5;
    yourYurble.sleepiness+=5;
    napTime = true;
    statSpan();
  }
 function decreaseHappinessBar(){
    happinessStat.value--;
    yourYurble.happiness--;
    statSpan();
    
  }
 function raiseHappinessBar(){ 
    happinessStat.value++;
    yourYurble.happiness++;
    statSpan();
  }

  //CHEAT MENU FUNCNTIONS
function cheatForwardOne(){
  timer-=60;
}

function cheatForwardFive(){
  timer-=300;
}

function makeAllHappy(){
  sleepinessStat.value = 10;
  yourYurble.sleepiness = 10;
  hungerStat.value = 10;
  yourYurble.hunger = 10;
  happinessStat.value = 10;
  yourYurble.happiness = 10;
  statSpan();
}
function makeAllSad(){
  sleepinessStat.value = 0;
  yourYurble.sleepiness = 0;
  hungerStat.value = 0;
  yourYurble.hunger = 0;
  happinessStat.value = 0;
  yourYurble.happiness = 0;
  statSpan();
  timer = 0;

}

function killYourYurble(){
  makeAllSad();
  yurbleAge = 4;
  statSpan();
  numTwelve.innerHTML = "<i class='fas fa-skull-crossbones'></i>";
  // game over funciton?
}

function unlockAbuse(){
  allActionBtns[4].removeAttribute('disabled');
}

function statSpan(){
  hungerSpan.textContent = hungerStat.value;
  happinessSpan.textContent = happinessStat.value;
  sleepinessSpan.textContent = sleepinessStat.value;
}

  function abuseAnimationTwo(){
    emotion = "_injured2";
    currentImgFunc();
    allActionBtns[4].removeAttribute('disabled');
  }

  function yurbleAgeCheck(){
    if(timer === 2999){
      numTwelve.innerHTML = "<i class='fas fa-skull-crossbones'></i>";
      animationCheck();
      yurbleAge++;
      ageBaby.style.backgroundColor = "#eee";
      ageAdult.style.backgroundColor = "forestgreen";
      console.log(yurbleAge);
    } else if(timer === 1199){
      yurbleAge++;
      animationCheck();
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
       gameOverCheck();
    }
  }

  function yurbleAgeArtCheck() {
    if(yurbleAge === 1){
      //baby art
      currentBase = "url('/imgs/baby/yurble_baby";
    } else if (yurbleAge === 2){
      //adult art
      if(currentBase !== "url('/imgs/base/yurble_blue"){
        currentBase = "url('/imgs/base/yurble_blue";
        currentImgFunc();
      }  
    } else if (yurbleAge ===3){
      //extreme art
      
      if(currentBase !== "url('/imgs/evolution/yurble_halloween"){
        currentBase = "url('/imgs/evolution/yurble_halloween";
        currentImgFunc();
      }
    }
  }

  function yurbleStatusCheck() {

    if(hungerStat.value <= 3 && happinessStat.value <= 3 && sleepinessStat.value <= 3){
    hungerSelector.classList.add('hunger-bar');
    happinessSelector.classList.add('happiness-bar');
    sleepinessSelector.classList.add('sleepiness-bar');
    emotion = "_angry";
  
    } else if(hungerStat.value <= 3 && happinessStat.value <= 3){
      hungerSelector.classList.add('hunger-bar');
      happinessSelector.classList.add('happiness-bar');
      emotion = "_sad";
    
    } else if(happinessStat.value <= 3 && sleepinessStat.value <= 3){
      happinessSelector.classList.add('happiness-bar');
      sleepinessSelector.classList.add('sleepiness-bar');
      emotion = "_sad";
    
    } else if(hungerStat.value <= 3 && sleepinessStat.value <= 3){
      hungerSelector.classList.add('hunger-bar');
      sleepinessSelector.classList.add('sleepiness-bar');
      emotion = "_sad";
    
    } else if(hungerStat.value <= 3){
      hungerSelector.classList.add('hunger-bar');
      emotion = "_angry";
    
    } else if(sleepinessStat.value <= 3){
      sleepinessSelector.classList.add('sleepiness-bar');
      emotion = "_sad";
    
    } else if(happinessStat.value <= 3){
      happinessSelector.classList.add('happiness-bar');
      emotion = "_sad";
    
    }
    if(hungerStat.value > 3){
      hungerSelector.classList.remove('hunger-bar');
    }
    if(sleepinessStat.value > 3){
      sleepinessSelector.classList.remove('sleepiness-bar');
    }
    if(happinessStat.value > 3){
      happinessSelector.classList.remove('happiness-bar');
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
  if(timerTwo <=9){
    timerHour.textContent = `0${timerTwo}`;
  }
  timer--;
  timerThree--;
}

  function currentImgFunc(){
    currentImagePath = currentBase + emotion + ".png')"
    petPic.style.background = currentImagePath;
    animationCheck();
    if(yurbleAge === 4 || hungerStat.value <= 0 || happinessStat.value <= 0 || sleepinessStat.value <= 0){
      petPic.style.background = "url('/imgs/death/tombstone.png')"
      petPic.className = 'actual-pet-image';
    }
  }


function gameOverCheck(){
  if(yurbleAge === 4 || hungerStat.value <= 0 || happinessStat.value <= 0|| sleepinessStat.value <= 0){
    clearInterval(timerStartVarOne);
    clearInterval(statDecreasersVarOne);
    currentImgFunc();
    makeAllSad();
    ageAdult.style.backgroundColor = "#eee";
    ageBaby.style.backgroundColor = "#eee";
    ageFinal.style.backgroundColor = "#eee";
    happinessSelector.classList.add('happiness-bar');
    hungerSelector.classList.add('hunger-bar');
    sleepinessSelector.classList.add('sleepiness-bar');
    for(let i = 0; i < allActionBtns.length; i++){
      allActionBtns[i].setAttribute('disabled', 'false');
     }
     if(cheatMenu){
      for(let i = 0; i < allActionBtns.length; i++){
        allCheatBtns[i].setAttribute('disabled', 'false');
       }
     }
     gameOverScreen.className = 'game-over';
     tutorial.classList.add('hidden');
  }

}

function animationCheck(){
  if(emotion === "_injured2"){
    petPic.classList.add('baby-idle');
  }else if(emotion === "" && yurbleAge === 1){
    petPic.classList.add('baby-idle');
  }else if((emotion === "" && yurbleAge === 2) || (emotion === "" && yurbleAge === 3)){
    petPic.classList.add('adult-idle');
  } 
  else if(emotion === "_sad"){
    petPic.classList.add('baby-idle');
  }else if(emotion === "_angry"){
    petPic.classList.add('adult-idle');
  }else if(emotion === "_sleep"){
    petPic.classList.add('sleeping');
  }else if(emotion === "_injured1"){
    petPic.classList.add('abuse-anim');
  }
}

