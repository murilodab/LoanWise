//Fetch values from the page
//starter
function getValues() {

    let loanAmount = document.getElementById("loanAmount").value;
    let payments = document.getElementById("payments").value;
    let rate = document.getElementById("rate").value;

    //return object to return multiple attributes
    let returnObj = calculateLoan(loanAmount, payments, rate);

    displayValues(returnObj);


}

//Calculate payment,principal,interest,total interest,balance
function calculateLoan(loanAmount, months, rate) {

    let returnObj = {};

    let totalMonthlyPayment = loanAmount * (rate / 1200) / (1 - (1 + rate / 1200) ** (-months));

    // ----------  Table Columns ---------
    let month = [];

    let payment = [];

    let principal = [];

    let interest = [];

    let totalInterest = [];

    let balance = [];
    //-------------------------------------

    let remainingBalance = loanAmount;

    let totalInt = 0;

    let interestPayment = 0;

    let principalPayment = totalMonthlyPayment - interestPayment;


    for (let index = 1; index <= months; index++) {

        interestPayment = /* previous remaining balance */remainingBalance * (rate / 1200);

        principalPayment = totalMonthlyPayment - interestPayment;

        remainingBalance = remainingBalance - principalPayment;

        totalInt += interestPayment;


        //write values to the arrays
        payment.push(totalMonthlyPayment);

        principal.push(principalPayment);

        interest.push(interestPayment);

        totalInterest.push(totalInt);

        balance.push(remainingBalance);

        month.push(index);

    }
    //Rounding up values
    for (let index = 0; index < months; index++) {
        
        payment[index] = payment[index].toFixed(2);
        principal[index] = principal[index].toFixed(2);
        interest[index] = interest[index].toFixed(2);
        totalInterest[index] = totalInterest[index].toFixed(2);
        balance[index] = balance[index].toFixed(2);
        
    }

    returnObj.month = month;

    returnObj.payment = payment;

    returnObj.principal = principal;

    returnObj.interest = interest;

    returnObj.totalInterest = totalInterest;

    returnObj.balance = balance;


    return returnObj;
}


//Display
function displayValues(returnObj) {

    //get the table body element from the page
    let tableBody = document.getElementById("results");
    //get the table template
    let templateRow = document.getElementById("tableTemplate");
    //clear the table
    tableBody.innerHTML = "";

    //Display table on the page using the template
    for (let i = 0; i < returnObj.month.length; i++) {
        
        let tableRow = document.importNode(templateRow.content, true);

        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = returnObj.month[i];
        rowCols[1].textContent = returnObj.payment[i];
        rowCols[2].textContent = returnObj.principal[i];
        rowCols[3].textContent = returnObj.interest[i];
        rowCols[4].textContent = returnObj.totalInterest[i];
        rowCols[5].textContent = returnObj.balance[i];

        tableBody.appendChild(tableRow);
        
    }

    //fomratting currency values

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    //Display main Values on top

    let i = returnObj.month.length - 1; //last index

    let intMonthlyPayment = returnObj.payment[i];

    let totalPrincipal = document.getElementById("loanAmount").value;

    totalPrincipal = parseInt(totalPrincipal);

    let totalInterest = returnObj.totalInterest[i];

    totalInterest = parseInt(totalInterest);

    let totalCost = totalPrincipal + totalInterest;

    //writes to the page
    document.getElementById("monthlyPayments").innerHTML = `${USDollar.format(intMonthlyPayment)}`;
    document.getElementById("totalPrincipal").innerHTML = `${USDollar.format(totalPrincipal)}`;
    document.getElementById("totalInterest").innerHTML = `${USDollar.format(totalInterest)}`;
    document.getElementById("totalCost").innerHTML = `${USDollar.format(totalCost)}`;

}