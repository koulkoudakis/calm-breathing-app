const container = document.getElementById('container');
const text = document.getElementById('text');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const inputBpm = document.getElementById('bpm-input');
const bpmDisplay = document.getElementById('bpm');
const point = document.getElementById('pointer');
const input = document.getElementById("myInput");


const localStorageBpm = parseInt(JSON.parse(localStorage.getItem('bpm')));
// let bpm = 8;
let bpm = +localStorage.getItem('bpm') !== null ? localStorageBpm : 8;

let totalTime = 60000 / bpm;
let breatheTime = (totalTime / 5) * 2;
let holdTime = totalTime / 5;


breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe in...';
  container.className = 'container grow';
  bpmDisplay.innerText = `${bpm}`;
  point.style.animation = `rotate ${totalTime / 1000}s linear forwards infinite`;
  document.documentElement.style.setProperty('--resize-speed', `${breatheTime / 1000}s`);
  console.log(breatheTime, holdTime);

  setTimeout(() => {
    text.innerText = 'Hold...';

    setTimeout(() => {
      text.innerText = 'Breathe out...';
      container.className = 'container shrink';

    }, holdTime);
  }, breatheTime);
}

function updateLocalStorage() {
  localStorage.setItem('bpm', JSON.stringify(bpm));
}

function updateBPM(bpm) {
  bpmDisplay.innerText = `${bpm}`;
  totalTime = 60000 / bpm;
  breatheTime = (totalTime / 5) * 2;
  holdTime = totalTime / 5;
  point.style.animation = `rotate ${totalTime / 1000}s linear forwards infinite`;
  document.documentElement.style.setProperty('--resize-speed', `${breatheTime / 1000}s`);
  console.log(totalTime);
  console.log(breatheTime);
  console.log(holdTime);

  clearInterval(interval);
  interval = setInterval(breathAnimation, totalTime);
}

// Increase BPM button
function plusBPM() {
  bpm += 1;
  point.style.animation = "none";
  updateBPM(bpm);
  updateLocalStorage();
  location.reload();
}

// Decrease BPM button
function minusBPM() {
  bpm -= 1;
  point.style.animation = "none";
  updateBPM(bpm);
  updateLocalStorage();
  location.reload();
}

// Change BPM using input box
function enterBPM(e) {
  e.preventDefault();
  if (inputBpm.value.trim() === '') {
    alert('Please add valid breathing rate');
  } else {
    const bpmValue = Math.floor(+inputBpm.value);
    bpm = bpmValue;
    console.log(bpm, bpmValue);

    updateBPM(bpm);

    inputBpm.value = '';

    updateLocalStorage();
    location.reload();

  }
}

decreaseBtn.addEventListener('click', minusBPM);
increaseBtn.addEventListener('click', plusBPM);
inputBpm.addEventListener('change', enterBPM);


let interval = setInterval(breathAnimation, totalTime);

  
// const totalTime = 7500;
// const breatheTime = (totalTime / 5) * 2;
// const holdTime = totalTime / 5;

// breathAnimation();

// function breathAnimation() {
//   text.innerText = 'Breathe In!';
//   container.className = 'container grow';

//   setTimeout(() => {
//     text.innerText = 'Hold';

//     setTimeout(() => {
//       text.innerText = 'Breathe Out!';
//       container.className = 'container shrink';
//     }, holdTime);
//   }, breatheTime);
// }

// setInterval(breathAnimation, totalTime);
