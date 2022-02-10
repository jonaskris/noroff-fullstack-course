/*
    Resource used to find nth prime number:
    https://stackoverflow.com/questions/40042858/javascript-getting-the-nth-prime-number/40043617
*/

const inputNElement = document.getElementById("input_n");
const inputCheckPrimeElement = document.getElementById("input_check_prime");
const outputTextElement = document.getElementById("output_text");

function isPrime(n) {
    for(let i = 2; i < Math.sqrt(n)+1; i++) {
        if(n % i === 0) {
            return false;
        }
    }
    return n > 1;
}

function nextPrime(num) {
    for(let i = num+1; i < num*num; i++) {
        if(isPrime(i)) {
            return i;
        }
    }
    return 0;
}

function nthPrime(n) {
    let count = 0;
    let num = 2;

    while(count++ != n) {
        num = nextPrime(num);
    }

    return num;
}

function findNthPrimeButtonHandler() {
    let n = inputNElement.value;
    
    outputTextElement.innerText = `Prime ${n} is ${nthPrime(n)}`;
}

function checkPrimeButtonHandler() {
    let num = inputCheckPrimeElement.value;

    outputTextElement.innerText = `${num}${isPrime(num) ? " IS " : " IS NOT "}a prime number`;
}

/*for(let i = 0; i < 100; i++){
    console.log(`prime ${i}: ${nthPrime(i)}`);
}*/

//console.log(`10 001 prime is: ${nthPrime(10000)}`);