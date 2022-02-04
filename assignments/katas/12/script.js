const inputTextFirstElement = document.getElementById("input_text_first"); 
const inputTextSecondElement = document.getElementById("input_text_second"); 
const outputTextElement = document.getElementById("output_text");

const regexMatchLowercaseAlphabet = new RegExp(/[a-z]/);

function filterMatchLowercaseAlphabet(string) {
    return regexMatchLowercaseAlphabet.test(string);
}

function numArrayDifference(numArrayLeft, numArrayRight) {
    return numArrayLeft.map((numFirst, index) => {
        let numSecond = numArrayRight[index];
        return numFirst - numSecond;
    });
}

function charCount(stringArray) {
    let charCountArray = Array(26).fill(0);
    
    stringArray.forEach((char) => {
        let charCountArrayIndex = char.charCodeAt(0) - 97;
        charCountArray[charCountArrayIndex]++;
    });

    return charCountArray;
}

function numArraySumReduce(total, current) {
    return total + current;
}

function findRangesContainingCountElements(array, element, count) {
    let occurences = [];

    for(let i = 0; i < array.length; i++){
        if(array[i] === element) {
            occurences.push(i);
        }
    }

    let ranges = [];
    for(let i = 0; i < occurences.length - count + 1; i++){
        ranges.push([occurences[i], occurences[i + count - 1]]);
    }

    return ranges;
}

/*
    1. Instantiate array of numbers = 0, N = 26. Index of 'A' = 0, 'Z' = 25
*/
function findAnagram(firstString, secondString) {
    // Filter out any character not in range a-z
    let firstArray = Array.from(firstString.toLowerCase())
        .filter(filterMatchLowercaseAlphabet);
    firstString = firstArray.join("");

    let secondArray = Array.from(secondString.toLowerCase())
        .filter(filterMatchLowercaseAlphabet);
    secondString = secondArray.join("");

    // Find character occurence second string
    let secondCharCount = charCount(secondArray).map((count, index) => [String.fromCharCode(index + 97), count])
        .filter(([char, count]) => count > 0);

    console.log("characterCounts: ", secondCharCount);

    // Find every range which has exactly count of char
    let characterRanges = Array(26).fill([]);
    for(let i = 0; i < secondCharCount.length; i++) {
        characterRanges[secondCharCount[i][0].charCodeAt(0) - 97] = findRangesContainingCountElements(firstArray, secondCharCount[i][0], secondCharCount[i][1]);
    }

    console.log("characterRanges: ", characterRanges);

    let rangeContribution = Array(firstArray.length).fill(0);
    for(let i = 0; i < characterRanges.length; i++) {
        for(let j = 0; j < characterRanges[i].length; j++) {
            for(let k = characterRanges[i][j][0]; k <= characterRanges[i][j][1]; k++) {
                rangeContribution[k] = rangeContribution[k]*26 + 1;
            }
        }
    }

    console.log("rangeContribution: \n", rangeContribution.join(" "));
    console.log("firstArray: \n", firstArray.join(" "));
    

    //let ranges = findRangesContainingElements(firstArray, sortedByCount);
    //return ranges.map(([first, last]) => firstArray.slice(first, last+1).join(""));
    return "huh";
}

/*
    An old west action hero actor | Clint Eastwood
    o: 2-13, 13-18, 18-22
    n: 1-1, 14-14
    t: 8-11, 11-21
*/
function findAnagramButtonHandler() {
    var inputTextFirst = inputTextFirstElement.value;
    var inputTextSecond = inputTextSecondElement.value;

    outputTextElement.innerText = findAnagram(inputTextFirst, inputTextSecond);;//findAnagram(inputTextFirst, inputTextSecond).join(", ");
}