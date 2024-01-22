
  function openModal(number) {
    let packageName = "";
    let packagePrice = "";
    let packageNameIN = "";

    switch (number) {
      case 1:
        packageName = "MyCLNQ-Privilege Package";
        packagePrice = 'Care Amount :- INR 2200/-';
        packageNameIN = 'MyCLNQ-Privilege Package. Care Amount :- INR 2200/-';
        break;
      case 2:
        packageName = "MyCLNQ-Care Package";
        packagePrice = 'Care Amount :- INR 400/-';
        packageNameIN = 'MyCLNQ-Care Package. Care Amount :- INR 400/-';
        break;
      case 3:
        packageName = "MyCLNQ-Protect Package";
        packagePrice = 'Care Amount :- INR 700/-';
        packageNameIN = 'MyCLNQ-Protect Package. Care Amount :- INR 700/-';
        break;
      default:
        packageName = "";
    }
    localStorage.setItem('packageName', packageName);
    localStorage.setItem('packagePrice', packagePrice);
    localStorage.setItem('packageNameIN', packageNameIN);

    window.location.href = `healthcare-booking.html`;
  }



// Details Fetch
const btn = document.getElementById("healthSubmit");
var showResult = document.getElementById("resultHealth");

function validateEmail(user_email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user_email).toLowerCase());
  }

document.getElementById("mailForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
var emailInput = document.getElementById("user_emailHealth").value;
var emailValid = validateEmail(emailInput);
//   var emailValid = true;
  
  // let captchaToken = grecaptcha.getResponse();
  // btn.value = "Please Wait...";
  
  // if (!captchaToken) {
  //     console.error("reCAPTCHA validation failed. Please check the reCAPTCHA box.");
  //     alert("reCAPTCHA validation failed. Please check the reCAPTCHA box.");
  //     btn.value = 'Submit';
  //     return;
  //   }
    
    var params = {
      user_name: document.getElementById("user_nameHealth").value,
      user_email: document.getElementById("user_emailHealth").value,
      phone_number: document.getElementById("phone_numberHealth").value,
      user_message: document.getElementById("user_messageHealth").value,
      packageName: document.getElementById("packageNameINHealth").value,
      // "g-recaptcha-response": captchaToken,
    };
    console.log("button clicked healthCare ");  
  if (emailValid) {
    console.log(params)
    // Fetch for packages
    // fetch("http://localhost:3000/2", {
    fetch("https://myclnqapi.ssivixlab.com/mailHealthCarePackages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({...params}),
})
.then(res => {
  if (res.status === 200) {
    
    console.log("Request successful");
    btn.value = 'Submit';
    btn.disabled = true;
    document.getElementById("mailForm").reset();
    showResult.innerHTML += 'Booking Form Submitted';
      localStorage.removeItem('packageName');
			localStorage.removeItem('packagePrice');
			localStorage.removeItem('packageNameIN');
  } else {
    // Handle other response statuses (non-200)
    console.error("Error: Unexpected status code -", res.status);
  }
})
      .catch(err => {
        btn.value = 'Try Again';
        console.error("Error:", err);
      });
  }
  else{
    alert("Please Enter a valid Email")
  }
  
});
