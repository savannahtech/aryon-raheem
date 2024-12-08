import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./";

const ProblematicComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("should render the fallback UI when a child throws an error", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblematicComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(
      screen.getByText("An unexpected error has occurred, kindly refresh the screen or click the button below")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: 'Go Home' })).toBeInTheDocument();
  });

  it("should render its children when no error occurs", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <div>Safe Component</div>
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Safe Component")).toBeInTheDocument();
  });

  it("should redirect to the home page when 'Go Home' button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblematicComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const goHomeLink = screen.getByRole("link", { name: 'Go Home' });
    expect(goHomeLink).toHaveAttribute("href", "/");

    await user.click(goHomeLink);
    expect(goHomeLink).toBeInTheDocument();
  });
});
