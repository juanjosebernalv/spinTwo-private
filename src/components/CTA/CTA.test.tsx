import { render, screen } from "@/test-utils";

import { CTA } from "./CTA";

describe("CTA", () => {
  it("renders title, subtitle, and a link to the provided href", () => {
    render(
      <CTA
        title="Ready to start?"
        subtitle="Let's talk"
        buttonLabel="Contact Us"
        href="/contact-us"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Ready to start?" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Let's talk")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Contact Us" });
    expect(link).toHaveAttribute("href", "/contact-us");
  });
});
