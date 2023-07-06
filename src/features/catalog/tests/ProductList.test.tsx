import React from 'react';
import { render, screen, waitFor, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from '@/store/store';
import ProductList from '../components/ProductList';
import { useGetProductsQuery } from '../hooks/useGetProductsQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Test Component - ProductList', () => {
  it('test async product list', async () => {
    render(
      // <Provider store={createStore()}>
        <QueryClientProvider client={queryClient}>
          <ProductList />
        </QueryClientProvider>
      // </Provider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // const productElements = await waitFor(() => screen.getAllByRole('product'))
    const productElements = await screen.findAllByRole('product');
    expect(productElements[0]).toBeInTheDocument();
  });

  it('test useGetProductsQuery', async () => {
    const { result } = renderHook(() => useGetProductsQuery(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toBeTruthy());
  });
});
