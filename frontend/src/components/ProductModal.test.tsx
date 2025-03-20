import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductModal } from './ProductModal';
import '@testing-library/jest-dom';

describe('ProductModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const categories = ['Electronics', 'Food', 'Clothing'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <ProductModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        categories={categories}
      />
    );

    expect(screen.getByText('New Product')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiration Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Stock')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ProductModal
        isOpen={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
        categories={categories}
      />
    );

    expect(screen.queryByText('New Product')).not.toBeInTheDocument();
  });

  it('calls onClose when the cancel button is clicked', () => {
    render(
      <ProductModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        categories={categories}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSave with the correct data when the form is submitted', () => {
    render(
      <ProductModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        categories={categories}
      />
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Laptop' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Electronics' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '999.99' } });
    fireEvent.change(screen.getByLabelText('Expiration Date'), { target: { value: '2025-12-31' } });
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '10' } });

    fireEvent.click(screen.getByText('Save'));

    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'Laptop',
      category: 'Electronics',
      price: 999.99,
      expirationDate: '2025-12-31',
      stock: 10,
      isAvailable: true,
    });
  });
});
