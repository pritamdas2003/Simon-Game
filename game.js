var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keydown(function () {
    if (!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var random = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[random];
    gamePattern.push(randomChosenColour);
    // $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    // playSound(randomChosenColour);
    var i = 0;
    (function loop() {
        $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        if (++i < gamePattern.length) {
            setTimeout(loop, 1000);
        }
    })();
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currLevel) {
    if (gamePattern[currLevel] === userClickedPattern[currLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("#level-title").html("GAME OVER <p>Press Any Key to Restart</p>");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}