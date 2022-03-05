'use strict'



document.addEventListener('DOMContentLoaded', setup);


function setup() {
    const arr = [1,2,3];
    arr[1] = 404;

    console.log(arr);
}