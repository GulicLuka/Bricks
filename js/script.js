
function drawIt() {
    var x = 150;
    var y = 150;
    var dx = 2;
    var dy = 4;
    var WIDTH;
    var HEIGHT;
    var r=10;
    var ctx;

    var paddlex;
    var paddleh;
    var paddlew;

    var rightDown = false;
    var leftDown = false;

    var canvasMinX;
    var canvasMaxX;

    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;

    function initbricks() { //inicializacija opek - polnjenje v tabelo
        NROWS = 5;
        NCOLS = 5;
        BRICKWIDTH = (WIDTH/NCOLS) - 1;
        BRICKHEIGHT = 15;
        PADDING = 1;
        bricks = new Array(NROWS);
        for (i=0; i < NROWS; i++) {
          bricks[i] = new Array(NCOLS);
          for (j=0; j < NCOLS; j++) {
            bricks[i][j] = 1;
          }
        }
      }

    function init_mouse() {
        //canvasMinX = $("#canvas").offset().left;
        canvasMinX = $("canvas").offset().left;
        canvasMaxX = canvasMinX + WIDTH;
    }
     
      function onMouseMove(evt) {
        if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
          paddlex = evt.pageX - canvasMinX;
        }
      }
      $(document).mousemove(onMouseMove);

    function onKeyDown(evt) {
        if (evt.keyCode == 39)
            rightDown = true;
        else if (evt.keyCode == 37)
            leftDown = true;
    }
      
      function onKeyUp(evt) {
        if (evt.keyCode == 39)
            rightDown = false;
        else if (evt.keyCode == 37) 
            leftDown = false;
      }
      $(document).keydown(onKeyDown);
      $(document).keyup(onKeyUp); 

    function init_paddle() {
        paddlex = WIDTH / 2;
        paddleh = 10;
        paddlew = 75;
      }

    function init() {
        ctx = $('#myCanvas')[0].getContext("2d");
        WIDTH = $("#myCanvas").width();
        HEIGHT = $("#myCanvas").height();
        return setInterval(draw, 10);
      }
      
      function circle(x,y,r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
      }
      
      function rect(x,y,w,h) {
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.closePath();
        ctx.fill();
      }
      
      function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
      }


    function draw() {
        clear();
        circle(x, y, 10);

        if (x + dx > WIDTH -r|| x + dx < 0 +r)

        dx = -dx;
        
        if ( y + dy < 0 +r)
        
        dy = -dy;
        
        x += dx;
        
        y += dy;

        if (rightDown){
            if((paddlex+paddlew) < WIDTH){
                paddlex += 5;
                }else{
                paddlex = WIDTH-paddlew;
                }
        }

        else if (leftDown){
            if(paddlex>0 || paddlex < WIDTH){
                paddlex -=5;
                }else{
                paddlex=0;
                }
        }

        rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

        if (x + dx > WIDTH-r || x + dx < 0+r)
          dx = -dx;
      
        if (y + dy < 0+r)
          dy = -dy;
        else if (y + dy > HEIGHT-r) {
          if (x > paddlex && x < paddlex + paddlew)
            dy = -dy;
          else
            clearInterval(intervalId);
        }
        
        for (i=0; i < NROWS; i++) {
            for (j=0; j < NCOLS; j++) {
              if (bricks[i][j] == 1) {
                rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                    (i * (BRICKHEIGHT + PADDING)) + PADDING,
                    BRICKWIDTH, BRICKHEIGHT);
              }
            }
          }
        
          if (x + dx > WIDTH -r || x + dx < 0+r)
            dx = -dx;
          if (y + dy < 0+r)
            dy = -dy;
          else if (y + dy > HEIGHT -(r)) {
            if (x > paddlex && x < paddlex + paddlew)
              dy = -dy;
            else if (y + dy > HEIGHT-r)
              clearInterval(intervalId);
          }

        x += dx;
        y += dy;
    }
    init();
    init_paddle();
    init_mouse();
    initbricks();
    }