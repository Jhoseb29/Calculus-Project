const totalCards = 12;
const availableCards = ['A', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
   if (currentMove < 2) {
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {
            currentAttempts++;
            document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
               selectedCards = [];
               currentMove = 0;
               checkWin(); // Comprobar si se ha ganado
            } else {
               setTimeout(async () => {
                  let correct = await askQuestion();
                  if (correct) {
                     selectedCards[0].classList.remove('active');
                     selectedCards[1].classList.remove('active');
                  }
                  selectedCards = [];
                  currentMove = 0;
               }, 600);
            }
         }
      }
   }
}

function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   } else {
      randomValue();
   }
}

function getFaceValue(value) {
   let rtn = value;
   if (value < availableCards.length) {
      rtn = availableCards[value];
   }
   return rtn;
}

function generateQuestion() {
   const questions = [
      { question: "¿Cuál es la derivada de x^2?", answer: "2x" },
      { question: "¿Cuál es la integral de 2x?", answer: "x^2 + C" },
      { question: "¿Cuánto es la derivada de sin(x)?", answer: "cos(x)" },
      { question: "¿Cuál es la integral de cos(x)?", answer: "sin(x) + C" },
      { question: "¿Cuánto es la derivada de e^x?", answer: "e^x" },
      { question: "¿Cuánto es la derivada de ln(x)?", answer: "1/x" },
      { question: "¿Cuál es la integral de 1/x?", answer: "ln(x) + C" },
      { question: "¿Cuánto es la derivada de tan(x)?", answer: "sec^2(x)" },
      { question: "¿Cuánto es la derivada de x^3?", answer: "3x^2" },
      { question: "¿Cuál es la integral de 3x^2?", answer: "x^3 + C" },
      { question: "¿Cuál es la derivada de cos(x)?", answer: "-sin(x)" },
      { question: "¿Cuál es la integral de sin(x)?", answer: "-cos(x) + C" },
      { question: "¿Cuánto es la derivada de x^4?", answer: "4x^3" },
      { question: "¿Cuál es la integral de 4x^3?", answer: "x^4 + C" },
      { question: "¿Cuál es la derivada de arctan(x)?", answer: "1/(1+x^2)" },
      { question: "¿Cuál es la integral de 1/(1+x^2)?", answer: "arctan(x) + C" },
      { question: "¿Cuánto es la derivada de sinh(x)?", answer: "cosh(x)" },
      { question: "¿Cuánto es la derivada de cosh(x)?", answer: "sinh(x)" },
      { question: "¿Cuál es la derivada de x^5?", answer: "5x^4" },
      { question: "¿Cuál es la integral de 5x^4?", answer: "x^5 + C" },
      { question: "¿Cuál es la derivada de e^(2x)?", answer: "2e^(2x)" },
      { question: "¿Cuál es la integral de e^(2x)?", answer: "(1/2)e^(2x) + C" },
      { question: "¿Cuánto es la derivada de log(x)?", answer: "1/(x ln(10))" },
      { question: "¿Cuánto es la integral de 1/(x ln(10))?", answer: "log(x) + C" },
      { question: "¿Cuál es la derivada de x^(1/2)?", answer: "1/(2√x)" },
      { question: "¿Cuál es la integral de 1/(2√x)?", answer: "√x + C" },
      { question: "¿Cuánto es la derivada de sin(2x)?", answer: "2cos(2x)" },
      { question: "¿Cuánto es la integral de cos(2x)?", answer: "(1/2)sin(2x) + C" },
      { question: "¿Cuál es la derivada de arccos(x)?", answer: "-1/√(1-x^2)" },
      { question: "¿Cuál es la integral de 1/√(1-x^2)?", answer: "arcsin(x) + C" },
      { question: "¿Cuánto es la derivada de ln(x^2)?", answer: "2/x" },
      { question: "¿Cuál es la integral de 2/x?", answer: "2ln(x) + C" },
      { question: "¿Cuál es la derivada de tanh(x)?", answer: "sech^2(x)" },
      { question: "¿Cuánto es la derivada de x^6?", answer: "6x^5" },
      { question: "¿Cuál es la integral de 6x^5?", answer: "x^6 + C" },
      { question: "¿Cuánto es la derivada de sin^2(x)?", answer: "2sin(x)cos(x)" },
      { question: "¿Cuál es la integral de sin^2(x)?", answer: "(1/2)(x - sin(x)cos(x)) + C" },
      { question: "¿Cuánto es la derivada de cos^2(x)?", answer: "-2sin(x)cos(x)" },
      { question: "¿Cuál es la integral de cos^2(x)?", answer: "(1/2)(x + sin(x)cos(x)) + C" },
      { question: "¿Cuánto es la derivada de ln(1+x)?", answer: "1/(1+x)" }
   ];

   // Selecciona una pregunta aleatoria
   const randomIndex = Math.floor(Math.random() * questions.length);
   return questions[randomIndex];
}

function askQuestion() {
   return new Promise((resolve) => {
      let { question, answer } = generateQuestion();
      document.querySelector('#question-text').innerText = question;
      document.querySelector('#question-modal').style.display = 'flex';

      document.querySelector('#submit-answer').addEventListener('click', function handleAnswer() {
         let userAnswer = document.querySelector('#answer-input').value.trim();
         if (userAnswer === answer) {
            document.querySelector('#question-modal').style.display = 'none';
            document.querySelector('#answer-input').value = '';
            document.querySelector('#submit-answer').removeEventListener('click', handleAnswer);
            resolve(true);
         } else {
            alert("Respuesta incorrecta. Inténtalo de nuevo.");
         }
      });
   });
}

function checkWin() {
   const totalMatched = document.querySelectorAll('.card.active').length;
   if (totalMatched === totalCards) {
      setTimeout(() => {
         document.querySelector('#win-modal').style.display = 'flex';
      }, 500);
   }
}

function resetGame() {
   // Reinicia las variables y el estado del juego
   cards = [];
   selectedCards = [];
   valuesUsed = [];
   currentMove = 0;
   currentAttempts = 0;
   document.querySelector('#stats').innerHTML = '0 intentos';
   document.querySelector('#game').innerHTML = ''; // Limpia el tablero de juego
   document.querySelector('#win-modal').style.display = 'none'; // Oculta el modal de victoria

   // Recrea las cartas
   for (let i = 0; i < totalCards; i++) {
      let div = document.createElement('div');
      div.innerHTML = cardTemplate;
      cards.push(div);
      document.querySelector('#game').append(cards[i]);
      randomValue();
      cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
      cards[i].querySelectorAll('.card')[0].classList.add('active');  // Mostrar las cartas inicialmente
   }

   // Deshabilita los clicks hasta que se inicie el juego
   document.querySelectorAll('.card').forEach(card => {
      card.classList.remove('active');
      card.removeEventListener('click', activate);
   });

   setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
         card.addEventListener('click', activate);  // Habilitar los clicks solo después de iniciar el juego
      });
   }, 600);
}

function initializeGame() {
   // Crear y mostrar las cartas al cargar la página
   for (let i = 0; i < totalCards; i++) {
      let div = document.createElement('div');
      div.innerHTML = cardTemplate;
      cards.push(div);
      document.querySelector('#game').append(cards[i]);
      randomValue();
      cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
      cards[i].querySelectorAll('.card')[0].classList.add('active');  // Mostrar las cartas inicialmente
   }
}

document.querySelector('#start-button').addEventListener('click', () => {
   document.querySelectorAll('.card').forEach(card => {
      card.classList.remove('active');
   });

   setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
         card.addEventListener('click', activate);  // Habilitar los clicks solo después de iniciar el juego
      });
   }, 600);  // Tiempo para que las cartas se volteen
});

document.querySelector('#play-again').addEventListener('click', resetGame);

document.querySelector('#instructions-ok').addEventListener('click', () => {
   document.querySelector('#instructions-modal').style.display = 'none';
   document.querySelector('#start-button').style.display = 'block';
});

// Mostrar el modal de instrucciones al cargar la página
window.onload = () => {
   initializeGame(); // Crear las cartas al cargar la página
   document.querySelector('#instructions-modal').style.display = 'flex';
};
