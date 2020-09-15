// Required variables
let break_length = document.getElementById("break-length");
let session_length = document.getElementById('session-length');
let break_decrement = document.querySelector('#break-decrement');
let break_increment = document.querySelector('#break-increment');
let session_decrement = document.querySelector('#session-decrement');
let session_increment = document.querySelector('#session-increment');
let time_left = document.getElementById('time-left');
let timer_label = document.getElementById('timer-label');

let reset = document.getElementById('reset');
let start_stop = document.getElementById('start_stop');
let audio = document.getElementById('beep');
let myInterval = -1;
let breakText, time;
let minutes, seconds;


//----------BREAK DECREMENT-----------
break_decrement.addEventListener('click', () => {
  breakText = parseInt(break_length.innerText);
  if (breakText > 1) {
    breakText -= 1;
    break_length.innerHTML = breakText;
  }
});

//----------BREAK INCREMENT------------
break_increment.addEventListener('click', () => {
  breakText = parseInt(break_length.innerText);
  if (breakText < 60) {
    breakText += 1;
    break_length.innerHTML = breakText;
  }
});

//----------SESSION DECREMENT------------
session_decrement.addEventListener('click', () => {
  time = parseInt(session_length.innerText);
  if (time > 1) {
    time -= 1;
    session_length.innerHTML = time;
    time_left.innerHTML = time + ":00";
  }
  time = parseInt(session_length.innerText);
});

//----------SESSION INCREMENT------------
session_increment.addEventListener('click', () => {
  time = parseInt(session_length.innerText);
  if (time < 60) {
    time += 1;
    session_length.innerHTML = time;
    time_left.innerHTML = time + ":00";
  }
  time=parseInt(session_length.innerText)
});


//----DISABLE-ENABLE SESSION-BREAK BUTTONS----
function disable() {
  session_decrement.disabled=true;
  session_increment.disabled=true;
  break_decrement.disabled=true;
  break_increment.disabled=true;
}
function enable() {
  session_decrement.disabled=false;
  session_increment.disabled=false;
  break_decrement.disabled=false;
  break_increment.disabled=false;
}
//------RESET TIMER------------
reset.addEventListener('click', () => {
  time = 25;
  breakText = 5;
  enable();
  clearInterval(myInterval);
  audio.pause();
  audio.currentTime = 0;
  time_left.innerText = "25:00";
  break_length.innerText = 5;
  session_length.innerText = 25;
  timer_label.innerText = "Session";
});


//----TIMER START button EVENTLISTENER-----
start_stop.addEventListener('click', () => {
    if(myInterval == -1){
//---convert string to number and sumup-----
    time=time_left.innerText.split(':');  
    time = parseInt(time[0]) * 60 + parseInt(time[1]) ;
      
    myInterval = setInterval(function () {
      if(--time < 0){
        if (timer_label.innerText == "Session") {
          audio.play();
          timer_label.innerText = "Break";
          time_left.style.color = "#cc0000";
          time = parseInt(break_length.innerText) * 60;
        } else {
          audio.play();
          timer_label.innerText = "Session";
          time_left.style.color = "#e7e7e7";
          time = parseInt(session_length.innerText) * 60;
        }
      }
      
    minutes = parseInt(time / 60);
    seconds = parseInt(time % 60);
    

    minutes = minutes < 10 ? '0' + minutes: minutes;
    seconds = seconds < 10 ? '0' + seconds: seconds;
   

    time_left.innerText = `${minutes}:${seconds}`;
     
    }, 1000);
   
    disable();
  } else {

  enable();
  clearInterval(myInterval);
  myInterval=-1;
  }
})
