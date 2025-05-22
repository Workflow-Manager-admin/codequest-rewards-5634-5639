import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import App from './App.modified'; // Using the modified App with routing

// Mock the components that would be rendered at each route
jest.mock('./components/Dashboard/Dashboard', () => {
  return function MockDashboard() {
    return <div data-testid="dashboard">Dashboard Component</div>;
  };
});

jest.mock('./components/Leaderboard/Leaderboard', () => {
  return function MockLeaderboard() {
    return <div data-testid="leaderboard">Leaderboard Component</div>;
  };
});

jest.mock('./components/MergeRequests/MergeRequestList', () => {
  return function MockMergeRequestList() {
    return <div data-testid="merge-requests">Merge Requests Component</div>;
  };
});

jest.mock('./components/UserProfile/UserProfile', () => {
  return function MockUserProfile() {
    return <div data-testid="user-profile">User Profile Component</div>;
  };
});

jest.mock('./components/Header/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </AppProvider>
  );
};

describe('App Routing', () => {
  test('renders dashboard route by default', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
  
  test('renders leaderboard route', () => {
    renderWithRouter(<App />, { route: '/leaderboard' });
    expect(screen.getByTestId('leaderboard')).toBeInTheDocument();
  });
  
  test('renders merge requests route', () => {
    renderWithRouter(<App />, { route: '/merge-requests' });
    expect(screen.getByTestId('merge-requests')).toBeInTheDocument();
  });
  
  test('renders user profile route', () => {
    renderWithRouter(<App />, { route: '/user/1' });
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });
  
  test('renders header on all routes', () => {
    renderWithRouter(<App />, { route: '/leaderboard' });
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
  
  test('redirects to dashboard for unknown routes', () => {
    renderWithRouter(<App />, { route: '/unknown-route' });
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});