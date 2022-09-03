const TeamMemberList = ({ teamMembers }) => {
  return (
    <ul>
      {teamMembers?.map((member) => (
        <li key={member.name}>{member.name}</li>
      ))}
    </ul>
  );
};

export default TeamMemberList;
