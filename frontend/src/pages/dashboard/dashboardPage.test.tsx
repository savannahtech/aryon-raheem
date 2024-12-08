import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
import DashboardPage from './';

describe('DashboardPage', () => {
  const renderComponent = (title: string) => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DashboardPage title={title}/>
      </MemoryRouter>
    );
  };

  test('renders the title', () => {
    const title = 'Welcome to the Dashboard';
    renderComponent(title);

    expect(screen.getByRole('heading', {name: title})).toBeInTheDocument();
  });

  test('renders the "See all recommendations" button', () => {
    renderComponent('Dashboard');

    const button = screen.getByTestId('link');
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('href', '/recommendations');
  });
});
