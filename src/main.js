// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err);
  
  // Handle specific errors
  if (err.message && err.message.includes("Cannot read properties of undefined (reading 'profile')")) {
    console.log('Profile error detected, setting default profile');
    
    // Try to set a default profile if that's the issue
    if (store.state.configuration && !store.state.configuration.profile) {
      store.state.configuration.profile = {
        name: 'Guest',
        preferences: {}
      };
    }
  }
};

app.use(router);
app.use(store);
app.mount('#app');
