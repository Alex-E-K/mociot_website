var OSName = "Unknown OS";
var basket = $("#basket"),
container = $("#container"),
box = $(".box"),
squares = $(".square"),
square1 = $("#square1"),
square2 = $("#square2"),
square3 = $("#square3"),
restart = $("#restart"),
score_span = $("#score"),
score_1 = $("#score_1"),
life_span = $("#life"),
floor = $("#floor"),
basket_height = basket.height(),
container_height = container.height(),
square_height = squares.height(),
square_initial_position = parseInt(squares.css("top")),
score = 0,
life = 5,
speed = 2,
max_speed = 15,
counter = 0,
score_updated = false,
the_game = 0,
anim_id = 0,
square_current_position = 0,
square_top = 0,
basket_top = container_height - basket_height,
bullseye_num = 0;
life_span.text(life);

function getOSName() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
  } else if (/Android/.test(userAgent)) {
      os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
  }
  OSName = os;
}

$(function() {
    getOSName();
    the_game = function() {
      if (check_square_hits_floor(square1) || check_square_hits_basket(square1)) {
        set_square_to_initial_position(square1);
      } else {
        square_down(square1);
      }
    
      if (check_square_hits_floor(square2) || check_square_hits_basket(square2)) {
        set_square_to_initial_position(square2);
      } else {
        square_down(square2);
      }
    
      if (check_square_hits_floor(square3) || check_square_hits_basket(square3)) {
        set_square_to_initial_position(square3);
      } else {
        square_down(square3);
      }
    
      if (life > 0) {
        anim_id = requestAnimationFrame(the_game);
      } else {
        stop_the_game();
      }
    };
    
    anim_id = requestAnimationFrame(the_game);
    });
    
    /*****Functions Part*****/
    
    $(document).on("mousemove", function(e) {
    basket.css("left", e.pageX);
    life_span.text(e.pageX);
    });

    window.addEventListener('devicemotion', handleMotion, true);

    function handleMotion(e) {
      var move;
      if (OSName === "iOS") {
        move = parseInt(basket.css("left")) + (parseInt(e.accelerationIncludingGravity.x) * 2);
      } else {
        move = parseInt(basket.css("left")) + (parseInt(e.accelerationIncludingGravity.x) * (-2));
      }
      basket.css("left", move);
      score_span.text(move);
    }
    
    function square_down(square) {
    square_current_position = parseInt(square.css("top"));
    square.css("top", square_current_position + speed);
    }
    
    function check_square_hits_floor(square) {
    if (collision(square, floor)) {
      show_bulls_eye(square);
      decrement_life();
      return true;
    }
    return false;
    }
    
    function set_square_to_initial_position(square) {
    square.css("top", square_initial_position);
    }
    
    function show_bulls_eye(square) {
    bullseye_num = square.attr("data-bullseye");
    $("#bullseye" + bullseye_num).show();
    hide_bulls_eye(bullseye_num);
    }
    
    function hide_bulls_eye(bullseye_num) {
    setTimeout(function() {
      $("#bullseye" + bullseye_num).hide();
    }, 800);
    }
    
    function decrement_life() {
    life--;
    life_span.text(life);
    }
    
    function check_square_hits_basket(square) {
    if (collision(square, basket)) {
      square_top = parseInt(square.css("top"));
      if (square_top < basket_top) {
        update_score();
        return true;
      }
    }
    return false;
    }
    
    function update_score() {
    score++;
    if (score % 10 === 0 && speed <= max_speed) {
      speed++;
    }
    score_span.text(score);
    score_1.text(score);
    }
    
    function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
    }
    
    restart.click(function() {
    location.reload();
    });
    
    /*****collision_detection part*****/
    
    function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
    
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
    }