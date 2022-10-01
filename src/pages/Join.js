import { useState, useEffect } from "react";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import { usePlanning } from "../context/planning";
import { useSettings } from "../context/settings";
import { socket } from "../websocket";

const Join = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { join } = usePlanning();
  const {
    settings,
    setName: saveNameOnSettings,
    setSessionId: saveSessionIdOnSettings,
  } = useSettings();
  const { name: savedName } = settings;

  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState(searchParams.sessionId || "");
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    setName((prevValue) => savedName || prevValue);
  }, [savedName]);

  useEffect(() => {
    socket.on("connect", () => {
      const path = generatePath("/session/:id", {
        id: sessionId,
      });

      navigate(path);
    });

    return () => {
      socket.off("connect");
    };
  }, [navigate, sessionId]);

  useEffect(() => {
    socket.on("connect_error", () => setConnectionError(true));

    return () => {
      socket.off("connect_error");
    };
  }, [navigate]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSessionIdChange = (event) => {
    setSessionId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    join({ name, sessionId });
    saveNameOnSettings(name);
    saveSessionIdOnSettings(sessionId);
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
        <input
          placeholder="name"
          type="name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <input
          placeholder="session id"
          type="text"
          value={sessionId}
          onChange={handleSessionIdChange}
          required
        />
        <input type="submit" value="Entrar" />
      </form>
    </>
  );
};

export default Join;
