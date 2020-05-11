// =====
// UTILS
// =====

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function fillCircle(ctx, x, y, r) {
    //Some ball wobbble effect off paddle
    if(y >= g_paddle1.cy-60){
        r += 0.7;
    }
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
}

function fillBox(ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
}

// ==========
// SORE STUFF
// ==========
//
var g_Score = 0;
function whatIsScore(ctx){

}

function drawscore(ctx){
    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + g_Score,10,30);
    ctx.beginPath();
}

