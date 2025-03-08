

<!-- src/components/configurator/ConfiguratorStep.vue -->
<template>
  <div class="configurator-step">
    <h2 class="step-title">{{ title }}</h2>
    <p class="step-description">{{ description }}</p>
    
    <div class="step-content">
      <slot></slot>
    </div>
    
    <div class="step-actions">
      <base-button 
        v-if="currentStep > 1" 
        variant="outline" 
        @click="prevStep"
      >
        Back
      </base-button>
      
      <base-button 
        v-if="currentStep < totalSteps" 
        :disabled="!canProceed"
        @click="nextStep"
      >
        Continue
      </base-button>
      
      <base-button 
        v-else 
        @click="finalize"
      >
        Finalize Configuration
      </base-button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BaseButton from '../ui/BaseButton.vue';

export default {
  name: 'ConfiguratorStep',
  components: {
    BaseButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const currentStep = computed(() => store.state.configuration.currentStep);
    const totalSteps = computed(() => store.state.configuration.totalSteps);
    const canProceed = computed(() => store.getters['configuration/canProceed']);
    
    const nextStep = () => {
      store.dispatch('configuration/nextStep');
    };
    
    const prevStep = () => {
      store.dispatch('configuration/prevStep');
    };
    
    const finalize = () => {
      store.dispatch('configuration/saveConfiguration');
      router.push('/summary');
    };
    
    return {
      currentStep,
      totalSteps,
      canProceed,
      nextStep,
      prevStep,
      finalize
    };
  }
}
</script>

<style scoped>
.configurator-step {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.step-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.step-description {
  color: #666;
  margin-bottom: 30px;
}

.step-content {
  margin-bottom: 30px;
}

.step-actions {
  display: flex;
  justify-content: space-between;
}
</style>
