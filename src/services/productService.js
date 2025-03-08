// src/services/productService.js

/**
 * ProductService
 * 
 * A service for managing product data, fetching product information,
 * and handling product-related operations in the product configurator.
 */

// Import sample product data (in a real app, this would come from an API)
import { products as sampleProducts } from '@/data/products';

/**
 * Fetch all available products
 * 
 * @param {Object} options - Optional filtering parameters
 * @returns {Promise<Array>} - Promise resolving to array of products
 */
export const getProducts = async (options = {}) => {
  // In a real application, this would make an API call
  // For this demo, we'll use the sample data and simulate a network delay
  
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProducts = [...sampleProducts];
      
      // Apply category filter if provided
      if (options.category) {
        filteredProducts = filteredProducts.filter(
          product => product.category === options.category
        );
      }
      
      // Apply price range filter if provided
      if (options.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          product => product.basePrice >= options.minPrice
        );
      }
      
      if (options.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          product => product.basePrice <= options.maxPrice
        );
      }
      
      // Apply search term filter if provided
      if (options.searchTerm) {
        const term = options.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(term) || 
            product.description.toLowerCase().includes(term)
        );
      }
      
      // Apply sorting if provided
      if (options.sortBy) {
        filteredProducts.sort((a, b) => {
          switch (options.sortBy) {
            case 'price-asc':
              return a.basePrice - b.basePrice;
            case 'price-desc':
              return b.basePrice - a.basePrice;
            case 'name-asc':
              return a.name.localeCompare(b.name);
            case 'name-desc':
              return b.name.localeCompare(a.name);
            default:
              return 0;
          }
        });
      }
      
      resolve(filteredProducts);
    }, 300); // Simulate network delay
  });
};

/**
 * Get a single product by ID
 * 
 * @param {string} productId - The ID of the product to retrieve
 * @returns {Promise<Object>} - Promise resolving to the product object
 */
export const getProductById = async (productId) => {
  // In a real application, this would make an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = sampleProducts.find(p => p.id === productId);
      
      if (product) {
        resolve(product);
      } else {
        reject(new Error(`Product with ID ${productId} not found`));
      }
    }, 200);
  });
};

/**
 * Get available product categories
 * 
 * @returns {Promise<Array>} - Promise resolving to array of category objects
 */
export const getProductCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Extract unique categories from products
      const categories = [...new Set(sampleProducts.map(p => p.category))];
      
      // Format as objects with id and name
      const categoryObjects = categories.map(category => ({
        id: category,
        name: formatCategoryName(category)
      }));
      
      resolve(categoryObjects);
    }, 200);
  });
};

/**
 * Format a category ID into a display name
 * 
 * @param {string} categoryId - The category ID to format
 * @returns {string} - Formatted category name
 */
const formatCategoryName = (categoryId) => {
  // Convert from camelCase or snake_case to Title Case with spaces
  return categoryId
    // Insert space before capital letters
    .replace(/([A-Z])/g, ' $1')
    // Replace underscores with spaces
    .replace(/_/g, ' ')
    // Capitalize first letter and trim
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

/**
 * Get available options for a specific product and option type
 * 
 * @param {string} productId - The product ID
 * @param {string} optionType - The type of option (color, material, feature)
 * @returns {Promise<Array>} - Promise resolving to array of options
 */
export const getProductOptions = async (productId, optionType) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const product = await getProductById(productId);
        
        if (product.options && product.options[optionType]) {
          resolve(product.options[optionType]);
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    }, 200);
  });
};

/**
 * Check if a product is in stock
 * 
 * @param {string} productId - The product ID
 * @param {Object} configuration - The product configuration
 * @returns {Promise<Object>} - Promise resolving to stock information
 */
export const checkProductStock = async (productId, configuration = {}) => {
  // In a real application, this would check against inventory API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate some stock logic
      const inStock = Math.random() > 0.2; // 80% chance it's in stock
      const estimatedDelivery = inStock 
        ? `${3 + Math.floor(Math.random() * 5)} business days`
        : `${2 + Math.floor(Math.random() * 4)} weeks`;
      
      resolve({
        inStock,
        quantity: inStock ? 5 + Math.floor(Math.random() * 20) : 0,
        estimatedDelivery,
        backorderAvailable: !inStock && Math.random() > 0.3
      });
    }, 300);
  });
};

/**
 * Get related products for a given product
 * 
 * @param {string} productId - The product ID
 * @param {number} limit - Maximum number of related products to return
 * @returns {Promise<Array>} - Promise resolving to array of related products
 */
export const getRelatedProducts = async (productId, limit = 4) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const currentProduct = await getProductById(productId);
        
        // Find products in the same category
        const relatedProducts = sampleProducts
          .filter(p => p.id !== productId && p.category === currentProduct.category)
          .slice(0, limit);
        
        // If we don't have enough related products, add some others
        if (relatedProducts.length < limit) {
          const otherProducts = sampleProducts
            .filter(p => p.id !== productId && p.category !== currentProduct.category)
            .slice(0, limit - relatedProducts.length);
            
          relatedProducts.push(...otherProducts);
        }
        
        resolve(relatedProducts);
      } catch (error) {
        // If there's an error, just return some random products
        const randomProducts = sampleProducts
          .filter(p => p.id !== productId)
          .sort(() => 0.5 - Math.random())
          .slice(0, limit);
          
        resolve(randomProducts);
      }
    }, 300);
  });
};

/**
 * Get product reviews
 * 
 * @param {string} productId - The product ID
 * @param {Object} options - Pagination and filtering options
 * @returns {Promise<Object>} - Promise resolving to reviews object
 */
export const getProductReviews = async (productId, options = {}) => {
  const { page = 1, limit = 5, sortBy = 'newest' } = options;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would fetch from an API
      // For demo purposes, generate some fake reviews
      const totalReviews = 10 + Math.floor(Math.random() * 20);
      const averageRating = 3.5 + Math.random() * 1.5;
      
      const reviews = Array.from({ length: Math.min(limit, totalReviews) }, (_, i) => {
        const reviewIndex = (page - 1) * limit + i;
        const date = new Date();
        date.setDate(date.getDate() - reviewIndex * 3 - Math.floor(Math.random() * 10));
        
        return {
          id: `review-${productId}-${reviewIndex}`,
          author: `Customer ${reviewIndex + 1}`,
          rating: 3 + Math.floor(Math.random() * 3),
          title: `Review ${reviewIndex + 1}`,
          comment: `This is a sample review for the product. It's quite ${
            Math.random() > 0.5 ? 'good' : 'great'
          } and I ${
            Math.random() > 0.3 ? 'would' : 'might'
          } recommend it to others.`,
          date: date.toISOString(),
          verified: Math.random() > 0.3
        };
      });
      
      // Sort reviews based on sortBy parameter
      if (sortBy === 'highest') {
        reviews.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'lowest') {
        reviews.sort((a, b) => a.rating - b.rating);
      } else if (sortBy === 'oldest') {
        reviews.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        // Default: newest
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      
      resolve({
        reviews,
        pagination: {
          total: totalReviews,
          page,
          limit,
          pages: Math.ceil(totalReviews / limit)
        },
        summary: {
          averageRating,
          totalReviews,
          ratingDistribution: {
            5: Math.floor(totalReviews * 0.5),
            4: Math.floor(totalReviews * 0.3),
            3: Math.floor(totalReviews * 0.1),
            2: Math.floor(totalReviews * 0.05),
            1: Math.floor(totalReviews * 0.05)
          }
        }
      });
    }, 400);
  });
};

/**
 * Save a user's product configuration
 * 
 * @param {Object} configuration - The product configuration to save
 * @param {string} userId - Optional user ID for authenticated users
 * @returns {Promise<Object>} - Promise resolving to saved configuration
 */
export const saveConfiguration = async (configuration, userId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a unique ID for this configuration
      const configId = `config-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // In a real app, this would save to a database
      // For demo purposes, we'll save to localStorage
      const savedConfig = {
        id: configId,
        userId,
        configuration,
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      const savedConfigs = JSON.parse(localStorage.getItem('savedConfigurations') || '[]');
      savedConfigs.push(savedConfig);
      localStorage.setItem('savedConfigurations', JSON.stringify(savedConfigs));
      
      resolve(savedConfig);
    }, 300);
  });
};

/**
 * Get a user's saved configurations
 * 
 * @param {string} userId - Optional user ID for authenticated users
 * @returns {Promise<Array>} - Promise resolving to array of saved configurations
 */
export const getSavedConfigurations = async (userId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would fetch from a database
      // For demo purposes, we'll retrieve from localStorage
      const savedConfigs = JSON.parse(localStorage.getItem('savedConfigurations') || '[]');
      
      // Filter by userId if provided
      const userConfigs = userId 
        ? savedConfigs.filter(config => config.userId === userId)
        : savedConfigs;
      
      resolve(userConfigs);
    }, 200);
  });
};

export default {
  getProducts,
  getProductById,
  getProductCategories,
  getProductOptions,
  checkProductStock,
  getRelatedProducts,
  getProductReviews,
  saveConfiguration,
  getSavedConfigurations
};
