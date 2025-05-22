import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
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
    const headerElements = screen.getAllByText(/Merge Requests/i);
    expect(headerElements[0]).toBeInTheDocument();
    
    const subtitleElement = screen.getByText(/Review and track bugs found/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('renders filter options', () => {
    renderWithProviders(<MergeRequestList />);
    
    // Find the filter group section first
    const filterSection = screen.getByText('Status:').closest('.filters');
    
    // Get filter buttons within this section
    const allFilterButtons = within(filterSection).getAllByText('All');
    expect(allFilterButtons[0]).toBeInTheDocument();
    expect(allFilterButtons[0]).toHaveClass('active'); // Default selection
    
    const openFilterButtons = within(filterSection).getAllByText('Open');
    expect(openFilterButtons[0]).toBeInTheDocument();
    
    const mergedFilterButtons = within(filterSection).getAllByText('Merged');
    expect(mergedFilterButtons[0]).toBeInTheDocument();
    
    const projectSelect = screen.getByText('Project:');
    expect(projectSelect).toBeInTheDocument();
  });
  
  test('filter options toggle active class when clicked', () => {
    renderWithProviders(<MergeRequestList />);
    
    // Find the filter group section first
    const filterSection = screen.getByText('Status:').closest('.filters');
    
    // Get filter buttons within this section
    const allFilterButton = within(filterSection).getAllByText('All')[0];
    const openFilterButton = within(filterSection).getAllByText('Open')[0];
    const mergedFilterButton = within(filterSection).getAllByText('Merged')[0];
    
    // Initially all is active
    expect(allFilterButton).toHaveClass('active');
    expect(openFilterButton).not.toHaveClass('active');
    expect(mergedFilterButton).not.toHaveClass('active');
    
    // Click open
    fireEvent.click(openFilterButton);
    expect(allFilterButton).not.toHaveClass('active');
    expect(openFilterButton).toHaveClass('active');
    expect(mergedFilterButton).not.toHaveClass('active');
    
    // Click merged
    fireEvent.click(mergedFilterButton);
    expect(allFilterButton).not.toHaveClass('active');
    expect(openFilterButton).not.toHaveClass('active');
    expect(mergedFilterButton).toHaveClass('active');
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
    
    // Find the filter group section first
    const filterSection = screen.getByText('Status:').closest('.filters');
    
    // Initially shows all merge requests
    expect(screen.getByText('Add user profile settings page')).toBeInTheDocument();
    expect(screen.getByText('Implement caching for API responses')).toBeInTheDocument();
    
    // Filter by Open status
    const openFilterButton = within(filterSection).getAllByText('Open')[0];
    fireEvent.click(openFilterButton);
    
    // Should still see open MRs but not merged ones
    expect(screen.getByText('Add user profile settings page')).toBeInTheDocument();
    expect(screen.queryByText('Implement caching for API responses')).not.toBeInTheDocument();
    
    // Filter by Merged status
    const mergedFilterButton = within(filterSection).getAllByText('Merged')[0];
    fireEvent.click(mergedFilterButton);
    
    // Should see merged MRs but not open ones
    expect(screen.queryByText('Add user profile settings page')).not.toBeInTheDocument();
    expect(screen.getByText('Implement caching for API responses')).toBeInTheDocument();
  });
});