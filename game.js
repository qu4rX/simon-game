var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(50).fadeOut(50).fadeIn(50);
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3")
    audio.play();

}

$(".btn").click(function playSound(name) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    var audio = new Audio("sounds/" + userChosenColor + ".mp3")
    audio.play();
    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function () {
        $("#" + userChosenColor).removeClass("pressed")
    }, 100)
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        var gover = new Audio("sounds/wrong.mp3");
        gover.play();

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");   
        startOver();
    }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = []; 
}


