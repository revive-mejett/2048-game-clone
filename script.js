'use strict';



document.addEventListener('DOMContentLoaded', setup);
const grid = [[2,4,4,8],[0,0,16,16],[32,16,0,4],[16,0,0,4]];
const GRID_SIZE = 4;
function setup() {

    console.table(grid)

    leftOption()
    console.table(grid)

    const arr = [2,2,2,2]
    while (findEqualAdjacent(arr)) {
        arr = stackArray(arr);
        console.log(arr);
    }


    
}

function stackArray(arr) {

    let mergeOccured = false;
    arr.forEach((element, index) => {
        if (index < arr.length - 1 && !mergeOccured) {
            if (element == arr[index + 1]) {
                arr[index] = element + arr[index + 1];
                //splitting algorithm to remove the next value that has been added.
                arr = arr.filter((v,i) => i !== index + 1);
                
                mergeOccured = true;
            }
            // console.log('pass ' + index + ': ' + arr);
        }
    })
    while (arr.length < GRID_SIZE) {
        arr.push(0);
    }


    return arr;
}


function leftOption() {
    //algorithm: take the first row (extract, then shift/slide the first non0 to left) and then perform the stacking algorithm
    //after stack insert the stacked array into the grid

    //do this for each row.
    for (let i = 0; i < grid.length; i++) {
        let row = extractRow(i);
        row = shiftArrayElements(row);
        row = stackArray(row);
        replaceRow(row, i);
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
    return arr
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

