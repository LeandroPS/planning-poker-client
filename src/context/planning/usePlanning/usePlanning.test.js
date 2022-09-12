import React from "react";
import { renderHook, act } from "@testing-library/react";
import {
  PlanningContext,
  initialRoomState,
} from "../PlanningProvider/PlanningProvider";
import usePlanning from "./usePlanning";

const mockedContextValue = {
  state: initialRoomState,
  vote: jest.fn(),
  revealVotes: jest.fn(),
  hideVotes: jest.fn(),
  join: jest.fn(),
  leave: jest.fn(),
  clearVotes: jest.fn(),
  setClearVotesHandler: jest.fn(),
};

describe("usePlanning()", () => {
  it("should return room state", () => {
    const {
      result: { current: planning },
    } = renderHook(() => usePlanning(), {
      wrapper: ({ children }) => (
        <PlanningContext.Provider value={mockedContextValue}>
          {children}
        </PlanningContext.Provider>
      ),
    });

    const { state } = planning;

    expect(state).toBe(initialRoomState);
  });
  it("should call join method on context when join method on hook is called", () => {
    const {
      result: { current: planning },
    } = renderHook(() => usePlanning(), {
      wrapper: ({ children }) => (
        <PlanningContext.Provider value={mockedContextValue}>
          {children}
        </PlanningContext.Provider>
      ),
    });

    const { join } = planning;
    const params = { name: "Michael Scott" };

    act(() => {
      join(params);
    });

    expect(mockedContextValue.join).toHaveBeenCalledWith(params);
  });

  it("should call setClearVotesHandler method on context when setClearVotesHandler method on hook is called", () => {
    const {
      result: { current: planning },
    } = renderHook(() => usePlanning(), {
      wrapper: ({ children }) => (
        <PlanningContext.Provider value={mockedContextValue}>
          {children}
        </PlanningContext.Provider>
      ),
    });

    const { setClearVotesHandler } = planning;
    const clearVotesHandler = jest.fn();

    act(() => {
      setClearVotesHandler(clearVotesHandler);
    });

    expect(mockedContextValue.setClearVotesHandler).toHaveBeenCalled();
  });

  it("should call vote method on context when vote method on hook is called", () => {
    const {
      result: { current: planning },
    } = renderHook(() => usePlanning(), {
      wrapper: ({ children }) => (
        <PlanningContext.Provider value={mockedContextValue}>
          {children}
        </PlanningContext.Provider>
      ),
    });

    const { vote } = planning;
    const params = { value: 2 };

    act(() => {
      vote(params);
    });

    expect(mockedContextValue.vote).toHaveBeenCalledWith(params);
  });

  it("should call revealVotes method on context when revealVotes method on hook is called", () => {
    const {
      result: { current: planning },
    } = renderHook(() => usePlanning(), {
      wrapper: ({ children }) => (
        <PlanningContext.Provider value={mockedContextValue}>
          {children}
        </PlanningContext.Provider>
      ),
    });

    const { revealVotes } = planning;

    act(() => {
      revealVotes();
    });

    expect(mockedContextValue.revealVotes).toHaveBeenCalled();
  });

  it("should call hideVotes method on context when hideVotes method on hook is called", () => {
    const {
      result: { current: planning },
    } = renderHook(() => usePlanning(), {
      wrapper: ({ children }) => (
        <PlanningContext.Provider value={mockedContextValue}>
          {children}
        </PlanningContext.Provider>
      ),
    });

    const { hideVotes } = planning;

    act(() => {
      hideVotes();
    });

    expect(mockedContextValue.hideVotes).toHaveBeenCalled();
  });

  it("should call clearVotes method on context when clearVotes method on hook is called", () => {
    const {
      result: { current: planning },
    } = renderHook(() => usePlanning(), {
      wrapper: ({ children }) => (
        <PlanningContext.Provider value={mockedContextValue}>
          {children}
        </PlanningContext.Provider>
      ),
    });

    const { clearVotes } = planning;

    act(() => {
      clearVotes();
    });

    expect(mockedContextValue.clearVotes).toHaveBeenCalled();
  });

  it("should call leave method on context when leave method on hook is called", () => {
    const {
      result: { current: planning },
    } = renderHook(() => usePlanning(), {
      wrapper: ({ children }) => (
        <PlanningContext.Provider value={mockedContextValue}>
          {children}
        </PlanningContext.Provider>
      ),
    });

    const { leave } = planning;
    const params = { name: "Michael Scott" };

    act(() => {
      leave(params);
    });

    expect(mockedContextValue.leave).toHaveBeenCalledWith(params);
  });
});
