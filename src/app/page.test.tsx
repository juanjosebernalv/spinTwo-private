import { render, screen } from "@/test-utils";

import HomePage from "./page";

describe("HomePage", () => {
  it("renders the hero heading and highlight items", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Building the Future of Digital Business",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Scalable Architecture")).toBeInTheDocument();
  });

  it("renders the closing CTA", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Ready to start your next project?",
      }),
    ).toBeInTheDocument();
  });
});
