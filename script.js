'use strict'



document.addEventListener('DOMContentLoaded', setup);


function setup() {


    let arr = [16,128,0,0];

    console.log(arr)
    while (findEqualAdjacent(arr)) {
        arr = stackArray(arr)
        console.log(arr)
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
    while (arr.length < 4) {
        arr.push(0);
    }


    return arr
}

function findEqualAdjacent(arr) {
    return arr.find((v,i) => v == arr[i+1])
}