import React from "react";
import TurtleBox from "./TurtleBox";
function GameBoard({ gameBoard, onBoxClick }) {
  return (
    <div className="game-board">
      {gameBoard.map((color, index) => (
        <TurtleBox
          key={index}
          color={color}
          onClick={() => onBoxClick(index)}
        />
      ))}
    </div>
  );
}

export default GameBoard;
