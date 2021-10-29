const signInNodes = document.querySelectorAll('#signInForm input');
const signUpNodes = document.querySelectorAll('#signUpForm input');

// Handle login
const signinFormHandler = async (e) => {
  e.preventDefault();
  const username = signInNodes[0].value.toLowerCase().trim().replace(/\s/g, '');
  const password = signInNodes[1].value.trim().replace(/\s/g, '');

  if (!username || !password) {
    alert('Please enter both a username and a password.');
    return;
  }

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/')
    : alert('Sign in failed. Try again.');
};

// Handle sign up
const signupFormHandler = async (e) => {
  e.preventDefault();
  const email = signUpNodes[0].value.toLowerCase().trim();
  const username = signUpNodes[1].value.toLowerCase().trim();
  const passwords = [signUpNodes[2].value.trim(), signUpNodes[3].value.trim()];

  if (!email || !username || passwords[0] === '' || passwords[1] === '') {
    alert('Please fill in all the fields!');
    return;
  }

  if (passwords[0] !== passwords[1]) {
    alert('Passwords not matching!');
    return;
  }

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ email, username, password: passwords[0] }),
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/')
    : alert('Signup failed. Try again.');
};

// Event listeners
document
  .querySelector('#signInForm')
  .addEventListener('submit', signinFormHandler);

document
  .querySelector('#signUpForm')
  .addEventListener('submit', signupFormHandler);
