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
        <div class="color-preview" :style="getColorStyle(color)">
          <img 
            v-if="color.image" 
            :src="color.image" 
            :alt="color.name"
            @error="(e) => handleImageError(e, color)" 
            class="color-image"
          />
        </div>
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
      store.dispatch('configuration/selectColor', color);
    };
    
    const getColorStyle = (color) => {
      // Default style with background color based on color id
      const colorMap = {
        'black': '#333333',
        'blue': '#4a6cf7',
        'red': '#e53935',
        'white': '#f5f5f7',
        'walnut': '#5d4037'
      };
      
      return {
        backgroundColor: colorMap[color.id] || '#cccccc'
      };
    };
    
    const handleImageError = (event, color) => {
      // Remove the broken image
      event.target.style.display = 'none';
      
      // Get the parent element (color-preview div)
      const parent = event.target.parentNode;
      
      // Set background color based on color id
      const colorMap = {
        'black': '#333333',
        'blue': '#4a6cf7',
        'red': '#e53935',
        'white': '#f5f5f7',
        'walnut': '#5d4037'
      };
      
      parent.style.backgroundColor = colorMap[color.id] || '#cccccc';
      
      // Add color name as text
      const textNode = document.createElement('span');
      textNode.textContent = color.name;
      textNode.style.color = ['black', 'walnut'].includes(color.id) ? '#ffffff' : '#333333';
      textNode.style.fontWeight = 'bold';
      textNode.style.fontSize = '12px';
      parent.appendChild(textNode);
    };
    
    return {
      colors,
      isSelected,
      selectColor,
      getColorStyle,
      handleImageError
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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.color-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
