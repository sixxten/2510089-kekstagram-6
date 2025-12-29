const form = document.querySelector('#upload-select-image');
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const descriptionInput = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');
const body = document.body;

const MAX_COMMENT_LENGTH = 140;

import { pristine } from './hashtags-pristine.js';

pristine.addValidator(
  descriptionInput,
  (value) => value.length <= MAX_COMMENT_LENGTH,
  `Максимальная длина комментария - ${MAX_COMMENT_LENGTH} символов`
);

const validateForm = () => {
  const isValid = pristine.validate();
  submitButton.disabled = !isValid;
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadCancel.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onDocumentKeydown);

  form.reset();
  pristine.reset();
  uploadInput.value = '';

  submitButton.disabled = false;
};

uploadInput.addEventListener('change', () => {
  if (uploadInput.files.length > 0) {
    openForm();
  }
});

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
    if (evt.target === form.querySelector('.text__hashtags') ||
        evt.target === descriptionInput) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    closeForm();
  }
};

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляется...';
});

export { openForm, closeForm };
