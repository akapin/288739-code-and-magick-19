'use strict';

(function () {
  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {},
  };

  var userDialog = document.querySelector('.setup');
  var setupWizardAppearanceElement = userDialog.querySelector('.setup-wizard-appearance');
  var userWizardElement = setupWizardAppearanceElement.querySelector('.setup-wizard');
  var fireballElement = userDialog.querySelector('.setup-fireball-wrap');

  var onUserWizardElementClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('wizard-coat')) {
      var coatColor = window.color.get('coat');
      while (target.style.fill === coatColor) {
        coatColor = window.color.get('coat');
      }
      target.style.fill = coatColor;
      setupWizardAppearanceElement.querySelector('input[name="coat-color"]').value = coatColor;
      wizard.onCoatChange(coatColor);
    }

    if (target.classList.contains('wizard-eyes')) {
      var eyesColor = window.color.get('eyes');
      while (target.style.fill === eyesColor) {
        eyesColor = window.color.get('eyes');
      }
      target.style.fill = eyesColor;
      setupWizardAppearanceElement.querySelector('input[name="eyes-color"]').value = eyesColor;
      wizard.onEyesChange(eyesColor);
    }
  };

  var onFireballClick = function () {
    var fireballColor = window.color.get('fireball');
    fireballElement.style.background = fireballColor;
    fireballElement.querySelector('input[name="fireball-color"]').value = fireballColor;
  };

  userWizardElement.addEventListener('click', onUserWizardElementClick);
  fireballElement.addEventListener('click', onFireballClick);

  window.wizard = wizard;
})();
