/*-------------------------------- Constants --------------------------------*/
const win_combos = [
    [1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,1],
    [1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,1,0],
    [0,0,1,0,0,1,0,0,1],
    [1,0,0,0,1,0,0,0,1],
    [0,0,1,0,1,0,1,0,0]
];


/*---------------------------- Variables (state) ----------------------------*/
let board = [0,0,0,0,0,0,0,0,0];
let turn = 'o';
let winner = false;
let tie = false;
let turnCount = 0;



/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEL = document.querySelector('#message')
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset')




/*-------------------------------- Functions --------------------------------*/
const response = (element) => {
    idx = Number(element.target.id)

    if (winner || tie) {
        return
    }
    if (board[idx] !== 0) {
        console.log('invalid move')
        return 
    }
    
    if (turn === 'o') {
        board[idx] = 1
        squareEls[idx].textContent = "O"
  
    } else { //x's turn
        board[idx] = -1
        squareEls[idx].textContent = "X"
    }

    if (isWin(turn)) {
        winner = true
    }

    turnCount++
    if (turnCount >= 9) {
        tie = true;
    }

    if (turn === 'o') {
        turn = 'x'
    } else {
        turn = 'o'
    }

    //! The turns have flipped!
    if (winner === true) {
        if (turn === 'o') {
            messageEL.textContent = "X wins!"
        } else {
            messageEL.textContent = "O wins!"
        }
        return
    }

    if (tie === true) {
        messageEL.textContent = "Tie Game! Reset to play again."
        return
    }

    if (turn === 'x') {
        messageEL.textContent = "X's turn";
    } else {
        messageEL.textContent = "O's turn";
    }
}

const init = () => {
    turnCount = 0;
    messageEL.textContent = "O's Turn!"
    tie = false;
    winner = false;
    board = [0,0,0,0,0,0,0,0,0]
    turn = 'o';
    for(let i = 0; i < 9; i++) {
        squareEls[i].textContent = "";
    }
}

const addVector = (vectA, vectB) => {
    if (vectA.length !== vectB.length) {
        return 
    } else {
        let outputVect = []
        for (let i = 0; i < vectA.length; i++) {
            outputVect[i] = vectA[i] + vectB[i]
        }
        return outputVect;
    }
}

const subVector = (vectA, vectB) => {
    if (vectA.length !== vectB.length) {
        return 
    } else {
        let outputVect = []
        for (let i = 0; i < vectA.length; i++) {
            outputVect[i] = vectA[i] - vectB[i]
        }
        
        return outputVect;
    }
}

const binaryVector = (vect) => {
    outputVect = []
    for (let i = 0; i < vect.length; i++) {
        if (vect[i] === 2 | vect[i] === -2) {
            outputVect[i] = 1;
        } else {
            outputVect[i] = 0;
        }
    }
    return outputVect
}

const arraysAreEqual = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++ ) {
        if(arr1[i] !== arr2[i]) {
            return false
        }
    }
    return true
}

const isWin = (turn) => {
    match = false
    win_combos.forEach((win_combo) => {
        if (turn === 'o') {
            temp = binaryVector(addVector(win_combo, board))
        } else {
            temp = binaryVector(subVector(win_combo, board))
        }
        
        if (arraysAreEqual(temp, win_combo) === true) {
            match = true
        }
    })
    return match
}

const isTie = () => {
    tie = true
    board.forEach((element) => {
        if (element === 0) {
            tie = false
        } 
    })
}

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', response)
resetBtnEl.addEventListener('click', init)
init()