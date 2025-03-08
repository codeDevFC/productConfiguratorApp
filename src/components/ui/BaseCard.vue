

<!-- src/components/ui/BaseCard.vue -->
<template>
  <div 
    :class="[
      'base-card',
      `base-card--${variant}`,
      { 'base-card--hoverable': hoverable },
      { 'base-card--selected': selected },
      { 'base-card--clickable': clickable || !!$attrs.onClick },
      customClass
    ]"
    :style="cardStyle"
    @click="handleClick"
  >
    <!-- Optional header -->
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
      </slot>
    </div>
    
    <!-- Optional image -->
    <div v-if="$slots.image || imageSrc" class="card-image">
      <slot name="image">
        <img v-if="imageSrc" :src="imageSrc" :alt="imageAlt" />
      </slot>
    </div>
    
    <!-- Main content -->
    <div class="card-content">
      <slot></slot>
    </div>
    
    <!-- Optional footer -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    // Appearance props
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'outline', 'flat', 'elevated'].includes(value)
    },
    customClass: {
      type: String,
      default: ''
    },
    // Content props
    title: {
      type: String,
      default: ''
    },
    imageSrc: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: 'Card image'
    },
    // Behavior props
    hoverable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    // Style props
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    padding: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    // Compute dynamic styles
    const cardStyle = computed(() => {
      const styles = {};
      
      if (props.width) {
        styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
      }
      
      if (props.height) {
        styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
      }
      
      if (props.padding) {
        styles.padding = typeof props.padding === 'number' ? `${props.padding}px` : props.padding;
      }
      
      return styles;
    });
    
    // Handle click events
    const handleClick = (event) => {
      if (props.clickable) {
        emit('click', event);
      }
    };
    
    return {
      cardStyle,
      handleClick
    };
  }
}
</script>

<style scoped>
.base-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  transition: all 0.2s ease;
}

/* Variant styles */
.base-card--default {
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.base-card--outline {
  border: 1px solid #e0e0e0;
  box-shadow: none;
}

.base-card--flat {
  border: none;
  box-shadow: none;
}

.base-card--elevated {
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Interaction styles */
.base-card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.base-card--selected {
  border-color: #4a6cf7;
  box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
}

.base-card--clickable {
  cursor: pointer;
}

/* Card sections */
.card-header {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.card-image {
  width: 100%;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
}

.card-content {
  padding: 16px;
}

.card-footer {
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .card-header, .card-content, .card-footer {
    padding: 12px;
  }
  
  .card-title {
    font-size: 16px;
  }
}
</style>





<!--

<BaseCard title="Product Information">
  <p>This is a description of the product with its key features.</p>
</BaseCard>

-->

<!-- Product card with image and footer -->

<!--
<BaseCard 
  variant="elevated" 
  hoverable 
  clickable
  @click="selectProduct(product)"
  :selected="isSelected(product.id)"
>
  <template #image>
    <img :src="product.image" :alt="product.name" />
  </template>
  
  <h3>{{ product.name }}</h3>
  <p>{{ product.description }}</p>
  <p class="price">${{ product.price }}</p>
  
  <template #footer>
    <button class="select-button">Select</button>
  </template>
</BaseCard>

            -->

<!-- Feature card with custom styling -->
<!--
<BaseCard 
  variant="outline" 
  customClass="feature-card"
  hoverable
  :selected="isFeatureSelected(feature.id)"
  @click="toggleFeature(feature)"
>
  <div class="feature-content">
    <h4>{{ feature.name }}</h4>
    <p>{{ feature.description }}</p>
    <span class="feature-price">+${{ feature.price }}</span>
  </div>
</BaseCard>
         -->