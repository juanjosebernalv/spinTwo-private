import userEvent from "@testing-library/user-event";

import { render, screen } from "@/test-utils";

import { Navbar } from "./Navbar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders every primary navigation link", () => {
    render(<Navbar />);

    const nav = screen.getByRole("navigation", { name: /primary navigation/i });
    expect(nav).toBeInTheDocument();

    [
      "Home",
      "About Us",
      "Services",
      "Products",
      "Case Studies",
      "Industries",
      "Resources",
      "Contact Us",
    ].forEach((label) => {
      expect(
        screen.getAllByRole("link", { name: label }).length,
      ).toBeGreaterThan(0);
    });
  });

  it("marks the active route with aria-current", () => {
    render(<Navbar />);

    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks[0]).toHaveAttribute("aria-current", "page");
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(menuButton);

    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toBeInTheDocument();
  });
});
