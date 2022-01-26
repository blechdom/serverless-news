import { render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import App from './App';

test('renders page title in navbar', () => {
  render(<App />);
  const linkElement = screen.getByText(/NEWS/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders link to LOGIN in navbar', () => {
  render(<App />);
  const linkElement = screen.getByText(/LOGIN/i);
  expect(linkElement).toBeInTheDocument();
});