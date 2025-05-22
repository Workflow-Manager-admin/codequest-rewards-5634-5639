import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Leaderboard from './Leaderboard';
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

describe('Leaderboard Component', () => {
  test('renders leaderboard header', () => {
    renderWithProviders(<Leaderboard />);
    const headerElement = screen.getByText(/Reviewer Leaderboard/i);
    expect(headerElement).toBeInTheDocument();
    
    const subtitleElement = screen.getByText(/Top code reviewers ranked by points/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders filter options', () => {
    renderWithProviders(<Leaderboard />);
    
    const allTimeFilter = screen.getByText('All Time');
    expect(allTimeFilter).toBeInTheDocument();
    expect(allTimeFilter).toHaveClass('active'); // Default selection
    
    const monthlyFilter = screen.getByText('Monthly');
    expect(monthlyFilter).toBeInTheDocument();
    
    const weeklyFilter = screen.getByText('Weekly');
    expect(weeklyFilter).toBeInTheDocument();
  });
  
  test('filter options toggle active class when clicked', () => {
    renderWithProviders(<Leaderboard />);
    
    const allTimeFilter = screen.getByText('All Time');
    const monthlyFilter = screen.getByText('Monthly');
    const weeklyFilter = screen.getByText('Weekly');
    
    // Initially all-time is active
    expect(allTimeFilter).toHaveClass('active');
    expect(monthlyFilter).not.toHaveClass('active');
    expect(weeklyFilter).not.toHaveClass('active');
    
    // Click monthly
    fireEvent.click(monthlyFilter);
    expect(allTimeFilter).not.toHaveClass('active');
    expect(monthlyFilter).toHaveClass('active');
    expect(weeklyFilter).not.toHaveClass('active');
    
    // Click weekly
    fireEvent.click(weeklyFilter);
    expect(allTimeFilter).not.toHaveClass('active');
    expect(monthlyFilter).not.toHaveClass('active');
    expect(weeklyFilter).toHaveClass('active');
  });
  
  test('renders leaderboard table headers', () => {
    renderWithProviders(<Leaderboard />);
    
    expect(screen.getByText('Rank')).toBeInTheDocument();
    expect(screen.getByText('Reviewer')).toBeInTheDocument();
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('Bugs Found')).toBeInTheDocument();
    expect(screen.getByText('Achievements')).toBeInTheDocument();
    expect(screen.getByText('Points')).toBeInTheDocument();
  });
  
  test('renders correct number of leaderboard rows', () => {
    renderWithProviders(<Leaderboard />);
    
    // Our mock data has 5 users
    const userNames = screen.getAllByText(/Senior Developer|Backend Engineer|DevOps Engineer|Full Stack Developer|QA Engineer/i);
    expect(userNames.length).toBe(5);
  });
});