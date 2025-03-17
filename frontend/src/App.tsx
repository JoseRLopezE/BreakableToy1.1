import { useState, useEffect } from 'react';
import { ArrowUpDown, Edit, Trash } from 'lucide-react';
import { Product, SortConfig, Availability, Metrics as MetricsType } from './types';
import { SearchBar } from './components/SearchBar';
import { ProductModal } from './components/ProductModal';
import { Metrics } from './components/Metrics';
import { getExpirationColor, getStockColor } from './utils/dateUtils';

const ITEMS_PER_PAGE = 10;
const MOCK_CATEGORIES = ['Electronics', 'Food', 'Clothing', 'Books', 'Tools'];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    expirationDate: '2025-12-31',
    stock: 15,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'LG 3',
    category: 'Electronics',
    price: 200.99,
    expirationDate: '',
    stock: 15,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: '3',
    name: 'Watermelon',
    category: 'Food',
    price: 1.2,
    expirationDate: '2025-3-20',
    stock: 50,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: '4',
    name: 'Milk',
    category: 'Food',
    price: 1.5,
    expirationDate: '2025-12-31',
    stock: 15,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availability, setAvailability] = useState<Availability>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<MetricsType>({
    overall: { totalProducts: 0, totalValue: 0, averagePrice: 0 }
  });

  useEffect(() => {
    calculateMetrics();
  }, [products]);

  const calculateMetrics = () => {
    const newMetrics: MetricsType = { overall: { totalProducts: 0, totalValue: 0, averagePrice: 0 } };
    
    MOCK_CATEGORIES.forEach(category => {
      const categoryProducts = products.filter(p => p.category === category);
      const totalProducts = categoryProducts.reduce((sum, p) => sum + p.stock, 0);
      const totalValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
      
      newMetrics[category] = {
        totalProducts,
        totalValue,
        averagePrice: totalProducts > 0 ? totalValue / totalProducts : 0
      };
      
      newMetrics.overall.totalProducts += totalProducts;
      newMetrics.overall.totalValue += totalValue;
    });
    
    newMetrics.overall.averagePrice = newMetrics.overall.totalProducts > 0
      ? newMetrics.overall.totalValue / newMetrics.overall.totalProducts
      : 0;
    
    setMetrics(newMetrics);
  };

  const handleSort = (key: keyof Product) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedProducts((prev) => prev.filter((productId) => productId !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (productData: Partial<Product>) => {
    const now = new Date();
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { 
          ...p, 
          ...productData, 
          updatedAt: now 
        } : p))
      );
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        isAvailable: true,
        createdAt: now,
        updatedAt: now,
      } as Product;
      setProducts((prev) => [...prev, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) => 
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedProducts(checked ? filteredProducts.map(p => p.id) : []);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => 
      selectedCategories.length === 0 || selectedCategories.includes(product.category)
    )
    .filter((product) => {
      if (availability === 'in_stock') return product.stock > 0;
      if (availability === 'out_of_stock') return product.stock === 0;
      return true;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      if (aValue === undefined || bValue === undefined) {
        return 0;
      }
      return aValue < bValue ? -direction : direction;
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Inventory Manager</h1>
        
        <SearchBar
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          availability={availability}
          onSearchChange={setSearchTerm}
          onCategoriesChange={setSelectedCategories}
          onAvailabilityChange={setAvailability}
          onSearch={() => {}}
          categories={MOCK_CATEGORIES}
        />

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <button
              onClick={() => {
                setEditingProduct(undefined);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              New Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-2 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      Name
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left">
                    <button
                      onClick={() => handleSort('category')}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      Category
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left">
                    <button
                      onClick={() => handleSort('price')}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      Price
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left">
                    <button
                      onClick={() => handleSort('expirationDate')}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      Expiration Date
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-left">
                    <button
                      onClick={() => handleSort('stock')}
                      className="flex items-center gap-1 hover:text-blue-600"
                    >
                      Stock
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr 
                    key={product.id} 
                    className={`border-b hover:bg-gray-50 ${getExpirationColor(product.expirationDate)}`}
                  >
                    <td className="px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className={`px-4 py-2 ${product.stock === 0 ? 'line-through' : ''}`}>
                      {product.name}
                    </td>
                    <td className={`px-4 py-2 ${product.stock === 0 ? 'line-through' : ''}`}>
                      {product.category}
                    </td>
                    <td className={`px-4 py-2 ${product.stock === 0 ? 'line-through' : ''}`}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td className={`px-4 py-2 ${product.stock === 0 ? 'line-through' : ''}`}>
                      {product.expirationDate || 'N/A'}
                    </td>
                    <td className={`px-4 py-2 ${getStockColor(product.stock)}`}>
                      {product.stock}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>

        <Metrics metrics={metrics} />

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(undefined);
          }}
          onSave={handleSave}
          product={editingProduct}
          categories={MOCK_CATEGORIES}
        />
      </div>
    </div>
  );
}

export default App;
