/* script.js - interactions */

/* ---- helper safe get ---- */
function $(id){ return document.getElementById(id); }

/* ===== ATTRAPE LA BOULE =====
   - la boule apparaît quand on clique Démarrer
   - se déplace toutes les 700ms pendant 10s
*/
(function(){
  const startBtn = $('catch-start');
  const box = $('catch-game-box');
  const ball = $('ball');
  const result = $('catch-result');
  if (!startBtn || !box || !ball) return;

  let interval = null;
  let timeout = null;
  let score = 0;

  function posRandom(){
    const boxRect = box.getBoundingClientRect();
    const maxX = Math.max(0, box.clientWidth - ball.offsetWidth);
    const maxY = Math.max(0, box.clientHeight - ball.offsetHeight);
    const x = Math.floor(Math.random() * (maxX + 1));
    const y = Math.floor(Math.random() * (maxY + 1));
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
  }

  ball.style.display = 'none';

  startBtn.addEventListener('click', function(){
    score = 0;
    result.textContent = 'Score : 0';
    ball.style.display = 'block';
    posRandom();

    interval = setInterval(posRandom, 700);
    startBtn.disabled = true;

    timeout = setTimeout(function(){
      clearInterval(interval);
      ball.style.display = 'none';
      startBtn.disabled = false;
      result.textContent = 'Temps écoulé ! Score : ' + score;
    }, 10000);
  });

  ball.addEventListener('click', function(){
    score++;
    result.textContent = 'Score : ' + score;
    posRandom();
  });
})();

/* ===== DEVINE LE NOMBRE =====
   - garde une cible tant que la page n'est pas rechargée
*/
(function(){
  const guessBtn = $('guess-btn');
  const guessInput = $('guess-input');
  const feedback = $('guess-feedback');
  if (!guessBtn || !guessInput || !feedback) return;

  let target = Math.floor(Math.random() * 10) + 1;

  guessBtn.addEventListener('click', function(){
    const v = Number(guessInput.value);
    if (!v || v < 1 || v > 10) {
      feedback.textContent = 'Entrez un nombre entre 1 et 10.';
      return;
    }
    if (v === target) {
      feedback.textContent = 'Correct ! Nouveau nombre généré.';
      target = Math.floor(Math.random() * 10) + 1;
    } else if (v < target) {
      feedback.textContent = 'Trop petit !';
    } else {
      feedback.textContent = 'Trop grand !';
    }
  });
})();

/* ===== QUIZ ===== */
(function(){
  const quizBtns = document.querySelectorAll('.quiz-btn');
  const quizResult = $('quiz-result');
  if (!quizBtns || !quizResult) return;
  quizBtns.forEach(b => {
    b.addEventListener('click', function(){
      const ans = b.dataset.answer;
      if (ans === 'js') {
        quizResult.textContent = 'Bonne réponse 👍 JavaScript manipule le DOM.';
      } else {
        quizResult.textContent = 'Mauvaise réponse — essaye encore.';
      }
    });
  });
})();

/* ===== CONTACT FORM (simulation) ===== */
(function(){
  const form = $('contact-form');
  if (!form) return;
  const out = $('form-msg');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const prenom = $('prenom').value.trim();
    const nom = $('nom').value.trim();
    const sujet = $('sujet').value.trim();
    const details = $('details').value.trim();

    if (!prenom || !nom || !sujet || !details) {
      if (out) {
        out.style.color = 'crimson';
        out.textContent = 'Veuillez remplir tous les champs.';
      }
      return;
    }

    if (out) {
      out.style.color = '#0b6623';
      out.textContent = 'Message envoyé ! Merci — (simulation)';
    }
    form.reset();
  });
})();
