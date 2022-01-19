/*
    A boomerang is any 3 adjacent numbers where
    the 2 outer numbers are the same, and the middle number is different.

    Boomerangs can overlap, so 4 numbers CAN be 2 boomerangs.

    Examples:
    [5, -2, 5] => 1 boomerang
    [13, 3, 13, 3] => 2 overlapping boomerangs
*/
function count_total_boomerangs(array) {
    let count = 0;
    for(let i = 0; i < array.length - 2; i++) {
        // Check that left === right AND middle != left
        if(array[i] === array[i+2] && array[i+1] !== array[i]) {
            count++;
        }
    }

    return count;
}

function parse_array_from_string(string) {
    let split = string.split(/[,\[\]]/);
    return split.map((element => parseInt(element))).filter((element) => { return element === element; });
}

function button_submit_array() {
    let input_string = document.getElementById("input_array").value;
    let input_parsed_array = parse_array_from_string(input_string);
    
    document.getElementById("output_count").innerText = count_total_boomerangs(input_parsed_array);
}