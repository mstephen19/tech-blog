const logOutBtn = document.querySelector('#logOut');

const logOut = async () => {
  let answer = confirm('Are you sure you want to log out?');

  if (!answer) return;

  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  response.ok ? document.location.replace('/') : alert('Logout failed!');
};

logOutBtn.addEventListener('click', logOut);
