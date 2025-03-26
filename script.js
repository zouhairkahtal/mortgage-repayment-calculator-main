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
let result = 0
let TotaoResult = 0
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
        
        let monthlyPayment = calculateMortgageRepayment(
          amountValue,
          rateValue,
          termValue,
          
        );
        const resultDiv=document.getElementById('Result')
        resultDiv.innerHTML=`
        <div class="w-full h-full bg-sate-500 p-10">
                <div>
                  <h2 class="text-2xl text-white font-bold mb-4">Your results</h2>
                  <p class="text-sm text-[hsl(200,26%,54%)] font-medium mb-10">
                    Your results are shown below based on the information you
                    provided. To adjust the results, edit the form and click
                    “calculate repayments” again.
                  </p>
                </div>
                <div class="bg-[hsl(202,60%,11%)] p-8 rounded-lg border-t-4 border-[hsl(61,70%,52%)]">
                  <h2 class="text-sm text-[hsl(200,26%,54%)] font-medium mb-3 ">Your monthly repayments</h2>
                  <h1 class="text-[hsl(61,70%,52%)] text-5xl font-bold mb-10">£${result.toFixed(1)}</h1>
                  <div class="w-full px-5 ">
                  <hr class="border-t border-[hsl(200,24%,40%)] mb-10">
                  </div>
                  <h2  class="text-sm text-[hsl(200,26%,54%)] font-medium mb-3 "> Total you'll repay over the term</h2>
                  <h1 class="text-2xl text-white font-bold mb-4">£${result.toFixed(3)*TotaoResult}</h1>
                </div>
              </div>
        `

      }  else if (InterestOnly.checked) {
        // Calculate interest-only payment
        let interestOnlyPayment = calculateInterestOnlyPayment(
          amountValue,
          rateValue,
          termValue
        );
        const resultDiv=document.getElementById('Result')
        resultDiv.innerHTML=`
        <div class="w-full h-full bg-sate-500 p-10">
                <div>
                  <h2 class="text-2xl text-white font-bold mb-4">Your results</h2>
                  <p class="text-sm text-[hsl(200,26%,54%)] font-medium mb-10">
                    Your results are shown below based on the information you
                    provided. To adjust the results, edit the form and click
                    “calculate repayments” again.
                  </p>
                </div>
                <div class="bg-[hsl(202,60%,11%)] p-8 rounded-lg border-t-4 border-[hsl(61,70%,52%)]">
                  <h2 class="text-sm text-[hsl(200,26%,54%)] font-medium mb-3 ">Your monthly repayments</h2>
                  <h1 class="text-[hsl(61,70%,52%)] text-5xl font-bold mb-10">£${result.toFixed(1)}</h1>
                  <div class="w-full px-5 ">
                  <hr class="border-t border-[hsl(200,24%,40%)] mb-10">
                  </div>
                  <h2  class="text-sm text-[hsl(200,26%,54%)] font-medium mb-3 "> Total you'll repay over the term</h2>
                  <h1 class="text-2xl text-white font-bold mb-4">£${result.toFixed(3)*TotaoResult}</h1>
                </div>
              </div>
        `
    }

    } else {
      error();
    }
  });
  

   

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

// calculateMortgageRepayment

function calculateMortgageRepayment(P, annualRate, years) {
  let monthlyRate = annualRate / 100 / 12;
  let totalPayments = years * 12;

  let M =
    (P * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
    TotaoResult = totalPayments
    result = M
  return result;

}

// calculateInterestOnlyPayment
function calculateInterestOnlyPayment(P, annualRate,years) {
    let monthlyRate = annualRate / 100 / 12; 
    let interestPayment = P * monthlyRate; 
    let totalPayments = years * 12;
    TotaoResult = totalPayments
    result = interestPayment
    return interestPayment;
  }
  