import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProvider, useAppContext } from './AppContext';

// Test component that uses the context
const TestComponent = () => {
  const { users, projects, leaderboard, getLevelInfo } = useAppContext();
  
  return (
    <div>
      <div data-testid="user-count">{users.length}</div>
      <div data-testid="project-count">{projects.length}</div>
      <div data-testid="leaderboard-count">{leaderboard.length}</div>
      <div data-testid="level-info">{getLevelInfo(500).level}</div>
    </div>
  );
};

describe('AppContext', () => {
  test('provides context values to consuming components', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    
    expect(screen.getByTestId('user-count')).toHaveTextContent('5');
    expect(screen.getByTestId('project-count')).toHaveTextContent('4');
    expect(screen.getByTestId('leaderboard-count')).toHaveTextContent('5');
    expect(screen.getByTestId('level-info')).toHaveTextContent('4');
  });
});