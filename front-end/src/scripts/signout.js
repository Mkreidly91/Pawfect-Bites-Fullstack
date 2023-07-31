document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user_info'));
  const signout = document.getElementById('nav-sign-out');

  if (!user) {
    signout.style.display = 'none';
  } else {
    signout.style.display = 'block';
    signout.addEventListener('click', async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.authorization.token}`,
          },
        });
        const status = await res.json();
        if (status.message === 'Successfully logged out') {
          localStorage.clear();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
});
