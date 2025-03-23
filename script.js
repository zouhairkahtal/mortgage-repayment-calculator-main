


// input radoi style

document.querySelectorAll('.radio-container').forEach(container => {
    container.addEventListener('click', function () {

        document.querySelectorAll('.radio-container').forEach(div => {
            div.classList.remove('border-[hsl(61,70%,52%)]', 'bg-[#d7da2f70]');
            div.classList.add('border-[hsl(200,26%,54%)]');
            div.querySelector("input").checked = false;
            div.querySelector("span span").classList.add('opacity-0'); 
        });

        this.classList.add('border-[hsl(61,70%,52%)]', 'bg-[#d7da2f70]');
        this.querySelector("input").checked = true;
        this.querySelector("span span").classList.remove('opacity-0'); 
    });
});



// end input radoi style


// submit 

const amount = document.getElementById("amount");
const Term = document.getElementById("Term");
const Rate = document.getElementById("Rate");
const Repayment = document.getElementById("Repayment");
const InterestOnly = document.getElementById("InterestOnly");
const submitBTN = document.getElementById('submit')
const form  = document.getElementById('mortgageForm')


form.addEventListener('submit', (ele) => {
    ele.preventDefault();
});


submitBTN.addEventListener('click',()=>{
    if(amount.value>0 & Term.value>0 & Rate.value>0 & Repayment.checked || InterestOnly.checked){
        console.log(amount.value,Term.value,Rate.value,Repayment.checked,InterestOnly.checked)
    }else{
        console.log("error");


        
    }


})




//

