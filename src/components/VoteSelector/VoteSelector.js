import { useState } from "react";

const Card = ({ value, onClick, selected }) => (
  <div onClick={onClick} style={{ border: selected ? "1px solid" : "none" }}>
    {value}
  </div>
);

const VoteSelector = ({ onSelect }) => {
  const options = [1, 2, 3, 5, 8, 13, 21];
  const [selectedValue, setSelectedValue] = useState();

  const handleSelection = (value) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <ul>
      {options.map((value) => (
        <li key={value}>
          <Card
            value={value}
            onClick={() => handleSelection(value)}
            selected={selectedValue === value}
          />
        </li>
      ))}
    </ul>
  );
};

export default VoteSelector;
