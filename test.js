
let pa = [
    '.0.....', '...0...', '00..000']

/*  .O.....
    ...O...
    OO..OOO
*/

let pa2 = ['.0000.',
    '0....0',
    '.000.0',
    '...0.00']



let pa3 = ['................................O.O.......................',
    '................................OO........................',
    '.................................O........................',
    '..........................................................',
    '..........................................................',
    '..........................................................',
    '..........................................................',
    '................OO........................................',
    '................OO....................O...................',
    '...........................O.O......OOO...................',
    '...........................OO......O......................',
    '............................O......OO.....................',
    '..........................................................',
    '..........................................................',
    '..........................................................',
    'OO........................................................',
    'OO........................................................',
    '......................................OO...............O..',
    '...........OO.........................OO...............O..',
    '...........OO..........................................OOO',
    '.......................OO................................O',
    '........O..........OO..OO.................................',
    '......OOO..........OO.....................................',
    '.....O....................................................',
    '.....OO........................OO.........................',
    '.................OO............O..........................',
    '.................OO......O......OOO.......................',
    '........................O.O.......O.......................',
    '.........................O................................']

let result;

function twoDArr(arr) {
    result = [];
    for (let i = 0; i < arr.length; i++) {
        let innerArr = [];
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 'O') {
                innerArr.push(0);
            } else {
                innerArr.push(1);
            }
        }
        result.push(innerArr);
    }
    return result;

}

twoDArr(pa3)
console.log(result)



function pattern(startX, startY, result) {
    let x = startX;
    let y = startY;
    for (let i = 0; i < result.length; i++) {
        y = y + 1;
        for (let j = 0; j < result[i].length; j++) {
            x = x + j;
            currentBoard[y][x] = pattern[i][j];
        }
    }

}

console.log(pattern(10, 10, twoDArr(pa2)))



for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
        if (currentBoard[i][j] == 1) {
            fill(rbg);
            if (currentBoard[i][j - 1] == 1) {
                fill(64, 186, 145);
            }
        }
        else if (i <= playground) {

            fill(0, 51, 102);
        } else {
            fill(255, 153, 51);
        }
        stroke(strokeColor);
        rect(i * unitLength, j * unitLength, unitLength, unitLength, styleSlider.value());
    }
}