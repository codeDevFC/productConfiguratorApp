

// src/utils/validators.js

/**
 * Validates that a value is not empty
 * @param {*} value - The value to check
 * @returns {boolean} - True if the value is not empty
 */
export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

/**
 * Validates that a number is within a specified range
 * @param {number} value - The number to validate
 * @param {number} min - The minimum allowed value
 * @param {number} max - The maximum allowed value
 * @returns {boolean} - True if the value is within range
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validates a product configuration is complete
 * @param {Object} configuration - The product configuration object
 * @returns {Object} - Validation result with isValid and errors properties
 */
export const validateConfiguration = (configuration) => {
  const errors = {};
  
  // Check product ID
  if (!configuration.productId) {
    errors.product = 'Please select a product';
  }
  
  // Check color
  if (!configuration.color) {
    errors.color = 'Please select a color';
  }
  
  // Check material
  if (!configuration.material) {
    errors.material = 'Please select a material';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates an email address format
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email format is valid
 */
export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(($$[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$$)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates a phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if the phone format is valid
 */
export const isValidPhone = (phone) => {
  const re = /^\+?[0-9]{10,15}$/;
  return re.test(String(phone).replace(/\s+/g, ''));
};

/**
 * Validates a URL format
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL format is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validates customer information for checkout
 * @param {Object} customer - Customer information object
 * @returns {Object} - Validation result with isValid and errors properties
 */
export const validateCustomerInfo = (customer) => {
  const errors = {};
  
  if (!isNotEmpty(customer.firstName)) {
    errors.firstName = 'First name is required';
  }
  
  if (!isNotEmpty(customer.lastName)) {
    errors.lastName = 'Last name is required';
  }
  
  if (!isNotEmpty(customer.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(customer.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (customer.phone && !isValidPhone(customer.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates a configuration feature is compatible with selected product
 * @param {Object} product - The selected product
 * @param {Object} feature - The feature to check compatibility
 * @returns {boolean} - True if the feature is compatible
 */
export const isFeatureCompatible = (product, feature) => {
  if (!product || !feature) return false;
  
  // Check if this feature exists in the product's available features
  return product.options.features.some(f => f.id === feature.id);
};

/**
 * Validates a URL query parameter
 * @param {string} param - The parameter to validate
 * @returns {boolean} - True if the parameter is valid
 */
export const isValidQueryParam = (param) => {
  // Prevent XSS by validating the parameter doesn't contain suspicious characters
  const suspiciousChars = /[<>{}()\/\\]/;
  return typeof param === 'string' && !suspiciousChars.test(param);
};
