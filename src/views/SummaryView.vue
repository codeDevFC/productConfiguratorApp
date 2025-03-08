

<!-- src/views/SummaryView.vue -->
<template>
  <div class="summary">
    <div class="summary-header">
      <h1>Configuration Summary</h1>
      <p>Your custom product is ready!</p>
    </div>
    
    <div class="summary-content">
      <div class="product-showcase">
        <img 
          v-if="configuration.color"
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
      </div>
      
      <div class="configuration-details">
        <h2>{{ selectedProduct.name }}</h2>
        <p>{{ selectedProduct.description }}</p>
        
        <div class="details-section">
          <h3>Configuration Details</h3>
          
          <div class="detail-item">
            <span class="detail-label">Color:</span>
            <span class="detail-value">{{ configuration.color.name }}</span>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">Material:</span>
            <span class="detail-value">{{ configuration.material.name }}</span>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">Features:</span>
            <div class="features-list">
              <span v-for="feature in configuration.features" :key="feature.id" class="feature-tag">
                {{ feature.name }}
              </span>
              <span v-if="configuration.features.length === 0" class="no-features">
                No additional features
              </span>
            </div>
          </div>
        </div>
        
        <div class="price-section">
          <div class="price-item">
            <span>Base Price:</span>
            <span>${{ selectedProduct.basePrice.toFixed(2) }}</span>
          </div>
          
          <div class="price-item">
            <span>Options:</span>
            <span>${{ (configuration.totalPrice - selectedProduct.basePrice).toFixed(2) }}</span>
          </div>
          
          <div class="price-total">
            <span>Total:</span>
            <span>${{ configuration.totalPrice.toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="share-section">
          <h3>Share Your Configuration</h3>
          <div class="share-url">
            <input type="text" :value="shareableUrl" readonly ref="shareInput" />
            <button @click="copyShareUrl" class="copy-button">
              {{ copyStatus }}
            </button>
          </div>
        </div>
        
        <div class="action-buttons">
          <base-button @click="modifyConfiguration" variant="outline">
            Modify Configuration
          </base-button>
          <base-button @click="checkout">
            Proceed to Checkout
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'SummaryView',
  components: {
    BaseButton
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const shareInput = ref(null);
    const copyStatus = ref('Copy');
    
    const selectedProduct = computed(() => store.state.configuration.selectedProduct);
    const configuration = computed(() => store.state.configuration.configuration);
    const shareableUrl = computed(() => {
      const baseUrl = window.location.origin;
      const params = new URLSearchParams();
      
      params.append('product', configuration.value.productId);
      if (configuration.value.color) {
        params.append('color', configuration.value.color.id);
      }
      if (configuration.value.material) {
        params.append('material', configuration.value.material.id);
      }
      if (configuration.value.features.length > 0) {
        params.append('features', configuration.value.features.map(f => f.id).join(','));
      }
      
      return `${baseUrl}/configurator?${params.toString()}`;
    });
    
    const copyShareUrl = () => {
      shareInput.value.select();
      document.execCommand('copy');
      copyStatus.value = 'Copied!';
      
      setTimeout(() => {
        copyStatus.value = 'Copy';
      }, 2000);
    };
    
    const modifyConfiguration = () => {
      router.push('/configurator');
    };
    
    const checkout = () => {
      // In a real app, this would redirect to checkout
      alert('Proceeding to checkout... (This would redirect to a checkout page in a real application)');
    };
    
    return {
      selectedProduct,
      configuration,
      shareableUrl,
      shareInput,
      copyStatus,
      copyShareUrl,
      modifyConfiguration,
      checkout
    };
  }
}
</script>

<style scoped>
.summary {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.summary-header {
  text-align: center;
  margin-bottom: 40px;
}

.summary-header h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

.summary-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 768px) {
  .summary-content {
    grid-template-columns: 1fr 1fr;
  }
}

.product-showcase {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.configuration-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.configuration-details h2 {
  font-size: 24px;
  margin-bottom: 5px;
}

.details-section, .price-section, .share-section {
  background-color: #f5f5f7;
  border-radius: 8px;
  padding: 20px;
}

.details-section h3, .price-section h3, .share-section h3 {
  margin-bottom: 15px;
  font-size: 18px;
}

.detail-item {
  margin-bottom: 15px;
}

.detail-label {
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.feature-tag {
  background-color: #e0e7ff;
  color: #4a6cf7;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

.no-features {
  color: #999;
  font-style: italic;
}

.price-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.price-total {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
  font-weight: 600;
  font-size: 18px;
}

.share-url {
  display: flex;
}

.share-url input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
}

.copy-button {
  background-color: #4a6cf7;
  color: white;
  border: none;
  padding: 0 15px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.copy-button:hover {
  background-color: #3a5bd9;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}
</style>
