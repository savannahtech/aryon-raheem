import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {InfiniteData, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RecommendationsPage from './';
import recommendationService from '../../services/recommendation.service';
import useFilterContext from '../../context/filterContext/hook';
import {MemoryRouter} from "react-router";
import {CloudProvider, Recommendation, RecommendationsDataResponse} from "../../types";
import FilterContextProvider from "../../context/filterContext";

jest.mock('../../services/recommendation.service');
jest.mock('../../context/filterContext/hook');

const mockData: Recommendation = {
  "tenantId": "tenant-001",
  "recommendationId": "rec-002",
  "title": "Sample Recommendation",
  "slug": "azure-service-bus-data-protection-configuration",
  "description": "Implement comprehensive data protection controls for AZURE Service Bus including security best practices, monitoring, and compliance requirements.",
  "score": 90,
  "provider": [CloudProvider.AWS],
  "frameworks": [
    {
      "name": "CIS AWS Foundations",
      "section": "1",
      "subsection": "1.1"
    },
    {
      "name": "GDPR",
      "section": "Article 35",
      "subsection": "Article 25.5"
    }
  ],
  "reasons": [
    "Enhances data protection security",
    "Reduces security risks",
    "Ensures compliance requirements"
  ],
  "furtherReading": [
    {
      "name": "AZURE Service Bus Security Guide",
      "href": "https://docs.example.com/azure/service bus/security"
    }
  ],
  "totalHistoricalViolations": 153,
  "affectedResources": [
    {
      "name": "backup-service-bus"
    },
    {
      "name": "primary-service-bus"
    }
  ],
  "impactAssessment": {
    "totalViolations": 57,
    "mostImpactedScope": {
      "name": "testing-service-bus",
      "type": "Service Bus",
      "count": 60
    }
  },
  "class": 2
};

describe('RecommendationsPage', () => {
  const mockGetRecommendations = jest.spyOn(recommendationService, 'getRecommendations');
  const mockUseFilterContext = useFilterContext as jest.Mock;
  const queryClient = new QueryClient();

  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <FilterContextProvider>
          <MemoryRouter initialEntries={['/']}>
            <RecommendationsPage/>
          </MemoryRouter>
        </FilterContextProvider>
      </QueryClientProvider>
    );
  }

  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
    mockUseFilterContext.mockReturnValue({
      tags: [],
    });
  });

  it('renders loading state initially', async () => {
    mockGetRecommendations.mockImplementationOnce(() => new Promise(() => {
    }));

    renderComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders no recommendations message when there is no data', async () => {
    mockGetRecommendations.mockResolvedValueOnce({
      data: [],
      pagination: {
        totalItems: 0, cursor: {
          next: ''
        }
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No recommendations')).toBeInTheDocument();
    });
  });

  it('renders recommendations when data is available', async () => {
    mockGetRecommendations.mockResolvedValueOnce({
      data: [mockData],
      pagination: {
        totalItems: 1, cursor: {
          next: ''
        }
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Sample Recommendation')).toBeInTheDocument();
    });
  });

  it('handles removal of an item', async () => {
    mockGetRecommendations.mockResolvedValueOnce({
      data: [mockData],
      pagination: {
        totalItems: 1, cursor: {
          next: ''
        }
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Sample Recommendation')).toBeInTheDocument();
    });

    // Simulate the item removal
    queryClient.setQueryData<InfiniteData<RecommendationsDataResponse>>(['recommendations', 'unarchived', '', '[]'], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages:
          [
            {
              ...oldData.pages[0],
              data: [],
              pagination: {...oldData.pages[0].pagination, totalItems: 0},
            },
          ],
      };
    });

    await waitFor(() => {
      expect(screen.queryByText('Sample Recommendation')).not.toBeInTheDocument();
      expect(screen.getByText('No recommendations')).toBeInTheDocument();
    });
  });
});
