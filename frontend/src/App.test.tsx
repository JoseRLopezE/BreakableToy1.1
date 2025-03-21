
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { getProducts, createProduct, updateProduct, deleteProduct } from './services/api';

jest.mock('./services/api');

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getProducts as jest.Mock).mockResolvedValue([
      {
        id: '1',
        name: 'Laptop',
        category: 'Electronics',
        price: 999.99,
        expirationDate: '2025-12-31',
        stock: 10,
        isAvailable: true,
      },
    ]);
  });

  it('renders the inventory manager', async () => {
    render(<App />);

    expect(screen.getByText('Inventory Manager')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Laptop')).toBeInTheDocument());
  });

  it('opens the modal when the "New Product" button is clicked', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('New Product'));
    expect(screen.getByText('New Product')).toBeInTheDocument();
  });

  it('deletes a product when the delete button is clicked', async () => {
    (deleteProduct as jest.Mock).mockResolvedValue({});
    render(<App />);

    await waitFor(() => expect(screen.getByText('Laptop')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    await waitFor(() => expect(screen.queryByText('Laptop')).not.toBeInTheDocument());
    expect(deleteProduct).toHaveBeenCalledWith('1');
  });

  it('creates a new product', async () => {
    (createProduct as jest.Mock).mockResolvedValue({
      id: '2',
      name: 'Phone',
      category: 'Electronics',
      price: 699.99,
      expirationDate: '2026-01-01',
      stock: 20,
      isAvailable: true,
    });

    render(<App />);

    fireEvent.click(screen.getByText('New Product'));
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Phone' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Electronics' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '699.99' } });
    fireEvent.change(screen.getByLabelText('Expiration Date'), { target: { value: '2026-01-01' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '20' } });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => expect(screen.getByText('Phone')).toBeInTheDocument());
    expect(createProduct).toHaveBeenCalled();
  });
});
