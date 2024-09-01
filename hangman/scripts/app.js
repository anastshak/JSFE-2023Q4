'use strict'
/* POPUP */
const popup = document.createElement("div");
popup.className = "popup";

const popupContent = document.createElement("div");
popupContent.className = "popup-content";

let message = document.createElement("h2");
message.className = "message";
message.textContent = "YOU WIN";
popupContent.appendChild(message);

let correctWordBlock = document.createElement("p");
correctWordBlock.className = "correct-word-block";
correctWordBlock.textContent = "The word you found (or not) is ";
let correctWord = document.createElement("span");
correctWord.className = "correct-word";
correctWord.textContent = "latte";
correctWordBlock.appendChild(correctWord);
popupContent.appendChild(correctWordBlock);

let btnAgain = document.createElement("button");
btnAgain.className = "btn-play-again";
btnAgain.textContent = "play again";
popupContent.appendChild(btnAgain);

popup.appendChild(popupContent);
document.body.appendChild(popup);

/* GALLOWS PART*/
const gallowsPart = document.createElement("section");
gallowsPart.className = "gallows-part";
document.body.appendChild(gallowsPart);

/* gallows */
const gallowsWrapper = document.createElement("div");
gallowsWrapper.className = "gallows-wrapper";
const gallows = document.createElement("div");
gallows.className = "gallows";

let partOfGallows = [];
for (let i = 0; i < 4; i++) {
  partOfGallows.push(document.createElement("span"));
  gallows.appendChild(partOfGallows[i]);
}
partOfGallows[0].classList.add("rope");
partOfGallows[1].classList.add("horizontalScaffold");
partOfGallows[2].classList.add("verticalScaffold");
partOfGallows[3].classList.add("platform");

const human = document.createElement("div");
human.className = "human";

let bodyOfHuman = [];
for (let i = 0; i < 6; i++) {
  bodyOfHuman.push(document.createElement("span"));
  bodyOfHuman[i].classList.add("visible");
  human.appendChild(bodyOfHuman[i]);
}
bodyOfHuman[0].classList.add("head");
bodyOfHuman[1].classList.add("torso");
bodyOfHuman[2].classList.add("leftArm");
bodyOfHuman[3].classList.add("rightArm");
bodyOfHuman[4].classList.add("leftLeg");
bodyOfHuman[5].classList.add("rightLeg");

gallows.appendChild(human);

gallowsWrapper.appendChild(gallows);
gallowsPart.appendChild(gallowsWrapper);

/* title */
const title = document.createElement("h1");
title.className = "title";
title.textContent = "HANGMAN GAME";
gallowsPart.appendChild(title);

/* QUIZ PART */
const quizPart = document.createElement("section");
quizPart.className = "quiz-part";
document.body.appendChild(quizPart);

/* word-space */
const wordSpace = document.createElement("ul");
wordSpace.className = "word-space";
quizPart.appendChild(wordSpace);

// for (let i = 0; i < 6; i++) {
//   let li = document.createElement("li");
//   li.classList.add("letter");
//   wordSpace.appendChild(li);
// }

/* hint */
const hintSpace = document.createElement("p");
hintSpace.className = "hint";
hintSpace.textContent = "Hint: ";

let hintText = document.createElement("span");
hintText.className = "hint-text";
hintText.textContent = "lorem lorem lorem lorem lorem";

hintSpace.appendChild(hintText);
quizPart.appendChild(hintSpace);

/* guesses */
const guesses = document.createElement("p");
guesses.className = "guesses";
guesses.textContent = "Incorrect guesses: ";

let guessesCounter = document.createElement("span");
guessesCounter.className = "guesses-text";
guessesCounter.textContent = "0 / 6";

guesses.appendChild(guessesCounter);
quizPart.appendChild(guesses);

/* keyboard */
const keyboard = document.createElement("div");
keyboard.className = "keyboard";
quizPart.appendChild(keyboard);

// const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// for (let i = 0; i < alphabet.length; i++) {
//   let btn = document.createElement("button");
//   btn.classList.add("keyboard__item");
//   btn.setAttribute("data", i) //?
//   btn.textContent = alphabet[i];
//   keyboard.appendChild(btn);
// }
for (let i = 97; i <= 122; i++) {
  let btn = document.createElement("button");
  btn.classList.add("keyboard__item");
  btn.setAttribute("data", i);
  btn.textContent = String.fromCharCode(i);
  keyboard.appendChild(btn);
  btn.addEventListener("click", event => startGame(event.target, String.fromCharCode(i)));
}

document.onkeydown = function (event) {
  if ((event.key).length == 1) {
    let codeOfLetter = (event.key).toLowerCase().charCodeAt(0);
    let keyOfLetter = (event.key).toLowerCase();
    if (codeOfLetter > 96 && codeOfLetter <= 122) {
      let btnLetter = keyboard.querySelector('[data="'+ codeOfLetter +'"]');
      console.log(btnLetter)
      let btnDisLetter = keyboard.querySelector('[data="'+ codeOfLetter +'"][disabled]');
      console.log(btnDisLetter)
      if (btnLetter === btnDisLetter) {
        console.log('yeaaah');
      } else { 
        console.log('no');
        startGame(btnLetter, keyOfLetter);
      }
      // for (let i = 0; i < disabledLetter.length; i++) {
      //   if (btnLetter === disabledLetter[i]) {
      //     console.log("yes")
      //   } else {
      //     startGame(btnLetter, keyOfLetter);
      //   }
      // }
      //startGame(btnLetter, keyOfLetter);
    }
  }
}

/* func */
let currWord = '';
let incorrectGuessCounter = 0;
let correctLetters = [];
const maxIncorrectGuesses = 6;

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  //console.log(word);
  currWord = word;
  wordSpace.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
  hintText.textContent = hint;
  refresh();
}

const startGame = (btn, clickedLetter) => {
  // console.log(btn);
  // console.log(clickedLetter);
  if (currWord.includes(clickedLetter)) {
    [...currWord].forEach((letter, index) => {
      if(letter === clickedLetter) {
        wordSpace.querySelectorAll("li")[index].innerText = letter;
        wordSpace.querySelectorAll("li")[index].classList.add("guessed");
        correctLetters.push(letter);
      }
  });
  } else {
    incorrectGuessCounter++;
    bodyOfHuman[incorrectGuessCounter-1].classList.toggle("visible");
  }
  btn.disabled = true;
  guessesCounter.textContent = `${incorrectGuessCounter} / ${maxIncorrectGuesses}`;

  if(incorrectGuessCounter === maxIncorrectGuesses) return gameOver(false); //lose
  if(correctLetters.length === currWord.length) return gameOver(true); //win
}

const gameOver = (isWin) => {
  popup.classList.add("active");
  message.textContent = isWin ? "YOU WIN" : "YOU LOSE...";
  correctWord.textContent = `${currWord}`;
}

const refresh = () => {
  popup.classList.remove("active");
  incorrectGuessCounter = 0;
  correctLetters = [];
  wordSpace.innerHTML = currWord.split("").map(() => `<li class="letter"></li>`).join("");
  keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
  human.querySelectorAll("span").forEach(elem => elem.classList.add("visible"));
  guessesCounter.textContent = `${incorrectGuessCounter} / ${maxIncorrectGuesses}`;
}

getRandomWord();
btnAgain.addEventListener("click", getRandomWord);