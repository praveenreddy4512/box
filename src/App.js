import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [initial, setInitial] = useState("");
  const [boxes, setBoxes] = useState({ A: 0, B: 0, C: 0, D: 0 });

  const initBoxes = () => {
    const n = Number(initial);
    if (!Number.isFinite(n) || n < 0) {
      alert("Please enter a non-negative number.");
      return;
    }
    setBoxes({
      A: n,
      B: 2 * n,
      C: 4 * n,
      D: 8 * n,
    });
  };

  // Choice 1: each box will be filled twice the number of balls.
  const choice1 = () => {
    setBoxes((b) => ({
      A: b.A * 2,
      B: b.B * 2,
      C: b.C * 2,
      D: b.D * 2,
    }));
  };

  // Choice 2: consecutive boxes are made empty and pushed to the last box (D).
  // Interpretation: Move A + B + C into D; set A,B,C = 0.
  const choice2 = () => {
    setBoxes((b) => ({
      A: 0,
      B: 0,
      C: 0,
      D: b.A + b.B + b.C + b.D,
    }));
  };

  // Choice 3: all odd-numbered boxes (A=1, C=3) pushed into even boxes (B=2, D=4).
  // A -> B, C -> D; then A=C=0.
  const choice3 = () => {
    setBoxes((b) => ({
      A: 0,
      B: b.B + b.A,
      C: 0,
      D: b.D + b.C,
    }));
  };

  const reset = () => {
    setInitial("");
    setBoxes({ A: 0, B: 0, C: 0, D: 0 });
  };

  return (
    <div className="wrap">
      <h1>🎮 Box Ball Game (React)</h1>

      <div className="controls">
        <input
          type="number"
          min="0"
          placeholder="Enter initial value"
          value={initial}
          onChange={(e) => setInitial(e.target.value)}
        />
        <button onClick={initBoxes}>Initialize</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>

      <div className="choices">
        <button onClick={choice1}>Choice 1: Double All</button>
        <button onClick={choice2}>Choice 2: Push to D</button>
        <button onClick={choice3}>Choice 3: Odd → Even</button>
      </div>

      <div className="grid">
        <Box label="A" colorName="Violet" colorClass="violet" count={boxes.A} />
        <Box label="B" colorName="Orange" colorClass="orange" count={boxes.B} />
        <Box label="C" colorName="Green" colorClass="green" count={boxes.C} />
        <Box label="D" colorName="White" colorClass="white" count={boxes.D} />
      </div>

      <div className="totals">
        <strong>Total Balls:</strong> {boxes.A + boxes.B + boxes.C + boxes.D}
      </div>
    </div>
  );
}

function Box({ label, colorName, colorClass, count }) {
  return (
    <div className="box">
      <div className={`swatch ${colorClass}`} />
      <h2>Box {label}</h2>
      <p className="color">{colorName} balls</p>
      <p className="count">{count}</p>
    </div>
  );
}
