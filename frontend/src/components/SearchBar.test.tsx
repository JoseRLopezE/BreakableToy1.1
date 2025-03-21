import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { Availability } from '../types';

describe('SearchBar Component', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnCategoriesChange = jest.fn();
  const mockOnAvailabilityChange = jest.fn();
  const mockOnSearch = jest.fn();

  const categories = ['Electronics', 'Clothing', 'Books'];

  const defaultProps = {
    searchTerm: '',
    selectedCategories: [],
    availability: 'all' as Availability,
    onSearchChange: mockOnSearchChange,
    onCategoriesChange: mockOnCategoriesChange,
    onAvailabilityChange: mockOnAvailabilityChange,
    onSearch: mockOnSearch,
    categories,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SearchBar component correctly', () => {
    render(<SearchBar {...defaultProps} />);

    // Check if all elements are rendered
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('calls onSearchChange when typing in the search input', () => {
    render(<SearchBar {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'Test Product' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('Test Product');
  });

  it('calls onCategoriesChange when selecting categories', () => {
    render(<SearchBar {...defaultProps} />);

    const categoryDropdown = screen.getByText('Select categories');
    fireEvent.keyDown(categoryDropdown, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText('Electronics'));

    expect(mockOnCategoriesChange).toHaveBeenCalledWith(['Electronics']);
  });

  it('calls onAvailabilityChange when changing availability', () => {
    render(<SearchBar {...defaultProps} />);

    const availabilityDropdown = screen.getByLabelText('Availability');
    fireEvent.change(availabilityDropdown, { target: { value: 'in_stock' } });

    expect(mockOnAvailabilityChange).toHaveBeenCalledWith('in_stock');
  });

  it('calls onSearch when clicking the search button', () => {
    render(<SearchBar {...defaultProps} />);

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });
});