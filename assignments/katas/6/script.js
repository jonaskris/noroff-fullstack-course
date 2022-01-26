const outputTitleElement = document.getElementById("output_title");
const inputTitleElement = document.getElementById("input_title");

/*
    Assignment requirements:

    The words and, the, of and in should be lowercase.
    All other words should have the first character as uppercase and the rest lowercase.
    All commas must always be followed by a single space.
    All titles must end with a period.
*/
const lowerCase = ["and", "the", "of", "in"];

function firstCharToUpperCase(word) {
    return word[0].toUpperCase() + word.slice(1);
};

function fixTitle() {
    let input = inputTitleElement.value;
    input = input.toLowerCase();

    input = input.replace(/\b(?!the|and|in|of\b)\w+/gi, firstCharToUpperCase);
    input = input.replace(/,\s*/g, ", ");
    if(input.search(/\.$/g) === -1) {
        input += ".";
    }

    outputTitleElement.innerText = input;
}