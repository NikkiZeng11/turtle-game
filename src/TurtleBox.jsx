import React from "react";
import { turtles } from "./data";
function TurtleBox({ color, onClick }) {
  // 查找与 color 匹配的 turtle 对象
  let turtle = color ? turtles.find((t) => t.color === color) : null;
  return (
    <div
      onClick={onClick}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: color ? color : "lightgray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5em",
        borderRadius: "8px",
        cursor: color ? "default" : "pointer", // 已经有乌龟的格子不再可点击
        transition: "background-color 0.3s ease",
      }}
    >
      {turtle ? (
        <img
          src={turtle.image}
          alt={turtle.color}
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: { color },
          }}
        />
      ) : null}
      {""}
      {/* 如果 turtle 不存在，则不显示任何内容 */}
    </div>
  );
}

export default TurtleBox;
