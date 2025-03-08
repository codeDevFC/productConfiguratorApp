

// src/utils/helpers.js

/**
 * Formats a price with currency symbol and proper decimal places
 * @param {number} price - The price to format
 * @param {string} currencyCode - Currency code (default: USD)
 * @param {string} locale - Locale for formatting (default: en-US)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currencyCode = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Debounces a function to limit how often it can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait between calls
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clones an object or array
 * @param {Object|Array} obj - The object to clone
 * @returns {Object|Array} - A deep clone of the object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generates a unique ID for tracking configurations
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} - Unique ID
 */
export const generateUniqueId = (prefix = 'config') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Extracts and parses URL query parameters
 * @param {string} url - URL to parse (defaults to current URL)
 * @returns {Object} - Object containing the parsed parameters
 */
export const parseQueryParams = (url = window.location.href) => {
  const params = {};
  const urlObj = new URL(url);
  
  for (const [key, value] of urlObj.searchParams.entries()) {
    // Handle comma-separated values as arrays
    if (value.includes(',')) {
      params[key] = value.split(',');
    } else {
      params[key] = value;
    }
  }
  
  return params;
};

/**
 * Creates a shareable URL for a configuration
 * @param {Object} configuration - The product configuration
 * @param {string} baseUrl - Base URL for the configurator
 * @returns {string} - Shareable URL with configuration parameters
 */
export const createShareableUrl = (configuration, baseUrl = window.location.origin) => {
  const params = new URLSearchParams();
  
  if (configuration.id) params.append('id', configuration.id);
  if (configuration.productId) params.append('product', configuration.productId);
  if (configuration.color?.id) params.append('color', configuration.color.id);
  if (configuration.material?.id) params.append('material', configuration.material.id);
  
  if (configuration.features && configuration.features.length > 0) {
    params.append('features', configuration.features.map(f => f.id).join(','));
  }
  
  return `${baseUrl}/configurator?${params.toString()}`;
};

/**
 * Saves configuration to browser's localStorage
 * @param {Object} configuration - The configuration to save
 * @param {string} key - Storage key (default: 'savedConfiguration')
 * @returns {boolean} - True if saved successfully
 */
export const saveToLocalStorage = (configuration, key = 'savedConfiguration') => {
  try {
    localStorage.setItem(key, JSON.stringify(configuration));
    return true;
  } catch (error) {
    console.error('Failed to save configuration to localStorage:', error);
    return false;
  }
};

/**
 * Loads configuration from browser's localStorage
 * @param {string} key - Storage key (default: 'savedConfiguration')
 * @returns {Object|null} - The loaded configuration or null if not found
 */
export const loadFromLocalStorage = (key = 'savedConfiguration') => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load configuration from localStorage:', error);
    return null;
  }
};

/**
 * Gets all saved configurations from localStorage
 * @param {string} prefix - Prefix for configuration keys
 * @returns {Array} - Array of saved configurations
 */
export const getSavedConfigurations = (prefix = 'savedConfiguration') => {
  const configs = [];
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(prefix)) {
        const config = JSON.parse(localStorage.getItem(key));
        configs.push({
          key,
          config,
          savedAt: key.includes('_') ? new Date(key.split('_')[1]) : new Date()
        });
      }
    }
  } catch (error) {
    console.error('Error retrieving saved configurations:', error);
  }
  
  // Sort by date (newest first)
  return configs.sort((a, b) => b.savedAt - a.savedAt);
};

/**
 * Calculates total price based on product and selected options
 * @param {Object} product - Base product
 * @param {Object} configuration - Selected configuration options
 * @returns {number} - Total price
 */
export const calculateTotalPrice = (product, configuration) => {
  if (!product) return 0;
  
  let total = product.basePrice;
  
  // Add color price
  if (configuration.color && configuration.color.price) {
    total += configuration.color.price;
  }
  
  // Add material price
  if (configuration.material && configuration.material.price) {
    total += configuration.material.price;
  }
  
  // Add features price
  if (configuration.features && configuration.features.length > 0) {
    configuration.features.forEach(feature => {
      if (feature.price) total += feature.price;
    });
  }
  
  return total;
};

/**
 * Scrolls to an element smoothly
 * @param {string} elementId - ID of the element to scroll to
 * @param {number} offset - Offset from the top (default: 0)
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - True if copied successfully
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

/**
 * Detects the user's device type
 * @returns {string} - 'mobile', 'tablet', or 'desktop'
 */
export const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Finds an option in product options by ID
 * @param {Object} product - The product object
 * @param {string} optionType - Type of option (color, material, feature)
 * @param {string} optionId - ID of the option to find
 * @returns {Object|null} - Found option or null
 */
export const findProductOption = (product, optionType, optionId) => {
  if (!product || !product.options || !product.options[optionType]) {
    return null;
  }
  
  return product.options[optionType].find(option => option.id === optionId) || null;
};
