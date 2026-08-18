import { render, screen } from "@/test-utils";

import ServicesPage from "./page";

describe("ServicesPage", () => {
  it("renders the hero and the list of services", () => {
    render(<ServicesPage />);

    expect(
      screen.getByRole("heading", { name: "Full-Cycle Digital Services" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Product Strategy")).toBeInTheDocument();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
  });
});
