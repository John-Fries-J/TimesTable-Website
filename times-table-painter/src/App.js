import React, { useState } from "react";
import "./App.css";

const timesTables = [
  { question: "7 x 7", answer: 49, color: "#000000" },
  { question: "9 x 4", answer: 36, color: "#ffde34" },
  { question: "7 x 8", answer: 56, color: "#99ff99" },
  { question: "6 x 12", answer: 72, color: "#ffcc99" },
  { question: "12 x 12", answer: 144, color: "#ff99ff" },
];

const patterns = {
  smileyFace: {
    name: "Smiley Face",
    data: {
      12: 2, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 2, 19: 2,
      22: 2, 23: 1, 24: 1, 25: 2, 26: 2, 27: 1, 28: 1, 29: 2,
      32: 2, 33: 1, 34: 1, 35: 2, 36: 2, 37: 1, 38: 1, 39: 2,
      42: 2, 43: 2, 44: 2, 45: 2, 46: 2, 47: 2, 48: 2, 49: 2,
    },
  },
  heart: {
    name: "Heart",
    data: {
      11: 2, 12: 2, 15: 2, 16: 2,
      21: 2, 22: 1, 25: 1, 26: 2,
      31: 2, 32: 1, 33: 1, 34: 1, 35: 1, 36: 2,
      41: 2, 42: 1, 43: 1, 44: 1, 45: 1, 46: 2,
      51: 2, 52: 2, 53: 1, 54: 1, 55: 2, 56: 2,
      61: 2, 62: 2, 63: 2, 64: 2, 65: 2, 66: 2,
    },
  },
};

export default function App() {
  const [currentColor, setCurrentColor] = useState(null);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [unlockedColors, setUnlockedColors] = useState({});
  const [selectedPattern, setSelectedPattern] = useState("smileyFace");

  const handleQuestionClick = (index, question, answer, color) => {
    if (unlockedColors[index]) {
      setCurrentColor(color);
      setCurrentNumber(index + 1);
      return;
    }
    const userAnswer = prompt(`What is ${question}?`);
    if (parseInt(userAnswer) === answer) {
      setUnlockedColors((prev) => ({ ...prev, [index]: true }));
      setCurrentColor(color);
      setCurrentNumber(index + 1);
    } else {
      alert("Wrong answer, try again!");
    }
  };

  return (
    <div className="container">
      <h1>Times Table Image Painter</h1>
      <div className="pattern-selector">
        <label>Select a pattern: </label>
        <select onChange={(e) => setSelectedPattern(e.target.value)}>
          {Object.keys(patterns).map((key) => (
            <option key={key} value={key}>{patterns[key].name}</option>
          ))}
        </select>
      </div>
      <div className="grid">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="pixel"
            style={{
              backgroundColor:
                patterns[selectedPattern].data[i + 1] === currentNumber
                  ? currentColor
                  : "#fff",
            }}
          ></div>
        ))}
      </div>
      <div className="times-table">
        <h2>Answer Questions to Unlock Colors!</h2>
        <div className="questions">
          {timesTables.map((item, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(index, item.question, item.answer, item.color)}
              className={unlockedColors[index] ? "unlocked" : ""}
              style={{ backgroundColor: unlockedColors[index] ? item.color : "#ddd" }}
            >
              {item.question}
            </button>
          ))}
        </div>
        <button onClick={() => setUnlockedColors({})} className="reset-button">
          Reset Progress
        </button>
      </div>
    </div>
  );
}
