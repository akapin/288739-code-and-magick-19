'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var colorMap = {
    'coat': COAT_COLORS,
    'eyes': EYE_COLORS,
    'fireball': FIREBALL_COLORS,
  };

  var getRandomColor = function (object) {
    return colorMap[object][Math.floor(EYE_COLORS.length * Math.random())];
  };

  window.color = {
    getRandomColor: getRandomColor,
  };
})();
