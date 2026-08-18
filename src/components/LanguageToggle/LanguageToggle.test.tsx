import userEvent from "@testing-library/user-event";

import { render, screen } from "@/test-utils";

import { LanguageToggle } from "./LanguageToggle";

describe("LanguageToggle", () => {
  it("renders a select with both supported locales", () => {
    render(<LanguageToggle />);

    const select = screen.getByLabelText(/select language/i);
    expect(select).toHaveValue("en");

    expect(screen.getByRole("option", { name: "English" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Español" })).toBeInTheDocument();
  });

  it("switches the active locale when a new option is selected", async () => {
    const user = userEvent.setup();
    render(<LanguageToggle />);

    const select = screen.getByLabelText(/select language/i);
    await user.selectOptions(select, "es");

    expect(select).toHaveValue("es");
  });
});
