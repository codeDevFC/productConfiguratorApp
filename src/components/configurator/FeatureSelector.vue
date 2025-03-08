

<!-- src/components/configurator/FeatureSelector.vue -->
<template>
  <div class="feature-selector">
    <h3 class="selector-title">Additional Features</h3>
    
    <div class="feature-options">
      <div 
        v-for="feature in features" 
        :key="feature.id"
        :class="['feature-option', { 'selected': isSelected(feature) }]"
        @click="toggleFeature(feature)"
      >
        <div class="feature-checkbox">
          <input 
            type="checkbox" 
            :id="feature.id" 
            :checked="isSelected(feature)"
            @change="toggleFeature(feature)"
          >
          <label :for="feature.id"></label>
        </div>
        
        <div class="feature-info">
          <span class="feature-name">{{ feature.name }}</span>
          <span class="feature-price">+${{ feature.price.toFixed(2) }}</span>
        </div>
        
        <p class="feature-description">
          {{ getFeatureDescription(feature.id) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'FeatureSelector',
  setup() {
    const store = useStore();
    
    const selectedProduct = computed(() => store.state.configuration.selectedProduct);
    const features = computed(() => selectedProduct.value?.options.features || []);
    
    const isSelected = (feature) => {
      return store.getters['configuration/isFeatureSelected'](feature.id);
    };
    
    const toggleFeature = (feature) => {
      store.commit('configuration/TOGGLE_FEATURE', feature);
    };
    
    const getFeatureDescription = (id) => {
      const descriptions = {
        'armrests': 'Adjustable armrests for optimal ergonomics and comfort.',
        'headrest': 'Supportive headrest for neck and upper back comfort.',
        'lumbar': 'Adjustable lumbar support for better posture and back health.',
        'wheels': 'Premium wheels for smooth movement on any surface.'
      };
      
      return descriptions[id] || 'Enhance your product with this premium feature.';
    };
    
    return {
      features,
      isSelected,
      toggleFeature,
      getFeatureDescription
    };
  }
}
</script>

<style scoped>
.feature-selector {
  margin-bottom: 30px;
}

.selector-title {
  margin-bottom: 20px;
  font-size: 18px;
}

.feature-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.feature-option {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
}

.feature-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-option.selected {
  border-color: #4a6cf7;
  background-color: rgba(74, 108, 247, 0.05);
}

.feature-checkbox {
  margin-right: 15px;
  padding-top: 2px;
}

.feature-checkbox input {
  display: none;
}

.feature-checkbox label {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

.feature-checkbox input:checked + label {
  background-color: #4a6cf7;
  border-color: #4a6cf7;
}

.feature-checkbox input:checked + label:after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.feature-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.feature-name {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
}

.feature-price {
  color: #666;
  font-size: 14px;
}

.feature-description {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 10px;
}
</style>
