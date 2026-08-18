import userEvent from "@testing-library/user-event";

import { render, screen } from "@/test-utils";

import ContactUsPage from "./page";

describe("ContactUsPage", () => {
  it("renders the hero and the contact form fields", () => {
    render(<ContactUsPage />);

    expect(
      screen.getByRole("heading", { name: "Let's Build Something Together" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("shows a success message after submitting the form", async () => {
    const user = userEvent.setup();
    render(<ContactUsPage />);

    await user.type(screen.getByLabelText("Full Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email Address"), "jane@company.com");
    await user.type(screen.getByLabelText("Message"), "Hello there");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText("Thank you! Your message has been sent."),
    ).toBeInTheDocument();
  });
});
