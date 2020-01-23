'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var CLOUD_SHADOW_X = CLOUD_X + CLOUD_GAP;
var CLOUD_SHADOW_Y = CLOUD_Y + CLOUD_GAP;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var HISTOGRAM_LEFT_MARGIN = 40;
var HISTOGRAM_TOP_MARGIN = 80;
var TIME_TEXT_MARGIN = 20;
var NAME_TEXT_MARGIN = 10;
var INTRO_TEXT_X_MARGIN = 20;
var INTRO_TEXT_X = CLOUD_X + INTRO_TEXT_X_MARGIN;
var CONGRATULATIONS_TEXT_Y_MARGIN = 30;
var RESULTS_TEXT_Y_MARGIN = 50;
var BLACK_COLOR = '#000';
var WHITE_COLOR = '#fff';
var RED_COLOR = 'rgba(255, 0, 0, 1)';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT_FONT = '16px PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderIntroText = function (ctx) {
  ctx.fillStyle = BLACK_COLOR;
  ctx.font = TEXT_FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', INTRO_TEXT_X, CONGRATULATIONS_TEXT_Y_MARGIN);
  ctx.fillText('Список результатов:', INTRO_TEXT_X, RESULTS_TEXT_Y_MARGIN);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderHistogram = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var BAR_X = CLOUD_X + HISTOGRAM_LEFT_MARGIN + (BAR_WIDTH + BAR_GAP) * i;
    var BAR_HEIGHT = (MAX_BAR_HEIGHT * times[i]) / (maxTime === 0 ? 1 : maxTime);
    var BAR_Y = CLOUD_Y + HISTOGRAM_TOP_MARGIN + MAX_BAR_HEIGHT - BAR_HEIGHT;
    var NAME_TEXT_Y = BAR_Y + BAR_HEIGHT + NAME_TEXT_MARGIN;
    var TIME_TEXT_Y = BAR_Y - TIME_TEXT_MARGIN;
    var BAR_COLOR = BLACK_COLOR;
    var TEXT_COLOR = BLACK_COLOR;

    ctx.fillStyle = TEXT_COLOR;

    ctx.fillText(Math.round(times[i]), BAR_X, TIME_TEXT_Y);
    ctx.fillText(names[i], BAR_X, NAME_TEXT_Y);

    if (names[i] === 'Вы') {
      BAR_COLOR = RED_COLOR;
    } else {
      BAR_COLOR = 'hsl(240,' + Math.floor(Math.random() * 101) + '%, 50%)';
    }

    renderBar(ctx, BAR_X, BAR_Y, BAR_WIDTH, BAR_HEIGHT, BAR_COLOR);
  }
};

var getMaxElement = function (arr) {
  if (!arr || !arr.length) {
    return null;
  }

  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_SHADOW_X, CLOUD_SHADOW_Y, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);
  renderIntroText(ctx);
  renderHistogram(ctx, names, times);
};
