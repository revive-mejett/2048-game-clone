'use strict'



document.addEventListener('DOMContentLoaded', setup);


function setup() {
    let arr = [64,16,16,4];

    console.log(arr)
    const stacked = [];

    arr.forEach((element, index) => {
        if (index < arr.length - 2) {
            if (element == arr[index + 1]) {
                stacked[index] = element + arr[index + 1];
                //splitting algorithm to remove the next value that has been added.
                const rightSplit = arr.splice(index + 1)
                rightSplit.shift()
                rightSplit.forEach(val => arr.push(val))
            } else {
                stacked[index] = element;
            }

        }
    });

    console.log(stacked)
    console.log(arr)
}

function stackArray(arr) {

}