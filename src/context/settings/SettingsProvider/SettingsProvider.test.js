import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SettingsProvider, { SettingsContext } from "./SettingsProvider";

beforeEach((done) => {
  Storage.prototype.setItem = jest.fn(
    async () => new Promise((resolve) => resolve())
  );
  Storage.prototype.getItem = jest.fn(
    async () => new Promise((resolve) => resolve(null))
  );

  done();
});

afterEach((done) => {
  Storage.prototype.setItem.mockReset();
  Storage.prototype.getItem.mockReset();

  jest.clearAllMocks();

  done();
});

describe("<SettingsProvider />", () => {
  it("should render children", () => {
    render(
      <SettingsProvider>
        <h1>Provider children</h1>
      </SettingsProvider>
    );

    expect(
      screen.getByRole("heading", { name: /Provider children/ })
    ).toBeInTheDocument();
  });

  it("should provide settings state", () => {
    let settingsState;

    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ settings }) => {
            settingsState = settings;
          }}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    expect(settingsState).toStrictEqual({
      name: null,
    });
  });

  it("should get initial settings state from localStorage", async () => {
    const stringifiedPersistedSettings = JSON.stringify({ name: "Michael" });

    Storage.prototype.getItem = jest.fn(
      async () =>
        new Promise((resolve) => resolve(stringifiedPersistedSettings))
    );

    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ settings }) => {
            return <h1>{settings.name}</h1>;
          }}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    expect(Storage.prototype.getItem).toHaveBeenCalledWith("settings");

    await waitFor(async () => {
      const nameHeading = await screen.findByRole("heading", /Michael/);
      expect(nameHeading).toBeInTheDocument();
    });
  });

  describe("setName", () => {
    it("should return modified name on settings state", async () => {
      let setName;

      render(
        <SettingsProvider>
          <SettingsContext.Consumer>
            {({ settings, setName: setNameMethod }) => {
              setName = setNameMethod;
              return <h1>{settings.name}</h1>;
            }}
          </SettingsContext.Consumer>
        </SettingsProvider>
      );

      act(() => {
        setName("Mike");
      });

      await waitFor(() => {
        expect(screen.getByRole("heading", /Mike/)).toBeInTheDocument();
      });
    });

    it("should save name on localStorage when it is changed", async () => {
      let settingName;

      render(
        <SettingsProvider>
          <SettingsContext.Consumer>
            {({ setName }) => {
              settingName = setName;
            }}
          </SettingsContext.Consumer>
        </SettingsProvider>
      );

      act(() => {
        settingName("Michael");
      });

      const storedSettings = {
        name: "Michael",
      };

      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        "settings",
        JSON.stringify(storedSettings)
      );
    });
  });
});
