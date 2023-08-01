window.addEventListener('load', () => {
  const email_in = document.getElementById('sign-in-email');
  const password_in = document.getElementById('sign-in-password');
  const button_sign_in = document.getElementById('sign-in-button');

  const error_sign_in = document.getElementById('sign-in-error');

  //form-validation
  function checkEmpty(error_field, ...args) {
    for (element of args) {
      if (!element.value.trim()) {
        error_field.innerText = 'Fields cannot be empty';
        return true;
      }
    }

    return false;
  }

  button_sign_in.addEventListener('click', async (e) => {
    if (checkEmpty(error_sign_in, email_in, password_in)) return;

    const body = {
      email: email_in.value,
      password: password_in.value,
    };
    try {
      console.log(body);
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const user = await response.json();
      if (user.error === 'Unauthorized') {
        console.log(user);
        error_sign_in.innerText = 'Invalid Email or password';
        return;
      }

      console.log(user);
      localStorage.setItem('user_info', JSON.stringify(user));
      if (user.role === 'user') {
        location.href = '../index.html';
      } else {
        location.href = '../views/dashboard.html';
      }
    } catch (error) {
      error_sign_in.innerText = 'Invalid Email or password';
    }
  });
});
