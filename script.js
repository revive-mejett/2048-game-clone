'use strict';



document.addEventListener('DOMContentLoaded', setup);
const grid = [[16,0,4,16],[16,0,4,16],[16,0,4,16],[16,0,4,16]];
const GRID_SIZE = 4;
function setup() {


    let test = [0,4,16,0];
    console.log(test);
    test = shiftArrayElements(test)
    console.log(test)
    let arr = [4,4,16,16];
    console.log(arr);
    arr.reverse();
    console.log(grid);

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
                arr = arr.filter((v,i) => i !== index + 1);
                //splitting algorithm to remove the next value that has been added.
                mergeOccured = true;
            }
            console.log('pass ' + index + ': ' + arr);
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