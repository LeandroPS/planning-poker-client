import React, { useState, useRef } from "react";
import { socket } from "../../../websocket";
import {
  VOTE,
  JOIN,
  LEAVE,
  CLEAR_VOTES,
  REVEAL_VOTES,
  HIDE_VOTES,
  UPDATE_STATE,
} from "../../../customEventTypes";

const PlanningContext = React.createContext();

const initialRoomState = {
  votes: {},
  team: [],
  showVotes: false,
};

const PlanningProvider = ({ children }) => {
  const [roomState, setRoomState] = useState(initialRoomState);
  const clearVotesHandler = useRef();

  const callClearVotesHandlerIfSet = () => {
    if (clearVotesHandler.current) clearVotesHandler.current();
  };

  const validateAndSetClearVotesHandler = (callback) => {
    if (typeof callback === "function") {
      clearVotesHandler.current = callback;
    }
  };

  socket.on(UPDATE_STATE, (newRoomState) => {
    setRoomState((prevRoomState) => {
      const isPreviousVotesFilled = Object.keys(prevRoomState.votes).length > 0;
      const isNewVotesFilled = Object.keys(newRoomState.votes).length > 0;

      if (isPreviousVotesFilled && !isNewVotesFilled) {
        callClearVotesHandlerIfSet();
      }

      return newRoomState;
    });
  });

  const join = async ({ name }) => {
    await socket.connect();

    socket.emit(JOIN, { name });
  };

  const vote = ({ value }) => {
    socket.emit(VOTE, { value });
  };

  const hideVotes = () => {
    socket.emit(HIDE_VOTES);
  };

  const revealVotes = () => {
    socket.emit(REVEAL_VOTES);
  };

  const clearVotes = () => {
    socket.emit(CLEAR_VOTES);
  };

  const leave = () => {
    socket.emit(LEAVE);
  };

  return (
    <PlanningContext.Provider
      value={{
        state: roomState,
        vote,
        revealVotes,
        hideVotes,
        join,
        leave,
        clearVotes,
        setClearVotesHandler: validateAndSetClearVotesHandler,
      }}
    >
      {children}
    </PlanningContext.Provider>
  );
};

export { initialRoomState, PlanningContext };
export default PlanningProvider;
