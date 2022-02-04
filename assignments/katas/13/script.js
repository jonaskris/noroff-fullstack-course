function sumSquareDifference(numToSumTo) {
    let sumOfSquares = 0;
    for(let i = 1; i <= numToSumTo; i++) {
        sumOfSquares += i*i;
    }

    let squareOfSums = (numToSumTo)*(numToSumTo+1)/2;
    squareOfSums = squareOfSums*squareOfSums;

    return squareOfSums - sumOfSquares;
}

console.log("N=10: ", sumSquareDifference(10));
console.log("N=100: ", sumSquareDifference(100));
console.log("N=1000: ", sumSquareDifference(1000));