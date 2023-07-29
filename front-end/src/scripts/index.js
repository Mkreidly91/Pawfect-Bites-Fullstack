document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user_info'));
  console.log(user);
});
