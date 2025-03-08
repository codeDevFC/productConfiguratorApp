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
    
    <div class="product-preview">
      <h2>Featured Products</h2>
      <div class="product-cards">
        <div 
          v-for="product in featuredProducts" 
          :key="product.id"
          class="product-card"
          @click="configureProduct(product)"
        >
          <div class="product-image-container">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="product-image"
              @error="(e) => handleImageError(e, product)"
            >
          </div>
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="product-price">${{ product.basePrice.toFixed(2) }}</p>
          <button class="configure-button">Configure</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BaseButton from '@/components/ui/BaseButton.vue';
import { products } from '@/data/products';

export default {
  name: 'HomeView',
  components: {
    BaseButton
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    
    const featuredProducts = products.slice(0, 2); // Show first 2 products
    
    const startConfiguring = () => {
      store.commit('configuration/RESET_CONFIGURATION');
      router.push('/configurator');
    };
    
    const configureProduct = (product) => {
      store.commit('configuration/RESET_CONFIGURATION');
      store.commit('configuration/SELECT_PRODUCT', product);
      router.push('/configurator');
    };
    
    const handleImageError = (event, product) => {
      // Remove the broken image
      event.target.style.display = 'none';
      
      // Get the parent container
      const container = event.target.parentNode;
      
      // Create a colored placeholder with product name
      container.style.backgroundColor = '#f0f0f0';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      
      // Add product name as text
      const textNode = document.createElement('div');
      textNode.textContent = product.name;
      textNode.style.fontWeight = 'bold';
      textNode.style.color = '#666';
      textNode.style.textAlign = 'center';
      container.appendChild(textNode);
    };
    
    return {
      featuredProducts,
      startConfiguring,
      configureProduct,
      handleImageError
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
  margin-bottom: 60px;
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

.product-preview {
  margin-top: 60px;
}

.product-preview h2 {
  text-align: center;
  margin-bottom: 30px;
}

.product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-price {
  font-weight: 600;
  font-size: 18px;
  margin-top: 10px;
  color: #4a6cf7;
}

.configure-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #4a6cf7;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.configure-button:hover {
  background-color: #3a5bd9;
}
</style>
