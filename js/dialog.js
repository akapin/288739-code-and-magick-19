'use strict';

(function () {
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

  setupOpen.addEventListener('click', onSetupOpenClick);
  setupOpen.addEventListener('keydown', onSetupOpenKeydown);
  setupClose.addEventListener('click', onSetupCloseClick);
  setupClose.addEventListener('keydown', onSetupCloseKeydown);

  userNameInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });
})();
