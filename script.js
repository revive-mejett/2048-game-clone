'use strict';



document.addEventListener('DOMContentLoaded', setup);
const grid = [[16,0,8,16],[0,0,2,4],[4,4,4,8],[128,0,2,4]];
const GRID_SIZE = 4;
function setup() {

    console.table(grid)

    makeMove(true, false, true)
    console.table(grid)

    
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
        console.log('akshan pass ' + (i+1))
        let numbers;

        // if (isUpDown) {
        //     numbers = extractColumn(i);
        // } else {
        //     numbers = extractRow(i);
        // }
        numbers = isUpDown ? extractColumn(i) : extractRow(i);

        if (isRight || isDown) {
            numbers = numbers.reverse()
        }
        console.log('extracted: ' + numbers)
        numbers = shiftArrayElements(numbers);
        
        numbers = stackArray(numbers);
        while (findEqualAdjacent(numbers)) {
            numbers = stackArray(numbers);
            console.log('stacked: ' + numbers)
            numbers = shiftArrayElements(numbers);
            console.log('shifted: ' + numbers)
        }

        if (isRight || isDown) {
            numbers = numbers.reverse()
        }

        // if (isUpDown) {
        //     replaceColumn(numbers, i);
        // } else {
        //     replaceRow(numbers, i);
        // }
        isUpDown ? replaceColumn(numbers, i) : replaceRow(numbers, i);
    }

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
    while(arr[0] == 0) {
        arr.shift();
        arr.push(0);
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

