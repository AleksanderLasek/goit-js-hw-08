const _ = require('lodash');

const $form = document.querySelector('.feedback-form');
const $input = document.querySelector('input');
const $textarea = document.querySelector('textarea');

const formObj = {
  email: '',
  message: '',
};

let data = toJS(localStorage.getItem('feedback-form-state'));
if (data === null) data = formObj; //pierwsze wejscie

if (data.email !== '' || data.message !== '') {
  $input.value = data.email;
  $textarea.value = data.message;
}

function textUpdate(event) {
  event.preventDefault();
  try {
    const {
      elements: { email, message },
    } = event.currentTarget;

    formObj.email = email.value;
    formObj.message = message.value;

    toJSONAndStorage('feedback-form-state', formObj);
  } catch {}
}

$form.addEventListener('input', _.throttle(textUpdate, 500));

$form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(formObj);
  localStorage.removeItem('feedback-form-state');
  data.email = '';
  data.message = '';
  $input.value = data.email;
  $textarea.value = data.message;
});

function toJSONAndStorage(obj, key) {
  try {
    const objJSON = JSON.stringify(key);
    localStorage.setItem(obj, objJSON);
  } catch (error) {
    console.error(error);
  }
}

function toJS(objJSON) {
  try {
    const obj = JSON.parse(objJSON);
    return obj;
  } catch (error) {
    console.error(error);
  }
}
