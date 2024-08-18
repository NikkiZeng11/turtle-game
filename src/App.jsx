import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import Status from "./Status";
import "./App.css";
import { turtles } from "./data";
const colors = [
  "红色",
  "绿色",
  "蓝色",
  "黄色",
  "橙色",
  "粉色",
  "紫色",
  "青色",
  "咖啡色",
];

function App() {
  const [remainingBoxes, setRemainingBoxes] = useState(0); // 剩余乌龟
  const [collectedTurtles, setCollectedTurtles] = useState(0); // 获得乌龟
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null)); // 九宫格
  const [wishedColor, setWishedColor] = useState(""); // 许愿颜色
  const [boxCountInput, setBoxCountInput] = useState(9); // 输入的盲盒数量
  const [wishColorInput, setWishColorInput] = useState(colors[0]); // 输入的许愿颜色

  // 处理输入的盲盒数量
  const handleBoxCountChange = (event) => {
    setBoxCountInput(Number(event.target.value));
  };

  // 处理输入的许愿颜色
  const handleWishColorChange = (event) => {
    setWishColorInput(event.target.value);
  };

  // 开始游戏
  const startGame = () => {
    if (boxCountInput >= 9 && boxCountInput % 9 === 0) {
      setRemainingBoxes(boxCountInput); // 初始化剩余乌龟数
      setWishedColor(wishColorInput); // 设置许愿颜色
      setCollectedTurtles(0); // 重置获得乌龟数
      setGameBoard(Array(9).fill(null)); // 重置九宫格
    } else {
      alert("请输入9的倍数且不小于9的盲盒数量");
    }
  };

  // 处理点击九宫格事件
  const handleBoxClick = (index) => {
    if (gameBoard[index] === null && remainingBoxes > 0) {
      // 随机生成乌龟颜色
      const turtleColor = colors[Math.floor(Math.random() * colors.length)];
      const newBoard = [...gameBoard];
      newBoard[index] = turtleColor;

      setGameBoard(newBoard);
      setRemainingBoxes(remainingBoxes - 1); // 每次点击减少剩余乌龟数

      // 如果点击的颜色与许愿颜色相同，并且九宫格中还有空位，则额外增加一个盲盒
      if (turtleColor === wishedColor) {
        setRemainingBoxes((prev) => prev + 1);
        alert(`幸运色！ ${turtleColor}!`);
      }
      console.log(newBoard);
      if (newBoard.every((item) => item !== null) || remainingBoxes === 1)
        checkBoard(newBoard, setCollectedTurtles, setRemainingBoxes);
    }
    // if (remainingBoxes === 0) {
    //   const countNonNull = gameBoard.filter((item) => item !== null).length;
    //   alert(`游戏结束！总获得乌龟数为 ${countNonNull + collectedTurtles}`);
    // }
  };
  // useEffect(() => {
  //   if (remainingBoxes === 0 && collectedTurtles !== 0) {
  //     const countNonNull = gameBoard.filter((item) => item !== null).length;
  //     alert(`游戏结束！总获得乌龟数为 ${countNonNull + collectedTurtles}`);
  //   }
  // }, [remainingBoxes, gameBoard, collectedTurtles]);
  // 检查九宫格中的配对情况
  const checkBoard = (board, setCollectedTurtles, setRemainingBoxes) => {
    checkLines(board, setCollectedTurtles, setRemainingBoxes);
    checkPairs(board, setCollectedTurtles, setRemainingBoxes);
  };

  // 检查九宫格中是否有两只颜色相同的乌龟
  const checkPairs = (board, setCollectedTurtles, setRemainingBoxes) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = i + 1; j < board.length; j++) {
        if (board[i] && board[i] === board[j]) {
          console.log(board[i], board[j]);
          console.log(i, j);
          setTimeout(() => {
            alert(`对对碰！ ${board[i]}!`);
            board[i] = null;
            board[j] = null;
            setCollectedTurtles((prev) => prev + 2); // 每对消除后增加一个获得的乌龟数
            setRemainingBoxes((prev) => prev + 1);
          }, 100);
        }
      }
    }
  };

  // 检查九宫格中是否有三只颜色相同的乌龟在一条线上
  const checkLines = (board, setCollectedTurtles, setRemainingBoxes) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // 横线
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // 竖线
      [0, 4, 8],
      [2, 4, 6], // 斜线
    ];

    lines.forEach((line) => {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setTimeout(() => {
          board[a] = null;
          board[b] = null;
          board[c] = null;
        }, 500);
        setCollectedTurtles((prev) => prev + 3); // 每条线消除后增加五个获得的乌龟数
        setRemainingBoxes((prev) => prev + 5);
      }
    });
  };

  return (
    <div className="App">
      <h1>拆乌龟盲盒游戏</h1>

      {/* 玩家输入区域 */}
      <div className="input-area">
        <label>
          输入盲盒数量（9的倍数）：
          <input
            type="number"
            value={boxCountInput}
            onChange={handleBoxCountChange}
            min="9"
            step="9"
          />
        </label>

        <label>
          选择许愿颜色：
          <select value={wishColorInput} onChange={handleWishColorChange}>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>

        <button onClick={startGame}>开始游戏</button>
      </div>

      {/* 游戏九宫格 */}
      <GameBoard gameBoard={gameBoard} onBoxClick={handleBoxClick} />

      {/* 状态显示 */}
      <Status
        remainingBoxes={remainingBoxes}
        collectedTurtles={collectedTurtles}
      />
    </div>
  );
}

export default App;
//对对碰：快速点击两次会重复添加,
//游戏结束时的总获得乌龟量应该是棋盘上剩下的+前面获得的UseEffect不对
//规则需要修改，要在填满整个格子后再开始对对碰或者三连。
//幸运色会在alert后才出现
