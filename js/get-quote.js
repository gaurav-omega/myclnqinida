
const btn = document.getElementById("quoteSubmit");
var showResult = document.getElementById("resultQuote");

function validateEmail(user_email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user_email).toLowerCase());
  }

document.getElementById("quoteForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
var emailInput = document.getElementById("user_emailQuote").value;
var emailValid = validateEmail(emailInput);

    
    var params = {
      user_name: document.getElementById("user_nameQuote").value,
      user_email: document.getElementById("user_emailQuote").value,
      phone_number: document.getElementById("phone_numberQuote").value,
      user_message: document.getElementById("user_messageQuote").value,
      // "g-recaptcha-response": captchaToken,
    };
    // console.log("button clicked healthCare ");  
  if (emailValid) {
    // console.log(params)
    // Fetch for packages
    // fetch("http://localhost:3000/mailGetQuote", {
    fetch("https://myclnqapi.ssivixlab.com/mailGetQuote", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({...params}),
})
.then(res => {
  if (res.status === 200) {
    
    // console.log("Request successful");
    btn.value = 'Submit';
    btn.disabled = true;
    document.getElementById("quoteForm").reset();
    showResult.innerHTML += 'Form Submitted';
      localStorage.removeItem('packageName');
			localStorage.removeItem('packagePrice');
			localStorage.removeItem('packageNameIN');
  } else {
    // Handle other response statuses (non-200)
    // console.error("Error: Unexpected status code -", res.status);
  }
})
      .catch(err => {
        btn.value = 'Try Again';
        // console.error("Error:", err);
      });
  }
  else{
    alert("Please Enter a valid Email")
  }
  
});
