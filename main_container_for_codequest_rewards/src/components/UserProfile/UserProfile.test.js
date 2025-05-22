import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserProfile from './UserProfile';
import { AppProvider } from '../../context/AppContext';

// Mock react-router-dom's useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1' // Mock user id 1 (Alex Johnson in our mock data)
  }),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

describe('UserProfile Component', () => {
  test('renders user profile with correct user data', () => {
    render(
      <AppProvider>
        <UserProfile />
      </AppProvider>
    );
    
    // User name should be "Alex Johnson" (id: 1)
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
    
    // Check role and department
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    
    // Check point total
    expect(screen.getByText('520')).toBeInTheDocument();
    expect(screen.getByText('Total Points')).toBeInTheDocument();
  });

  test('renders level information correctly', () => {
    render(
      <AppProvider>
        <UserProfile />
      </AppProvider>
    );
    
    // Level number should be present (level 5 for Alex)
    const levelElement = screen.getByText('5');
    expect(levelElement).toBeInTheDocument();
    
    // Level progress should be shown
    expect(screen.getByText(/points to Level/)).toBeInTheDocument();
  });
  
  test('renders achievements section', () => {
    render(
      <AppProvider>
        <UserProfile />
      </AppProvider>
    );
    
    // Section title
    expect(screen.getByText('Achievements')).toBeInTheDocument();
    
    // Alex has the "Bug Hunter" achievement
    expect(screen.getByText('Bug Hunter')).toBeInTheDocument();
  });
  
  test('renders statistics section', () => {
    render(
      <AppProvider>
        <UserProfile />
      </AppProvider>
    );
    
    // Section title
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    
    // Alex has found 28 bugs
    const bugsFoundElement = screen.getByText('28');
    expect(bugsFoundElement).toBeInTheDocument();
    expect(screen.getByText('Bugs Found')).toBeInTheDocument();
    
    // Alex has reviewed 45 MRs
    const mrsReviewedElement = screen.getByText('45');
    expect(mrsReviewedElement).toBeInTheDocument();
    expect(screen.getByText('MRs Reviewed')).toBeInTheDocument();
  });
  
  test('renders bug breakdown section', () => {
    render(
      <AppProvider>
        <UserProfile />
      </AppProvider>
    );
    
    expect(screen.getByText('Bug Discovery Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Critical:')).toBeInTheDocument();
    expect(screen.getByText('High:')).toBeInTheDocument();
    expect(screen.getByText('Medium:')).toBeInTheDocument();
    expect(screen.getByText('Low:')).toBeInTheDocument();
  });
});