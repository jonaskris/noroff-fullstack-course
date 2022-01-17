/*
    Returns array of strings, where each element correspond to the classic "FizzBuzz".
*/
function fizz_buzz(iterations) {
    let response_array = [];
    for(let i = 1; i < iterations; i++){
        let new_element = "";
        
        if(i % 15 == 0) {
            new_element += "FizzBuzz";
        } else if(i % 3 == 0) {
            new_element += "Fizz"
        } else if(i % 5 == 0) {
            new_element += "Buzz"
        } else {
            new_element += i;
        }

        response_array.push(new_element);
    }
    return response_array;
}

function button_start() {
    let iterations = document.getElementById("input_iterations").value;
    iterations = parseInt(iterations);

    let result = fizz_buzz(iterations);

    for(let i = 0; i < result.length; i++) {
        console.log(result[i]);
    }
}