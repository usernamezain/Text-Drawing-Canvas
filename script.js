// Drawing with text.

//Variabels we are goin to using in it
var position = { x: 0, y: window.innerHeight / 2 };
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = "Drawing Text Canvas , Mughal.Dev Join Us.";

//Drawing Variables
var canvas;
var context;
var mouse = { x: 0, y: 0, down: false };

//initialize function to se up the canvas  to draw on.
function init() {
  canvas = document.getElementById("canvas"); // Get the canvas element by its ID
  context = canvas.getContext("2d"); // Get the 2D drawing context
  canvas.width = window.innerWidth; // Set the canvas width to the window's width
  canvas.height = window.innerHeight; // Set the canvas height to the window's height

  //   Event Listener to track mouse movement and action
  canvas.addEventListener("mousemove", mouseMove, false); // Trigger mouseMove function when mouse moves
  canvas.addEventListener("mousedown", mouseDown, false); // Trigger mouseDown function when mouse button is pressed
  canvas.addEventListener("mouseup", mouseUp, false); // Trigger mouseUp function when mouse button is released
  canvas.addEventListener("mouseout", mouseUp, false); // Trigger mouseUp if the mouse leaves the canvas
  canvas.addEventListener("dblclick", doubleClick, false); // Trigger doubleClick function when double-clicking on canvas

  //   Adjust the canvas size on window resize
  window.onresize = function (event) {
    canvas.width = window.innerWidth;
    canvas.height = innerHeight;
  };
}
// Mouse Move Event Handeler
function mouseMove(event) {
  mouse.x = event.pageX; // Update Mouse X position
  mouse.y = event.pageY; //Update mouse y position

  draw(); //draw function running for drawing on mouse move in canvas
}

function draw() {
  if (mouse.down) {
    // Only draw if the mouse button is pressed
    var d = distance(position, mouse); // Calculate the distance between current position and mouse
    var fontSize = minFontSize + d / 2; // Dynamically calculate font size based on the distance
    var letter = letters[counter]; // Get the current letter from the string
    var stepSize = textWidth(letter, fontSize); // Calculate the width of the current letter based on font size

    if (d > stepSize) {
      var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

      context.font = fontSize + "px Georgia"; // Set the font size and font family for text drawing
      context.save(); // Save the current drawing context state
      context.translate(position.x, position.y); // Move the origin of the canvas to the current position
      context.rotate(angle); // Rotate the drawing context based on the calculated angle
      context.fillText(letter, 0, 0); // Draw the letter at the current position
      context.restore(); // Restore the drawing context to its previous state

      counter++; // Increment the counter to move to the next letter in the string
      if (counter > letters.length - 1) {
        // If the counter exceeds the length of the string, reset it to 0
        counter = 0;
      }
      //Update the current position based on the angle and step size

      //console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;
    }
  }
}

//Function to calculate the distance between teo points
function distance(pt, pt2) {
  var xs = 0;
  var ys = 0;

  xs = pt2.x - pt.x; //calculate the difference in x position
  xs = xs * xs; //square the difference in x

  ys = pt2.y - pt.y; //calculate the difference between in y position
  ys = ys * ys; //square the difference in y

  return Math.sqrt(xs + ys); //return the square root of the sum of squared
}
//Mouse Down event function
function mouseDown(event) {
  mouse.down = true; //Set mouse down state to true
  position.x = event.pageX; // Set the current position x to the mouse position
  position.y = event.pageY; // Set the current position y to the mouse position
  document.getElementById("info").style.display = "none"; // Hide the info div when the mouse is pressed
}
// Mouse Up event function
function mouseUp(event) {
  mouse.down = false; //Set mouse down state to false
}
// Double-click event handler to clear the canvas
function doubleClick(event) {
  canvas.width = canvas.width; // Reset the canvas width to clear the canvas (effectively erases everything)
}
function textWidth(string, size) {
  context.font = size + "px georgia";

  if (context.fillText) {
    return context.measureText(string).width;
  } else if (context.mozDrawText) {
    return context.mozMeasureText(string);
  }
}

init();


document.querySelector('.btn').addEventListener('click',()=>{
    document.querySelector('.btn-panel').classList.toggle('active')
})
