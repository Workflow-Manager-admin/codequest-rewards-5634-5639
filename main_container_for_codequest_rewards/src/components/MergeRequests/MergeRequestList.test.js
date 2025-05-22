import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MergeRequestList from './MergeRequestList';
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

describe('MergeRequestList Component', () => {
  test('renders merge request header', () => {
    renderWithProviders(<MergeRequestList />);
    const headerElement = screen.getByText(/Merge Requests/i);
    expect(headerElement).toBeInTheDocument();
    
    const subtitleElement = screen.getByText(/Review and track bugs found/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders filter options', () => {
    renderWithProviders(<MergeRequestList />);
    
    const allFilter = screen.getByText('All');
    expect(allFilter).toBeInTheDocument();
    expect(allFilter).toHaveClass('active'); // Default selection
    
    const openFilter = screen.getByText('Open');
    expect(openFilter).toBeInTheDocument();
    
    const mergedFilter = screen.getByText('Merged');
    expect(mergedFilter).toBeInTheDocument();
    
    const projectSelect = screen.getByText('Project:');
    expect(projectSelect).toBeInTheDocument();
  });
  
  test('filter options toggle active class when clicked', () => {
    renderWithProviders(<MergeRequestList />);
    
    const allFilter = screen.getByText('All');
    const openFilter = screen.getByText('Open');
    const mergedFilter = screen.getByText('Merged');
    
    // Initially all is active
    expect(allFilter).toHaveClass('active');
    expect(openFilter).not.toHaveClass('active');
    expect(mergedFilter).not.toHaveClass('active');
    
    // Click open
    fireEvent.click(openFilter);
    expect(allFilter).not.toHaveClass('active');
    expect(openFilter).toHaveClass('active');
    expect(mergedFilter).not.toHaveClass('active');
    
    // Click merged
    fireEvent.click(mergedFilter);
    expect(allFilter).not.toHaveClass('active');
    expect(openFilter).not.toHaveClass('active');
    expect(mergedFilter).toHaveClass('active');
  });
  
  test('displays correct number of merge requests', () => {
    renderWithProviders(<MergeRequestList />);
    
    // Our mock data has 4 merge requests
    expect(screen.getByText('4 merge requests')).toBeInTheDocument();
    
    // Should display titles of our mock MRs
    expect(screen.getByText('Add user profile settings page')).toBeInTheDocument();
    expect(screen.getByText('Implement caching for API responses')).toBeInTheDocument();
    expect(screen.getByText('Update Docker configurations for prod environment')).toBeInTheDocument();
    expect(screen.getByText('Implement JWT authentication')).toBeInTheDocument();
  });
  
  test('filters merge requests by status', () => {
    renderWithProviders(<MergeRequestList />);
    
    // Initially shows all merge requests
    expect(screen.getByText('Add user profile settings page')).toBeInTheDocument();
    expect(screen.getByText('Implement caching for API responses')).toBeInTheDocument();
    
    // Filter by Open status
    const openFilter = screen.getByText('Open');
    fireEvent.click(openFilter);
    
    // Should still see open MRs but not merged ones
    expect(screen.getByText('Add user profile settings page')).toBeInTheDocument();
    expect(screen.queryByText('Implement caching for API responses')).not.toBeInTheDocument();
    
    // Filter by Merged status
    const mergedFilter = screen.getByText('Merged');
    fireEvent.click(mergedFilter);
    
    // Should see merged MRs but not open ones
    expect(screen.queryByText('Add user profile settings page')).not.toBeInTheDocument();
    expect(screen.getByText('Implement caching for API responses')).toBeInTheDocument();
  });
});