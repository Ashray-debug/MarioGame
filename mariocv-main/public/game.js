var ismobile = navigator.userAgent.match(/(iPhone)|(iPod)|(android)|(webOS)|(BlackBerry)/i);
var scroll_x;
$(window).resize(function(){
     scroll_x = $(window).width() / 2;
});



var floor_x = 0;
var mario_x = 0;
var direction = false;
var music_play = false;
var interval_left = false;
var interval_right = false;


if (ismobile) scroll_x -= 170;
else scroll_x -= 100;

$('#scroll').css('left', scroll_x + '100px');

$('.tweet').click(function () {
    window.open('https://twitter.com/intent/tweet?text=' + document.title + '&tw_p=tweetbutton&url=' + document.location.href);
    return false;
});

function moveTo(pos) {

    diff = ismobile ? 10 : 15;

    if (pos == 'left') {

        if (!direction) {
            direction = 'left';
            $('#mario').css('-webkit-transform', 'scaleX(-1)');
        }
        floor_x += diff;
        scroll_x += diff;
        mario_x -= 65;
        if (mario_x == -195) mario_x = 0;

    } else if (pos == 'right') {

        if (!direction) {
            direction = 'right';
            $('#mario').css('-webkit-transform', 'scaleX(1)');
        }
        floor_x -= diff;
        scroll_x -= diff;
        mario_x -= 65;
        if (mario_x == -195) mario_x = 0;

    } else {
        direction = false;
    }


    // reach end
    if (scroll_x < (parseInt($('#scroll').css('width')) * -1)) {
        scroll_x = $(window).width();


        // reach start
    } else if (scroll_x > $(window).width()) {
        scroll_x = parseInt($('#scroll').css('width')) * -1;
    }

    $('#scroll').css('left', scroll_x + 'px');
    $('#floor').css('background-position-x', floor_x + 'px');
    $('#mario').css('background-position-x', mario_x + 'px');
}


// function playMusic() {
//     if (!music_play) {
//         document.getElementById("bg_music").play();
//         music_play = true;
//     }
// }

function moveLeft() {
    // playMusic();

    direction = false;
    if (!interval_left) {
        interval_left = setInterval(function () {
            moveTo('left');
        }, 100);
    }
}

function moveRight() {
    // playMusic();

    direction = false;
    if (!interval_right) {
        interval_right = setInterval(function () {
            moveTo('right');
        }, 100);
    }
}

function stopMove() {
    clearInterval(interval_left);
    clearInterval(interval_right);
    interval_left = false;
    interval_right = false;
}




$(function () {

    $("body, #scroll").click(function () {
        // playMusic();
    });

    $("body").keydown(function (e) {
        if (e.keyCode == 37) {
            moveLeft();
        } else if (e.keyCode == 39) {
            moveRight();
        }
    });

    $("body").keyup(function (e) {
        stopMove();
    });

    $('#btn_left').on('mousedown touchstart', function () {
        moveLeft();
    });

    $('#btn_right').on('mousedown touchstart', function () {
        moveRight();
    });

    $('#btn_left, #btn_right').on('mouseup touchend', function (event) {
        stopMove();
    });

});


let score=0;
fetch('http://localhost:8000/getCourseById?course=624c78e2a62f475c8b6a60ee').then((data) => {
    return data.json();
}).then((completedata)=>{

    console.log(completedata.data.levels[0].bginfolist[0].bgtext)

    for (let i = 0; i <completedata.data.levels[0].bginfolist.length ; i++) {
        let data1= `
                <div>
                <center>
                       <h1>${completedata.data.levels[0].bginfolist[i].bginfotitle}</h1>
                      
                       <p>${completedata.data.levels[0].bginfolist[i].bgtext}</p>
                       
                       <button type="button" class="btn btn-success completedBtn">Complete</button></center>
                       
                </div>`;


        let elementId = "box"+(i+1);

        if(document.getElementById(elementId) == null){
            console.log("not found")
        }
        else{
            console.log("found")
            document.getElementById(elementId).innerHTML=data1;
        }

    }
    // if(document.getElementById('completedBtn').onclick === true)
    // {
    //     console.log("btnClicked");
    //     score+=10;
    //     document.getElementById('cPercent').innerHTML=score;
    // }

    let completedbtns = document.getElementsByClassName('completedBtn');

    for (const completedbtn of completedbtns) {

        completedbtn.onclick = () =>
        {
            console.log("btnClicked");
            score+=10;
            document.getElementById('cPercent').innerHTML=score;
            completedbtn.disabled = true;

            if(score === 30){
                let element = document.getElementById("successBanner")
                element.style.visibility = 'visible';     // Show

            }
        }
    }
})

