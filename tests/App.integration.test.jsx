import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../src/App';

global.fetch = vi.fn();

describe('App Integration', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: "Mock response" } }] })
    });
  });

  it('renders initial state correctly', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Election Sahayak')).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText('Ask a question about Naya Voter ID (Form 6)...')).toBeInTheDocument();
  });

  it('updates chat state when clicking sidebar buttons', async () => {
    render(<App />);
    
    // Wait for initial render to settle
    await waitFor(() => {
      expect(screen.getByText('Election Dates 2026')).toBeInTheDocument();
    });

    // Click on Election Dates tab
    const datesTab = screen.getByText('Election Dates 2026');
    fireEvent.click(datesTab);
    
    // Check if input placeholder updated correctly to reflect the new tab
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ask a question about Election Dates 2026...')).toBeInTheDocument();
    });
  });

  it('toggles language between Hindi and English', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('HI')).toBeInTheDocument();
    });

    const hindiBtn = screen.getByText('HI');
    fireEvent.click(hindiBtn);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('अपना प्रश्न यहां पूछें...')).toBeInTheDocument();
    });
  });
});
