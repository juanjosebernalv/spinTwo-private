import { render, screen } from "@/test-utils";

import IndustriesPage from "./page";

describe("IndustriesPage", () => {
  it("renders the hero and the list of industries", () => {
    render(<IndustriesPage />);

    expect(
      screen.getByRole("heading", { name: "Industry Expertise That Delivers" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Retail & E-commerce")).toBeInTheDocument();
  });
});
