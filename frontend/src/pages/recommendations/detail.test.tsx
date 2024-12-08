import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import RecommendationDetail from './detail';
import {CloudProvider, Recommendation} from '../../types';
import {toast} from 'react-hot-toast';
import recommendationService from '../../services/recommendation.service';

jest.mock('../../services/recommendation.service', ()=>({
  archive: jest.fn(),
  unarchive: jest.fn()
}));

const mockData: Recommendation = {
  "tenantId": "tenant-001",
  "recommendationId": "rec-002",
  "title": "AZURE Service Bus Data Protection Configuration",
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

describe('RecommendationDetail', () => {
  it('renders correctly with data', () => {
    render(<RecommendationDetail data={mockData}/>);

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText('Value score')).toBeInTheDocument();
    expect(screen.getByText('Enhances data protection security')).toBeInTheDocument();
  });

  it('calls toggleArchive and displays success toast on successful archive', async () => {
    // @ts-ignore
    recommendationService.archive.mockResolvedValueOnce({});
    render(<RecommendationDetail data={mockData} archived={false} onClose={jest.fn()}/>);

    fireEvent.click(screen.getByTestId('archive-button'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Recommendation archived successfully');
    });
  });

  it('handles archive error gracefully', async () => {
    // @ts-ignore
    recommendationService.archive.mockRejectedValueOnce({response: {data: {error: 'Error'}}});
    render(<RecommendationDetail data={mockData} archived={false} onClose={jest.fn()}/>);

    fireEvent.click(screen.getByText('Archive'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error');
    });
  });

  it('renders nothing if no data is provided', () => {
    render(<RecommendationDetail/>);
    expect(screen.queryByText('Value score')).toBeNull();
  });
});
