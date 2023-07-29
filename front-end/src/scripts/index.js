document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user_info'));
  const signout = document.getElementById('nav-sign-out');
  console.log(user);
  if (!user) {
    signout.style.display = 'none';
  } else {
    signout.style.display = 'block';
    signout.addEventListener('click', () => {
      localStorage.clear();
      location.reload();
    });
  }
});
