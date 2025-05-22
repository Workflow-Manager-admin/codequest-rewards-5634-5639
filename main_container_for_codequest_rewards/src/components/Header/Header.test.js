import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { AppProvider } from '../../context/AppContext';

// Mock component wrapper with required providers
const renderWithProviders = (component) => {
  return render(
    <AppProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </AppProvider>
  );
};

describe('Header Component', () => {
  test('renders header with logo', () => {
    renderWithProviders(<Header />);
    const logoElement = screen.getByText(/CodeQuest Rewards/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithProviders(<Header />);
    
    const dashboardLink = screen.getByText(/Dashboard/i);
    expect(dashboardLink).toBeInTheDocument();
    
    const projectsLink = screen.getByText(/Projects/i);
    expect(projectsLink).toBeInTheDocument();
    
    const mergeRequestsLink = screen.getByText(/Merge Requests/i);
    expect(mergeRequestsLink).toBeInTheDocument();
    
    const leaderboardLink = screen.getByText(/Leaderboard/i);
    expect(leaderboardLink).toBeInTheDocument();
  });
  
  test('renders top user section', () => {
    renderWithProviders(<Header />);
    
    const topReviewerLabel = screen.getByText(/Top Reviewer:/i);
    expect(topReviewerLabel).toBeInTheDocument();
    
    // Since we have mock data, we can check for the top user (which is always the first user in the leaderboard)
    const topUserInfo = screen.getByText(/pts$/i); // Match the points text
    expect(topUserInfo).toBeInTheDocument();
  });
});