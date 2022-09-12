import TeamMemberList from "../components/TeamMemberList";
import TeamVotes from "../components/TeamVotes";
import VoteSelector from "../components/VoteSelector";
import { usePlanning } from "../context/planning";
import { useSettings } from "../context/settings";

const Vote = () => {
  const { state, vote, revealVotes, clearVotes, setClearVotesHandler } =
    usePlanning();
  const { settings } = useSettings();
  const { team, votes, showVotes } = state;

  const handleVote = (value) => {
    vote({ value });
  };

  return (
    <>
      <h2>{settings.name}</h2>
      <h3>Team:</h3>
      <TeamMemberList teamMembers={team} />
      <h3>Votes:</h3>
      <TeamVotes votes={Object.values(votes)} revealed={showVotes} />
      <button onClick={revealVotes}>Reveal votes</button>
      <button onClick={clearVotes}>Clear votes</button>
      <h3>Votation options:</h3>
      <VoteSelector
        onSelect={handleVote}
        setClearVotesHandler={setClearVotesHandler}
      />
    </>
  );
};

export default Vote;
