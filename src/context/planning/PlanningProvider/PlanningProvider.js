import React, { useState } from "react";
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
  votes: [],
  team: [],
  showVotes: false,
};

const PlanningProvider = ({ children }) => {
  const [roomState, setRoomState] = useState(initialRoomState);

  socket.on(UPDATE_STATE, setRoomState);

  const vote = ({ value }) => {
    socket.emit(VOTE, { value });
  };

  const join = async ({ name }) => {
    await socket.connect();

    socket.emit(JOIN, { name });
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
      }}
    >
      {children}
    </PlanningContext.Provider>
  );
};

export { initialRoomState, PlanningContext };
export default PlanningProvider;
