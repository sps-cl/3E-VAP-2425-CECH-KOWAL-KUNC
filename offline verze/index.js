const pole1 = document.getElementById("3");
const pole2 = document.getElementById("4");
const pole3 = document.getElementById("5");
const pole4 = document.getElementById("12");
const pole5 = document.getElementById("17");
const pole6 = document.getElementById("20");
const pole7 = document.getElementById("27");
const pole8 = document.getElementById("28");
const pole9 = document.getElementById("29");
const pole10 = document.getElementById("30");
const pole11 = document.getElementById("31");
const pole12 = document.getElementById("42");
const pole13 = document.getElementById("53");
const pole14 = document.getElementById("52");
const pole15 = document.getElementById("51");
const pole16 = document.getElementById("50");
const pole17 = document.getElementById("49");
const pole18 = document.getElementById("56");
const pole19 = document.getElementById("59");
const pole20 = document.getElementById("64");
const pole21 = document.getElementById("71");
const pole22 = document.getElementById("70");
const pole23 = document.getElementById("69");
const pole24 = document.getElementById("62");
const pole25 = document.getElementById("57");
const pole26 = document.getElementById("54");
const pole27 = document.getElementById("47");
const pole28 = document.getElementById("46");
const pole29 = document.getElementById("45");
const pole30 = document.getElementById("44");
const pole31 = document.getElementById("43");
const pole32 = document.getElementById("32");
const pole33 = document.getElementById("21");
const pole34 = document.getElementById("22");
const pole35 = document.getElementById("23");
const pole36 = document.getElementById("24");
const pole37 = document.getElementById("25");
const pole38 = document.getElementById("18");
const pole39 = document.getElementById("15");
const pole40 = document.getElementById("10");

const poles = [
  pole1,
  pole2,
  pole3,
  pole4,
  pole5,
  pole6,
  pole7,
  pole8,
  pole9,
  pole10,
  pole11,
  pole12,
  pole13,
  pole14,
  pole15,
  pole16,
  pole17,
  pole18,
  pole19,
  pole20,
  pole21,
  pole22,
  pole23,
  pole24,
  pole25,
  pole26,
  pole27,
  pole28,
  pole29,
  pole30,
  pole31,
  pole32,
  pole33,
  pole34,
  pole35,
  pole36,
  pole37,
  pole38,
  pole39,
  pole40,
];

const dice = document.querySelector(".dice");
const rollBtn = document.getElementById("rollButton");
let rollValue = 0; // Variable to store the dice roll value

// Function to generate a random dice roll and store the result
const randomDice = () => {
  rollValue = 6 //Math.floor(Math.random() * 6) + 1; // Store the roll value in rollValue
  rollDice(rollValue); // Trigger dice animation
  console.log(`Player ${currentPlayer} rolled a ${rollValue}`);

  // After the dice animation, trigger the figure movement
  setTimeout(() => {
    moveFigure(currentPlayer, rollValue); // Move the figure based on rollValue
    togglePlayer(); // Switch to the next player after the move
  }, 2500); // Delay to match the end of the dice animation
};

// Function to animate the dice roll
const rollDice = (roll) => {
  dice.style.animation = "rolling 1.3s";
  setTimeout(() => {
    switch (roll) {
      case 1:
        dice.style.transform = "rotateX(0deg) rotateY(0deg)";
        break;
      case 6:
        dice.style.transform = "rotateX(180deg) rotateY(0deg)";
        break;
      case 2:
        dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
        break;
      case 5:
        dice.style.transform = "rotateX(90deg) rotateY(0deg)";
        break;
      case 3:
        dice.style.transform = "rotateX(0deg) rotateY(90deg)";
        break;
      case 4:
        dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
        break;
      default:
        break;
    }
    dice.style.animation = "none"; // Stop the animation after setting the rotation
  }, 1500);
};

// Attach event listener to the roll button
rollBtn.addEventListener("click", randomDice);

let playerPositions = {
  1: {
    position: document.getElementById("rf1"),
    color: "red",
    inSpawn: true,
    startPole: document.getElementById("21"),
    hasCompletedLap: false,
  }, // Player 1 starts at spawn-red
  2: {
    position: document.getElementById("gf1"),
    color: "green",
    inSpawn: true,
    startPole: document.getElementById("5"),
    hasCompletedLap: false,
  }, // Player 2 starts at spawn-green
};

let currentPlayer = 1; // Track which player's turn it is

const moveFigure = (player, roll) => {
  let playerState = playerPositions[player];
  let currentPole = playerState.position;
  let currentIndex = poles.indexOf(currentPole);
  let startIndex = poles.indexOf(playerState.startPole);

  // Check if the piece is in spawn
  if (playerState.inSpawn) {
    if (roll === 6) {
      // Move the piece out of spawn to the starting position
      let startingPole = playerState.startPole;
      let startingInnerCircle = startingPole.querySelector('.inner-circle');
      
      // Clear previous spawn color and set the new position color
      currentPole.querySelector('.inner-circle').style.backgroundColor = "";
      startingInnerCircle.style.backgroundColor = playerState.color;
      startingInnerCircle.style.border = '2px solid black';
      playerState.position = startingPole;
      playerState.inSpawn = false;

      console.log(`Player ${player} rolled a 6 and moved out of spawn to position ${startingPole.id}`);
    } else {
      console.log(`Player ${player} is in spawn and needs a 6 to move.`);
    }
    return;
  }

  // Calculate the new position index based on the roll
  let newIndex = (currentIndex + roll) % poles.length;

  // Check if the new position would pass the starting position
  if (newIndex > startIndex && currentIndex <= startIndex - 6) {
    console.log(`Player ${player} cannot move past their start position.`);
    return;
  }

  // Clear the previous position's inner circle color
  currentPole.querySelector('.inner-circle').style.backgroundColor = "";
  currentPole.querySelector('.inner-circle').style.border = 'none';

  // Set the color of the new position's inner circle
  let newPole = poles[newIndex];
  let newInnerCircle = newPole.querySelector('.inner-circle');
  newInnerCircle.style.backgroundColor = playerState.color;
  newInnerCircle.style.border = '2px solid black';
  playerState.position = newPole;

  console.log(`Player ${player} moved from position ${currentPole.id} to position ${newPole.id}`);
};

const calculateNewPosition = (currentPole, roll) => {
  let currentIndex = poles.indexOf(currentPole);
  let newIndex = (currentIndex + roll) % poles.length; // Loop back to start if needed
  return poles[newIndex];
};

const togglePlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnIndicator();
};

// Function to update the turn indicator
const updateTurnIndicator = () => {
  const turnIndicator = document.getElementById("turn-indicator");
  turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
};

document.querySelector(".roll").addEventListener("click", rollDice);
