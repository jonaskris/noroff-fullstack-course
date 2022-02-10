const inputArrayElement = document.getElementById("input_array"); 
const outputTextElement = document.getElementById("output_text"); 

/*
    A countdown sequence is a descending sequence of k integers from k down to 1 (e.g. 5, 4, 3, 2, 1). 
    Write a function that returns an array of the form[x, y] where x is the number of countdown sequences
    in the given array and y is the array of those sequences in the order in which they appear in the 
    array.
*/
function countCountdowns(array) {
    let countdownSequences = [];

    let indexStartCount = 0;
    for(let i = 0; i < array.length; i++) {        
        // Include this element if in sequence with next element
        if(i !== array.length-1 && array[i] === (array[i+1] + 1)) { // [3, 2, 1]
            // Continue to next element

        // Else, the sequence has ended and is valid if ends with "1"
        } else if (array[i] === 1) {
            countdownSequences.push(array.slice(indexStartCount, i+1));
            indexStartCount = i+1;
        // Else, the sequence has ended, but is not a valid sequence because it doesent end with "1"
        } else {
            // Start new sequence
            indexStartCount = i+1;
        }
    }

    return [countdownSequences.length, [...countdownSequences]];
}

// Copied from kata 5
function parseArrayFromString(string) {
    let split = string.split(/[,\[\]]/);
    return split.map((element => parseInt(element))).filter((element) => { return element === element; });
}

function countdownsButtonHandler() {
    var inputArray = inputArrayElement.value;
    inputArray = parseArrayFromString(inputArray);

    let result = countCountdowns(inputArray);

    let resultText = `There are ${result[0]} countdowns: [` +
        result[1].reduce((acc, current, index) => acc + `[${current.join(", ")}${index === result[1].length - 1 ? "]" : "], "}`, "") +
        "]";

    outputTextElement.innerText = resultText;
}