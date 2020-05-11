// A generic constructor which accepts an arbitrary descriptor object
function Sakeobj(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}


// Make the wall/bricks





// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Sakeobj.prototype.halfWidth = 5;
Sakeobj.prototype.halfHeight = 5;
Sakeobj.prototype.cx = 10;
Sakeobj.prototype.cy = 10;
Sakeobj.prototype.XSpeed = 3;
Sakeobj.prototype.YSpeed = 0;
//Sakeobj.prototype.bricks = [];

Sakeobj.prototype.brickX = 0;
Sakeobj.prototype.brickY = 0;

var count = 0;
var trailCount = 10;
var trail = [];
var bricks = [];

Sakeobj.prototype.update = function (du) {

    if(count === 0){
        for(var c = 0; c < 40; c++){
            bricks[c] = [];
            for(var k = 0; k < 40; k++){

                bricks[c][k] = { x: k*10, y: c*10, status: 1 };

               // console.log(bricks);
            }
        }
        count += 1;
    }

    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.XSpeed * du;
    var nextY = prevY + this.YSpeed * du;


    if(nextX >= 397){
        this.cx = 3;
    }
    else if(nextX <= 3){
        this.cx = 395;
    }

    else if(nextY >= 397){
        this.cy = 3;
    }
    else if(nextY <= 3){
        this.cy = 395;
    }

    //Prev pos and next pos needs to  be updated after the actual pos change...
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.XSpeed * du;
    var nextY = prevY + this.YSpeed * du;




    if (g_keys[this.GO_LEFT]) {

            this.XSpeed = -3;
            this.YSpeed = 0;
    }

    else if (g_keys[this.GO_RIGHT]) {
  
           this.XSpeed = 3;
           this.YSpeed = 0;
        
    }  

     else if (g_keys[this.GO_DOWN]) {
   
           this.YSpeed = 3;
           this.XSpeed = 0;
        
    }  

     else if (g_keys[this.GO_UP]){
       
           this.YSpeed = -3;
           this.XSpeed = 0;
        
    }
    
   
    this.cx = this.XSpeed + this.cx;
    this.cy = this.YSpeed + this.cy;


    this.snakePosition();
    this.collidesWithFood();
    //console.log(this.XSpeed,this.YSpeed);
    trail.push({ x: bricks[brickY][brickX].x, y: bricks[brickY][brickX].y});
    if(trail.length > trailCount) {
        trail.splice(0,1);
    }
    
    this.collidesWithTrail(prevX, prevY, nextX, nextY,5);

};

Sakeobj.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    this.drawTrail(ctx);
    ctx.beginPath();

    ctx.fillStyle = "black";
    ctx.fillRect(bricks[brickY][brickX].x,
                 bricks[brickY][brickX].y,
                 10,
                 10);
    
    ctx.fillStyle = "grey";

    ctx.fillRect(randomX*10,
                 randomY*10,
                 10,
                 10);
    
    ctx.closePath();
    
    //console.log(brickX, brickY, bricks[brickX][brickY].x, bricks[brickX][brickY].y,randomX,randomY);
}

var randomX = 25;
var randomY = 25; 

Sakeobj.prototype.collidesWithFood = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {

    if(brickX === randomX && brickY === randomY){
        randomX = Math.floor(Math.random() * (39 - 0 + 1)) + 0;
        randomY = Math.floor(Math.random() * (39 - 0 + 1)) + 0;
        trailCount = trailCount + 12;
        g_Score += 12;
    }
    //console.log(randomX,randomY);
};

var brickX;
var brickY;
Sakeobj.prototype.snakePosition = function () {
 
            brickX = Math.floor( (this.cx) / 10);
            brickY = Math.floor( (this.cy) / 10);
}


Sakeobj.prototype.drawTrail = function (ctx) {
    
    for (var i = 0; i < trail.length; i++) {
        ctx.fillStyle = "red";
        ctx.fillRect(trail[i].x,
                 trail[i].y,
                 10,
                 10);
        
    }
}


Sakeobj.prototype.collidesWithTrail = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {

    var nextbrickX = Math.floor( (nextX) / 10);
    var nextbrickY = Math.floor( (nextY) / 10);

    //console.log(nextbrickX,nextbrickY,nextX,nextY);
    for (var i = 0; i < trail.length-8; i++) {
        //console.log(trail[i].x,trail[i].y);
        //console.log(bricks[nextbrickY][nextbrickX].x, bricks[nextbrickY][nextbrickX].y, trail[i].x, trail[i].y);
        if(bricks[nextbrickY][nextbrickX].x === trail[i].x && bricks[nextbrickY][nextbrickX].y === trail[i].y){
            console.log("Its a hit");
            g_main.gameOver();
        }
        //console.log(bricks[nextbrickY][nextbrickX].x, bricks[nextbrickY][nextbrickX].y, trail[i].x, trail[i].y);

    }
   
}