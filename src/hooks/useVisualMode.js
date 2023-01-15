/*
Create a transition function within useVisualMode that will take in a new mode and 
update the mode state with the new value. If we used useState 
to initialize the mode state in useVisualMode, what will we have to do to update the mode value?
*/

const { useState } = require("react");

const useVisualMode = (passedMode) => {
  const [mode, setMode] = useState(passedMode);
  const [history, setHistory] = useState([passedMode]);

  const transition = (newMode, replace = false) => {
    if (replace === true) {
      //remove the previous mode from the histroy array
      setHistory(history.pop());
      setHistory([...history, newMode]);
      setMode(newMode);
      //add the newmode to history array
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  };

  function back() {
    if (history.length === 1) {
      return;
    }
    setHistory(history.pop());
    setMode(history[history.length - 1]);
  }

  return {
    mode,
    transition,
    back,
  };
};

module.exports = { useVisualMode };
