import React from 'react';
import {fireEvent, screen, waitFor} from '@testing-library/react';
import FilterTags from './filterTags';
import useFilterContext from '../../context/filterContext/hook';
import recommendationService from '../../services/recommendation.service';
import {renderWithClient} from "../../utils/tanstackTestUtils";

jest.mock('../../context/filterContext/hook', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../services/recommendation.service', () => ({
  __esModule: true,
  default: {
    getRecommendations: jest.fn(),
  },
}));

describe('FilterTags Component', () => {
  const mockSetTags = jest.fn();

  beforeEach(() => {
    (useFilterContext as jest.Mock).mockReturnValue({
      tags: [],
      setTags: mockSetTags,
    });

    (recommendationService.getRecommendations as jest.Mock).mockResolvedValue({
      availableTags: {
        classes: ['class1', 'class2'],
        frameworks: ['react', 'angular'],
        providers: ['aws', 'gcp'],
        reasons: ['reason1', 'reason2'],
      },
    });
  });

  it('renders the component and fetches tags', async () => {
    renderWithClient(<FilterTags/>);

    // Verify initial state
    expect(screen.getByPlaceholderText('Search tags')).toBeInTheDocument();
    expect(screen.getByText('Filter (0 applied)')).toBeInTheDocument();

    // Wait for tags to load
    await waitFor(() => {
      expect(screen.getByText('classes (2)')).toBeInTheDocument();
      expect(screen.getByText('frameworks (2)')).toBeInTheDocument();
    });
  });

  it('filters tags based on search input', async () => {
    renderWithClient(<FilterTags/>);

    await waitFor(() => {
      expect(screen.getByText('classes (2)')).toBeInTheDocument();
    });

    // Perform search
    fireEvent.change(screen.getByPlaceholderText('Search tags'), {
      target: {value: 'react'},
    });

    // Verify filtered result
    expect(screen.queryByText('classes (2)')).not.toBeInTheDocument();
    expect(screen.getByText('frameworks (1)')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('toggles tag selection', async () => {
    renderWithClient(<FilterTags/>);

    await waitFor(() => {
      expect(screen.getByText('classes (2)')).toBeInTheDocument();
    });

    const checkbox = screen.getByTestId('tag-classes-0')!;
    fireEvent.click(checkbox);

    expect(mockSetTags).toHaveBeenCalled();
  });

  it('clears all filters when "Clear filters" is clicked', async () => {
    renderWithClient(<FilterTags/>);

    await waitFor(() => {
      expect(screen.getByText('classes (2)')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Clear filters'));

    expect(mockSetTags).toHaveBeenCalledWith([]);
    expect(screen.getByPlaceholderText('Search tags')).toHaveValue('');
  });
});
