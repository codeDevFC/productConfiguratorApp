

<!-- src/views/HomeView.vue -->
<template>
  <div class="home">
    <div class="hero">
      <h1>Customize Your Perfect Product</h1>
      <p>Build your product exactly how you want it with our easy-to-use configurator</p>
      <base-button @click="startConfiguring">Start Configuring</base-button>
    </div>
    
    <div class="features">
      <div class="feature">
        <i class="fas fa-palette feature-icon"></i>
        <h3>Customize Colors</h3>
        <p>Choose from a wide range of colors to match your style</p>
      </div>
      
      <div class="feature">
        <i class="fas fa-layer-group feature-icon"></i>
        <h3>Select Materials</h3>
        <p>Premium materials for comfort and durability</p>
      </div>
      
      <div class="feature">
        <i class="fas fa-cogs feature-icon"></i>
        <h3>Add Features</h3>
        <p>Enhance your product with additional features</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'HomeView',
  components: {
    BaseButton
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    
    const startConfiguring = () => {
      store.commit('configuration/RESET_CONFIGURATION');
      router.push('/configurator');
    };
    
    return {
      startConfiguring
    };
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero {
  text-align: center;
  margin-bottom: 60px;
}

.hero h1 {
  font-size: 42px;
  margin-bottom: 20px;
  color: #333;
}

.hero p {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.feature {
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 40px;
  color: #4a6cf7;
  margin-bottom: 20px;
}

.feature h3 {
  margin-bottom: 15px;
  font-size: 20px;
}

.feature p {
  color: #666;
}
</style>
