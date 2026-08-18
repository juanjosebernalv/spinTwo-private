import { render, screen } from "@/test-utils";

import { Layout } from "./Layout";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Layout", () => {
  it("renders the header, children, and footer", () => {
    render(
      <Layout>
        <p>Page content</p>
      </Layout>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
