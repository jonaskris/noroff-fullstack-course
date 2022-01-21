const inputNumberElement = document.getElementById("input-number");
const resultStringElement = document.getElementById("result-string");

/*
    Performs a single iteration of faro shuffle.
    The input array is split in half, then the two halves are 
    interleaved beginning with the first half.
*/
function faroShuffle(array) {
    let indexHalf = Math.ceil(array.length / 2);
    let iterations = array.length - indexHalf;

    for(let i = 0; i < iterations; i++){
        array.splice(i*2+1, 0, array.splice(indexHalf+i, 1));
    }
}

function shuffleCount(num) {
    let originalArray = [];
    for(let i = 0; i < num; i++) { originalArray.push(i+1); }
    
    let shuffledArray = Array.from(originalArray);

    /*
        Apply faroShuffle to shuffledArray until equals originalArray.
        The array is logged to console for each step.
    */
    console.log("" + originalArray);
    let iterations = 1;
    faroShuffle(shuffledArray);
    console.log("" + shuffledArray);
    while(!arrayEqualPerElement(originalArray, shuffledArray)) {
        faroShuffle(shuffledArray);
        iterations++;
        console.log("" + shuffledArray);
    }

    return iterations;
}

function arrayEqualPerElement(array1, array2) {
    for(let i = 0; i < array1.length; i++) {
        if(array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}

function runFaroShuffle(){
    let inputNumber = parseInt(inputNumberElement.value);

    if(inputNumber <= 2) {
        window.alert("Input number must be greater than 2!");
        return;
    }

    let iterationCount = shuffleCount(inputNumber);
    resultStringElement.innerText = "An array of size: '" + inputNumber + "' takes '" + iterationCount + "' iterations to return to the original.";
}