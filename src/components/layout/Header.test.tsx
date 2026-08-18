import { render, screen } from "@/test-utils";

import { Header } from "./Header";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header", () => {
  it("renders the site name, navigation, and toggles", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "SpinTwo" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("navigation", { name: /primary navigation/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/select language/i)).toBeInTheDocument();
  });
});
