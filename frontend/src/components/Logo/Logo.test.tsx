import { render, screen } from "@testing-library/react";
import Logo from "./";

describe("Logo Component", () => {
  test("renders the title and subtitle", () => {
    render(<Logo />);
    expect(screen.getByText("Aryon")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });
});
