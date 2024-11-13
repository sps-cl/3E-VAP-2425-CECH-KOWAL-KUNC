// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const poles = [
  "3", "4", "5", "12", "17", "20", "27", "28", "29", "30", "31", "42", "53", 
  "52", "51", "50", "49", "56", "59", "64", "71", "70", "69", "62", "57", 
  "54", "47", "46", "45", "44", "43", "32", "21", "22", "23", "24", "25", 
  "18", "15", "10"
];

// https://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender#answer-10099325
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('rollDice', (data) => {
      // Calculate the new position based on roll value and current position
      const newPosition = calculateNewPosition(data.currentPosition, data.rollValue);

      // Emit a single updateMove event with both the roll value and new position
      io.emit('updateMove', { player: data.player, newPosition, rollValue: data.rollValue });
  });

  socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
  });
});

const calculateNewPosition = (currentPosition, rollValue) => {
  const currentIndex = poles.indexOf(currentPosition);
  const newIndex = (currentIndex + rollValue) % poles.length;
  return poles[newIndex];
};


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
