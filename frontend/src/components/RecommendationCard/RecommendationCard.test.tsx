import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import RecommendationCard from './';
import {CloudProvider, Recommendation} from '../../types';

jest.mock('../ProviderIcon', () => ({cloudProvider}: { cloudProvider: string }) => (
  <span data-testid="provider-icon">{cloudProvider}</span>
));

jest.mock('../ValueScore', () => ({score}: { score: number }) => (
  <span data-testid="value-score">{`Score: ${score}`}</span>
));

describe('RecommendationCard Component', () => {
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

  it('renders the RecommendationCard component with data', () => {
    render(<RecommendationCard data={mockData}/>);

    // Check if title is rendered
    expect(screen.getByText(mockData.title)).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText(mockData.description)).toBeInTheDocument();

    // Check if provider icons are rendered
    expect(screen.getAllByTestId('provider-icon')).toHaveLength(mockData.provider.length);

    // Check if impact assessment is rendered
    expect(screen.getByText('Impact assessment')).toBeInTheDocument();
    expect(screen.getByText(`~${mockData.impactAssessment.totalViolations} violations / month`)).toBeInTheDocument();

    // Check if value score is rendered
    expect(screen.getByTestId('value-score')).toHaveTextContent(`Score: ${Math.floor(mockData.score / 100 * 4)}`);
  });

  it('applies archived class if the archived prop is true', () => {
    render(<RecommendationCard data={mockData} archived/>);

    // Check if the element with the archived background color exists
    expect(screen.getByTestId('card-package')).toHaveClass('bg-slate-400');
  });

  it('applies primary class if the archived prop is false', () => {
    render(<RecommendationCard data={mockData}/>);

    // Check if the element with the primary background color exists
    expect(screen.getByTestId('card-package')).toHaveClass('bg-primary');
  });

  it('calls onClick when the card is clicked', () => {
    const handleClick = jest.fn();
    render(<RecommendationCard data={mockData} onClick={handleClick}/>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
