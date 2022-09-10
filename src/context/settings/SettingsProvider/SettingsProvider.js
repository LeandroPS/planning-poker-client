import React, { useState, useEffect } from "react";

const SettingsContext = React.createContext();

const initialSettings = {
  name: null,
};

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    setSettingsFromStorage();
  }, []);

  const setSettingsFromStorage = async () => {
    const persistedSettings = await localStorage.getItem("settings");

    if (persistedSettings) {
      const parsedSettings = JSON.parse(persistedSettings);
      setSettings(parsedSettings);
    }
  };

  const setItem = async (key, value) => {
    const newSettings = { ...settings };
    newSettings[key] = value;

    setSettings(newSettings);

    await localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  const setName = async (value) => await setItem("name", value);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setName,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { initialSettings, SettingsContext };
export default SettingsProvider;
