

// src/store/modules/configuration.js
import { v4 as uuidv4 } from 'uuid';

// Add default state with all required properties
const defaultState = {
  currentStep: 1,
  totalSteps: 4,
  selectedProduct: null,
  configuration: {
    id: null,
    productId: null,
    color: null,
    material: null,
    features: [],
    totalPrice: 0
  }
};

export default {
  namespaced: true,
  
  state: () => ({
    ...defaultState
  }),
  //
 // state: () => ({
   // currentStep: 1,
  //  totalSteps: 4,
   // selectedProduct: null,
   // configuration: {
     // id: null,
     // productId: null,
     // color: null,
     // material: null,
     // features: [],
     // totalPrice: 0
    }
 // }),
  
  mutations: {
    SET_CURRENT_STEP(state, step) {
      state.currentStep = step;
    },
    SELECT_PRODUCT(state, product) {
      state.selectedProduct = product;
      state.configuration.productId = product.id;
      state.configuration.id = uuidv4();
      state.configuration.totalPrice = product.basePrice;
    },
    SELECT_COLOR(state, { color, rootState, commit }) {
      state.configuration.color = color;
      // Use the passed commit function instead of this.commit
      commit('CALCULATE_TOTAL', null, { root: true });
    },
    SELECT_MATERIAL(state, { material, rootState, commit }) {
      state.configuration.material = material;
      // Use the passed commit function instead of this.commit
      commit('CALCULATE_TOTAL', null, { root: true });
    },
    TOGGLE_FEATURE(state, { feature, rootState, commit }) {
      const index = state.configuration.features.findIndex(f => f.id === feature.id);
      if (index > -1) {
        state.configuration.features.splice(index, 1);
      } else {
        state.configuration.features.push(feature);
      }
      // Use the passed commit function instead of this.commit
      commit('CALCULATE_TOTAL', null, { root: true });
    },
    CALCULATE_TOTAL(state) {
      if (!state.selectedProduct) return;
      
      let total = state.selectedProduct.basePrice;
      
      // Add color price
      if (state.configuration.color) {
        total += state.configuration.color.price;
      }
      
      // Add material price
      if (state.configuration.material) {
        total += state.configuration.material.price;
      }
      
      // Add features price
      state.configuration.features.forEach(feature => {
        total += feature.price;
      });
      
      state.configuration.totalPrice = total;
    },
    RESET_CONFIGURATION(state) {
      state.currentStep = 1;
      state.selectedProduct = null;
      state.configuration = {
        id: null,
        productId: null,
        color: null,
        material: null,
        features: [],
        totalPrice: 0
      };
    },
    LOAD_CONFIGURATION(state, config) {
      state.configuration = config;
    }
  },
  
  actions: {
    nextStep({ commit, state }) {
      if (state.currentStep < state.totalSteps) {
        commit('SET_CURRENT_STEP', state.currentStep + 1);
      }
    },
    prevStep({ commit, state }) {
      if (state.currentStep > 1) {
        commit('SET_CURRENT_STEP', state.currentStep - 1);
      }
    },
    selectColor({ commit, rootState }, color) {
      commit('SELECT_COLOR', { color, rootState, commit });
    },
    selectMaterial({ commit, rootState }, material) {
      commit('SELECT_MATERIAL', { material, rootState, commit });
    },
    toggleFeature({ commit, rootState }, feature) {
      commit('TOGGLE_FEATURE', { feature, rootState, commit });
    },
    saveConfiguration({ state }) {
      // Save to localStorage
      localStorage.setItem('savedConfiguration', JSON.stringify(state.configuration));
      
      // Generate shareable URL
      const params = new URLSearchParams();
      params.append('id', state.configuration.id);
      params.append('product', state.configuration.productId);
      params.append('color', state.configuration.color?.id || '');
      params.append('material', state.configuration.material?.id || '');
      params.append('features', state.configuration.features.map(f => f.id).join(','));
      
      return `${window.location.origin}/configurator?${params.toString()}`;
    },
    loadConfiguration({ commit, state }, urlParams) {
      // Implementation for loading from URL params
      // This would need to match product data with the IDs from params
    }
  },
  
  getters: {
    currentStepProgress: state => {
      return (state.currentStep / state.totalSteps) * 100;
    },
    isFeatureSelected: state => featureId => {
      return state.configuration.features.some(f => f.id === featureId);
    },
    canProceed: state => {
      switch (state.currentStep) {
        case 1: return state.selectedProduct !== null;
        case 2: return state.configuration.color !== null;
        case 3: return state.configuration.material !== null;
        default: return true;
      }
    }
  }
};
