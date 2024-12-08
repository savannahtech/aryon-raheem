import { render } from "@testing-library/react";
import ValueScore from "./";

describe("ValueScore Component", () => {
  test("renders correct number of filled and unfilled boxes", () => {
    const { container } = render(<ValueScore score={2} />);
    const boxes = container.querySelectorAll("div.w-3");
    expect(boxes).toHaveLength(4);

    expect(boxes[0]).toHaveClass("bg-teal-400");
    expect(boxes[1]).toHaveClass("bg-teal-400");
    expect(boxes[2]).toHaveClass("bg-zinc-300");
    expect(boxes[3]).toHaveClass("bg-zinc-300");
  });

  test("handles score of 0", () => {
    const { container } = render(<ValueScore score={0} />);
    const boxes = container.querySelectorAll("div.w-3");
    boxes.forEach((box) => expect(box).toHaveClass("bg-zinc-300"));
  });

  test("handles score of 4", () => {
    const { container } = render(<ValueScore score={4} />);
    const boxes = container.querySelectorAll("div.w-3");
    boxes.forEach((box) => expect(box).toHaveClass("bg-teal-400"));
  });
});
