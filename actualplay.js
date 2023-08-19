//lessons 
// always use += instead of = because += this is useful in adding the content with the existing content, but if you use (=) then new content will gonna replace the old content 

let gamepage = document.getElementById("main-container");
let second = document.getElementById("dynamic-time").textContent
console.log(second)

let zombies = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-3.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];
let zombieid = 0;
let interval;
let lives = 6;
let killedzombie = 0;


makezombies();

const explodeaudio = new Audio("./assets/shotgun.wav");
// we use new keyword to create something new
//audio function creates an object which is use too handle sound

explodeaudio.volume = 0.2; //it is for volume
gamepage.onclick = () => {
  explodeaudio.pause();
  // pause function is usefull to pause the playback music
  explodeaudio.currentTime = 0;
  // currenttime 0 is usefull in starting the music from the beginning
  explodeaudio.play();
  //play is for play
};

let backgroundmusic = new Audio("./assets/bgm.mp3");
backgroundmusic.play();
backgroundmusic.loop = true;

function makezombies() {
  let randomzombie = zombies[Math.floor(Math.random() * zombies.length)];
  gamepage.innerHTML += `<img src="./assets/${randomzombie}" class="zombie-class" id="zombie-${zombieid}" alt="">`;
  let gettingzombie = document.getElementById(`zombie-${zombieid}`);
  gettingzombie.style.transform = `translateX(${generaterandomnumber(
    20,
    80
  )}vw)`;
  gettingzombie.style.animationDuration = `${generaterandomnumber(2, 6)}s`;
  gettingzombie.onclick = () => {
    zombiekilling(gettingzombie);
  };
}

function zombiekilling(gettingzombie){
  gettingzombie.style.display = "none";
  killedzombie++;
  if(killedzombie === 3){
    location.href = "./win.html"
  }
}

function destroyzombies(gettingzombie) {
  gettingzombie.style.display = "none";
  zombieid++;
  makezombies();
}

function checkcollisonofzombies(newone) {
  if (newone.getBoundingClientRect().y <= 0) {
    lives--;
    return true;
  }
  else{
    return false
  }
}

//important takeaway : i know need to check collision inside of a setinterval so that condition can be check again and again. Because if i try to check it outside so the position of the element in the respect of top or y will be not valid to statify my condition
interval = setInterval(() => {
  second--;
  let settiming = document.getElementById("dynamic-time")
  settiming.innerHTML = second
  let apperingzombie  = document.getElementById(`zombie-${zombieid}`)
  if(checkcollisonofzombies(apperingzombie) === true){
    destroyzombies(apperingzombie)
    if(lives === 0){
      location.href = "./gameover.html"
      clearInterval(interval)
    }
  }
  if(second == 0){
    location.href = "./gameover.html"
    clearInterval(interval)
  }
}, 1000);


// i got very interesting way of creating  random numbers within a specified range
function generaterandomnumber(min, max) {
  let generate = Math.floor(Math.random() * (max - min) + min);
  return generate;
}