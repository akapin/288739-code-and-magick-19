// Файл setup.js
'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var MIN_NAME_LENGTH = 2;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var setupWizardAppearanceElement = userDialog.querySelector('.setup-wizard-appearance');
var userWizardElement = setupWizardAppearanceElement.querySelector('.setup-wizard');
var fireballElement = userDialog.querySelector('.setup-fireball-wrap');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

userNameInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity(
        'Имя должно состоять минимум из ' +
        MIN_NAME_LENGTH +
        '-х символов'
    );
  } else {
    target.setCustomValidity('');
  }
});

userWizardElement.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('wizard-coat')) {
    var coatColor = getRandomItem(COAT_COLORS);
    while (evt.target.style.fill === coatColor) {
      coatColor = getRandomItem(COAT_COLORS);
    }
    evt.target.style.fill = coatColor;
    setupWizardAppearanceElement.querySelector('input[name="coat-color"]').value = coatColor;
  }

  if (evt.target.classList.contains('wizard-eyes')) {
    var eyesColor = getRandomItem(EYE_COLORS);
    while (evt.target.style.fill === eyesColor) {
      eyesColor = getRandomItem(EYE_COLORS);
    }
    evt.target.style.fill = eyesColor;
    setupWizardAppearanceElement.querySelector('input[name="eyes-color"]').value = eyesColor;
  }
});

fireballElement.addEventListener('click', function () {
  // Здесь я не могу использовать трюк который использовал в обработчике userWizardElement
  // т.к. hex при записи в style.background трансформируется в rgb
  var fireballColor = getRandomItem(FIREBALL_COLORS);
  fireballElement.style.background = fireballColor;
  fireballElement.querySelector('input[name="fireball-color"]').value = fireballColor;
});

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

var wizards = generateWizards();
renderWizards(wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
