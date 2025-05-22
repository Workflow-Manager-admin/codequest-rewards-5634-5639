import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
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

describe('Dashboard Component', () => {
  test('renders dashboard header', () => {
    renderWithProviders(<Dashboard />);
    const headerElement = screen.getByText(/CodeQuest Rewards Dashboard/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders statistics cards', () => {
    renderWithProviders(<Dashboard />);
    
    // Using getAllByText for all texts that might appear multiple times
    const bugsFoundStats = screen.getAllByText(/Total Bugs Found/i);
    expect(bugsFoundStats[0]).toBeInTheDocument();
    
    const mrsReviewedStats = screen.getAllByText(/MRs Reviewed/i);
    expect(mrsReviewedStats[0]).toBeInTheDocument();
    
    const activeProjectsHeadings = screen.getAllByText(/Active Projects/i);
    expect(activeProjectsHeadings[0]).toBeInTheDocument();
    
    const activeMrsStats = screen.getAllByText(/Active MRs/i);
    expect(activeMrsStats[0]).toBeInTheDocument();
  });
  
  test('renders top reviewers section', () => {
    renderWithProviders(<Dashboard />);
    
    // Find the top reviewers heading
    const topReviewersHeadings = screen.getAllByText(/Top Reviewers/i);
    expect(topReviewersHeadings[0]).toBeInTheDocument();
    
    // Find all "View All" links and check at least one exists
    const viewAllLinks = screen.getAllByText(/View All/i);
    expect(viewAllLinks.length).toBeGreaterThan(0);
    expect(viewAllLinks[0]).toBeInTheDocument();
  });
  
  test('renders recent activity section', () => {
    renderWithProviders(<Dashboard />);
    
    const activitySection = screen.getByText(/Recent Activity/i);
    expect(activitySection).toBeInTheDocument();
  });
  
  test('renders active projects section', () => {
    renderWithProviders(<Dashboard />);
    
    // Using getAllByText to get all elements with "Active Projects" text
    const projectsSections = screen.getAllByText(/Active Projects/i);
    // Making sure at least one element exists
    expect(projectsSections.length).toBeGreaterThan(0);
  });
});