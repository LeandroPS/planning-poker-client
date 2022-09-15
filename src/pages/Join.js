import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanning } from "../context/planning";
import { useSettings } from "../context/settings";
import { socket } from "../websocket";

const Join = () => {
  const navigate = useNavigate();
  const { join } = usePlanning();
  const { settings, setName: saveNameOnSettings } = useSettings();
  const { name: savedName } = settings;
  const [name, setName] = useState("");
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    setName((prevValue) => savedName || prevValue);
  }, [savedName]);

  useEffect(() => {
    socket.on("connect", () => {
      navigate("/vote");
    });

    return () => {
      socket.off("connect");
    };
  }, [navigate]);

  useEffect(() => {
    socket.on("connect_error", () => setConnectionError(true));

    return () => {
      socket.off("connect_error");
    };
  }, [navigate]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    join({ name });
    saveNameOnSettings(name);
  };

  return (
    <>
      {connectionError && (
        <span style={{ color: "red" }}>
          There was an error with the connection, please try again
        </span>
      )}
      <h1>Entrar na sessão</h1>
      <form onSubmit={handleSubmit}>
        <input type="name" value={name} onChange={handleNameChange} required />
        <input type="submit" value="Entrar" />
      </form>
    </>
  );
};

export default Join;
