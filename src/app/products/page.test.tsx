import { render, screen } from "@/test-utils";

import ProductsPage from "./page";

describe("ProductsPage", () => {
  it("renders the hero and the list of products", () => {
    render(<ProductsPage />);

    expect(
      screen.getByRole("heading", { name: "Products Built to Perform" }),
    ).toBeInTheDocument();
    expect(screen.getByText("SpinTwo Analytics")).toBeInTheDocument();
  });
});
