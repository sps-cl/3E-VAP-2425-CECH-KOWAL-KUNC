const socket = io();

const dice = document.querySelector(".dice");
const rollBtn = document.querySelector(".roll");

const randomDice = () => {
  const random = Math.floor(Math.random() * 6) + 1;

  rollDice(random);

  socket.emit("hodKostkou", random); // Pošle výsledek hodu na server
  socket.on("hodKostkou", (data) => {
    console.log("Výsledek hodu: " + data);
  });
};

const rollDice = (random) => {
  dice.style.animation = "rolling 3s";

  setTimeout(() => {
    switch (random) {
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
    dice.style.animation = "none";
  }, 3500);
};

rollBtn.addEventListener("click", randomDice);
