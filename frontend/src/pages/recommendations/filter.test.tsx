import {fireEvent, render, screen} from '@testing-library/react';
import RecommendationsFilter from './filter';
import React from "react";
import FilterContextProvider from '../../context/filterContext';
import useFilterContext from "../../context/filterContext/hook";

jest.mock('./filterTags', () => () => (
  <span data-testid="filter-tags"></span>
));

jest.mock('../../context/filterContext/hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RecommendationsFilter', () => {
  it('renders correctly', () => {
    render(<RecommendationsFilter setDebouncedTerm={jest.fn()}/>);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('calls setDebouncedTerm after 3 seconds of typing', () => {
    jest.useFakeTimers();
    const setDebouncedTerm = jest.fn();
    render(<RecommendationsFilter setDebouncedTerm={setDebouncedTerm}/>);

    fireEvent.change(screen.getByPlaceholderText('Search'), {target: {value: 'test'}});

    jest.advanceTimersByTime(3000);

    expect(setDebouncedTerm).toHaveBeenCalledWith('test');
    jest.useRealTimers();
  });

  it('should indicate if any filter is applied', () => {
    (useFilterContext as jest.Mock).mockReturnValue({
      tags: ['aws'],
    });

    render(
      <FilterContextProvider>
        <RecommendationsFilter setDebouncedTerm={jest.fn()}/>
      </FilterContextProvider>
    );

    expect(screen.getByTestId('filter-indicator')).toBeInTheDocument();
  });
});
