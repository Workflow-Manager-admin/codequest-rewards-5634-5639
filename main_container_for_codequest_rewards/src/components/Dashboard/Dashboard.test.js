import React from 'react';
import { render, screen } from '@testing-library/react';
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
    
    const bugsFoundStat = screen.getByText(/Total Bugs Found/i);
    expect(bugsFoundStat).toBeInTheDocument();
    
    const mrsReviewedStat = screen.getByText(/MRs Reviewed/i);
    expect(mrsReviewedStat).toBeInTheDocument();
    
    const activeProjectsStat = screen.getByText(/Active Projects/i);
    expect(activeProjectsStat).toBeInTheDocument();
    
    const activeMrsStat = screen.getByText(/Active MRs/i);
    expect(activeMrsStat).toBeInTheDocument();
  });
  
  test('renders top reviewers section', () => {
    renderWithProviders(<Dashboard />);
    
    const topReviewersSection = screen.getByText(/Top Reviewers/i);
    expect(topReviewersSection).toBeInTheDocument();
    const viewAllLink = screen.getByText(/View All/i);
    expect(viewAllLink).toBeInTheDocument();
  });
  
  test('renders recent activity section', () => {
    renderWithProviders(<Dashboard />);
    
    const activitySection = screen.getByText(/Recent Activity/i);
    expect(activitySection).toBeInTheDocument();
  });
  
  test('renders active projects section', () => {
    renderWithProviders(<Dashboard />);
    
    const projectsSection = screen.getByText('Active Projects');
    expect(projectsSection).toBeInTheDocument();
  });
});