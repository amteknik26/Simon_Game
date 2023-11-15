var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //Computer generated pattern
var userClickedPattern = []; //Users' pattern
var started = false; //Keeping track if the game has started or not
var level = 0; //Used to show the current level in the h1 tag



//Code that detects any keboard keypress across the webpage/document. This piece of code is only executed at the start 
// of the game. Thats why we use 'started' variable. If its false then game begins and the 'nextSequence()' function
// is called.
$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});


//Keeps track of user clicked colors. And appends the clicked color to the 'userClickedPattern' array. Plays the corresponding sound
//and then animated the keys. 'checkAnswer' is called on the latest clicked color of the user. That is userClickedPattern-1 th color.
//For ex: if userclickedPattern = ['red' , ' green' , 'blue'], The latest color is blue which is located at the index
//userClickedPattern.length - 1
$(".btn").click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

//Computer generates pattern inside this function and stores in 'gamePattern' 
//Resets userPattern for every new level. Increments level counter by 1. Updates the title to show new updated level count
//Random number is chosen between 0 and 3. And that number is used to choose a color from 'buttonColours'. The resultant
//Color is pushed into 'gamePattern'. Matching sound is played and animation is addded for computer generaed pattern.
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var colorObject = ($("#" + randomChosenColour));
    colorObject.fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
}

//Answer is checked if the latest element in userPattern and gamePatten is matching. If the latest elemnt  is matching,
//Then checkAnswer does nothing and waits for users next clicked color. 
//If the pattern is matching and the matched element is the last element of the game pattern. Then the level is completed 
//and next level is started using nextSequence.
//If at any point of time, user clicks the wrong color, then else block executes where
//Where audio and animation is played and startOver() is called to start newgame 
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//Function is called when user makes wrong move. Reset the parameters for the new game.Started is set to false thereby starting 
//newgame with a key press
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//Plays the corresponding sound.
function playSound(name) {
    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

//Animation for users pattern
function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");
    setTimeout(function () {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}