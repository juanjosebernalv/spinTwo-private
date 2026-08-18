import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "@/test-utils";

import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("renders a toggle button once mounted", async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /toggle theme/i }),
      ).toBeInTheDocument();
    });
  });

  it("toggles the theme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = await screen.findByRole("button", { name: /toggle theme/i });
    const initialPressed = button.getAttribute("aria-pressed");

    await user.click(button);

    await waitFor(() => {
      expect(button.getAttribute("aria-pressed")).not.toBe(initialPressed);
    });
  });
});
