var buttonColours=["red", "blue", "green", "yellow"]; 
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


$(document).keydown(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function(){

    
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern=[];
    level++
    $('#level-title').text('Level '+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log('success')
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var wrongAudio=new Audio('sounds/wrong.mp3');
        console.log('Wrong');
        wrongAudio.play();
        $('#level-title').text('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        startOver();
    }   
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}