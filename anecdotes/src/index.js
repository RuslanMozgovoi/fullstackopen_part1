import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, updatePoints] = useState(
    new Array(anecdotes.length + 1).join("0").split("").map(parseFloat)
  );
  const [mostVoted, updateMostVoted] = useState("");
  const handleNextAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    updatePoints(copy);
    let indexofMaxValue = arrayIndexofMaxValue(copy);
    updateMostVoted(indexofMaxValue);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <MostVoted anecdotes={anecdotes} mostVoted={mostVoted} />
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const MostVoted = ({ anecdotes, mostVoted }) => {
  if (mostVoted === "") {
    return <p>No votes for any anecdote yet</p>;
  }
  return <p>{anecdotes[mostVoted]}</p>;
};

function arrayIndexofMaxValue(arr) {
  let len = arr.length,
    max = -Infinity,
    indexofMaxValue = -1;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
      indexofMaxValue = len;
    }
  }
  return indexofMaxValue;
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
