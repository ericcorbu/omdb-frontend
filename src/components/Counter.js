import React from "react";

const Counter = () => {
  const nominations = localStorage.getItem("nominations") || null;
  let count = 0;
  if (nominations) {
    count = Object.keys(JSON.parse(nominations)).length;
  }
  return <div>{count}/5 Nominated</div>;
};

export default Counter;
