import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import { ArrowGoBack } from '../arrow-go-back';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ArrowGoBack', () => {
  it('renders correctly', () => {
    render(<ArrowGoBack />);

    const button = screen.getByRole('button', {
      name: /navigate back to home/i,
    });
    const arrowBackIcon = screen.getByTestId('ArrowBackIcon');

    expect(button).toBeInTheDocument();
    expect(arrowBackIcon).toBeInTheDocument();
  });

  it('has the correct attributes', () => {
    render(<ArrowGoBack />);

    const button = screen.getByRole('button', {
      name: /navigate back to home/i,
    });

    expect(button).toHaveAttribute('aria-label', 'navigate back to home');
  });

  it('triggers navigate', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<ArrowGoBack />);

    const button = screen.getByRole('button', {
      name: /navigate back to home/i,
    });

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });
});
