const handleEditPost = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#editPostForm input').value.trim();
  const description = document
    .querySelector('#editPostForm textarea')
    .value.trim();
  const postId = document.location.href[document.location.href.length - 1];

  if (!title || !description || description.length < 20) {
    alert('Please fill out all the fields!');
    return;
  }

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description }),
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/dashboard')
    : alert('There was an error. Try again!');
};

document
  .querySelector('#editPostForm')
  .addEventListener('submit', handleEditPost);
