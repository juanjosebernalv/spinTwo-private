import { render, screen } from "@/test-utils";

import { ItemGrid } from "./ItemGrid";

describe("ItemGrid", () => {
  it("renders the section title and every item", () => {
    render(
      <ItemGrid
        title="Featured Items"
        items={[
          { title: "Item One", description: "Description one" },
          { title: "Item Two", description: "Description two" },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Featured Items" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Description one")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
    expect(screen.getByText("Description two")).toBeInTheDocument();
  });

  it("renders no cards when the items list is empty", () => {
    render(<ItemGrid title="Empty" items={[]} />);

    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
