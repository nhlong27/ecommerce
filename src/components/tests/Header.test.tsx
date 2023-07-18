import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom';
import Header from '../layout/Header';

describe('Test Component - Header', () => {
  it('test navigation contents', () => {
    render(<Header />);
    const title = screen.getByRole('title');
    const menuToggle = screen.getByRole('menu-toggle');
    const shopLink = screen.getByRole('shop-link');
    const cartLink = screen.getByRole('cart-link');
    expect(title).toBeInTheDocument();
    expect(menuToggle).toHaveTextContent('Menu');
    expect(shopLink).toHaveAttribute('href', '/shop');
    expect(cartLink).toHaveAttribute('href', '/user/cart');
  });

  it('test menu button', async () => {
    render(<Header />);
    const menuToggle = screen.getByRole('menu-toggle');
    const shopLink = screen.getByRole('shop-link');
    const cartLink = screen.getByRole('cart-link');
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveTextContent('Close');
    expect(shopLink).not.toBeVisible();
    expect(cartLink).not.toBeVisible();
  });
});
