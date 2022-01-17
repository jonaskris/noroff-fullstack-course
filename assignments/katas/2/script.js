// Reduces an array of string elements to one string, and adds "-" between each element.
const reducer = (acc, current) => acc + (acc.length ? "-" : "") + current;

/* 
    Returns array of strings that match regex.
    The regex matches substrings that end and/or begin with two of
    the same characters.
*/
function splitOnDoubleLetter(word) {
    return word.match(/.+?(\w)(?=\1)|.+/g);
}

function button_pressed() {
    let input_word = document.getElementById("input_word").value;
    let split_word = splitOnDoubleLetter(input_word);

    document.getElementById("output_word").innerHTML = split_word.reduce(reducer, "");
}