
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {

    if (!started) {

        $("#level-title").text("Level " + level);
        newSequence();
        started = true;

    }

});

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
   
    playSound(userChosenColor);

    animatedPress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

    if ( gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                newSequence();
              }, 1000);

        }

    } else {

        console.log("Wrong"); 

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("Game Over! <br> Press any keyboard-key to Re-start")

        startOver();

    }

}

function startOver() {

    level = [];
    gamePattern = [];
    started = false;

}

function newSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatedPress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

