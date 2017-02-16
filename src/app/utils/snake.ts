export default function init(stage) {
  let ctx;
  let turn  = [];
  let xV = [-1, 0, 1, 0];
  let yV = [0, -1, 0, 1];
  let queue = [];
  let elements = 1;
  let map = [];
  let X = 5 + (Math.random() * (45 - 10))|0;
  let Y = 5 + (Math.random() * (30 - 10))|0;
  let direction = Math.random() * 3 | 0;
  let interval: any;
  let score = 0;
  let inc_score = 50;
  let sum = 0, easy = 0;
  let i, dir;
  let canvas = document.createElement('canvas');
  for (i = 0; i < 45; i++) {
    map[i] = [];
  }

  canvas.setAttribute('width', (45 * 10).toString());
  canvas.setAttribute('height', (30 * 10).toString());
  ctx = canvas.getContext('2d');
  document.getElementById(stage).innerHTML = '';
  document.getElementById(stage).appendChild(canvas);
  window.scrollTo(0, document.documentElement.clientHeight);
  document.body.style.overflow = 'hidden';

  function placeFood() {
    let x, y;
    do {
      x = Math.random() * 45|0;
      y = Math.random() * 30|0;
    } while (map[x][y]);
    map[x][y] = 1;
    ctx.strokeRect(x * 10 + 1, y * 10 + 1, 10 - 2, 10 - 2);
  }
  placeFood();
  function clock() {
    if (easy) {
      X = (X+45)%45;
      Y = (Y+30)%30;
    }
    --inc_score;
    if (turn.length) {
      dir = turn.pop();
      if ((dir % 2) !== (direction % 2)) {
        direction = dir;
      }
    }
    if (
      (easy || (0 <= X && 0 <= Y && X < 45 && Y < 30))
      && 2 !== map[X][Y]) {
      if (1 === map[X][Y]) {
        score+= Math.max(5, inc_score);
        inc_score = 50;
        placeFood();
        elements++;
      }
      ctx.fillRect(X * 10, Y * 10, 10 - 1, 10 - 1);
      map[X][Y] = 2;
      queue.unshift([X, Y]);
      X+= xV[direction];
      Y+= yV[direction];
      if (elements < queue.length) {
        dir = queue.pop()
        map[dir[0]][dir[1]] = 0;
        ctx.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
      }
    } else if (!turn.length) {
      document.body.style.overflow = 'auto';
    }
  }

  interval = setInterval(clock, 90);
  document.onkeydown = function(e) {
    let code = e.keyCode - 37;
    /*
     * 0: left
     * 1: up
     * 2: right
     * 3: down
     **/
    if (0 <= code && code < 4 && code !== turn[0]) {
      turn.unshift(code);
    } else if (-5 == code) {
      if (interval) {
        clearInterval(interval);
        interval = null;
      } else {
        interval = setInterval(clock, 60);
      }
    } else { // O.o
      dir = sum + code;
      if (dir == 44||dir==94||dir==126||dir==171) {
        sum+= code
      } else if (dir === 218) easy = 1;
    }
  }
}
