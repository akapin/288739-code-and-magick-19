'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var HISTOGRAM_LEFT_MARGIN = 40;
var HISTOGRAM_TOP_MARGIN = 80;
var TIME_TEXT_MARGIN = 20;
var NAME_TEXT_MARGIN = 10;
var INTRO_TEXT_X_MARGIN = 20;
var CONGRATULATIONS_TEXT_Y_MARGIN = 30;
var RESULTS_TEXT_Y_MARGIN = 50;
var BLACK_COLOR = '#000';
var WHITE_COLOR = '#fff';
var RED_COLOR = 'rgba(255, 0, 0, 1)';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var BLUE_COLOR_HUE_CODE = 240;
var COLOR_LIGHTNESS_PERCENTAGE = 50;
var FONT_PROPERTY = '16px PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderIntroText = function (ctx) {
  var introTextX = CLOUD_X + INTRO_TEXT_X_MARGIN;
  ctx.fillStyle = BLACK_COLOR;
  ctx.font = FONT_PROPERTY;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', introTextX, CONGRATULATIONS_TEXT_Y_MARGIN);
  ctx.fillText('Список результатов:', introTextX, RESULTS_TEXT_Y_MARGIN);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getRandomTintOfColor = function (hue, lightness) {
  return 'hsl(' + hue + ', ' + Math.floor(Math.random() * 101) + '%, ' + lightness + '%)';
};

var renderHistogram = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barX = CLOUD_X + HISTOGRAM_LEFT_MARGIN + (BAR_WIDTH + BAR_GAP) * i;
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / (maxTime === 0 ? 1 : maxTime);
    var barY = CLOUD_Y + HISTOGRAM_TOP_MARGIN + MAX_BAR_HEIGHT - barHeight;
    var nameTextY = barY + barHeight + NAME_TEXT_MARGIN;
    var timeTextY = barY - TIME_TEXT_MARGIN;
    var barColor = BLACK_COLOR;
    var textColor = BLACK_COLOR;

    ctx.fillStyle = textColor;

    ctx.fillText(Math.round(times[i]), barX, timeTextY);
    ctx.fillText(names[i], barX, nameTextY);

    if (names[i] === 'Вы') {
      barColor = RED_COLOR;
    } else {
      barColor = getRandomTintOfColor(BLUE_COLOR_HUE_CODE, COLOR_LIGHTNESS_PERCENTAGE);
    }

    renderBar(ctx, barX, barY, BAR_WIDTH, barHeight, barColor);
  }
};

var getMaxElement = function (arr) {
  if (!arr && !arr.length) {
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
  var cloudShadowX = CLOUD_X + CLOUD_GAP;
  var cloudShadowY = CLOUD_Y + CLOUD_GAP;
  renderCloud(ctx, cloudShadowX, cloudShadowY, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);
  renderIntroText(ctx);
  renderHistogram(ctx, names, times);
};
