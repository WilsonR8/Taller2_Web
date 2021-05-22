const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.innerHTML = `
    <div class="modal__backdrop"></div>
    <article class="modal__content">
      <button class="modal__close">X</button>
      <form class="authform">
        <label class="authform__regfield productForm__label">
          Firstname
          <input class="productForm__input" type="text" name="firstname">
        </label>
        <label class="authform__regfield productForm__label">
          Lastname
          <input class="productForm__input" type="text" name="lastname">
        </label>
        <label class="productForm__label">
          Email
          <input class="productForm__input" type="email" name="email">
        </label>
        <label class="productForm__label">
          Password
          <input class="productForm__input" type="password" name="password">
        </label>
        <p class="productForm__error"></p>
        <button type="button" class="authform__register">Go to register</button>
        <button type="button" class="authform__login">Go to login</button>
        <button type="submit">Send</button>
      </form>
    </article>
`;

document.body.appendChild(authModal);

const authForm = authModal.querySelector('.authform');
const regFields = authForm.querySelectorAll('.authform__regfield');
const registerBtn = authForm.querySelector('.authform__register');
const loginBtn = authForm.querySelector('.authform__login');
const modalError = authForm.querySelector('.productForm__error');
let isLogin = true;
const authModalContent = authModal.querySelector('.modal__content');

function handleGoToLogin () {
  regFields.forEach(function (elem) {
    elem.classList.add('hidden');
  });
  loginBtn.classList.add('hidden');
  registerBtn.classList.remove('hidden');
  isLogin = true;
}

loginBtn.addEventListener('click', handleGoToLogin);

registerBtn.addEventListener('click', function () {
  regFields.forEach(function (elem) {
    elem.classList.remove('hidden');
  });
  loginBtn.classList.remove('hidden');
  registerBtn.classList.add('hidden');
  isLogin = false;
});

handleGoToLogin();

authForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('submit');

  const firstname = authForm.firstname.value;
  const lastname = authForm.lastname.value;
  const email = authForm.email.value;
  const password = authForm.password.value;

  if(isLogin) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        handleCloseModal();
      })
      .catch((error) => {
        modalError.innerText = error.message;
      });
  }



});
