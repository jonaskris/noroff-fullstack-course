const inputTextFirstElement = document.getElementById("input_text_first"); 
const inputTextSecondElement = document.getElementById("input_text_second"); 
const outputTextElement = document.getElementById("output_text");

/*
    Returns an array of integers where 
    index 0-26 are the number of occurences of characters a-z in string.
*/
function charCount(string) {
    let charCountArray = Array(26).fill(0);
    
    for(const c of string)
        charCountArray[c.charCodeAt(0) - 97]++;

    return charCountArray;
}

/*
    Returns true if character is of range a-z.
*/
const regexMatchLowercaseAlphabet = new RegExp(/[a-z]/);
function filterMatchLowercaseAlphabet(string) {
    return regexMatchLowercaseAlphabet.test(string);
}

/*
    Checks every continuous substring X in firstString of length secondString.length.

    If the number of each character in substring equals the number of each character in secondString,
    it is a valid anagram and gets added to array of found anagrams.

    Returns all found anagrams.
*/
function findAnagram(firstString, secondString) {
    /* 
        Convert input strings to lowercase and filter out characters not in range a-z.
    */
    firstString = Array.from(firstString.toLowerCase())
        .filter(filterMatchLowercaseAlphabet).join("");

    secondString = Array.from(secondString.toLowerCase())
        .filter(filterMatchLowercaseAlphabet).join("");

    /* 
        Find charCount of secondString.
    */
    let secondCharCount = charCount(secondString);

    /* 
        Iterates over all continuous substrings in firstString with length of secondString.

        1. Find charCount of substring.
        2. Check element-wise equality of substringCharCount and secondCharCount.
            2.1 All true: Add substring index range to foundAnagrams.
            2.2 Any false: Check next substring.
    */
    let foundAnagrams = [];
    for(let i = 0; i < firstString.length - secondString.length + 1; i++) {
        let substringCharCount = charCount(firstString.slice(i, i + secondString.length));
        
        let substringIsAnagram = secondCharCount
            .map((charCount, index) => charCount === substringCharCount[index])
            .reduce((acc, val) => acc && val, true);

        if(substringIsAnagram)
            foundAnagrams.push([i, i + secondString.length]);
    }

    /* 
        Return firstString substrings present in foundAnagrams.
    */
    return foundAnagrams.map(([firstIndex, lastIndex]) => firstString.slice(firstIndex, lastIndex));
}

function findAnagramButtonHandler() {
    var inputTextFirst = inputTextFirstElement.value;
    var inputTextSecond = inputTextSecondElement.value;

    outputTextElement.innerText = "Found anagrams: \n" + findAnagram(inputTextFirst, inputTextSecond).join("\n");
}