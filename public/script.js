const timesTables = [
    { question: "5 x 5", answer: 25, color: "#ff9999" },
    { question: "3 x 4", answer: 12, color: "#99ccff" },
    { question: "7 x 2", answer: 14, color: "#99ff99" },
    { question: "6 x 6", answer: 36, color: "#ffcc99" },
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
      if (userAnswer === null) {
        return;
      }
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
  const imageGrid = document.getElementById('image-grid');
  const gridSize = 100;
  for (let i = 0; i < gridSize; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.dataset.number = (i % timesTables.length) + 1;
    pixel.innerHTML = pixel.dataset.number;
    pixel.style.color = '#aaa';
    pixel.addEventListener('click', function () {
      if (parseInt(this.dataset.number) === currentNumber && currentColor) {
        this.style.backgroundColor = currentColor;
        this.style.color = currentColor;
      }
    });
    imageGrid.appendChild(pixel);
  }