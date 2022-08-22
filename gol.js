window.onresize = function () { location.reload(); }

let unitLength = 1;
const boxColor = 100;
const strokeColor = 0;
let columns; /* To be determined by window width */
let rows;    /* To be determined by window height */
let currentBoard;
let nextBoard;
let fr = 15;
let speedSlider;
let val;
let rbg = 'yellow';
let hexColorSelected = document.querySelector('#hexColor')
let keyPressedX = 0;
let keyPressedY = 0;
let pixelSlider;
let styleSlider;
let playground;
let gameBoard = document.querySelector('.game')
let score = 100;
let gameElem = document.querySelector('.gameStart')
let gameTitleElem = document.querySelector('.game-title');

let gameMode = false;

let over = document.querySelector('#overpopulation')
let overNum = 3;

let under = document.querySelector('#underpopulation')
let underNum = 2;

let rebirth = document.querySelector('#rebirth')
let rebirthNum = 3;

let pa3 = ['...............O...........',
    '.............OOO...........',
    '...OO.......O..............',
    '....O.......OO.............',
    '....O.O....................',
    '.....OO....................',
    '...........................',
    'OO.........................',
    '.O.........................',
    '.O.O.......................',
    '..OO.......................',
    '.........OOO.............OO',
    '........O...O............O.',
    '........OO.OO..........O.O.',
    '.......................OO..',
    '...........................',
    '..OO.......................',
    '.O.O..........OO.OO........',
    '.O............O...O........',
    'OO.............OOO.........',
    '.......................OO..',
    '.......................O.O.',
    '.........................O.',
    '.........................OO',
    '...........................',
    '....................OO.....',
    '....................O.O....',
    '.............OO.......O....',
    '..............O.......OO...',
    '...........OOO.............',
    '...........O...............']


let pa4 = ['...................OOO...............',
    '..................O..O...............',
    '............OOO......O....OOO........',
    '............O..O.O...O....O..O.......',
    '............O..O.O...O....O..O.......',
    '..........O..........O..O.O.OOO......',
    '..........OO..OO..O.O....O.....O.....',
    '........O................OO..OOO.....',
    '........OOO.O.OO..........O......O...',
    '......O........O.........O.O...OOO...',
    '......OOO.....O..........O........O..',
    '...O.O.........................O.OOO.',
    '..OOOOO.O..........................O.',
    '.OO......O.....................OOOOO.',
    'OO....OO..................O.O........',
    '.O.O...O..O...............O..O...O.O.',
    '........O.O..................OO....OO',
    '.OOOOO.....................O......OO.',
    '.O..........................O.OOOOO..',
    '.OOO.O.........................O.O...',
    '..O........O..........O.....OOO......',
    '...OOO...O.O.........O........O......',
    '...O......O..........OO.O.OOO........',
    '.....OOO..OO................O........',
    '.....O.....O....O.O..OO..OO..........',
    '......OOO.O.O..O..........O..........',
    '.......O..O....O...O.O..O............',
    '.......O..O....O...O.O..O............',
    '........OOO....O......OOO............',
    '...............O..O..................',
    '...............OOO...................']


let pa5 = ['....OO......OO....',
    '...O..O....O..O...',
    '...O.O......O.O...',
    '.OO..OOO..OOO..OO.',
    'O......O..O......O',
    'O.OO..........OO.O',
    '.O.O..........O.O.',
    '...OO...OO...OO...',
    '.......O.O........',
    '.......OO.........',
    '...OO........OO...',
    '.O.O..........O.O.',
    'O.OO..........OO.O',
    'O......O..O......O',
    '.OO..OOO..OOO..OO.',
    '...O.O......O.O...',
    '...O..O....O..O...',
    '....OO......OO....']



function setup() {
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth - 60, windowHeight - 200);
    canvas.parent(document.querySelector('#canvas'));
    speedSlider = createSlider(0, 30, 15, 0);
    speedSlider.style('width', '250px');
    speedSlider.parent(document.querySelector('.speed-bar'));
    frameRate(fr);

    pixelSlider = createSlider(5, 40, 17.5, 0);
    pixelSlider.style('width', '250px');
    pixelSlider.parent(document.querySelector('.pixel-bar'));

    styleSlider = createSlider(0, 20, 0, 0);
    styleSlider.style('width', '250px');
    styleSlider.parent(document.querySelector('.style-bar'));



    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = []
    }
    // Now both currentBoard and nextBoard are array of array of undefined values.
    init();  // Set the initial values of the currentBoard and nextBoard
}


/**
* Initialize/reset the board state
*/
function init() {
    loop();
    rbg = 'yellow';

    score = 100;
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }

}


function draw() {

    background(255);

    val = speedSlider.value();
    frameRate(val)

    //pixel control
    unitLength = pixelSlider.value();

    columns = floor(width / unitLength);
    rows = floor(height / unitLength);
    finishCol = 0.2;
    playground = columns * 0.8

    for (let i = 0; i < columns; i++) {
        if (currentBoard[i] === 0) {
            currentBoard[i] = [];
        }
        if (nextBoard[i] === 0) {
            nextBoard[i] = []
        }

    }


    generate();


    if (gameMode == false) {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                if (currentBoard[i][j] == 1) {
                    fill(rbg);
                    if (currentBoard[i][j - 1] == 1) {
                        fill(64, 186, 145);
                    }
                } else {
                    fill(0, 51, 102);
                }
                stroke(strokeColor);
                rect(i * unitLength, j * unitLength, unitLength, unitLength, styleSlider.value());
            }
        }

    } else {

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                if (currentBoard[i][j] == 1) {
                    fill(rbg);
                    if (currentBoard[i][j - 1] == 1) {
                        fill('red');
                    }
                }
                else if (i <= playground) {

                    fill(0, 51, 102);
                } else {
                    fill(71, 179, 89);
                }
                stroke(strokeColor);
                rect(i * unitLength, j * unitLength, unitLength, unitLength, styleSlider.value());
            }
        }
    }
}



function generate() {
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            if (currentBoard[x][y] == 1 && neighbors < underNum) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > overNum) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == rebirthNum) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];


            }


        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];

}




/**
 * When mouse is dragged
 */
function mouseDragged() {
    /**
     * If the mouse coordinate is outside the board
     */
    if (gameMode == true) {
        if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
            return;
        }
        const x = Math.floor(mouseX / unitLength);
        const y = Math.floor(mouseY / unitLength);
        let maxWidth = columns * unitLength * 0.8;
        //currentBoard[x][y] = 1;
        fill(132, 88, 88)
        stroke(strokeColor);
        rect(x * unitLength, y * unitLength, unitLength, unitLength, styleSlider.value());
        console.log(`X:${mouseX}, Y:${mouseY}, unitLength:${unitLength * x}, width:${maxWidth}`);

        if (currentBoard[x][y] == 0) {
            //currentBoard[x][y] = 1;
        } else if (currentBoard[x][y] == 1 && mouseX < maxWidth) {
            score -= 1
            gameTitleElem.innerHTML = `Your Score: ${score}`;
            currentBoard[x][y] = 1;
        }



        if (x * unitLength > maxWidth) {
            if (score == 100) {
                gameTitleElem.innerHTML = `Perfect! Your score is 100!`

            } else if (score >= 80) {
                gameTitleElem.innerHTML = `AWESOME! Your score is ${score}!`

            } else if (score >= 50) {
                gameTitleElem.innerHTML = `GREAT! Your score is ${score}!`

            } else if (score >= 0) {
                gameTitleElem.innerHTML = `TOO BAD! Your score is ${score}!`

            } else {
                gameTitleElem.innerHTML = `OH NO! Your score is ${score}!`


            }



        }
    } else {
        if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
            return;
        }
        const x = Math.floor(mouseX / unitLength);
        const y = Math.floor(mouseY / unitLength);
        let maxWidth = columns * unitLength * 0.8;
        currentBoard[x][y] = 1;
        fill(255);
        stroke(strokeColor);
        rect(x * unitLength, y * unitLength, unitLength, unitLength, styleSlider.value());
        console.log(`X:${mouseX}, Y:${mouseY}, unitLength:${unitLength * x}, width:${maxWidth}`);
    }

}


/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop();
    mouseDragged();

}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}


//reset
document.querySelector('.restart')
    .addEventListener('click', function () {
        init();
        gameMode = false;
        this.innerHTML = 'RESTART'
        gameTitleElem.classList.add('display-none')
        gameElem.innerHTML = 'GAME'

    });


// stop 
document.querySelector('.stop').addEventListener('click', function () {
    noLoop();
})

// start
document.querySelector('.start').addEventListener('click', function () {
    loop();
})


//color change

hexColorSelected.addEventListener('input', function () {
    let colorValue = hexColorSelected.value;
    rbg = ['0x' + colorValue[1] + colorValue[2] | 0, '0x' + colorValue[3] + colorValue[4] | 0, '0x' + colorValue[5] + colorValue[6] | 0];
    return rbg.join(',');
})


function keyPressed() {
    if (keyCode === 65) { //a
        noLoop();
        keyPressedX = keyPressedX - unitLength;

    } else if (keyCode === 68) { //d
        noLoop();
        keyPressedX = keyPressedX + unitLength;

    } else if (keyCode === 87) { //w
        noLoop();
        keyPressedY = keyPressedY - unitLength;

    } else if (keyCode === 83) { //s
        noLoop();
        keyPressedY = keyPressedY + unitLength;

    } else if (keyCode === 13) {
        loop();
    }

    if (keyPressedX > unitLength * columns || keyPressedY > unitLength * rows) {
        return;
    }

    const x = Math.floor(keyPressedX / unitLength);
    const y = Math.floor(keyPressedY / unitLength);
    currentBoard[x][y] = 1;
    fill(rbg);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);



}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}


over.addEventListener('input', function () {
    overNum = parseInt(over.value);
    return overNum;
}
)

under.addEventListener('input', function () {
    underNum = parseInt(under.value);
    return underNum;
}
)

rebirth.addEventListener('input', function () {
    rebirthNum = parseInt(rebirth.value);
    return rebirthNum;
}
)



function twoDArr(arr) {
    result = [];
    for (let i = 0; i < arr.length; i++) {
        let innerArr = [];
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 'O') {
                innerArr.push(1);
            } else {
                innerArr.push(0);
            }
        }
        result.push(innerArr);
    }
    return result;

}


function pattern(startX, startY, result) {
    let x = startX;
    let y = startY;
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            if (result[i][j] === 0) {
                currentBoard[j + x][i + y] = 0;
            } else {
                currentBoard[j + x][i + y] = 1;
            }
        }

    }
}


gameElem.addEventListener('click', function () {
    gameMode = true;
    gameTitleElem.classList.remove('display-none')
    document.querySelector('.restart').innerHTML = "QUIT GAME";
    this.innerHTML = "RESTART";
    init();
    let pattern1 = twoDArr(pa5);
    let pattern2 = twoDArr(pa3);
    pattern(3, 2, pattern1);

    pattern(24, 0, pattern1);

    pattern(45, 2, pattern1);

    pattern(4, 22, pattern1);

    pattern(24, 20, pattern1);

    pattern(46, 22, pattern1);



    score = 100;
    gameTitleElem.innerHTML = `Your Score: ${score}`;

})
