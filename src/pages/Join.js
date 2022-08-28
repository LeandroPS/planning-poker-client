import { useState } from "react";
import { usePlanning } from "../context/planning";

const Join = () => {
  const [name, setName] = useState();
  const { join } = usePlanning();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    join({ name });
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
