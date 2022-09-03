import { render, screen } from "@testing-library/react";
import TeamVotes from "./TeamVotes";

describe("<TeamVotes />", () => {
  it("should render", () => {
    render(<TeamVotes />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should omit votes when receives `reveal` prop as false", () => {
    const votes = [2];

    render(<TeamVotes votes={votes} revealed={false} />);

    expect(screen.queryByText("2")).not.toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
  });

  it("should reveal votes when receives `reveal` prop as true", () => {
    const votes = [2];

    render(<TeamVotes votes={votes} revealed={true} />);

    expect(screen.queryByText("x")).not.toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
