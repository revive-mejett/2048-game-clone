'use strict';



document.addEventListener('DOMContentLoaded', setup);

const grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
const GRID_SIZE = 4;


        
/*
//if you want to get the game to keep stacking numbers even if a merge has already occured, set repeatedStacking to true
ex: 2 2 4 8
a move right will give you 0 4 4 8 wihout repeated stack/merging
a move right will give you 0 0 0 16 if you repeat stacking
*/
const repeatedStacking = false;
function setup() {

    placeNewNumber();
    updateGrid();

    document.addEventListener('keypress', evt => keyInputHandler(evt))
}

function keyInputHandler(evt) {
    const keyInput = evt.key.toLowerCase();
    console.log(keyInput);

    switch (keyInput) {
        //left
        case 'a':
            makeMove(false, false, false)
            break;
        //right
        case 'd':
            makeMove(false, true, false)
            break;
        //up
        case 'w':
            makeMove(true, false, false)
            break;
        //down
        case 's':
            makeMove(true, false, true)
            break;
        default:
            break;
    }
}
function stackArray(arr) {

    let isModified = false;
    arr.forEach((element, index) => {
        if (index < arr.length - 1 && !isModified) {
            if (element == arr[index + 1]) {
                arr[index] = element + arr[index + 1];
                //splitting algorithm to remove the next value that has been added.
                arr = arr.filter((v,i) => i !== index + 1);
                
                isModified = true;
            }
            // console.log('pass ' + index + ': ' + arr);
        }
    })
    while (arr.length < GRID_SIZE) {
        arr.push(0);
    }


    return arr;
}


function makeMove(isUpDown, isRight, isDown) {
    for (let i = 0; i < grid.length; i++) {


        let numbers = isUpDown ? extractColumn(i) : extractRow(i);

        if (isRight || isDown) {
            numbers = numbers.reverse()
        }
        console.log('extracted: ' + numbers)

        numbers = shiftArrayElements(numbers);
        numbers = stackArray(numbers);
        numbers = shiftArrayElements(numbers);

        
        if (repeatedStacking) {
            while (findEqualAdjacent(numbers)) {
                numbers = stackArray(numbers);
                numbers = shiftArrayElements(numbers);
                
                
            }
        }
        
        console.log(numbers)
        if (isRight || isDown) {
            numbers = numbers.reverse()
        }

        isUpDown ? replaceColumn(numbers, i) : replaceRow(numbers, i);
    }
    placeNewNumber()
    updateGrid() //update the grid after
}



function findEqualAdjacent(arr) {
    return arr.find((v,i) => v == arr[i+1])
}

/**Removes all leading 0-entries till first non-0 entry and places them at the end, sliding the row.
 * 
 * @param {Array} arr 
 * @returns an "shifted array"
 */
function shiftArrayElements(arr) {
    while(arr[0] == 0 && arr.find(v => v != 0)) {
        arr.shift();
        arr.push(0);
        console.log('akshan')
    }

    let squishedZeros = true;
    while (squishedZeros) {
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == 0 && i != arr.length - 1) {
                arr = arr.filter((v,index) => i !== index);
                arr.push(0);
                squishedZeros = true;
                break;
            }
        }
        squishedZeros = false;
        return arr
    }
    
}

/**Extracts a row from the grid (2d array)
 * 
 * @param {int} rowIndex 
 * @returns an array of the extracted row
 */
function extractRow(rowIndex) {
    return grid.find((row, index) => index == rowIndex);
}


/**Extracts a column from the grid (2d array)
 * 
 * @param {int} rowIndex 
 * @returns an array of the extracted column
 */

function extractColumn(colIndex) {
    const extracted = [];

    grid.forEach((row, index) => {
        extracted.push(row.find((v, index) => index == colIndex));
    });
    return extracted;
}

/**Replaces a row given an row index from the grid (2d array) by a new row 
 * @param {Array} newRow 
 * @param {int} rowIndex 
 */
function replaceRow(newRow, rowIndex) {
    grid[rowIndex] = newRow;
}

/**Replaces a column given an column index from the grid (2d array) by a new column
 * 
 * @param {*} newColumn 
 * @param {*} colIndex 
 */
function replaceColumn(newColumn, colIndex) {
    for (let i = 0; i < grid.length; i++) {
        grid[i][colIndex] = newColumn[i];
    }
}


//FUNCTIONS FOR CONTROLLING THE TALBE IN THE DOM AKSHAN!

function updateGrid() {
    
    let table = document.querySelector('table');

    if (table) {
        table.textContent = undefined;
    } else {
        table = document.createElement('table');
        document.querySelector('#grid-section').appendChild(table)
    }

    for (let i = 0; i < GRID_SIZE; i++) {
        const newRow = document.createElement('tr');
        for (let j = 0; j < GRID_SIZE; j++) {
            const newCell = document.createElement('td');
            newCell.textContent = grid[i][j];
            newCell.setAttribute('class', `n${grid[i][j]}`)
            newRow.appendChild(newCell)
        }
        table.appendChild(newRow)
        console.log('akshan new row appeneded');
    }


}

function placeNewNumber() {

    //pick a number between 0 and 7
    //mostly will spawn 2's but make is so there is a 1/8 change of spawning a 4
    const randInt = randomInt(8)
    const newNumber = randInt == 0 ? 4 : 2;

    let randRowIndex = randomInt(GRID_SIZE);
    let randColIndex = randomInt(GRID_SIZE);
    console.log(grid)
    //pick a new cell by random if the cell value isnt 0
    while (grid[randRowIndex][randColIndex] != 0) {
        randRowIndex = randomInt(GRID_SIZE);
        randColIndex = randomInt(GRID_SIZE);
        console.log('akshan')
    }
    grid[randRowIndex][randColIndex] = newNumber;
}


function randomInt(max) {
    return Math.floor(Math.random()*max);
}
