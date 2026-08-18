import { render, screen } from "@/test-utils";

import ResourcesPage from "./page";

describe("ResourcesPage", () => {
  it("renders the hero and the list of resources", () => {
    render(<ResourcesPage />);

    expect(
      screen.getByRole("heading", { name: "Insights & Resources" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Complete Guide to Web Performance"),
    ).toBeInTheDocument();
  });
});
