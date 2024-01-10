// Details Fetch
const button = document.getElementById("submit_button");
var Show_Result = document.getElementById("resultApp");

 

function validateEmail(user_email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(user_email).toLowerCase());
}

let selectedOption;

document.querySelector('.nice-select .list').addEventListener('click', function (event) {
    selectedOption = event.target.getAttribute('data-value');
});
document.getElementById("appointmentForm").addEventListener("submit", function (event) {
  console.log("button clicked ");
  event.preventDefault();

  if (selectedOption === null || selectedOption === undefined) {
    alert("Please Select Consultation Type")
    return; 
}

  var emailValid = validateEmail(document.getElementById("user_email").value);

  // let captchaToken = grecaptcha.getResponse();
  // button.value = "Please Wait...";

  // if (!captchaToken) {
  //   console.error("reCAPTCHA validation failed. Please check the reCAPTCHA box.");
  //   alert("reCAPTCHA validation failed. Please check the reCAPTCHA box.");
  //   button.value = 'Submit';
  //   return;
  // }

  var params = {
    user_name: document.getElementById("user_name").value,
    user_email: document.getElementById("user_email").value,
    phone_number: document.getElementById("phone_number").value,
    user_message: document.getElementById("user_message").value,
    appointment_date: document.getElementById("datepicker").value,
    consultaionType: selectedOption,
    // "g-recaptcha-response": captchaToken,
  };

  if (emailValid) {
    console.log(params)
    // Fetch for packages
    // fetch("http://localhost:3000/1", {
      fetch("https://myclnqapi.ssivixlab.com/mailAppointment", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({...params}),
})
.then(res => {
  if (res.status === 200) {
    
    console.log("Request successful");
    button.value = 'Submit';
    button.disabled = true;
    Show_Result.innerHTML += 'Appointment Form Submitted';
    // document.getElementById("requestForm").reset();
  } else {
    // Handle other response statuses (non-200)
    console.error("Error: Unexpected status code -", res.status);
  }
})
      .catch(err => {
        console.error("Error:", err);
      });
  }
});