

<!-- src/components/configurator/MaterialSelector.vue -->
<template>
  <div class="material-selector">
    <h3 class="selector-title">Choose a Material</h3>
    
    <div class="material-options">
      <div 
        v-for="material in materials" 
        :key="material.id"
        :class="['material-option', { 'selected': isSelected(material) }]"
        @click="selectMaterial(material)"
      >
        <div class="material-info">
          <span class="material-name">{{ material.name }}</span>
          <span v-if="material.price > 0" class="material-price">+${{ material.price.toFixed(2) }}</span>
        </div>
        <p class="material-description">
          {{ getMaterialDescription(material.id) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MaterialSelector',
  setup() {
    const store = useStore();
    
    const selectedProduct = computed(() => store.state.configuration.selectedProduct);
    const materials = computed(() => selectedProduct.value?.options.materials || []);
    const selectedMaterial = computed(() => store.state.configuration.configuration.material);
    
    const isSelected = (material) => {
      return selectedMaterial.value && selectedMaterial.value.id === material.id;
    };
    
    const selectMaterial = (material) => {
      store.commit('configuration/SELECT_MATERIAL', material);
    };
    
    const getMaterialDescription = (id) => {
      const descriptions = {
        'fabric': 'Soft and breathable fabric for everyday comfort.',
        'leather': 'Premium leather for a luxurious feel and durability.',
        'mesh': 'Breathable mesh material ideal for long-term use and ventilation.'
      };
      
      return descriptions[id] || 'High-quality material for your product.';
    };
    
    return {
      materials,
      isSelected,
      selectMaterial,
      getMaterialDescription
    };
  }
}
</script>

<style scoped>
.material-selector {
  margin-bottom: 30px;
}

.selector-title {
  margin-bottom: 20px;
  font-size: 18px;
}

.material-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.material-option {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.material-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.material-option.selected {
  border-color: #4a6cf7;
  background-color: rgba(74, 108, 247, 0.05);
}

.material-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.material-name {
  font-weight: 500;
  font-size: 16px;
}

.material-price {
  color: #666;
  font-size: 14px;
}

.material-description {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}
</style>
