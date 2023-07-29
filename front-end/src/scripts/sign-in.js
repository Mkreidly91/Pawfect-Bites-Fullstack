window.addEventListener('load', () => {
  const email_in = document.getElementById('sign-in-email');
  const password_in = document.getElementById('sign-in-password');
  const button_sign_in = document.getElementById('sign-in-button');

  const name_up = document.getElementById('sign-up-name');
  const email_up = document.getElementById('sign-up-email');
  const password_up = document.getElementById('sign-up-password');
  const button_sign_up = document.getElementById('sign-up-verify');

  const error_sign_in = document.getElementById('sign-in-error');
  const error_sign_up = document.getElementById('sign-up-error');

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

  //   Sign in
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
      localStorage.setItem('user_info', JSON.stringify(user));
      window.location.href = '../index.html';
    } catch (error) {
      error_sign_in.innerText = 'Invalid Email or password';
    }
  });

  button_sign_up.addEventListener('click', async (e) => {
    if (checkEmpty(error_sign_up, name_up, email_up, password_up)) return;
    const body = {
      name: name_up.value,
      email: email_up.value,
      password: password_up.value,
    };
    try {
      console.log(body);
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const status = await response.json();
      if (status.error) {
        error_sign_up.innerText = `${status.error}`;
        return;
      }

      console.log(status);
    } catch (error) {
      error_sign_up.innerText = 'Invalid Email or password';
    }
  });
});
