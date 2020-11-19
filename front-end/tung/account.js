function focus_in(x){
  x.parentNode.classList.add("focus");
}

function focus_out(x){
  x.parentNode.classList.remove("focus")
}


const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});


  
const confirm_togglePassword = document.querySelector('#confirm_togglePassword');
const confirm_password = document.querySelector('#confirm_password');
confirm_togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = confirm_password.getAttribute('type') === 'password' ? 'text' : 'password';
  confirm_password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});


const cus_togglePassword = document.querySelector('#cus_togglePassword');
const cus_password = document.querySelector('#cus_password');
cus_togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = cus_password.getAttribute('type') === 'password' ? 'text' : 'password';
  cus_password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});



const cus_confirm_togglePassword = document.querySelector('#cus_confirm_togglePassword');
const cus_confirm_password = document.querySelector('#cus_confirm_password');
cus_confirm_togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = cus_confirm_password.getAttribute('type') === 'password' ? 'text' : 'password';
  cus_confirm_password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});