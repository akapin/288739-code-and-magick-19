// Файл setup.js
'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var generateWizards = function () {
  var wizards = [];

  for (var i = 1; i <= 4; i++) {
    wizards.push(
        {
          name: getRandomItem(NAMES) + ' ' + getRandomItem(SURNAMES),
          coatColor: getRandomItem(COAT_COLORS),
          eyesColor: getRandomItem(EYE_COLORS),
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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var wizards = generateWizards();
renderWizards(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
