'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var generateWizards = function () {
    var wizards = [];

    for (var i = 1; i <= 4; i++) {
      wizards.push(
          {
            name: window.util.getRandomItem(NAMES) + ' ' + window.util.getRandomItem(SURNAMES),
            coatColor: window.color.getRandomColor('coat'),
            eyesColor: window.color.getRandomColor('eyes'),
          }
      );
    }

    return wizards;
  };

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var similarListElement = userDialog.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var wizards = generateWizards();
  renderWizards(wizards);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
