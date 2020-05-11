
"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// PADDLE STUFF
// ============

// PADDLE 1

var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);
var g_snake = new Sakeobj({
    cx : 200,
    cy : 200,
    
    GO_LEFT  : KEY_A,
    GO_RIGHT : KEY_D,
    GO_UP  : KEY_W,
    GO_DOWN : KEY_S
});
// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    g_snake.update(du);
    //g_paddle1.update(du);
    //g_bullets.update(du);
    //whatIsScore(g_ctx);
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    clearCanvas(ctx);
    drawCanvas(ctx);
    //drawscore(ctx);
    //drawBricks(g_ctx);

    g_snake.render(ctx);
   // g_bullets.render(ctx);
    //g_paddle1.render(ctx);
   
    drawscore(g_ctx);
}

// Kick it off
g_main.init();