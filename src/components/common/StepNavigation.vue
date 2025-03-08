

<!-- src/components/common/StepNavigation.vue -->
<template>
  <div class="step-navigation">
    <!-- Progress bar -->
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
      </div>
    </div>
    
    <!-- Step indicators -->
    <div class="step-indicators">
      <div 
        v-for="step in steps" 
        :key="step.id"
        :class="[
          'step-indicator',
          { 'active': isStepActive(step) },
          { 'completed': isStepCompleted(step) },
          { 'current': isCurrentStep(step) },
          { 'clickable': isStepClickable(step) }
        ]"
        @click="goToStep(step)"
      >
        <div class="indicator-circle">
          <span v-if="isStepCompleted(step) && !isCurrentStep(step)" class="check-icon">✓</span>
          <span v-else class="step-number">{{ step.id }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
      </div>
    </div>
    
    <!-- Navigation buttons -->
    <div class="navigation-buttons">
      <button 
        v-if="showBackButton"
        class="nav-button back-button" 
        @click="goToPreviousStep"
      >
        <span class="button-icon">←</span>
        <span class="button-text">{{ backButtonText }}</span>
      </button>
      
      <button 
        v-if="currentStepIndex < steps.length - 1"
        class="nav-button next-button" 
        :disabled="!canProceedToNextStep"
        @click="goToNextStep"
      >
        <span class="button-text">{{ nextButtonText }}</span>
        <span class="button-icon">→</span>
      </button>
      
      <button 
        v-else
        class="nav-button finish-button" 
        :disabled="!canProceedToNextStep"
        @click="finishConfiguration"
      >
        <span class="button-text">{{ finishButtonText }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'StepNavigation',
  props: {
    steps: {
      type: Array,
      required: true,
      validator: (steps) => {
        return steps.every(step => 'id' in step && 'label' in step);
      }
    },
    currentStepIndex: {
      type: Number,
      required: true
    },
    completedSteps: {
      type: Array,
      default: () => []
    },
    canProceed: {
      type: Boolean,
      default: true
    },
    showBackButton: {
      type: Boolean,
      default: true
    },
    allowStepClick: {
      type: Boolean,
      default: true
    },
    backButtonText: {
      type: String,
      default: 'Back'
    },
    nextButtonText: {
      type: String,
      default: 'Continue'
    },
    finishButtonText: {
      type: String,
      default: 'Finish'
    }
  },
  emits: ['step-change', 'finish'],
  setup(props, { emit }) {
    // Calculate progress percentage
    const progressPercentage = computed(() => {
      if (props.steps.length <= 1) return 100;
      return ((props.currentStepIndex + 1) / props.steps.length) * 100;
    });
    
    // Determine if a step is active (current or completed)
    const isStepActive = (step) => {
      return isCurrentStep(step) || isStepCompleted(step);
    };
    
    // Determine if a step is the current step
    const isCurrentStep = (step) => {
      return props.steps[props.currentStepIndex]?.id === step.id;
    };
    
    // Determine if a step has been completed
    const isStepCompleted = (step) => {
      return props.completedSteps.includes(step.id);
    };
    
    // Determine if a step can be clicked
    const isStepClickable = (step) => {
      if (!props.allowStepClick) return false;
      
      const stepIndex = props.steps.findIndex(s => s.id === step.id);
      
      // Can click if:
      // 1. It's a previous step (already visited)
      // 2. It's a completed step
      return stepIndex < props.currentStepIndex || isStepCompleted(step);
    };
    
    // Check if we can proceed to the next step
    const canProceedToNextStep = computed(() => {
      return props.canProceed;
    });
    
    // Go to a specific step
    const goToStep = (step) => {
      if (!isStepClickable(step)) return;
      
      const stepIndex = props.steps.findIndex(s => s.id === step.id);
      emit('step-change', stepIndex);
    };
    
    // Go to the previous step
    const goToPreviousStep = () => {
      if (props.currentStepIndex > 0) {
        emit('step-change', props.currentStepIndex - 1);
      }
    };
    
    // Go to the next step
    const goToNextStep = () => {
      if (!canProceedToNextStep.value) return;
      
      if (props.currentStepIndex < props.steps.length - 1) {
        emit('step-change', props.currentStepIndex + 1);
      }
    };
    
    // Finish the configuration process
    const finishConfiguration = () => {
      if (!canProceedToNextStep.value) return;
      emit('finish');
    };
    
    return {
      progressPercentage,
      isStepActive,
      isCurrentStep,
      isStepCompleted,
      isStepClickable,
      canProceedToNextStep,
      goToStep,
      goToPreviousStep,
      goToNextStep,
      finishConfiguration
    };
  }
}
</script>

<style scoped>
.step-navigation {
  margin: 20px 0;
}

/* Progress bar styles */
.progress-container {
  margin-bottom: 20px;
}

.progress-bar {
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4a6cf7;
  transition: width 0.3s ease;
}

/* Step indicators styles */
.step-indicators {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.step-indicator:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 16px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: #e0e0e0;
  z-index: 1;
}

.step-indicator.completed:not(:last-child)::after {
  background-color: #4a6cf7;
}

.indicator-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f5f5f7;
  border: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
  transition: all 0.2s ease;
}

.step-number, .check-icon {
  font-size: 14px;
  font-weight: 600;
  color: #757575;
}

.step-label {
  font-size: 14px;
  color: #757575;
  text-align: center;
  max-width: 120px;
}

/* Step indicator states */
.step-indicator.active .indicator-circle {
  border-color: #4a6cf7;
  background-color: #fff;
}

.step-indicator.current .indicator-circle {
  background-color: #4a6cf7;
  border-color: #4a6cf7;
}

.step-indicator.current .step-number {
  color: #fff;
}

.step-indicator.completed .indicator-circle {
  background-color: #4a6cf7;
  border-color: #4a6cf7;
}

.step-indicator.completed .check-icon {
  color: #fff;
}

.step-indicator.active .step-label {
  color: #333;
  font-weight: 500;
}

.step-indicator.clickable {
  cursor: pointer;
}

.step-indicator.clickable:hover .indicator-circle {
  transform: scale(1.1);
}

/* Navigation buttons styles */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.nav-button {
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  border: none;
}

.back-button {
  background-color: #f5f5f7;
  color: #333;
}

.back-button:hover {
  background-color: #e0e0e0;
}

.next-button, .finish-button {
  background-color: #4a6cf7;
  color: white;
  margin-left: auto;
}

.next-button:hover, .finish-button:hover {
  background-color: #3a5bd9;
}

.nav-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-icon {
  font-size: 18px;
}

.back-button .button-icon {
  margin-right: 8px;
}

.next-button .button-icon {
  margin-left: 8px;
}

.button-text {
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .step-label {
    font-size: 12px;
    max-width: 80px;
  }
  
  .nav-button {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .indicator-circle {
    width: 28px;
    height: 28px;
  }
  
  .step-number, .check-icon {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .step-label {
    display: none;
  }
  
  .step-indicator:not(:last-child)::after {
    top: 14px;
  }
}
</style>
