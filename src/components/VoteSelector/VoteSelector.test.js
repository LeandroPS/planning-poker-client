import { fireEvent, render, screen } from "@testing-library/react";
import VoteSelector from "./VoteSelector";

describe("<VoteSelector />", () => {
  it("should render", () => {
    render(<VoteSelector />);

    expect(screen.getByRole("list")).toBeInTheDocument();

    [1, 2, 3, 5, 8, 13, 21].forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should call `onSelection` prop when a vote is clicked", () => {
    const handleVoteSelection = jest.fn();

    render(<VoteSelector onSelect={handleVoteSelection} />);

    fireEvent.click(screen.getByText("2"));

    expect(handleVoteSelection).toHaveBeenCalled();
  });

  it("should set event listener for clearing votes", async () => {
    const setClearVotesHandler = jest.fn();

    render(<VoteSelector setClearVotesHandler={setClearVotesHandler} />);

    expect(setClearVotesHandler).toHaveBeenCalledWith(expect.any(Function));
  });
});
