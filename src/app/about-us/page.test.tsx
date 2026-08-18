import { render, screen } from "@/test-utils";

import AboutUsPage from "./page";

describe("AboutUsPage", () => {
  it("renders the hero, mission, and values sections", () => {
    render(<AboutUsPage />);

    expect(
      screen.getByRole("heading", { name: "The Team Behind SpinTwo" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Our Mission")).toBeInTheDocument();
    expect(screen.getByText("Craftsmanship")).toBeInTheDocument();
  });
});
