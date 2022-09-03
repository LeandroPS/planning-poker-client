import TeamMemberList from "../components/TeamMemberList";
import TeamVotes from "../components/TeamVotes";
import VoteSelector from "../components/VoteSelector";
import { usePlanning } from "../context/planning";

const Vote = () => {
  const { state, vote, revealVotes, clearVotes } = usePlanning();
  const { team, votes, showVotes } = state;

  const handleVote = (value) => {
    vote({ value });
  };

  return (
    <>
      <TeamMemberList teamMembers={team} />
      <TeamVotes votes={Object.values(votes)} revealed={showVotes} />
      <button onClick={revealVotes}>Reveal votes</button>
      <button onClick={clearVotes}>Clear votes</button>
      <VoteSelector onSelect={handleVote} />
    </>
  );
};

export default Vote;
