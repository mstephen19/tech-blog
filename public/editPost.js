const postId = document.location.href[document.location.href.length - 1];

const handleEditPost = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#editPostForm input').value.trim();
  const description = document
    .querySelector('#editPostForm textarea')
    .value.trim();

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

const handleDeletePost = async () => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('Deleted!');
    document.location.replace('/dashboard');
  } else {
    alert('There was an error deleting this post. Try again!');
  }
};

document
  .querySelector('#deleteBtn')
  .addEventListener('click', handleDeletePost);

document
  .querySelector('#editPostForm')
  .addEventListener('submit', handleEditPost);
