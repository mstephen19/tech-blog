//successfully created post? alert success, then document.location.replace('/dashboard')
const handleNewPost = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const description = document.querySelector('#description').value;

  if (!title || description.length < 20) {
    alert(
      'Please enter a title and ensure your content is longer than 20 characters!'
    );
    return;
  }

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Successfully posted!');
    document.location.replace('/dashboard');
  } else {
    alert('There was an error');
  }
};

document
  .querySelector('#newPostForm')
  .addEventListener('submit', handleNewPost);
