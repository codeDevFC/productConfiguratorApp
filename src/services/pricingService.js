
// src/services/pricingService.js

/**
 * PricingService
 * 
 * A service for calculating prices and handling pricing-related operations
 * in the product configurator.
 */

// Tax rates by country/region
const TAX_RATES = {
  'US': 0.0725, // 7.25% - average US sales tax
  'UK': 0.20,   // 20% VAT
  'EU': 0.21,   // 21% VAT (average)
  'CA': 0.13,   // 13% HST/GST (average)
  'AU': 0.10,   // 10% GST
  'DEFAULT': 0.0 // No tax by default
};

// Discount tiers based on total price
const DISCOUNT_TIERS = [
  { threshold: 1000, discount: 0.05 }, // 5% off for orders over $1000
  { threshold: 2000, discount: 0.10 }, // 10% off for orders over $2000
  { threshold: 5000, discount: 0.15 }  // 15% off for orders over $5000
];

// Shipping rates by region and shipping method
const SHIPPING_RATES = {
  'US': {
    'standard': 15,
    'express': 35,
    'overnight': 75
  },
  'UK': {
    'standard': 10,
    'express': 25,
    'overnight': 50
  },
  'EU': {
    'standard': 12,
    'express': 30,
    'overnight': 60
  },
  'INTERNATIONAL': {
    'standard': 40,
    'express': 75,
    'overnight': 150
  }
};

/**
 * Calculate the base price of a product configuration
 * 
 * @param {Object} product - The base product
 * @param {Object} configuration - The selected configuration options
 * @returns {number} - The calculated base price
 */
export const calculateBasePrice = (product, configuration) => {
  if (!product) return 0;
  
  let total = product.basePrice;
  
  // Add color price if selected
  if (configuration.color && configuration.color.price) {
    total += configuration.color.price;
  }
  
  // Add material price if selected
  if (configuration.material && configuration.material.price) {
    total += configuration.material.price;
  }
  
  // Add features prices
  if (configuration.features && configuration.features.length > 0) {
    configuration.features.forEach(feature => {
      if (feature.price) {
        total += feature.price;
      }
    });
  }
  
  return total;
};

/**
 * Calculate volume discount based on price
 * 
 * @param {number} price - The price before discount
 * @returns {Object} - Discount information {rate, amount}
 */
export const calculateVolumeDiscount = (price) => {
  // Sort tiers in descending order by threshold
  const sortedTiers = [...DISCOUNT_TIERS].sort((a, b) => b.threshold - a.threshold);
  
  // Find the highest applicable discount tier
  const applicableTier = sortedTiers.find(tier => price >= tier.threshold);
  
  if (applicableTier) {
    return {
      rate: applicableTier.discount,
      amount: price * applicableTier.discount,
      threshold: applicableTier.threshold
    };
  }
  
  return {
    rate: 0,
    amount: 0,
    threshold: 0
  };
};

/**
 * Calculate tax amount based on price and region
 * 
 * @param {number} price - The price to calculate tax on
 * @param {string} region - The tax region/country code
 * @returns {Object} - Tax information {rate, amount}
 */
export const calculateTax = (price, region = 'DEFAULT') => {
  const taxRate = TAX_RATES[region] || TAX_RATES.DEFAULT;
  
  return {
    rate: taxRate,
    amount: price * taxRate
  };
};

/**
 * Calculate shipping cost
 * 
 * @param {Object} product - The product being shipped
 * @param {string} region - The shipping region/country code
 * @param {string} method - The shipping method (standard, express, overnight)
 * @returns {number} - The shipping cost
 */
export const calculateShipping = (product, region = 'US', method = 'standard') => {
  // Get regional shipping rates or fall back to international
  const regionRates = SHIPPING_RATES[region] || SHIPPING_RATES.INTERNATIONAL;
  
  // Get rate for selected method or fall back to standard
  const shippingCost = regionRates[method] || regionRates.standard;
  
  // Apply product-specific adjustments if needed
  if (product && product.shippingAdjustment) {
    return shippingCost + product.shippingAdjustment;
  }
  
  return shippingCost;
};

/**
 * Format price with currency symbol
 * 
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
 * Calculate the total price including all components
 * 
 * @param {Object} product - The base product
 * @param {Object} configuration - The selected configuration
 * @param {Object} options - Additional options (region, shipping method, etc.)
 * @returns {Object} - Complete price breakdown
 */
export const calculateTotalPrice = (product, configuration, options = {}) => {
  const {
    region = 'DEFAULT',
    shippingMethod = 'standard',
    applyDiscount = true,
    applyTax = true,
    applyShipping = true
  } = options;
  
  // Calculate base configuration price
  const basePrice = calculateBasePrice(product, configuration);
  
  // Calculate volume discount if applicable
  const discount = applyDiscount ? calculateVolumeDiscount(basePrice) : { rate: 0, amount: 0 };
  
  // Calculate subtotal after discount
  const subtotal = basePrice - discount.amount;
  
  // Calculate tax if applicable
  const tax = applyTax ? calculateTax(subtotal, region) : { rate: 0, amount: 0 };
  
  // Calculate shipping if applicable
  const shipping = applyShipping ? calculateShipping(product, region, shippingMethod) : 0;
  
  // Calculate final total
  const total = subtotal + tax.amount + shipping;
  
  // Return complete price breakdown
  return {
    basePrice,
    discount,
    subtotal,
    tax,
    shipping,
    total
  };
};

/**
 * Get available payment methods
 * 
 * @param {string} region - The region/country code
 * @returns {Array} - Available payment methods
 */
export const getPaymentMethods = (region = 'US') => {
  // Common payment methods available globally
  const commonMethods = [
    { id: 'credit_card', name: 'Credit Card', icon: 'fa-credit-card' },
    { id: 'paypal', name: 'PayPal', icon: 'fa-paypal' }
  ];
  
  // Region-specific payment methods
  const regionMethods = {
    'US': [
      { id: 'apple_pay', name: 'Apple Pay', icon: 'fa-apple-pay' },
      { id: 'google_pay', name: 'Google Pay', icon: 'fa-google-pay' },
      { id: 'venmo', name: 'Venmo', icon: 'fa-v' }
    ],
    'UK': [
      { id: 'apple_pay', name: 'Apple Pay', icon: 'fa-apple-pay' },
      { id: 'google_pay', name: 'Google Pay', icon: 'fa-google-pay' },
      { id: 'klarna', name: 'Klarna', icon: 'fa-k' }
    ],
    'EU': [
      { id: 'sofort', name: 'Sofort', icon: 'fa-euro-sign' },
      { id: 'klarna', name: 'Klarna', icon: 'fa-k' },
      { id: 'sepa', name: 'SEPA Direct Debit', icon: 'fa-university' }
    ]
  };
  
  return [...commonMethods, ...(regionMethods[region] || [])];
};

/**
 * Get available shipping methods for a region
 * 
 * @param {string} region - The region/country code
 * @returns {Array} - Available shipping methods with prices
 */
export const getShippingMethods = (region = 'US') => {
  const rates = SHIPPING_RATES[region] || SHIPPING_RATES.INTERNATIONAL;
  
  return [
    { id: 'standard', name: 'Standard Shipping (3-5 business days)', price: rates.standard },
    { id: 'express', name: 'Express Shipping (2-3 business days)', price: rates.express },
    { id: 'overnight', name: 'Overnight Shipping (1 business day)', price: rates.overnight }
  ];
};

/**
 * Apply a promotional code to a price
 * 
 * @param {string} promoCode - The promotional code
 * @param {number} price - The current price
 * @returns {Object} - Promotion result {valid, message, discountAmount, finalPrice}
 */
export const applyPromoCode = (promoCode, price) => {
  // This would typically check against a database or API
  // For this example, we'll use some hardcoded promo codes
  const promoCodes = {
    'WELCOME10': { type: 'percentage', value: 0.10, minPurchase: 0 },
    'SAVE20': { type: 'percentage', value: 0.20, minPurchase: 500 },
    'FREESHIP': { type: 'shipping', value: 'free', minPurchase: 200 },
    'FLAT50OFF': { type: 'fixed', value: 50, minPurchase: 300 }
  };
  
  // Check if promo code exists
  const promo = promoCodes[promoCode.toUpperCase()];
  
  if (!promo) {
    return {
      valid: false,
      message: 'Invalid promotional code.',
      discountAmount: 0,
      finalPrice: price
    };
  }
  
  // Check minimum purchase requirement
  if (price < promo.minPurchase) {
    return {
      valid: false,
      message: `This code requires a minimum purchase of ${formatPrice(promo.minPurchase)}.`,
      discountAmount: 0,
      finalPrice: price
    };
  }
  
  // Calculate discount based on type
  let discountAmount = 0;
  let message = '';
  
  switch (promo.type) {
    case 'percentage':
      discountAmount = price * promo.value;
      message = `${promo.value * 100}% discount applied!`;
      break;
    case 'fixed':
      discountAmount = promo.value;
      message = `${formatPrice(promo.value)} discount applied!`;
      break;
    case 'shipping':
      // This would be handled differently in a real implementation
      message = 'Free shipping applied!';
      break;
    default:
      discountAmount = 0;
  }
  
  return {
    valid: true,
    message,
    discountAmount,
    finalPrice: price - discountAmount
  };
};

export default {
  calculateBasePrice,
  calculateVolumeDiscount,
  calculateTax,
  calculateShipping,
  calculateTotalPrice,
  formatPrice,
  getPaymentMethods,
  getShippingMethods,
  applyPromoCode
};
