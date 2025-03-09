
<!-- src/App.vue -->
<template>
  <div id="app">
    <app-header />
    <main class="app-content">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from '@/components/common/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
:root {
  --primary-color: #4a6cf7;
  --secondary-color: #f5f5f7;
  --text-color: #333;
  --text-light: #666;
  --border-color: #eee;
  --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-color);
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

.app-content {
  min-height: calc(100vh - 140px);
}
</style>
