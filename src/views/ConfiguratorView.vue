
<!-- src/views/ConfiguratorView.vue -->
<template>
  <div class="configurator">
    <div class="configurator-header">
      <h1>Product Configurator</h1>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      <div class="steps-indicator">
        <div 
          v-for="step in totalSteps" 
          :key="step"
          :class="['step-indicator', { 'active': currentStep >= step, 'current': currentStep === step }]"
          @click="goToStep(step)"
        >
          {{ step }}
        </div>
      </div>
    </div>
    
    <div class="configurator-content">
      <!-- Step 1: Product Selection -->
      <configurator-step 
        v-if="currentStep === 1"
        title="Choose Your Product"
        description="Select the product you want to customize"
      >
        <div class="product-selection">
          <div 
            v-for="product in products" 
            :key="product.id"
            :class="['product-card', { 'selected': isProductSelected(product) }]"
            @click="selectProduct(product)"
          >
            <img :src="product.image" :alt="product.name" class="product-image">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p class="product-price">${{ product.basePrice.toFixed(2) }}</p>
          </div>
        </div>
      </configurator-step>
      
      <!-- Step 2: Color Selection -->
      <configurator-step 
        v-if="currentStep === 2"
        title="Choose a Color"
        description="Select your preferred color"
      >
        <div class="configurator-layout">
          <color-selector />
          <product-preview />
        </div>
      </configurator-step>
      
      <!-- Step 3: Material Selection -->
      <configurator-step 
        v-if="currentStep === 3"
        title="Choose Material"
        description="Select the material for your product"
      >
        <div class="configurator-layout">
          <material-selector />
          <product-preview />
        </div>
      </configurator-step>
      
      <!-- Step 4: Additional Features -->
      <configurator-step 
        v-if="currentStep === 4"
        title="Additional Features"
        description="Enhance your product with additional features"
      >
        <div class="configurator-layout">
          <feature-selector />
          <product-preview />
        </div>
      </configurator-step>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { products } from '@/data/products';
import ConfiguratorStep from '@/components/configurator/ConfiguratorStep.vue';
import ProductPreview from '@/components/configurator/ProductPreview.vue';
import ColorSelector from '@/components/configurator/ColorSelector.vue';
import MaterialSelector from '@/components/configurator/MaterialSelector.vue';
import FeatureSelector from '@/components/configurator/FeatureSelector.vue';

export default {
  name: 'ConfiguratorView',
  components: {
    ConfiguratorStep,
    ProductPreview,
    ColorSelector,
    MaterialSelector,
    FeatureSelector
  },
  setup() {
    const store = useStore();
    
    const currentStep = computed(() => store.state.configuration.currentStep);
    const totalSteps = computed(() => store.state.configuration.totalSteps);
    const progress = computed(() => store.getters['configuration/currentStepProgress']);
    const selectedProductId = computed(() => store.state.configuration.configuration.productId);
    
    const isProductSelected = (product) => {
      return selectedProductId.value === product.id;
    };
    
    const selectProduct = (product) => {
      store.commit('configuration/SELECT_PRODUCT', product);
    };
    
    const goToStep = (step) => {
      // Only allow going to steps that have been completed or the current step
      if (step <= currentStep.value) {
        store.commit('configuration/SET_CURRENT_STEP', step);
      }
    };
    
    return {
      currentStep,
      totalSteps,
      progress,
      products,
      isProductSelected,
      selectProduct,
      goToStep
    };
  }
}
</script>

<style scoped>
.configurator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.configurator-header {
  text-align: center;
  margin-bottom: 40px;
}

.configurator-header h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.progress-bar {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4a6cf7;
  transition: width 0.3s ease;
}

.steps-indicator {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.step-indicator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.step-indicator.active {
  background-color: #4a6cf7;
  color: white;
}

.step-indicator.current {
  box-shadow: 0 0 0 3px rgba(74, 108, 247, 0.3);
}

.product-selection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-card.selected {
  border-color: #4a6cf7;
  background-color: rgba(74, 108, 247, 0.05);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 15px;
}

.product-price {
  font-weight: 600;
  font-size: 18px;
  margin-top: 10px;
  color: #4a6cf7;
}

.configurator-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

@media (min-width: 768px) {
  .configurator-layout {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
