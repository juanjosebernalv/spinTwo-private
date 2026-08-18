import { render, screen } from "@/test-utils";

import CaseStudiesPage from "./page";

describe("CaseStudiesPage", () => {
  it("renders the hero and the list of case studies", () => {
    render(<CaseStudiesPage />);

    expect(
      screen.getByRole("heading", { name: "Real Results, Real Impact" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Retail Platform Modernization"),
    ).toBeInTheDocument();
  });
});
