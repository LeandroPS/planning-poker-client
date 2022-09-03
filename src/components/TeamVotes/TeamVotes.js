const Card = ({ value, revealed }) => <div>{revealed ? value : "x"}</div>;

const CardsWrapper = ({ children }) => {
  return <ul>{children}</ul>;
};

const TeamVotes = ({ votes, revealed }) => {
  return (
    <CardsWrapper>
      {votes?.map((vote, index) => (
        <li key={`${index}_${vote}`}>
          <Card value={vote} revealed={revealed} />
        </li>
      ))}
    </CardsWrapper>
  );
};

export default TeamVotes;
