window.addEventListener('load', () => {
  const name_up = document.getElementById('sign-up-name');
  const email_up = document.getElementById('sign-up-email');
  const password_up = document.getElementById('sign-up-password');
  const button_sign_up = document.getElementById('sign-up-verify');

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

      const { error, message } = await response.json();

      if (error) {
        error_sign_up.innerText = `${error}`;
        return;
      } else {
        location.href = './sign-in.html';
      }
    } catch (error) {
      error_sign_up.innerText = 'Invalid Email or password';
    }
  });
});
