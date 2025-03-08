
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Create the Vue application instance
const app = createApp(App);

// Use the router and store
app.use(router);
app.use(store);

// Mount the app to the DOM
app.mount('#app');

// Optional: Register global components if needed
// app.component('BaseButton', BaseButton);

// Optional: Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err);
  console.error('Vue instance:', vm);
  console.error('Error info:', info);
};

// Optional: Performance tracking in development mode
if (process.env.NODE_ENV === 'development') {
  app.config.performance = true;
}
