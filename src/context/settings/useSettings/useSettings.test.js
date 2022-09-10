import React from "react";
import { renderHook, act } from "@testing-library/react";
import {
  SettingsContext,
  initialSettings,
} from "../SettingsProvider/SettingsProvider";
import useSettings from "./useSettings";

const mockedContextValue = {
  settings: initialSettings,
  setName: jest.fn(),
};

describe("useSettings()", () => {
  it("should return settings state", () => {
    const {
      result: { current: state },
    } = renderHook(() => useSettings(), {
      wrapper: ({ children }) => (
        <SettingsContext.Provider value={mockedContextValue}>
          {children}
        </SettingsContext.Provider>
      ),
    });

    const { settings } = state;

    expect(settings).toBe(initialSettings);
  });

  it("should call setName method on context when setName method on hook is called", () => {
    const {
      result: { current: state },
    } = renderHook(() => useSettings(), {
      wrapper: ({ children }) => (
        <SettingsContext.Provider value={mockedContextValue}>
          {children}
        </SettingsContext.Provider>
      ),
    });

    const { setName } = state;
    const params = "Michael Scott";

    act(() => {
      setName(params);
    });

    expect(mockedContextValue.setName).toHaveBeenCalledWith(params);
  });
});
