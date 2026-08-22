const contactform = document.getElementById('contact-form');
const formstatus = document.getElementById('form-status');

contactform.addEventListener('submit', function (event) {
  event.preventDefault();
 

const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();
const service = document.getElementById('service').value.trim();
});
if (!name || !email || !message || !service) {
  formstatus.innerHTML = 'Please fill in all fields.';
  return;
}
 formstatus.innerHTML = 'Sending...';
