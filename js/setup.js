// Файл setup.js
'use strict';
(function () {
  var userDialog = document.querySelector('.setup');
  var setupWizardAppearanceElement = userDialog.querySelector('.setup-wizard-appearance');
  var userWizardElement = setupWizardAppearanceElement.querySelector('.setup-wizard');
  var fireballElement = userDialog.querySelector('.setup-fireball-wrap');

  var onUserWizardElementClick = function (evt) {
    if (evt.target.classList.contains('wizard-coat')) {
      var coatColor = window.color.getRandomColor('coat');
      while (evt.target.style.fill === coatColor) {
        coatColor = window.color.getRandomColor('coat');
      }
      evt.target.style.fill = coatColor;
      setupWizardAppearanceElement.querySelector('input[name="coat-color"]').value = coatColor;
    }

    if (evt.target.classList.contains('wizard-eyes')) {
      var eyesColor = window.color.getRandomColor('eyes');
      while (evt.target.style.fill === eyesColor) {
        eyesColor = window.color.getRandomColor('eyes');
      }
      evt.target.style.fill = eyesColor;
      setupWizardAppearanceElement.querySelector('input[name="eyes-color"]').value = eyesColor;
    }
  };

  var onFireballClick = function () {
    var fireballColor = window.color.getRandomColor('fireball');
    fireballElement.style.background = fireballColor;
    fireballElement.querySelector('input[name="fireball-color"]').value = fireballColor;
  };

  userWizardElement.addEventListener('click', onUserWizardElementClick);
  fireballElement.addEventListener('click', onFireballClick);
})();
