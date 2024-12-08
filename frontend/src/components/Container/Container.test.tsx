import React from 'react';
import {render, screen} from '@testing-library/react';
import Container from './';

describe('Container component', () => {
  it('should render a div with default classes', () => {
    render(<Container/>);

    // Check if the div has the default classes
    expect(screen.getByTestId("container")).toHaveClass('w-full max-w-[2480px] mx-auto p-5');
  });

  it('should apply additional classes passed via className prop', () => {
    render(<Container className="bg-gray-200"/>);

    // Check if the div has the default and additional classes
    expect(screen.getByTestId("container")).toHaveClass('w-full max-w-[2480px] mx-auto p-5 bg-gray-200');
  });

  it('should spread other props onto the div', () => {
    render(<Container id="test-container"/>);

    // Check if the id prop was applied to the div
    expect(screen.getByTestId("container")).toHaveAttribute('id', 'test-container');
  });
});
