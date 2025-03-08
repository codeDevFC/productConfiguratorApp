
<!-- src/components/ui/BaseButton.vue -->
<template>
  <button 
    :class="[
      'base-button', 
      `base-button--${variant}`,
      { 'base-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'outline'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.base-button {
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 16px;
}

.base-button--primary {
  background-color: #4a6cf7;
  color: white;
}

.base-button--primary:hover {
  background-color: #3a5bd9;
}

.base-button--secondary {
  background-color: #f5f5f7;
  color: #333;
}

.base-button--secondary:hover {
  background-color: #e5e5e7;
}

.base-button--outline {
  background-color: transparent;
  border: 2px solid #4a6cf7;
  color: #4a6cf7;
}

.base-button--outline:hover {
  background-color: rgba(74, 108, 247, 0.1);
}

.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
