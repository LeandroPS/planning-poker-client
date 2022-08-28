import { render, screen } from "@testing-library/react";
import { socket } from "../../../websocket";
import PlanningProvider, { PlanningContext } from "./PlanningProvider";
import {
  VOTE,
  JOIN,
  LEAVE,
  CLEAR_VOTES,
  REVEAL_VOTES,
  HIDE_VOTES,
} from "../../../customEventTypes";

jest.mock("../../../websocket", () => ({
  socket: {
    emit: jest.fn(),
    on: jest.fn(),
  },
}));

describe("<PlanningProvider />", () => {
  it("should render children", () => {
    render(
      <PlanningProvider>
        <h1>Provider children</h1>
      </PlanningProvider>
    );

    expect(
      screen.getByRole("heading", /Provider children/)
    ).toBeInTheDocument();
  });

  it("should provide roomState", () => {
    let roomState;

    render(
      <PlanningProvider>
        <PlanningContext.Consumer>
          {({ state }) => {
            roomState = state;
          }}
        </PlanningContext.Consumer>
      </PlanningProvider>
    );

    expect(roomState).toStrictEqual({
      votes: [],
      team: [],
      showVotes: false,
    });
  });

  it("should update session state when socket requests it", () => {
    const newSessionState = {
      votes: [],
      team: [{ socketId: "kjpg3ud6", name: "jonas" }],
      showVotes: false,
    };
    socket.on.mockImplementationOnce(
      jest.fn((_, setState) => setState(newSessionState))
    );
    let roomState;

    render(
      <PlanningProvider>
        <PlanningContext.Consumer>
          {({ state }) => {
            roomState = state;
          }}
        </PlanningContext.Consumer>
      </PlanningProvider>
    );

    expect(roomState).toStrictEqual(newSessionState);
  });

  it("should emit socket event when join method is called", () => {
    const payload = { name: "jonas" };

    render(
      <PlanningProvider>
        <PlanningContext.Consumer>
          {({ join }) => {
            join(payload);
          }}
        </PlanningContext.Consumer>
      </PlanningProvider>
    );

    expect(socket.emit).toHaveBeenCalledWith(JOIN, payload);
  });

  it("should emit socket event when vote method is called", () => {
    const payload = { value: 2 };

    render(
      <PlanningProvider>
        <PlanningContext.Consumer>
          {({ vote }) => {
            vote(payload);
          }}
        </PlanningContext.Consumer>
      </PlanningProvider>
    );

    expect(socket.emit).toHaveBeenCalledWith(VOTE, payload);
  });

  it("should emit socket event when hideVotes method is called", () => {
    render(
      <PlanningProvider>
        <PlanningContext.Consumer>
          {({ hideVotes }) => {
            hideVotes();
          }}
        </PlanningContext.Consumer>
      </PlanningProvider>
    );

    expect(socket.emit).toHaveBeenCalledWith(HIDE_VOTES);
  });

  it("should emit socket event when revealVotes method is called", () => {
    render(
      <PlanningProvider>
        <PlanningContext.Consumer>
          {({ revealVotes }) => {
            revealVotes();
          }}
        </PlanningContext.Consumer>
      </PlanningProvider>
    );

    expect(socket.emit).toHaveBeenCalledWith(REVEAL_VOTES);
  });

  it("should emit socket event when clearVotes method is called", () => {
    render(
      <PlanningProvider>
        <PlanningContext.Consumer>
          {({ clearVotes }) => {
            clearVotes();
          }}
        </PlanningContext.Consumer>
      </PlanningProvider>
    );

    expect(socket.emit).toHaveBeenCalledWith(CLEAR_VOTES);
  });

  it("should emit socket event when leave method is called", () => {
    render(
      <PlanningProvider>
        <PlanningContext.Consumer>
          {({ leave }) => {
            leave();
          }}
        </PlanningContext.Consumer>
      </PlanningProvider>
    );

    expect(socket.emit).toHaveBeenCalledWith(LEAVE);
  });
});
