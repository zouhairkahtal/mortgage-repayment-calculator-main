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
const resultDiv = document.getElementById("Result");
let result = 0;
let TotaoResult = 0;

//this stoping r-page

form.addEventListener("submit", (ele) => {
  ele.preventDefault();
});
// /////////////////

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
    if (Repayment.checked) {
      let monthlyPayment = calculateMortgageRepayment(
        amountValue,
        rateValue,
        termValue
      );
      const resultDiv = document.getElementById("Result");
      resultDiv.innerHTML = `
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
                  <h1 class="text-[hsl(61,70%,52%)] text-5xl font-bold mb-10">£${result.toFixed(
                    1
                  )}</h1>
                  <div class="w-full px-5 ">
                  <hr class="border-t border-[hsl(200,24%,40%)] mb-10">
                  </div>
                  <h2  class="text-sm text-[hsl(200,26%,54%)] font-medium mb-3 "> Total you'll repay over the term</h2>
                  <h1 class="text-2xl text-white font-bold mb-4">£${
                    result.toFixed(3) * TotaoResult
                  }</h1>
                </div>
              </div>
        `;
    } else if (InterestOnly.checked) {
      // Calculate interest-only payment
      let interestOnlyPayment = calculateInterestOnlyPayment(
        amountValue,
        rateValue,
        termValue
      );

      resultDiv.innerHTML = `
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
                  <h1 class="text-[hsl(61,70%,52%)] text-5xl font-bold mb-10">£${result.toFixed(
                    1
                  )}</h1>
                  <div class="w-full px-5 ">
                  <hr class="border-t border-[hsl(200,24%,40%)] mb-10">
                  </div>
                  <h2  class="text-sm text-[hsl(200,26%,54%)] font-medium mb-3 "> Total you'll repay over the term</h2>
                  <h1 class="text-2xl text-white font-bold mb-4">£${
                    result.toFixed(3) * TotaoResult
                  }</h1>
                </div>
              </div>
        `;
    }
    error();
  } else {
    error();
  }
});

//
// Clear All btn
const ClearBtn = document.getElementById("Clearbtn");
ClearBtn.addEventListener("click", () => {
  amount.value = "";
  Term.value = "";
  Rate.value = "";
  Repayment.checked = false;
  InterestOnly.checked = false;
  document.querySelectorAll(".radio-container").forEach(() => {
    document.querySelectorAll(".radio-container").forEach((div) => {
      div.classList.remove("border-[hsl(61,70%,52%)]", "bg-[#d7da2f70]");
      div.classList.add("border-[hsl(200,26%,54%)]");
      div.querySelector("input").checked = false;
      div.querySelector("span span").classList.add("opacity-0");
    });
  });
  resultDiv.innerHTML = `
          <img
            class="mb-5"
            src="assets/images/illustration-empty.svg"
            alt="Empty"
          />
          <h2 class="text-white mb-5 text-2xl">Results shown here</h2>
          <p class="text-[hsl(203,41%,72%)] text-center max-w-lg px-2 text-sm">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
            `;
});

//

// error function
function error() {
  const errorText1 = document.querySelector(".errorText-1");
  const errorText2 = document.querySelector(".errorText-2");
  const errorText3 = document.querySelector(".errorText-3");
  const errorText4 = document.querySelector(".errorText-4");
  const logoError1 = document.querySelector(".logoError-1");
  const logoError2 = document.querySelector(".logoError-2");
  const logoError3 = document.querySelector(".logoError-3");
  const borderError1 = document.querySelector(".borderError-1");
  const borderError2 = document.querySelector(".borderError-2");
  const borderError3 = document.querySelector(".borderError-3");

  if (amount.value > 0) {
    errorText1.classList.add("hidden");
    errorText1.classList.remove("flex");
    logoError1.classList.add("bg-[hsl(202,86%,94%)]");
    logoError1.classList.remove("text-[hsl(0,0%,100%)]");
    logoError1.classList.remove("bg-[hsl(4,69%,50%)]");
    borderError1.classList.remove("border-[hsl(4,69%,50%)]");
  } else {
    errorText1.classList.remove("hidden");
    errorText1.classList.add("flex");
    logoError1.classList.remove("bg-[hsl(202,86%,94%)]");
    logoError1.classList.add("bg-[hsl(4,69%,50%)]");
    logoError1.classList.add("text-[hsl(0,0%,100%)]");
    borderError1.classList.add("border-[hsl(4,69%,50%)]");
  }
  if (Term.value > 0) {
    errorText2.classList.add("hidden");
    errorText2.classList.remove("flex");
    logoError2.classList.add("bg-[hsl(202,86%,94%)]");
    logoError2.classList.remove("text-[hsl(0,0%,100%)]");
    logoError2.classList.remove("bg-[hsl(4,69%,50%)]");
    borderError2.classList.remove("border-[hsl(4,69%,50%)]");
  } else {
    errorText2.classList.remove("hidden");
    errorText2.classList.add("flex");
    logoError2.classList.remove("bg-[hsl(202,86%,94%)]");
    logoError2.classList.add("bg-[hsl(4,69%,50%)]");
    logoError2.classList.add("text-[hsl(0,0%,100%)]");
    borderError2.classList.add("border-[hsl(4,69%,50%)]");
  }
  if (Rate.value > 0) {
    errorText3.classList.add("hidden");
    errorText3.classList.remove("flex");
    logoError3.classList.add("bg-[hsl(202,86%,94%)]");
    logoError3.classList.remove("text-[hsl(0,0%,100%)]");
    logoError3.classList.remove("bg-[hsl(4,69%,50%)]");
    borderError3.classList.remove("border-[hsl(4,69%,50%)]");
  } else {
    errorText3.classList.remove("hidden");
    errorText3.classList.add("flex");
    logoError3.classList.remove("bg-[hsl(202,86%,94%)]");
    logoError3.classList.add("bg-[hsl(4,69%,50%)]");
    logoError3.classList.add("text-[hsl(0,0%,100%)]");
    borderError3.classList.add("border-[hsl(4,69%,50%)]");
  }
  if (Repayment.checked || InterestOnly.checked) {
    errorText4.classList.add("hidden");
    errorText4.classList.remove("flex");
  } else {
    errorText4.classList.remove("hidden");
    errorText4.classList.add("flex");
  }
}
//

// calculateMortgageRepayment

function calculateMortgageRepayment(P, annualRate, years) {
  let monthlyRate = annualRate / 100 / 12;
  let totalPayments = years * 12;

  let M =
    (P * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  TotaoResult = totalPayments;
  result = M;
  return result;
}

// calculateInterestOnlyPayment
function calculateInterestOnlyPayment(P, annualRate, years) {
  let monthlyRate = annualRate / 100 / 12;
  let interestPayment = P * monthlyRate;
  let totalPayments = years * 12;
  TotaoResult = totalPayments;
  result = interestPayment;
  return interestPayment;
}
