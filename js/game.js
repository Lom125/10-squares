const numDivs = 36;
const maxHits = 10;
let mixHits = 0;
let hits = 0;
let firstHitTime = 0;


function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  // Это я сделал в функции handleClick
    let divSelector = randomDivId();
    $(divSelector).addClass("target");
    
  // TODO: помечать target текущим номером
  // Сделал
    $(divSelector).text(hits+1);

  // FIXME: тут надо определять при первом клике firstHitTime
  // Это я сделал в функции init
    if (hits === maxHits) {
      endGame();
    }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  // Сделал
  $(".col").addClass("d-none");
  
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  
  $("#total-time-played").text(totalPlayedSeconds);
  $("#mix-hits").text(mixHits);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;

  // Убираем кликнутый "target"
    $(event.target).toggleClass("target");

  // FIXME: убирать текст со старых таргетов. Кажется есть .text? 
  // Сделал  
    $(event.target).text('');
    round();
  }
  else {
  // Количество промахов  
    mixHits +=1;
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  // Сделал
    $(event.target).addClass("miss");
  // При отпускании мыши клетка снова - зеленая.
    $(event.target).mouseup(function() {
      $(event.target).removeClass("miss");
    });
  }
  
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  // Кнопка тут была. Переделал Init().
  $("#button-reload").click(function() {
    location.reload();
  });
  round();
  firstHitTime = getTimestamp();
  $(".game-field").mousedown(handleClick);
}

$(document).ready(init);
