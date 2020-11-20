// FORM SUBMISSION
const form = document.getElementById('form');

form.addEventListener('submit', calculateResults);

// CALCULATE RESULTS
function calculateResults(e) {
    // console.log('calculating...');

    // UI VARIABLES
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // CALCULATE MONTHLY PAYMENTS
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) * principal).toFixed(2);
    } else {
        showError('Please check your number');
    }

    e.preventDefault();
}

function showError(error) {
    // CREATE A DIV
    const errorDiv = document.createElement('div');

    // GET ELEMENTS
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // ADD CLASSES
    errorDiv.className = 'alert alert-danger';

    // CREATE TEXT NODE
    errorDiv.appendChild(document.createTextNode(error));

    // INSERT TO THE DOM BEFORE THE HEADING
    card.insertBefore(errorDiv, heading);

    // REMOVE THE ALERT
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}