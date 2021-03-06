
//Audio
const audio = new Audio();
audio.src = "music/that-halloween-story-20692.mp3";
audio.loop = true;

const myObstacles = []
const myGameArea = {
  canvas: document.querySelector("canvas"),
  frames: 0,
  start: function(){
    this.canvas.width = 700
    this.canvas.height = 600
    this.context = this.canvas.getContext("2d")
    this.interval = setInterval(updateGameArea,20)
    audio.play()
  },

  winGame: function(){
    const ganar = new Image()
    ganar.src = "imagenes/win.png"
    ganar.onload = this.context.drawImage(ganar,200,200,400,300);
    

  
  },
  //background del canvas
  drawMoon: function(){
    const moonImg = new Image();
    moonImg.src = "imagenes/luna.jpg";
    moonImg.onload = this.context.drawImage(moonImg,0,0,this.canvas.width,this.canvas.height);
    
  },
  clear: function(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  },

  //score
  showScore: function(){
    const score = `Score: ${myPenny.score}`
    this.context.font = "30px Verdana"
    this.context.fillStyle = "blue"
    this.context.fillText(score,75,50)
  },
  stop: function(){
    audio.pause();
    clearInterval(this.interval);
   
  },

}

const updateGameArea = () => {
  myGameArea.frames = myGameArea.frames+1
  myGameArea.clear()
  myGameArea.drawMoon()
  myPenny.update()
  generateKnives()
  updateObstacles()
  myGameArea.showScore()
  checkGameOver()

  if(myPenny.score >= 95){
    myGameArea.winGame()
    if(myPenny.score >= 100){
      myGameArea.stop()
    }
  
  } 

}
//sumar score evadiendo obstaculos
const updateObstacles = () => {
  for (let i=0; i<myObstacles.length; i++){
    myObstacles[i].y += 3
    myObstacles[i].update()
    if (myObstacles[i].y >= 725 && myObstacles[i].y <=726){
      myPenny.scoreAdd()
    }
  }
}

class Component {
  constructor(width, height, x, y){
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.img = new Image()
    this.img.src = "imagenes/pngwing.com (1).png"
  }
  left() {
    return this.x
  }
  right(){
      return this.x + this.width
  }
  top(){
      return this.y
  }
  bottom(){
      return this.y + this.height
  }
  crashWith(obstacle){
    return !(
        this.bottom() < obstacle.top() ||
        this.top() > obstacle.bottom() ||
        this.right() < obstacle.left() ||
        this.left() > obstacle.right()
    )
  }
}

//choques para game over
const checkGameOver = () => {
  const crashed = myObstacles.some((element) => {
      return myPenny.crashWith(element)
  })
  if(crashed){
    myGameArea.context.font = "bold 80px arial"
    myGameArea.context.clearRect(0,0,myGameArea.canvas.width,myGameArea.canvas.height)
    myGameArea.context.fillText("GAME OVER!",150,150);
      myGameArea.stop()
  }
  return
}
class Penny extends Component{
  constructor(width, height, x, y){
    super(width, height, x, y)
    this.score = 0
  }
  update(){
    const ctx = myGameArea.context
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
  }
  scoreAdd(){
    this.score += 5
  }
}

//obstaculos
class Knive{
  constructor(x){
    this.y = 0;
    this.x = Math.floor(Math.random() * (800-106))+106;
    this.width = 60;
    this.height = 60;
    this.image = new Image();
    this.image.src = "imagenes/knive.png";

  }
  left() {
    return this.x
  }
  right(){
      return this.x + this.width
  }
  top(){
      return this.y
  }
  bottom(){
      return this.y + this.height
  }

  update(){
    const ctx = myGameArea.context
    if(myGameArea.frames % 10)this.y += 4
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}
//intervalo de tiempo entre cada cuchillo
const generateKnives = () => {
  if(myGameArea.frames % 50 === 0){
    const knive = new Knive();
    myObstacles.push(knive)
  }
}

const myPenny = new Penny(100, 110, 220, 490)
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  document.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "ArrowLeft":
          myPenny.x -= 5
            break
        case "ArrowRight":
          myPenny.x += 5
            break
        default:
            break
    }

})
  function startGame() {
    myGameArea.start()
  }
};

