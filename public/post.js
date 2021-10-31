const handleComment = async (e) => {
  e.preventDefault();
  const postId = document.location.href[document.location.href.length - 1];
  const comment = document
    .querySelector('#commentAddContainer')
    .children[1].value.trim();

  if (comment.length <= 5) {
    alert('Comment must be greater than 5 characters long!');
    return;
  }

  const response = await fetch(`/api/posts/${postId}/comment`, {
    method: 'POST',
    body: JSON.stringify({ comment }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
    return;
  }

  alert('Failed. Try again.');
};

document.querySelector('#commentBtn').addEventListener('click', handleComment);
