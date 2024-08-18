import React from "react";

function Status({ remainingBoxes, collectedTurtles }) {
  return (
    <div className="status">
      <p>剩余乌龟数: {remainingBoxes}</p>
      <p>已获得乌龟数: {collectedTurtles}</p>
    </div>
  );
}

export default Status;
