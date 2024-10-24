const timesTables = [
  { question: "5 x 5", answer: 25, color: "#000000" },
  { question: "3 x 4", answer: 12, color: "#ffde34" },
  { question: "7 x 2", answer: 14, color: "#99ff99" },
  { question: "6 x 6", answer: 26, color: "#ffcc99" },
  { question: "8 x 8", answer: 64, color: "#ff99ff" }
];

let currentColor = '';
let currentNumber = '';
let unlockedColors = {};
const gridContainer = document.querySelector('.grid-container');

timesTables.forEach((item, index) => {
  const gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  gridItem.dataset.index = index;
  gridItem.innerHTML = `
      <div class="question-number">#${index + 1}</div>
      <div>${item.question}</div>
  `;
  gridContainer.appendChild(gridItem);

  gridItem.addEventListener('click', function () {
      if (unlockedColors[index]) {
          currentColor = item.color;
          currentNumber = index + 1;
          updateActiveColorDisplay(this);
          return;
      }

      const userAnswer = prompt(`What is ${item.question}?`);
      if (userAnswer === null) return;

      if (parseInt(userAnswer) === item.answer) {
          alert("Correct!");
          this.classList.add('correct');
          this.style.backgroundColor = item.color;
          currentColor = item.color;
          currentNumber = index + 1;
          unlockedColors[index] = true;
          updateActiveColorDisplay(this);
      } else {
          alert("Wrong answer, try again!");
      }
  });
});

function updateActiveColorDisplay(activeElement) {
  document.querySelectorAll('.grid-item').forEach(item => {
      item.classList.remove('active-color');
  });
  activeElement.classList.add('active-color');
}

const smileyFacePattern = {
  12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2,
  22: 2, 23: 1, 24: 1, 25: 2, 26: 2, 27: 1, 28: 1, 29: 2,
  32: 2, 33: 1, 34: 1, 35: 2, 36: 2, 37: 1, 38: 1, 39: 2,
  42: 2, 43: 2, 44: 2, 45: 2, 46: 2, 47: 2, 48: 2, 49: 2,
  52: 2, 53: 2, 54: 2, 55: 2, 56: 2, 57: 2, 58: 2, 59: 2,
  62: 2, 63: 1, 64: 2, 65: 2, 66: 2, 67: 2, 68: 1, 69: 2,
  72: 2, 73: 2, 74: 1, 75: 1, 76: 1, 77: 1, 78: 2, 79: 2,
  82: 2, 83: 2, 84: 2, 85: 2, 86: 2, 87: 2, 88: 2, 89: 2,
}; 

const imageGrid = document.getElementById('image-grid');
const gridSize = 100; 

for (let i = 0; i < gridSize; i++) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  
  const pixelNumber = smileyFacePattern[i + 1] || 0; 
  pixel.dataset.number = pixelNumber;
  pixel.innerHTML = pixelNumber ? pixelNumber : '';
  pixel.style.color = '#aaa';

  pixel.addEventListener('click', function () {
      if (parseInt(this.dataset.number) === currentNumber && currentColor) {
          this.style.backgroundColor = currentColor;
          this.style.color = currentColor;
      }
  });
  
  imageGrid.appendChild(pixel);
}

document.getElementById('reset-button').addEventListener('click', function () {
  document.querySelectorAll('.pixel').forEach(pixel => {
      pixel.style.backgroundColor = '#fff';
      pixel.style.color = '#aaa';
  });
  unlockedColors = {};
  document.querySelectorAll('.grid-item').forEach(item => {
      item.classList.remove('correct');
      item.style.backgroundColor = '';
  });
});
