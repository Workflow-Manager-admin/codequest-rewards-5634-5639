import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app component', () => {
  render(<App />);
  const appElement = screen.getByText(/main_container_for_codequest_rewards/i);
  expect(appElement).toBeInTheDocument();
});