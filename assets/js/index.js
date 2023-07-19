let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let user = [];

let level = 1;
let start = false

$(document).keypress(() => {
    if(!start){
        nextSequence();

        start = true;
    }
});

$(document).click(() => {
    if(!start){
        nextSequence();

        start = true;
    }
});

$('.btn').click(function() {
    let idColor = $(this).attr('id');

    user.push(idColor);

    playSound(idColor);
    animatePress(idColor);
    checkAnswer(user.length - 1);
});

function nextSequence() {
    $('h1').text('Level ' + level);

    level++;

    user = [];

    let randNum = Math.floor(Math.random() * 4);

    gamePattern.push(buttonColours[randNum]);

    let i = 0;
    function myLoop() {
        setTimeout(function() {
            $('#' + gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);

            i++;

            if(i < gamePattern.length){
                myLoop();
            }
        }, 300);
    }
    myLoop();
}

function playSound(name){
    let audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(color) {
    let button = $('#' + color);

    button.addClass('pressed');
    setTimeout(() => {
        button.removeClass('pressed');
    }, 100);
}

function checkAnswer(pos) {
    if(gamePattern[pos] === user[pos]){
        console.log('pass');

        if(gamePattern.length === user.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        $('h1').text('Game Over, press any key to restart');

        playSound('wrong');

        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        setTimeout(() => {
            startOver();
        }, 500);
    }
}

function startOver() {
    gamePattern = [];
    level = 1;
    start = false;
}