import { render, screen } from '@testing-library/react';
import App from './App';

test('renders PropManager landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/PropManager/i);
  expect(linkElement).toBeInTheDocument();
});