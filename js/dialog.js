'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var userDialog = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userNameInput = userDialog.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupForm.addEventListener('submit', closePopup);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    userDialog.removeAttribute('style');
    document.removeEventListener('keydown', onPopupEscPress);
    setupForm.removeEventListener('submit', closePopup);
  };

  var successHandler = function () {
    userDialog.classList.add('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSetupOpenClick = function () {
    openPopup();
  };

  var onSetupOpenKeydown = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  var onSetupCloseClick = function () {
    closePopup();
  };

  var onSetupCloseKeydown = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var onSetupFormSubmit = function (evt) {
    var data = new FormData(setupForm);
    evt.preventDefault();
    window.backend.save(URL, data, successHandler, errorHandler);
  };

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenKeydown);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseKeydown);

  userNameInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  setupForm.addEventListener('submit', onSetupFormSubmit);
})();
