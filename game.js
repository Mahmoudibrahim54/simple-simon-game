
var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];



var randomChoosenColor;

var level = -1;

var gameOn = false;

var gameStartingKey = true;




$(document).keydown(function() {
  if (gameStartingKey === true) {
    gameOn = true;
    nextSequenceStep();
    gameStartingKey = false;
  }
})

$(".btn").on("click", function(event) {
  if (gameOn === true) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

  }
});


function checkAnswer(stepIndex) {

  if (userClickedPattern[stepIndex] === gamePattern[stepIndex]) {
    setTimeout(nextSequenceStep, 1000)
  } else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100)
    var sound = document.createElement("audio");
    sound.setAttribute("src", "wrong.mp3")
    sound.play();
    startOver();
  }

}

function startOver() {
  level = -1;
  gamePattern = [];
  userClickedPattern = [];
  gameStartingKey = true;
  $("#level-title").html("Game Over, Press any ket to restart...");

}


function nextSequenceStep() {
  var randomeNumber = Math.round(Math.random() * 3);
  level++;
  $("#level-title").html("level " + level);
  randomChoosenColor = buttonColors[randomeNumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);

}

// function nextSequence() {
//   var randomeNumber = Math.round(Math.random() * 3);
//   level++;
//   $("#level-title").html("level " + level);
//   return randomeNumber;
// }

function playSound(color) {
  var sound = document.createElement("audio");
  sound.setAttribute("src", color + ".mp3")
  sound.play();
}


function animatePressed(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");

  }, 100);
}
