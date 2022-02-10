function count_elements_recursively(array, count = 0) {
    for(element of array) {
        if(Array.isArray(element)) {
            count += count_elements_recursively(element);
        } else {
            count++;
        }
    }

    return count;
}

console.log("Array: [1, [2, 3]], Elements: " + count_elements_recursively([1, [2, 3]]));
console.log("Array: [1, [2, [3, 4]]], Elements: " + count_elements_recursively([1, [2, [3, 4]]]));
console.log("Array: [1, [2, [3, [4, [5, 6]]]]], Elements: " + count_elements_recursively([1, [2, [3, [4, [5, 6]]]]]));
console.log("Array: [1, [2], 1, [2], 1], Elements: " + count_elements_recursively([1, [2], 1, [2], 1]));
console.log("Array: [], Elements: " + count_elements_recursively([]));