'use strict';



document.addEventListener('DOMContentLoaded', setup);
const grid = [[2,4,4,8],[0,0,16,16],[32,16,0,4],[16,0,0,4]];
const GRID_SIZE = 4;
function setup() {


    let arr = [4,4,16,16];
    console.table(grid)
    console.log(extractColumn(0))

    console.log(arr)
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


    return arr
}

function findEqualAdjacent(arr) {
    return arr.find((v,i) => v == arr[i+1])
}

function shiftArrayElements(arr) {
    while(arr[0] == 0) {
        arr.shift();
        arr.push(0);
    }
    return arr
}

/**Extracts a row from the grid
 * 
 * @param {Number} rowIndex 
 * @returns an array of the extracted row
 */
function extractRow(rowIndex) {
    return grid.find((row, index) => index == rowIndex);
}

function extractColumn(colIndex) {
    const extracted = [];

    grid.forEach((row, index) => {
        extracted.push(row.find((v, index) => index == colIndex));
    });
    return extracted;
}