// input radoi style

document.querySelectorAll(".radio-container").forEach((container) => {
  container.addEventListener("click", function () {
    document.querySelectorAll(".radio-container").forEach((div) => {
      div.classList.remove("border-[hsl(61,70%,52%)]", "bg-[#d7da2f70]");
      div.classList.add("border-[hsl(200,26%,54%)]");
      div.querySelector("input").checked = false;
      div.querySelector("span span").classList.add("opacity-0");
    });

    this.classList.add("border-[hsl(61,70%,52%)]", "bg-[#d7da2f70]");
    this.querySelector("input").checked = true;
    this.querySelector("span span").classList.remove("opacity-0");
  });
});

// end input radoi style

// submit

const amount = document.getElementById("amount");
const Term = document.getElementById("Term");
const Rate = document.getElementById("Rate");
const Repayment = document.getElementById("Repayment");
const InterestOnly = document.getElementById("InterestOnly");
const submitBTN = document.getElementById("submit");
const form = document.getElementById("mortgageForm");

form.addEventListener("submit", (ele) => {
  ele.preventDefault();
});
submitBTN.addEventListener("click", () => {
    let amountValue = parseFloat(amount.value);
    let rateValue = parseFloat(Rate.value);
    let termValue = parseInt(Term.value, 10);
  

    if (
      !isNaN(amountValue) &&
      !isNaN(rateValue) &&
      !isNaN(termValue) &&
      amountValue > 0 &&
      rateValue > 0 &&
      termValue > 0 &&
      (Repayment.checked || InterestOnly.checked)
    ) {
     
  
      notError();
  
      if (Repayment.checked) {
        // حساب القسط الشهري
        let monthlyPayment = calculateMortgageRepayment(
          amountValue,
          rateValue,
          termValue
        );
        if (isNaN(monthlyPayment)) {
            console.log(`Monthly payment: $${monthlyPayment.toFixed(2)}`);
        } 
      }  else if (InterestOnly.checked) {
        // Calculate interest-only payment
        let interestOnlyPayment = calculateInterestOnlyPayment(
          amountValue,
          rateValue
        );
        console.log(`Interest Only payment: $${interestOnlyPayment.toFixed(2)}`);
      }
    } else {
      error();
    }
  });
  
  function calculateMortgageRepayment(P, annualRate, years) {
    if (P <= 0 || annualRate <= 0 || years <= 0) {
      return NaN; // Return NaN if the values are invalid
    }
  
    let monthlyRate = annualRate / 100 / 12;
    let totalPayments = years * 12;
  
    let M =
      (P * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
    return M;
  }
   

//

// error function
function error() {
  const errorText = document.querySelectorAll(".errorText");
  const logoError = document.querySelectorAll(".logoError");
  const borderError = document.querySelectorAll(".borderError");

  errorText.forEach((element) => {
    element.classList.remove("hidden");
  });
  logoError.forEach((element) => {
    element.classList.remove("bg-[hsl(202,86%,94%)]");
    element.classList.add("text-[hsl(0,0%,100%)]");
    element.classList.add("bg-[hsl(4,69%,50%)]");
  });
  borderError.forEach((element) => {
    element.classList.add("border-[hsl(4,69%,50%)]");
    element.classList.remove("border-[hsl(200,26%,52%)]");
  });
}
//

// not error function

function notError() {
  const errorText = document.querySelectorAll(".errorText");
  const logoError = document.querySelectorAll(".logoError");
  const borderError = document.querySelectorAll(".borderError");

  errorText.forEach((element) => {
    element.classList.add("hidden");
  });
  logoError.forEach((element) => {
    element.classList.add("bg-[hsl(202,86%,94%)]");
    element.classList.remove("text-[hsl(0,0%,100%)]");
    element.classList.remove("bg-[hsl(4,69%,50%)]");
  });
  borderError.forEach((element) => {
    element.classList.remove("border-[hsl(4,69%,50%)]");
    element.classList.add("border-[hsl(200,26%,52%)]");
  });
}

//

function calculateMortgageRepayment(P, annualRate, years) {
  let monthlyRate = annualRate / 100 / 12;
  let totalPayments = years * 12;

  let M =
    (P * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  console.log(`Monthly payment: $${M.toFixed(2)}`);
  return M;
}


function calculateInterestOnlyPayment(P, annualRate) {
    let monthlyRate = annualRate / 100 / 12; 
    let interestPayment = P * monthlyRate; 
    return interestPayment;
  }
  