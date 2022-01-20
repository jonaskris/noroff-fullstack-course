const laptopSelectElement = document.getElementById("laptop-selection");
const balanceElement = document.getElementById("balance-amount");
const payElement = document.getElementById("pay-amount");

const bankLoanElement = document.getElementById("loan-amount")

const laptopTitleElement = document.getElementById("laptop-title")
const laptopPriceElement = document.getElementById("laptop-price-amount")
const laptopFeaturesElement = document.getElementById("laptop-features");
const laptopImageElement = document.getElementById("laptop-image");
const laptopDescriptionElement = document.getElementById("laptop-description");

let laptops = [];
let selectedLaptopIndex = 0;
let currentLoan = 0;
let balance = 0;
let pay = 0;
let price = 0;

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToSelect(laptops));

const addLaptopsToSelect = (laptops) => {
    laptops.forEach(laptop => addLaptopToSelect(laptop));
}

const addLaptopToSelect = (laptop) => {
    const laptopElement = document.createElement("option");

    laptopElement.value = laptop.id - 1;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopSelectElement.appendChild(laptopElement);
}

function selectLaptop(selection){
    laptopFeaturesElement.innerText = laptops[selection.value].specs.join("\n");
    laptopDescriptionElement.innerText = laptops[selection.value].description;
    laptopImageElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + laptops[selection.value].image;
    laptopPriceElement.innerText = laptops[selection.value].price;
    laptopTitleElement.innerText = laptops[selection.value].title;
    selectedLaptopIndex = selection.value;
}

function formatCurrency(currency) {
    return currency; // Couldent find valid locale, attempt ->   /*new Intl.NumberFormat('nb_NO', { style: "currency", currency: "NOK"}).format(price);*/
}

function getLoan() {
    var loan = window.prompt("Enter loan amount: ");
    loan = parseInt(loan);

    if(loan !== loan) {
        console.error("Entered loan amount is not a valid integer!");
    } else if(loan > balance*2 || currentLoan > 0) {
        console.error("Cant loan if requested loan is more than double your balance, or if last loan has not been paid in full!");
    } else {
        currentLoan += loan;
        bankLoanElement.innerText = formatCurrency(currentLoan);
    }
}

function buyLaptop(){
    if(laptops[selectedLaptopIndex].price > balance) {
        window.alert("Insufficient balance!");
    } else {
        balance -= laptops[selectedLaptopIndex].price;
        balanceElement.innerText = formatCurrency(balance);
        window.alert("You are the proud owner of a new laptop!");
    }
}

function work() {
    pay += 100;
    payElement.innerText = formatCurrency(pay);
}

function repayLoan() {
    let deducted = Math.min(pay, currentLoan);
    let nonDeducted = pay - deducted;
    pay = 0;
    currentLoan -= deducted;
    balance += nonDeducted;

    bankLoanElement.innerText = formatCurrency(currentLoan);
    balanceElement.innerText = formatCurrency(balance);
    payElement.innerText = formatCurrency(pay);
}

function bank() {
    let deducted = Math.min(0.1 * pay, currentLoan);
    let nonDeducted = pay - deducted;
    balance += nonDeducted;
    pay = 0;
    bankLoanElement.innerText = formatCurrency(currentLoan);
    balanceElement.innerText = formatCurrency(balance);
    payElement.innerText = formatCurrency(pay);

    console.log("Banked!");
}