// Details Fetch
console.log("heeko")
const contactButton = document.getElementById("contactButton");
var showContact = document.getElementById("resultContact");

function validateEmail(user_email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user_email).toLowerCase());
  }
document.getElementById("contactUs").addEventListener("submit", function (event) {
  console.log("button clicked contact");
  event.preventDefault();

  var emailInput = document.getElementById("user_emailContact").value;
  var emailValid = validateEmail(emailInput);
//   var emailValid = true;

  // let captchaToken = grecaptcha.getResponse();
  // contactButton.value = "Please Wait...";

  // if (!captchaToken) {
  //   console.error("reCAPTCHA validation failed. Please check the reCAPTCHA box.");
  //   alert("reCAPTCHA validation failed. Please check the reCAPTCHA box.");
  //   contactButton.value = 'Submit';
  //   return;
  // }

  var params = {
    user_name: document.getElementById("user_nameContact").value,
    user_email: document.getElementById("user_emailContact").value,
    phone_number: document.getElementById("phone_numberContact").value,
    user_message: document.getElementById("input_symptomsContact").value,
    // "g-recaptcha-response": captchaToken,
  };
  console.log(emailValid)
  if (emailValid) {
    console.log(params)
    // Fetch for packages
    // fetch("http://localhost:3000/3", {
    fetch("https://myclnqapi.ssivixlab.com/mailContactUs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({...params}),
})
.then(res => {
  if (res.status === 200) {
    
    console.log("Request successful");
    contactButton.innerHTML = 'Submit';
    contactButton.disabled = true;
    showContact.innerHTML += 'Contact Form Submitted';
    document.getElementById("contactUs").reset();
    setTimeout(() => {
      showContact.innerHTML += '';
    }, 5000);
  } else {
    // Handle other response statuses (non-200)
    console.error("Error: Unexpected status code -", res.status);
  }
})
      .catch(err => {
        console.error("Error:", err);
      });
  }
  else{
    alert("Please Enter a valid Email")
  }
});