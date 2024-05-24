// History.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import History from '.';

const mockLocalStorage = (storedHistory) => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'calculatorHistory') {
      return JSON.stringify(storedHistory);
    }
    return null;
  });
};

describe('History Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders no history message when localStorage is empty', () => {
    mockLocalStorage([]);

    render(<History />);

    expect(screen.getByText('No history available')).toBeInTheDocument();
  });

  test('renders history from localStorage without duplicates', () => {
    const storedHistory = [
      { expression: '1 + 1', result: 2 },
      { expression: '1 + 1', result: 2 },
      { expression: '2 + 2', result: 4 },
      { expression: '3 + 3', result: 6 },
      { expression: '3 + 3', result: 6 }
    ];
    mockLocalStorage(storedHistory);

    render(<History />);

    expect(screen.queryByText('No history available')).not.toBeInTheDocument();
    expect(screen.getByText('1 + 1 = 2')).toBeInTheDocument();
    expect(screen.getByText('2 + 2 = 4')).toBeInTheDocument();
    expect(screen.getByText('3 + 3 = 6')).toBeInTheDocument();
  });

  test('filters out duplicate expressions', () => {
    const storedHistory = [
      { expression: '1 + 1', result: 2 },
      { expression: '1 + 1', result: 2 },
      { expression: '2 + 2', result: 4 },
      { expression: '2 + 2', result: 4 },
      { expression: '3 + 3', result: 6 }
    ];
    mockLocalStorage(storedHistory);

    render(<History />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3); // Should be 3 unique expressions
    expect(screen.getByText('1 + 1 = 2')).toBeInTheDocument();
    expect(screen.getByText('2 + 2 = 4')).toBeInTheDocument();
    expect(screen.getByText('3 + 3 = 6')).toBeInTheDocument();
  });
});
