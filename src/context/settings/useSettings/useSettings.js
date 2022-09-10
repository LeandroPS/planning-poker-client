import { useContext } from "react";
import { SettingsContext } from "../SettingsProvider/SettingsProvider";

const useSettings = () => {
  const { settings, setName } = useContext(SettingsContext);

  return { settings, setName };
};

export default useSettings;
