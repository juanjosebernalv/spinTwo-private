import { render, screen } from "@/test-utils";

import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the eyebrow, title, and subtitle", () => {
    render(
      <Hero
        eyebrow="Welcome"
        title="Main Title"
        subtitle="Supporting subtitle text"
      />,
    );

    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Main Title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Supporting subtitle text")).toBeInTheDocument();
  });

  it("renders primary and secondary CTA links when provided", () => {
    render(
      <Hero
        title="Title"
        subtitle="Subtitle"
        primaryCta={{ label: "Primary", href: "/primary" }}
        secondaryCta={{ label: "Secondary", href: "/secondary" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Primary" })).toHaveAttribute(
      "href",
      "/primary",
    );
    expect(screen.getByRole("link", { name: "Secondary" })).toHaveAttribute(
      "href",
      "/secondary",
    );
  });

  it("does not render CTA links when none are provided", () => {
    render(<Hero title="Title" subtitle="Subtitle" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
