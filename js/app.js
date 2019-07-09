let work = document.getElementById('work');
let bre = document.getElementById('break');
let title = document.getElementById('title');
let reset = document.getElementById('reset');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let inc = document.getElementById('inc');
let dec = document.getElementById('dec');
let start = document.getElementById('start');
var interval;
let minutes = 25;
let seconds = 00;

if(minutes < 10){
  document.getElementById('min-zero').style.display = "inline";
}
else{
  document.getElementById('min-zero').style.display = "none";
}
if(seconds < 10){
  document.getElementById('sec-zero').style.display = "inline";
}
else{
  document.getElementById('sec-zero').style.display = "none";
}

//event listeners
work.addEventListener('click', titleToWork);
bre.addEventListener('click' , titleToBreak);
reset.addEventListener('click', resetData);
inc.addEventListener('click', incTimeLimit);
dec.addEventListener('click', decTimeLimit);
start.addEventListener('click', startTimer);

//change title to Work
function titleToWork(){
  title.innerText = 'WORK';
  updateTimeLimit();
}

//change title to Break
function titleToBreak(){
  title.innerText = 'BREAK';
  updateTimeLimit();
}

//update the timit limit to standard time limits
function updateTimeLimit(){
  if(title.innerText == 'WORK'){
    min.innerText = 25;
    seconds = 00;
    sec.innerText = 00;
    minutes = min.innerText;
  }
  else 
  {
    min.innerText = 5;
    sec.innerText = 00;
    minutes = min.innerText;
  }
  if(minutes < 10){
    document.getElementById('min-zero').style.display = "inline";
  }
  else{
    document.getElementById('min-zero').style.display = "none";
  }
  if(seconds < 10){
    document.getElementById('sec-zero').style.display = "inline";
  }
  else{
    document.getElementById('sec-zero').style.display = "none";
  }
}

//increase time limit
function incTimeLimit(){
  if(minutes == 99){
    minutes = 1;
    min.innerText = minutes;
  }
  else{
    minutes++;
    min.innerText = minutes;
  }
  if(minutes < 10){
    document.getElementById('min-zero').style.display = "inline";
  }
  else{
    document.getElementById('min-zero').style.display = "none";
  }
  if(seconds < 10){
    document.getElementById('sec-zero').style.display = "inline";
  }
  else{
    document.getElementById('sec-zero').style.display = "none";
  }
}

//decrease time limit
function decTimeLimit(){
  if(minutes == 1){
    minutes = 99;
    min.innerText = minutes;
  }
  else{
    minutes--;
    min.innerText = minutes;
  }
  if(minutes < 10){
    document.getElementById('min-zero').style.display = "inline";
  }
  else{
    document.getElementById('min-zero').style.display = "none";
  }
  if(seconds < 10){
    document.getElementById('sec-zero').style.display = "inline";
  }
  else{
    document.getElementById('sec-zero').style.display = "none";
  }
}

//start the timer and disable all other buttons except for the reset ones
function startTimer(){
  var i = 0;
  work.disabled = true;
  bre.disabled = true;
  start.disabled = true;
  inc.disabled = true;
  dec.disabled = true;
  document.getElementById('tick').setAttribute('src', 'audio/Tick.mp3');
  document.getElementById("tick").playbackRate = .36;

  //to call this function every second
  interval = setInterval(function(){
    if(i == 0){
      seconds = 59;
      minutes--;
    }
    if(seconds == -1){
      seconds = 59;
      minutes--;
    }
    if(minutes < 10){
      document.getElementById('min-zero').style.display = "inline";
    }
    else{
      document.getElementById('min-zero').style.display = "none";
    }
    if(seconds < 10){
      document.getElementById('sec-zero').style.display = "inline";
    }
    else{
      document.getElementById('sec-zero').style.display = "none";
    }
    sec.innerText = seconds;
    min.innerText = minutes;
    seconds--;
    i++;
    checkTimer();
  },1000)
}

//to check for the correct working of timer when time is up
function checkTimer(){
  if(minutes == 0 && seconds == 0){
    sec.innerText = seconds;
    min.innerText = minutes;
    title.innerText = 'TIME UP';
    clearInterval(interval);
    document.getElementById('tick').setAttribute('src', 'audio/Loud-alarm-clock-sound.mp3');
  }
}

//reset everything to standard ones
function resetData(){
  title.innerText = 'WORK';
  document.getElementById('tick').setAttribute('src', '');
  clearInterval(interval);
  work.disabled = false;
  bre.disabled = false;
  start.disabled = false;
  inc.disabled = false;
  dec.disabled = false;
  updateTimeLimit();
}


// pwa app js
window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}
