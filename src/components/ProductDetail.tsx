import React, { useState } from 'react';
import { Edit3, Save, X, Plus, Trash2, Camera, DollarSign, Package } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  image: string;
}

interface ProductDetailProps {
  onToastShow?: (message: string, type: 'success' | 'error' | 'warning') => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onToastShow }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Tomatoes',
      description: 'Fresh, vine-ripened organic tomatoes grown without pesticides. Perfect for salads, cooking, and sauces.',
      price: 149.99,
      quantity: 50,
      unit: 'lb',
      category: 'Vegetables',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Fresh Lettuce',
      description: 'Crisp and fresh organic lettuce, harvested daily. Great for salads and sandwiches.',
      price: 89.99,
      quantity: 30,
      unit: 'head',
      category: 'Vegetables',
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Farm Fresh Eggs',
      description: 'Free-range chicken eggs from happy, healthy hens. Rich in nutrients and flavor.',
      price: 209.99,
      quantity: 25,
      unit: 'dozen',
      category: 'Dairy & Eggs',
      image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [originalProduct, setOriginalProduct] = useState<Product | null>(null);
  
  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const categories = ['Vegetables', 'Fruits', 'Dairy & Eggs', 'Herbs', 'Grains', 'Other'];
  const units = ['lb', 'kg', 'piece', 'bunch', 'dozen', 'bag'];

  const handleEditProduct = (product: Product) => {
    setOriginalProduct({ ...product });
    setEditingProduct({ ...product });
    setIsEditing(true);
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      try {
        // Simulate API call delay
        setTimeout(() => {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
          setEditingProduct(null);
          setOriginalProduct(null);
          setIsEditing(false);
          
          if (onToastShow) {
            onToastShow('Product details saved successfully! 🥕', 'success');
          }
        }, 500);
      } catch (error) {
        if (onToastShow) {
          onToastShow('Failed to save product. Please try again.', 'error');
        }
      }
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      try {
        setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
        
        if (onToastShow) {
          onToastShow(`"${productToDelete.name}" has been removed successfully`, 'warning');
        }
      } catch (error) {
        if (onToastShow) {
          onToastShow('Failed to delete product. Please try again.', 'error');
        }
      }
    }
    
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleAddProduct = () => {
    try {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: 'New Product',
        description: 'Product description',
        price: 0,
        quantity: 0,
        unit: 'lb',
        category: 'Vegetables',
        image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'
      };
      
      setProducts(prev => [...prev, newProduct]);
      setOriginalProduct(null);
      setEditingProduct(newProduct);
      setIsEditing(true);
      setShowAddForm(false);
      
      if (onToastShow) {
        onToastShow('New product created! Please fill in the details. ✨', 'success');
      }
    } catch (error) {
      if (onToastShow) {
        onToastShow('Failed to create new product. Please try again.', 'error');
      }
    }
  };

  const handleCancel = () => {
    if (originalProduct && editingProduct) {
      // If we were editing an existing product, restore original data
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? originalProduct : p));
    } else if (editingProduct && !originalProduct) {
      // If we were creating a new product, remove it
      setProducts(prev => prev.filter(p => p.id !== editingProduct.id));
    }
    
    setEditingProduct(null);
    setOriginalProduct(null);
    setIsEditing(false);
    setShowAddForm(false);
    
    if (onToastShow) {
      onToastShow('Changes have been cancelled.', 'warning');
    }
  };

  const updateEditingProduct = (field: keyof Product, value: string | number) => {
    if (editingProduct) {
      setEditingProduct(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">My Products</h2>
            {!isEditing && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Add Product Form */}
          {showAddForm && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-800">Add New Product</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
              <button
                onClick={handleAddProduct}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium transform hover:scale-105"
              >
                Create New Product
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {isEditing && editingProduct?.id === product.id && (
                    <button 
                      onClick={() => onToastShow && onToastShow('Photo upload feature coming soon! 📸', 'warning')}
                      className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                    >
                      <Camera size={16} />
                    </button>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-4">
                  {isEditing && editingProduct?.id === product.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => updateEditingProduct('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-semibold transition-all duration-200"
                      />
                      
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) => updateEditingProduct('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none transition-all duration-200"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Price (THB)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={editingProduct.price}
                            onChange={(e) => updateEditingProduct('price', parseFloat(e.target.value) || 0)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                          <input
                            type="number"
                            value={editingProduct.quantity}
                            onChange={(e) => updateEditingProduct('quantity', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
                          <select
                            value={editingProduct.unit}
                            onChange={(e) => updateEditingProduct('unit', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-200"
                          >
                            {units.map(unit => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) => updateEditingProduct('category', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-200"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <button
                          onClick={handleSaveProduct}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-1 transform hover:scale-105"
                        >
                          <Save size={14} />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-1 transform hover:scale-105"
                        >
                          <X size={14} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1 text-green-600 font-semibold">
                          <span className="text-sm">฿</span>
                          <span>{product.price.toFixed(2)}</span>
                          <span className="text-gray-500 text-sm">/ {product.unit}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Package size={16} />
                          <span className="text-sm">{product.quantity} {product.unit}s</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-1 transform hover:scale-105"
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition-all duration-200 text-sm font-medium transform hover:scale-105"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No products yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first product to showcase your farm's offerings.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-200 font-medium transform hover:scale-105"
              >
                Add Your First Product
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirm Product Deletion"
        message={`Are you sure you want to delete "${productToDelete?.name}" from your product list? This action cannot be undone.`}
        confirmText="Delete Product"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        type="danger"
      />
    </>
  );
};

export default ProductDetail;