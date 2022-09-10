import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanning } from "../context/planning";
import { useSettings } from "../context/settings";

const Join = () => {
  const navigate = useNavigate();
  const { join } = usePlanning();
  const { settings, setName: saveNameOnSettings } = useSettings();
  const { name: savedName } = settings;
  const [name, setName] = useState(savedName);

  useEffect(() => {
    setName(savedName);
  }, [savedName]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    join({ name });
    saveNameOnSettings(name);
    navigate("/vote");
  };

  return (
    <>
      <h1>Entrar na sessão</h1>
      <form onSubmit={handleSubmit}>
        <input type="name" value={name} onChange={handleNameChange} required />
        <input type="submit" value="Entrar" />
      </form>
    </>
  );
};

export default Join;
