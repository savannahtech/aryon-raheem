import { render, screen } from "@testing-library/react";
import ProviderIcon from "./";
import { CloudProvider } from "../../types";

describe("ProviderIcon Component", () => {
  test("renders AWS icon", () => {
    render(<ProviderIcon cloudProvider={CloudProvider.AWS} />);
    expect(screen.getByTestId("icon")).toHaveAttribute("data-icon", "mdi:aws");
  });

  test("renders Azure icon", () => {
    render(<ProviderIcon cloudProvider={CloudProvider.AZURE} />);
    expect(screen.getByTestId("icon")).toHaveAttribute("data-icon", "lineicons:azure");
  });

  test("renders default icon for unspecified provider", () => {
    render(<ProviderIcon cloudProvider={CloudProvider.UNSPECIFIED} />);
    expect(screen.getByTestId("icon")).toHaveAttribute("data-icon", "bxl:google-cloud");
  });
});
