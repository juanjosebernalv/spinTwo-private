import { render, screen } from "@/test-utils";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the site name, tagline, and link groups", () => {
    render(<Footer />);

    expect(screen.getByText("SpinTwo")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Building digital experiences that move your business forward.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("renders the current year in the copyright line", () => {
    render(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText((content) => content.includes(year)),
    ).toBeInTheDocument();
  });
});
