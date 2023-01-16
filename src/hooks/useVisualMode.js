const { useState } = require("react");

/*
usVisualMode is essentially a state machine for the Appointment component. It has a set mode
and a history of modes which is contained in an array. There are 2 function contained.
1) transition -> transitions to the next state
  - if replace is true then we want to pop off the previous mode and then push on the new one 
  since we want to skip that mode if we go backwards.
2) back -> moves back one step in the history array using .pop().
*/

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
