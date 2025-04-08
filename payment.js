function handleSubmit(event) {
  event.preventDefault();
  alert('Mock payment submitted!');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});
