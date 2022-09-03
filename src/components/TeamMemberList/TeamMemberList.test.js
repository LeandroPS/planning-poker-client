import { render, screen } from "@testing-library/react";
import TeamMemberList from "./TeamMemberList";

describe("<TeamMemberList />", () => {
  it("should render", () => {
    render(<TeamMemberList />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should render member list", () => {
    const members = [
      {
        name: "John",
      },
      {
        name: "Mary",
      },
    ];

    render(<TeamMemberList teamMembers={members} />);

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Mary")).toBeInTheDocument();
  });
});
