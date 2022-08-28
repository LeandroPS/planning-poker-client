import { useContext } from "react";
import { PlanningContext } from "../PlanningProvider/PlanningProvider";

const usePlanning = () => {
  const { state, vote, revealVotes, hideVotes, join, leave, clearVotes } =
    useContext(PlanningContext);

  return { state, vote, revealVotes, hideVotes, join, leave, clearVotes };
};

export default usePlanning;
