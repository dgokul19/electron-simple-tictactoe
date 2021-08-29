let showDiv = document.querySelector('.timer_set'),
    player_1 = document.querySelector('#player_1'),
    player_2 = document.querySelector('#player_2'),
    boxList = document.querySelectorAll('.box'),
    countX = document.querySelector('#playX'),
    countY = document.querySelector('#playY');

let startTimer,
play1 = 'X',
play2 = 'O';

let currentPlayer = play1, matchWon;

let gameList = ['','','','','','','','',''];

let possibleWin = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


const handleResult = () => {
    for (let i in possibleWin){
        const winCond = possibleWin[i];

        let a = gameList[winCond[0]];
        let b = gameList[winCond[1]];
        let c = gameList[winCond[2]];

        if((a == '' || a == undefined) || (b == '' || b == undefined) || (c == '' || c == undefined)){
            continue;
        }
        if (a === b && b === c) {
            matchWon = true;

            if (a === 'X') {
                countX.textContent = Number(countX.textContent) + 1;
                alert('Player A won the set');
            } else {
                countY.textContent = Number(countY.textContent) + 1;
                alert('Player B won the set');
            }
            restartGame();
            break;
        }
    }
};

const restartGame = () => {
    currentPlayer = play1;
    player_1.classList.add("activePlayer");
    player_2.classList.remove("activePlayer");
    gameList = ['','','','','','','','','']
    boxList.forEach(elem => {
        elem.textContent = '';
        elem.style.pointerEvents = 'all';
    });
}

const triggerMe = (id) => {
    let element = document.getElementById(id);
    gameList[id] = currentPlayer;

    if (currentPlayer === play1) {
        element.textContent = play1;
        currentPlayer = play2;
        player_2.classList.add("activePlayer");
        player_1.classList.remove("activePlayer");
    } else {
        element.textContent = play2;
        currentPlayer = play1;
        player_1.classList.add("activePlayer");
        player_2.classList.remove("activePlayer");
    }
    element.style.pointerEvents = 'none';
    handleResult();
}

const startGame = () => {
    let totalMinutes = (60 * 3) - 1;
    initiateTimer(totalMinutes);
    player_1.classList.add("activePlayer");
    boxList.forEach(elem => {
        elem.style.pointerEvents = 'all';
    });
    document.querySelector('.succ').style.pointerEvents = 'none';
    document.querySelector('.succ').style.opacity = '.6';
}

const resetGame = () => {
    clearInterval(startTimer);
    player_1.classList.add("activePlayer");
    player_2.classList.remove("activePlayer");
    countX.textContent = '0';
    countY.textContent = '0';

    showDiv.textContent = '00:00';
    currentPlayer = play1;
    gameList = ['','','','','','','','','']
    boxList.forEach(elem => {
        elem.textContent = '';
        elem.style.pointerEvents = 'none';
    });
    document.querySelector('.succ').style.pointerEvents = 'all';
    document.querySelector('.succ').style.opacity = '1';
};


const initiateTimer = (duration) => {
    timer = duration;
    startTimer = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        showDiv.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    },1000);
    
}