

<!-- src/components/configurator/ColorSelector.vue -->
<template>
  <div class="color-selector">
    <h3 class="selector-title">Choose a Color</h3>
    
    <div class="color-options">
      <div 
        v-for="color in colors" 
        :key="color.id"
        :class="['color-option', { 'selected': isSelected(color) }]"
        @click="selectColor(color)"
      >
        <div class="color-preview" :style="{ backgroundImage: `url(${color.image})` }"></div>
        <div class="color-info">
          <span class="color-name">{{ color.name }}</span>
          <span v-if="color.price > 0" class="color-price">+${{ color.price.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ColorSelector',
  setup() {
    const store = useStore();
    
    const selectedProduct = computed(() => store.state.configuration.selectedProduct);
    const colors = computed(() => selectedProduct.value?.options.colors || []);
    const selectedColor = computed(() => store.state.configuration.configuration.color);
    
    const isSelected = (color) => {
      return selectedColor.value && selectedColor.value.id === color.id;
    };
    
    const selectColor = (color) => {
      store.commit('configuration/SELECT_COLOR', color);
    };
    
    return {
      colors,
      isSelected,
      selectColor
    };
  }
}
</script>

<style scoped>
.color-selector {
  margin-bottom: 30px;
}

.selector-title {
  margin-bottom: 20px;
  font-size: 18px;
}

.color-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.color-option {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.color-option.selected {
  border-color: #4a6cf7;
  background-color: rgba(74, 108, 247, 0.05);
}

.color-preview {
  width: 100%;
  height: 100px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  border-radius: 4px;
}

.color-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.color-name {
  font-weight: 500;
}

.color-price {
  color: #666;
  font-size: 14px;
}
</style>
