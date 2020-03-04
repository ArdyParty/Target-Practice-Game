// Constants //

const DEFAULT_CELL_COLOR = "rgba(255,255,255,0.5)";
const DEFAULT_CELL_BG_IMG = "url()";

// Game State //

let playing;
let score = 0;
let highScore = 0;
let prevTarget;
let target;
let targetTimerId;
let timerSpeed;
let gameFinished;
let timeLeft = 30;
let timerId;

// Cached DOM Elemebts //

let gameTableEl = document.getElementById('gameTable');
let boardEl = document.getElementById('gameTableBody');
let scoreEl = document.getElementById('pScorVal');
let timeEl = document.getElementById('timVal');
let highScoreEl = document.getElementById('hScorVal');
let headerThree = document.getElementById('h3');

// Event Listeners //

gameTableEl.addEventListener('click', handleTableClick);
boardEl.addEventListener('click', handleBoardClick);

// functions //

init();

    // selecting random number attributed to cells' ID

function selectTarget() {
    return Math.floor(Math.random() * 96) +1;
}

    // trying out a timer function. 


function countdown() {
    if (timeLeft === 0) {
        timeEl.innerHTML = `${timeLeft} Seconds left`;
        stopGame();

        // doSomething();
    } else {
        timeLeft--;
        timeEl.innerHTML = `${timeLeft} Seconds left`;
    }
}

    // initial state of game

function init() {
    timeLeft = 30;
    playing = false;
    score = 0;
    prevTarget = null;
    target = null;
    gameFinished = false;
    timerSpeed = 2000;
    render();
}

    // render function will now:
        // revert state of the previous target's styling and class to default
        // add new target styling. 

function render() {
    //reset prev target styling
    if (prevTarget) {
        let prevTargetEl = document.getElementById(`c${prevTarget}`);
        prevTargetEl.style.backgroundColor = DEFAULT_CELL_COLOR;
        prevTargetEl.style.backgroundImage = DEFAULT_CELL_BG_IMG;
        prevTargetEl.classList.toggle('active');
    }
    //new target:
    if (target) {
        if (playing === true) {
            let targetEl = document.getElementById(`c${target}`);
            targetEl.classList.add('active');
            targetEl.style.backgroundImage = "url('css/images/clean-target.png')";
        }
    }
    //keep score up to date:
    scoreEl.innerHTML = score;
}

    // FUNCTINO WILL RUN startGame IF TABLE IS CLICKED

function handleTableClick(evt) {
    if (!playing && !gameFinished) {
        startGame()
    }
}

    // listens if board has been clicked. runs handleTargetClick function if class is active and playing is true

function handleBoardClick(evt) {
    if (playing && evt.target.classList.contains('active')) {
        handleTargetClick(evt)
    }
}

    // target being clicked will change background image to bullet hole img
    // will run changeTarget and Render function after .15 seconds. 

function handleTargetClick(evt) {
    score += 1
    evt.target.style.backgroundImage = "url('css/images/Bullet-hole.png')";
    setTimeout(() => {
        changeTarget();
        render();
    }, 150);
}

// changes curser icon and playing will equal true. run render and changeTarget

function startGame() {
    console.log('start game')
    headerThree.innerHTML = 'YOU GOT THIS !!'
    gameTableEl.style.cursor = "url('css/images/cursor-logo.png') 20 20, default";
    playing = true
    // start timer
    timerId = setInterval(countdown, 1000);
    changeTarget()
    render()
}

function stopGame() {
    clearTimeout(timerId);
    if (score > highScore) {
        highScore = score;
        highScoreEl.innerHTML = `${highScore}`;
    }
    gameTableEl.style.cursor = "default";
    playing = false;
    gameFinished = true;
    prevTarget = target
    target = null
    headerThree.innerHTML = 'GAME OVER !!'
    render();
    setTimeout(() => {
        headerThree.innerHTML = 'CLICK ANYWHERE BELOW TO RESTART'
        init();
    }, 3000)
}

function changeTarget() {
    if (playing === true) {
        clearTimeout(targetTimerId)
        prevTarget = target
        target = selectTarget() 
        while (target === prevTarget) {
            target = selectTarget()
        }
        targetTimerId = setTimeout(() => {
            changeTarget()
            render()
        }, timerSpeed)
    }
}












