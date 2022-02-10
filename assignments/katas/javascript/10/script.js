const inputTextElement = document.getElementById("input_text");
const outputTextElement = document.getElementById("output_text");
const inputRotationFactorElement = document.getElementById("input_rotation_factor");

var rotationFactor = 0;

function mapShiftAsciiCode(char) {
    let aFirst = (char >= 65 && char <= 90) ? 65 :
                    (char >= 97 && char <= 122) ? 97 :
                        -1;

    if(aFirst === -1) {
        return char;
    }

    return (char - aFirst + rotationFactor) % 26 + aFirst;
}

function mapCharToNum(char) {
    return char.charCodeAt(0);
}

function mapNumToChar(num) {
    return String.fromCharCode(num);
}

function encrypt(){
    let inputText = inputTextElement.value;
    var inputRotationFactor = inputRotationFactorElement.value;
    rotationFactor = parseInt(inputRotationFactor);

    let charArray = Array.from(inputText);
    outputTextElement.innerText = charArray.map(mapCharToNum)
                        .map(mapShiftAsciiCode)
                        .map(mapNumToChar)
                        .join("");    
}