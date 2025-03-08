


<!-- src/components/configurator/ProductPreview.vue -->
<template>
  <div class="product-preview">
    <div class="preview-container">
      <img 
        v-if="selectedProduct && configuration.color"
        :src="configuration.color.image" 
        :alt="selectedProduct.name" 
        class="product-image"
      />
      <img 
        v-else-if="selectedProduct"
        :src="selectedProduct.image" 
        :alt="selectedProduct.name" 
        class="product-image"
      />
      <div v-else class="placeholder">
        Select a product to preview
      </div>
    </div>
    
    <div class="price-summary">
      <h3>Configuration Summary</h3>
      <div v-if="selectedProduct" class="summary-details">
        <div class="summary-item">
          <span>Base Price:</span>
          <span>${{ selectedProduct.basePrice.toFixed(2) }}</span>
        </div>
        
        <div v-if="configuration.color" class="summary-item">
          <span>Color ({{ configuration.color.name }}):</span>
          <span>+${{ configuration.color.price.toFixed(2) }}</span>
        </div>
        
        <div v-if="configuration.material" class="summary-item">
          <span>Material ({{ configuration.material.name }}):</span>
          <span>+${{ configuration.material.price.toFixed(2) }}</span>
        </div>
        
        <div v-if="configuration.features.length > 0">
          <div v-for="feature in configuration.features" :key="feature.id" class="summary-item">
            <span>{{ feature.name }}:</span>
            <span>+${{ feature.price.toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="summary-total">
          <span>Total:</span>
          <span>${{ configuration.totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ProductPreview',
  setup() {
    const store = useStore();
    
    const selectedProduct = computed(() => store.state.configuration.selectedProduct);
    const configuration = computed(() => store.state.configuration.configuration);
    
    return {
      selectedProduct,
      configuration
    };
  }
}
</script>

<style scoped>
.product-preview {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .product-preview {
    flex-direction: row;
  }
}

.preview-container {
  flex: 2;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.product-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.placeholder {
  color: #999;
  font-size: 18px;
}

.price-summary {
  flex: 1;
  background-color: #f5f5f7;
  border-radius: 8px;
  padding: 20px;
}

.summary-details {
  margin-top: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  font-weight: 600;
  font-size: 18px;
}
</style>
