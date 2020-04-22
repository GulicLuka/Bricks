var pavza = false;
var tocke;

function drawIt() {
  //Canvas-------------------------------------------------------------------------------------------------------------------------
  var ctx;
  var WIDTH;
  var HEIGHT;
  //Ball---------------------------------------------------------------------------------------------------------------------------
  var x = 350;
  var y = 700 - 5;
  var hitrostX = 0;
  var hitrostY = 0;
  var r = 5;

  var numBall = 1;
  var samoEnkrat = true;
  
  //Mouse--------------------------------------------------------------------------------------------------------------------------
  var canvasMinX;
  var canvasMaxX;
  //Bricks-------------------------------------------------------------------------------------------------------------------------
  var bricks = new Array();
  var NROWS = 0;
  var NCOLS;
  var BRICKWIDTH;
  var BRICKHEIGHT;
  var PADDING;
  var subArr;

 
  //Pavza--------------------------------------------------------------------------------------------------------------------------
  //var pavza = false;

  var interval;


  var first = true;

  //click--------------------------------------------------------------------------------------------------------------------------
  var click = true;
  var once = true;

  //draw line between mouse and ball-----------------------------------------------------------------------------------------------
  var mouseX;
  var mouseY;

  var dy;
  var dx;

  var d;

  var angle;
  var radians;

  var speed = 5;

  //brisnaje zadnje vrstice--------------------------------------------------------------------------------------------------------
  var b = false;
  var dolzina;
  var stevec = 1;


  //Inicializacija bricks polnjenje v tabelo---------------------------------------------------------------------------------------
  function initbricks() { //inicializacija opek - polnjenje v tabelo
    
    NCOLS = 10;
    BRICKWIDTH = (WIDTH/NCOLS) - 1;
    BRICKHEIGHT = 70 - 1;
    PADDING = 1;
    subArr = new Array(NCOLS)
    for(var j=0;j <NCOLS;j++){
      var x = Math.floor(Math.random()*2);
      if(x == 1)
      subArr[j] = NROWS+1;
      else
      subArr[j] = 0;
    }

    /*for(var i=0; i<NCOLS;i++){
      if(bricks[NROWS][i] === 1){
        popTable = false;
        break;
      }
      else{
        popTable = true;
      }
    }*/

    /*if(popTable){
      bricks.pop();
    }*/
    console.log(subArr)
    bricks.unshift(subArr);
    console.log(bricks)
    NROWS++;
  }
  //Inicializacija miske------------------------------------------------------------------------------------------------------------
  function init_mouse() {
    canvasMinX = $("canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
  }
  $("canvas").click(shoot);


  function shoot(){
    
    if(click){
      while(click){

        dy = y - mouseY;
          dx = mouseX -x;


        

        console.log("mouseX: " + mouseX + ", mouseY: "+ mouseY);
        console.log("BallX: " + x + ", BallY: "+ y);
        console.log("dolzinaX: "+ dx + ", dolzinaY: " + dy);


        d = Math.sqrt(dx*dx + dy*dy);

        console.log("dolzina diagonale: " + d);
        var a = dy/d;
        console.log("a: " + a);
        angle = Math.asin(a);
        radians = angle * Math.PI/ 180;

        /*angle = 45;
        radians = angle * Math.PI/ 180;*/

        console.log("kot alpha: " + angle);
        console.log("kot alpha v radianih: " + radians);

        if(mouseX>x)
        hitrostX = Math.cos(angle) * speed;
        else if(mouseX<x)
        hitrostX = -Math.cos(angle) * speed;

        hitrostY = -Math.sin(angle) * speed;

        console.log("cos: " + Math.cos(radians));
        console.log("sin: " + Math.sin(radians));
        /*console.log(mouseX);
        console.log(mouseY);*/
        /*hitrostX = (y - k*x)/y;
        hitrostY =-(y/k - x)/x*/

        
        
        click = false;
        console.log(hitrostX+", "+hitrostY);
      }
    }
    once = true;
  }

  function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 

      mouseX= event.clientX - rect.left;
      mouseY= event.clientY - rect.top;

} 

let canvasElem = document.querySelector("canvas"); 
  
canvasElem.addEventListener("mousemove", function(e) 
{ 
    getMousePosition(canvasElem, e); 
    //console.log(mouseX,mouseY);
}); 

  //Pavza on/off -------------------------------------------------------------------------------------------------------------------
  function onKeyDown(evt) {
    if (evt.keyCode == 32)
      if (pavza == false) {
        pavza = true;
      }
      else {
        pavza = false;
      }

  }
  $(document).keydown(onKeyDown);

  //basic inicializacija + interval---------------------------------------------------------------------------------------------------
  function init() {
    tocke = NROWS;
    ctx = $('#myCanvas')[0].getContext("2d");
    ctx2 =$('#myCanvas')[0].getContext("2d");
    WIDTH = $("#myCanvas").width();
    HEIGHT = $("#myCanvas").height();
    $("#tocke").html(NROWS);
    interval = setInterval(draw, 10);
    return interval;
  }
  // Draw Circle---------------------------
  function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
  }



  // Draw rect-----------------------------
  function rect1(x, y, w, h, c,st) {
    ctx2.beginPath();
    ctx2.rect(x, y, w, h);
    ctx2.font="10 px Arial";
    ctx2.setLineDash([1,1]);
    ctx2.closePath();
    ctx2.fillText(st, x+w/2, y+h/2);
    ctx2.strokeStyle = 'rgb(0, ' + Math.floor(255 - 42.5 * c) + ', 255 )';
    
    ctx2.stroke();
  }

  //Stevilke v rect--------------------------

  function num(x,y,w,h,c,st){
    ctx2.beginPath();
    ctx2.font="10 px Arial";
    ctx2.textAlign = "center";
    ctx2.fillText(st, x+w/2, y+h/2);
    ctx2.fillStyle =  'rgb(0, ' + Math.floor(255 - 42.5 * c) + ', 255 )';
    ctx2.closePath();

  }

  //Draw line--------------------------------
  function line(x,y,mouseX,mouseY){
    ctx.beginPath();
    ctx.setLineDash([1,20]);
    ctx.lineCap = 'round';
    ctx.moveTo(x,y)
    ctx.lineTo(mouseX,mouseY);
    ctx.strokeStyle = "#bfbfbf";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
  }

  // clear all-----------------------------
  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  //Draw----------------------------------------------------------------------------------------------------------------------------
  function draw() {
    if (pavza) {
      console.log("Pavza: " + pavza);
      document.getElementById("pause").style.display="flex";
    }
    else {
      document.getElementById("pause").style.display="none";

      if(bricks.length < 0){
        initbricks();
      }
      //brisanje prve vrstice ce je zadnja-----------------------
      for(var s=0; s<NCOLS ;s++){
        if(bricks[bricks.length-1][s] == 0)
          b  = true;
        else{
          b = false;
          break;
        }
      }

      if(b){
        bricks.pop();
        console.log(stevec);
        console.log(NROWS);
        dolzina = bricks.length;
        stevec++;
      }


      //konec igre---------------------------------------------
      if(bricks.length * BRICKHEIGHT > HEIGHT - BRICKHEIGHT){
        clearInterval(interval);
        if(parseInt(localStorage.getItem(vpis)) < tocke){
          localStorage.setItem(vpis,tocke);
        }
        location.reload();
      }

      tocke = NROWS;
      $("#tocke").html(NROWS);
      clear();
      circle(x,y, r);

      if(click){
        clear();
        line(x,y,mouseX,mouseY);
        circle(x, y, r);
      }

      /*if(click){
        clear();
        line(x,y,mouseX,mouseY);
        if(samoEnkrat){
          console.log(numBall);
          for(i = 0;i<numBall;i++){
            tabBall[i] = new ball(x,y);
            clear();
            circle(tabBall[i].x, tabBall[i].y, r);
            setTimeout(1000);
          }
          samoEnkrat = false;
        }
      }*/

      if(first){
        initbricks();
        first = false;
      }
      


      if (x + hitrostX > WIDTH - r || x + hitrostX < 0 + r)
        hitrostX = -hitrostX;

      if (y + hitrostY < 0 + r)
        hitrostY = -hitrostY;

      x += hitrostX;
      y += hitrostY;

      if (x + hitrostX > WIDTH - r || x + hitrostX < 0 + r)
        hitrostX = -hitrostX;

      if (y + hitrostY < 0 + r)
        hitrostY = -hitrostY;

      else if (y + hitrostY > HEIGHT - r){
        click = true;
        if(once){
          initbricks();
          
          once = false;
        }


      }


      var color = bricks.length;
      for (i = 0; i < bricks.length; i++) {
        for (j = 0; j < NCOLS; j++) {
          /*if (bricks[i][j] ==1 ) {
            rect1((j * (BRICKWIDTH + PADDING)) + PADDING,
              (i * (BRICKHEIGHT + PADDING)) + PADDING,
              BRICKWIDTH, BRICKHEIGHT, 0);
          }
          else*/ if(bricks[i][j] >= 1){
            rect1((j * (BRICKWIDTH + PADDING)) + PADDING,
            (i * (BRICKHEIGHT + PADDING)) + PADDING,
            BRICKWIDTH, BRICKHEIGHT, color, bricks[i][j]);

            num((j * (BRICKWIDTH + PADDING)) + PADDING,
            (i * (BRICKHEIGHT + PADDING)) + PADDING,
            BRICKWIDTH, BRICKHEIGHT, color, bricks[i][j]);
          }
        }
        color--;
      }

      rowheight = BRICKHEIGHT + PADDING + r / 2; //Smo zadeli opeko?
      colwidth = BRICKWIDTH + PADDING + r / 2;
      row = Math.floor(y / rowheight);
      col = Math.floor(x / colwidth);
      //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
      /*if (y < bricks.length * rowheight && row >= 0 && col >= 0 && bricks[row][col] >= 1 && x ) {
        hitrostY = -hitrostY;
        bricks[row][col]--;
        tocke = NROWS;
      }
      */

      for(i = 0;i<bricks.length;i++){
        for(j = 0;j<bricks[i].length;j++){
          if(x + r >= j * BRICKWIDTH + PADDING + r / 2 && x - r <= j * BRICKWIDTH + BRICKWIDTH + PADDING + r / 2 && bricks[i][j] >= 1 && y + r >= i * BRICKHEIGHT + PADDING + r / 2 && y - r <= i * BRICKHEIGHT + BRICKHEIGHT + PADDING + r / 2){
            if(x > j * BRICKWIDTH  + PADDING + r / 2  && y > i * BRICKHEIGHT + PADDING + r / 2  && y < i * BRICKHEIGHT + BRICKHEIGHT + PADDING + r / 2  || x < j * BRICKWIDTH + BRICKWIDTH + PADDING + r / 2  && y> i * BRICKHEIGHT + PADDING + r / 2  && y < i * BRICKHEIGHT + BRICKHEIGHT  + PADDING + r / 2 ){
              hitrostX = -hitrostX;
              bricks[i][j]--;
            }
            else if(y > i * BRICKHEIGHT  + PADDING + r / 2  && x > j * BRICKWIDTH  + PADDING + r / 2  && x < j * BRICKWIDTH +BRICKWIDTH  + PADDING + r / 2  || y < i * BRICKHEIGHT + BRICKHEIGHT  + PADDING + r / 2 && x > j * BRICKWIDTH  + PADDING + r / 2  && x < j * BRICKWIDTH + BRICKWIDTH + PADDING + r / 2 ){
              hitrostY = -hitrostY;
              bricks[i][j]--;
            }
            
          }
        }
      }



      if (x + hitrostX > WIDTH - r || x + hitrostX < 0 + r)
        hitrostX = -hitrostX;

      if (y + hitrostY < 0 + r)
        hitrostY = -hitrostY;
      else if (y + hitrostY > HEIGHT - (r)) {
        click = true;
        samoEnkrat = true;
        numBall++;
        hitrostX = 0;
        hitrostY = 0;
        y = HEIGHT-r;
      }

      x += hitrostX;
      y += hitrostY;
    }
  }

  init();
  init_mouse();
}