'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var HISTOGRAM_LEFT_MARGIN = 40;
var HISTOGRAM_TOP_MARGIN = 80;
var TIME_TEXT_MARGIN = 20;
var NAME_TEXT_MARGIN = 10;
var INTRO_TEXT_X_MARGIN = 20;
var CONGRATULATIONS_TEXT_Y_MARGIN = 30;
var RESULTS_TEXT_Y_MARGIN = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + INTRO_TEXT_X_MARGIN, CONGRATULATIONS_TEXT_Y_MARGIN);
  ctx.fillText('Список результатов:', CLOUD_X + INTRO_TEXT_X_MARGIN, RESULTS_TEXT_Y_MARGIN);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + HISTOGRAM_LEFT_MARGIN + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + HISTOGRAM_TOP_MARGIN + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - TIME_TEXT_MARGIN
    );

    ctx.fillText(
        names[i],
        CLOUD_X + HISTOGRAM_LEFT_MARGIN + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + HISTOGRAM_TOP_MARGIN + BAR_HEIGHT + NAME_TEXT_MARGIN
    );

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + Math.floor(Math.random() * 101) + '%, 50%)';
    }

    ctx.fillRect(
        CLOUD_X + HISTOGRAM_LEFT_MARGIN + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + HISTOGRAM_TOP_MARGIN + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime,
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) / maxTime
    );
  }
};
