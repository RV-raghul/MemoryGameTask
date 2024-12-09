const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items = [
  { name: "img1", image: "./Assets/img1.png" },
  { name: "img2", image: "./Assets/img2.png" },
  { name: "img3", image: "./Assets/img3.png" },
  { name: "img4", image: "./Assets/img4.png" },
  { name: "img5", image: "./Assets/img5.png" },
  { name: "img6", image: "./Assets/img6.png" },
  { name: "img7", image: "./Assets/img7.png" },
  { name: "img8", image: "./Assets/img8.png" },
];


//Initial moves and win count
let movesCount = 0,
  winCount = 0;


//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  // Shuffle Function
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid Container
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards Generator
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
           
            firstCard = false;
            
            winCount += 1;
            
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if cards dont match then flip them back
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  restartButton.classList.remove("hide");
  startButton.classList.add("hide");
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Restart game
restartButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    restartButton.classList.add("hide");
    startButton.classList.remove("hide");
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};