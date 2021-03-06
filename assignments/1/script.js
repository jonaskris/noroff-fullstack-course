// API URL
const api_url = "https://noroff-komputer-store-api.herokuapp.com/";

// Elements related to work section
const workPayElement = document.getElementById("work-pay-amount");
const workRepayLoanButtonElement = document.getElementById("work-repay-loan-button");

// Elements related to bank section
const bankBalanceElement = document.getElementById("bank-balance-amount");
const bankOutstandingLoanAmountElement = document.getElementById("bank-outstanding-loan-amount")
const bankOutstandingLoanAmountLabelElement = document.getElementById("bank-outstanding-loan-amount-label")

// Elements related to laptop section
const laptopSelectElement = document.getElementById("laptop-selection");
const laptopFeaturesElement = document.getElementById("laptop-features");

// Element related to laptop info section
const laptopTitleElement = document.getElementById("laptop-title");
const laptopPriceAmountElement = document.getElementById("laptop-price-amount");
const laptopImageElement = document.getElementById("laptop-image");
const laptopDescriptionElement = document.getElementById("laptop-description");

let laptops = [];
let selectedLaptopIndex = 0;
let outstandingLoan = 0;
let balance = 0;
let pay = 0;

// Fetches computers from API
fetch(api_url + "computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToSelect(laptops));

const addLaptopsToSelect = (laptops) => {
  laptops.forEach((laptop) => addLaptopToSelect(laptop));
};

const addLaptopToSelect = (laptop) => {
  const laptopElement = document.createElement("option");

  laptopElement.value = laptop.id - 1; // Convert range from 1-N to 0-(N-1) for indexing

  // Add laptops as "select" element options
  laptopElement.appendChild(document.createTextNode(laptop.title));
  laptopSelectElement.appendChild(laptopElement);
};

function selectLaptop(selection) {
  laptopFeaturesElement.innerText = laptops[selection.value].specs.join("\n");
  laptopDescriptionElement.innerText = laptops[selection.value].description;
  laptopImageElement.src = api_url + laptops[selection.value].image;
  laptopPriceAmountElement.innerText = laptops[selection.value].price;
  laptopTitleElement.innerText = laptops[selection.value].title;
  selectedLaptopIndex = selection.value;
}

/*
    Couldent find valid locale, so i just appended " Kr" .
    attempt -> new Intl.NumberFormat('nb_NO', { style: "currency", currency: "NOK"}).format(price);
*/
function formatCurrency(currency) {
  return currency + " Kr"; 
}

// Called by bank section "Get a loan" button
function requestLoan() {
  var loan = window.prompt("Enter loan amount: ");
  loan = parseInt(loan);

  if (loan !== loan) {
    console.error("Entered loan amount is not a valid integer!");
  } else if (loan > balance * 2 || outstandingLoan > 0) {
    console.error(
      "Cant loan if requested loan is more than double your balance, or if last loan has not been paid in full!"
    );
  } else if(loan > 0) {
    outstandingLoan += loan;
    bankOutstandingLoanAmountElement.innerText = formatCurrency(outstandingLoan);
    workRepayLoanButtonElement.hidden = false;
    bankOutstandingLoanAmountElement.hidden = false;
    bankOutstandingLoanAmountLabelElement.hidden = false;
  }
}

// Called by laptop info section "BUY NOW" button
function buyLaptop() {
  if (laptops[selectedLaptopIndex].price > balance) {
    window.alert("Insufficient balance!");
  } else {
    balance -= laptops[selectedLaptopIndex].price;
    bankBalanceElement.innerText = formatCurrency(balance);
    window.alert("You are the proud owner of a new laptop!");
  }
}

// Called by work section "Work" button
function work() {
  pay += 100;
  workPayElement.innerText = formatCurrency(pay);
}

// Called by work section "Repay loan" button
function repayLoan() {
  let deducted = Math.min(pay, outstandingLoan);
  let nonDeducted = pay - deducted;
  pay = 0;
  outstandingLoan -= deducted;
  balance += nonDeducted;

  bankOutstandingLoanAmountElement.innerText = formatCurrency(outstandingLoan);
  bankBalanceElement.innerText = formatCurrency(balance);
  workPayElement.innerText = formatCurrency(pay);

  if(outstandingLoan === 0) {
    workRepayLoanButtonElement.hidden = true; 
    bankOutstandingLoanAmountElement.hidden = true;
    bankOutstandingLoanAmountLabelElement.hidden = true;
  }
}

// Called by work section "Bank" button
function bank() {
  let deducted = Math.min(0.1 * pay, outstandingLoan);
  let nonDeducted = pay - deducted;
  pay = 0;
  outstandingLoan -= deducted;
  balance += nonDeducted;
  bankOutstandingLoanAmountElement.innerText = formatCurrency(outstandingLoan);
  bankBalanceElement.innerText = formatCurrency(balance);
  workPayElement.innerText = formatCurrency(pay);

  if(outstandingLoan === 0) {
    workRepayLoanButtonElement.hidden = true;
    bankOutstandingLoanAmountElement.hidden = true;
    bankOutstandingLoanAmountLabelElement.hidden = true;
  }
}