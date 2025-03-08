
<!-- src/components/configurator/PriceSummary.vue -->
<template>
  <div class="price-summary">
    <div class="summary-header">
      <h3 class="summary-title">{{ title }}</h3>
      <p v-if="subtitle" class="summary-subtitle">{{ subtitle }}</p>
    </div>

    <div class="summary-content">
      <!-- Base product -->
      <div v-if="product" class="summary-item base-price">
        <span class="item-label">{{ product.name }} (Base Price)</span>
        <span class="item-price">{{ formatPrice(product.basePrice) }}</span>
      </div>

      <!-- Color selection -->
      <div v-if="configuration.color" class="summary-item">
        <span class="item-label">
          <span class="option-type">Color:</span> {{ configuration.color.name }}
        </span>
        <span v-if="configuration.color.price > 0" class="item-price add-on">
          +{{ formatPrice(configuration.color.price) }}
        </span>
        <span v-else class="item-price included">Included</span>
      </div>

      <!-- Material selection -->
      <div v-if="configuration.material" class="summary-item">
        <span class="item-label">
          <span class="option-type">Material:</span> {{ configuration.material.name }}
        </span>
        <span v-if="configuration.material.price > 0" class="item-price add-on">
          +{{ formatPrice(configuration.material.price) }}
        </span>
        <span v-else class="item-price included">Included</span>
      </div>

      <!-- Features -->
      <template v-if="configuration.features && configuration.features.length > 0">
        <div class="features-header">
          <span>Additional Features</span>
        </div>
        <div 
          v-for="feature in configuration.features" 
          :key="feature.id" 
          class="summary-item feature-item"
        >
          <span class="item-label">{{ feature.name }}</span>
          <span class="item-price add-on">+{{ formatPrice(feature.price) }}</span>
        </div>
      </template>

      <!-- No features selected message -->
      <div v-else-if="showEmptyFeatures" class="empty-features">
        <span>No additional features selected</span>
      </div>

      <!-- Divider before total -->
      <div class="summary-divider"></div>

      <!-- Subtotal before any discounts -->
      <div v-if="discount > 0" class="summary-item subtotal">
        <span class="item-label">Subtotal</span>
        <span class="item-price">{{ formatPrice(subtotalPrice) }}</span>
      </div>

      <!-- Discount if applicable -->
      <div v-if="discount > 0" class="summary-item discount">
        <span class="item-label">Discount ({{ discountPercentage }}%)</span>
        <span class="item-price discount-amount">-{{ formatPrice(discountAmount) }}</span>
      </div>

      <!-- Total price -->
      <div class="summary-item total">
        <span class="item-label">Total</span>
        <span class="item-price total-price">{{ formatPrice(totalPrice) }}</span>
      </div>

      <!-- Additional fees note -->
      <p v-if="showTaxNote" class="tax-note">
        *Taxes and shipping will be calculated at checkout
      </p>
    </div>

    <!-- Optional action button -->
    <div v-if="showButton" class="summary-actions">
      <button 
        class="action-button" 
        :disabled="!isConfigurationComplete"
        @click="$emit('action-click')"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'PriceSummary',
  props: {
    product: {
      type: Object,
      default: null
    },
    configuration: {
      type: Object,
      default: () => ({
        color: null,
        material: null,
        features: []
      })
    },
    title: {
      type: String,
      default: 'Price Summary'
    },
    subtitle: {
      type: String,
      default: ''
    },
    discount: {
      type: Number,
      default: 0 // Percentage discount
    },
    showEmptyFeatures: {
      type: Boolean,
      default: true
    },
    showTaxNote: {
      type: Boolean,
      default: true
    },
    showButton: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'Continue'
    },
    currencyCode: {
      type: String,
      default: 'USD'
    }
  },
  emits: ['action-click'],
  setup(props) {
    // Calculate the subtotal price (before discount)
    const subtotalPrice = computed(() => {
      if (!props.product) return 0;
      
      let total = props.product.basePrice;
      
      // Add color price
      if (props.configuration.color && props.configuration.color.price) {
        total += props.configuration.color.price;
      }
      
      // Add material price
      if (props.configuration.material && props.configuration.material.price) {
        total += props.configuration.material.price;
      }
      
      // Add features price
      if (props.configuration.features && props.configuration.features.length > 0) {
        props.configuration.features.forEach(feature => {
          if (feature.price) total += feature.price;
        });
      }
      
      return total;
    });
    
    // Calculate discount amount
    const discountAmount = computed(() => {
      if (props.discount <= 0) return 0;
      return (subtotalPrice.value * (props.discount / 100));
    });
    
    // Calculate the final total price
    const totalPrice = computed(() => {
      return subtotalPrice.value - discountAmount.value;
    });
    
    // Format discount percentage
    const discountPercentage = computed(() => {
      return props.discount.toFixed(0);
    });
    
    // Check if configuration is complete
    const isConfigurationComplete = computed(() => {
      return props.product && 
             props.configuration.color && 
             props.configuration.material;
    });
    
    // Format price with currency
    const formatPrice = (price) => {
      if (price === undefined || price === null) return '';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: props.currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    };
    
    return {
      subtotalPrice,
      discountAmount,
      totalPrice,
      discountPercentage,
      isConfigurationComplete,
      formatPrice
    };
  }
}
</script>

<style scoped>
.price-summary {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-header {
  background-color: #f5f5f7;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.summary-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.summary-subtitle {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #666;
}

.summary-content {
  padding: 16px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.base-price {
  font-weight: 500;
}

.option-type {
  font-weight: 500;
  color: #555;
}

.item-price {
  font-weight: 500;
}

.add-on {
  color: #4a6cf7;
}

.included {
  color: #4caf50;
  font-size: 13px;
}

.features-header {
  margin: 16px 0 8px;
  font-weight: 500;
  font-size: 14px;
  color: #555;
  padding-bottom: 4px;
  border-bottom: 1px dashed #e0e0e0;
}

.feature-item {
  padding-left: 8px;
  margin-bottom: 8px;
}

.empty-features {
  margin: 16px 0;
  font-size: 14px;
  color: #888;
  font-style: italic;
}

.summary-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 16px 0;
}

.subtotal, .discount {
  font-size: 14px;
}

.discount-amount {
  color: #e53935;
}

.total {
  font-size: 16px;
  font-weight: 600;
  margin-top: 4px;
}

.total-price {
  color: #333;
}

.tax-note {
  margin-top: 12px;
  font-size: 12px;
  color: #888;
  font-style: italic;
}

.summary-actions {
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}

.action-button {
  width: 100%;
  padding: 12px;
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-button:hover {
  background-color: #3a5bd9;
}

.action-button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .summary-header, .summary-content, .summary-actions {
    padding: 12px;
  }
  
  .summary-title {
    font-size: 16px;
  }
  
  .summary-item, .total {
    font-size: 14px;
  }
}
</style>
