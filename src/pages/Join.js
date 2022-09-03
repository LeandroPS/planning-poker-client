import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanning } from "../context/planning";

const Join = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const { join } = usePlanning();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    join({ name });
    navigate("/vote");
  };

  return (
    <>
      <h1>Entrar na sessão</h1>
      <form onSubmit={handleSubmit}>
        <input type="name" onChange={handleNameChange} required />
        <input type="submit" value="Entrar" />
      </form>
    </>
  );
};

export default Join;
