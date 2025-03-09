<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Product Configurator</h1>
    <p>Testing simplified version</p>
    
    <!-- Only show router-view if showRouter is true -->
    <div v-if="showRouter">
      <router-view />
    </div>
    <div v-else>
      <button @click="enableRouter">Enable Full Application</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showRouter: false
    }
  },
  methods: {
    enableRouter() {
      this.showRouter = true;
    }
  }
}
</script>
