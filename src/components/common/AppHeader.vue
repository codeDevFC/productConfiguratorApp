

<!-- src/components/common/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo and brand -->
      <div class="brand">
        <router-link to="/" class="brand-link">
          <img 
            v-if="logoSrc" 
            :src="logoSrc" 
            :alt="logoAlt || brandName" 
            class="brand-logo"
          />
          <span class="brand-name">{{ brandName }}</span>
        </router-link>
      </div>
      
      <!-- Navigation links -->
      <nav class="main-nav" :class="{ 'nav-open': isMenuOpen }">
        <ul class="nav-links">
          <li v-for="link in navigationLinks" :key="link.path" class="nav-item">
            <router-link 
              :to="link.path" 
              class="nav-link"
              :class="{ 'active': isActivePath(link.path) }"
              @click="closeMenu"
            >
              <span v-if="link.icon" class="nav-icon">
                <i :class="link.icon"></i>
              </span>
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </nav>
      
      <!-- Optional action buttons -->
      <div class="header-actions" v-if="showActions">
        <slot name="actions">
          <button 
            v-if="showSaveButton" 
            class="action-button save-button"
            @click="$emit('save')"
          >
            <i class="fas fa-save"></i>
            <span class="button-text">Save</span>
          </button>
          
          <button 
            v-if="showShareButton" 
            class="action-button share-button"
            @click="$emit('share')"
          >
            <i class="fas fa-share-alt"></i>
            <span class="button-text">Share</span>
          </button>
        </slot>
      </div>
      
      <!-- Mobile menu toggle -->
      <button 
        class="menu-toggle"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span class="menu-icon"></span>
      </button>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'AppHeader',
  props: {
    brandName: {
      type: String,
      default: 'Product Configurator'
    },
    logoSrc: {
      type: String,
      default: '/favicon.ico' // Default to favicon.ico
    },
    logoAlt: {
      type: String,
      default: 'Brand Logo'
    },
    navigationLinks: {
      type: Array,
      default: () => [
        { path: '/', label: 'Home', icon: 'fas fa-home' },
        { path: '/configurator', label: 'Configure', icon: 'fas fa-tools' },
      ]
    },
    showActions: {
      type: Boolean,
      default: true
    },
    showSaveButton: {
      type: Boolean,
      default: false
    },
    showShareButton: {
      type: Boolean,
      default: false
    },
    stickyHeader: {
      type: Boolean,
      default: true
    }
  },
  emits: ['save', 'share'],
  setup(props) {
    const route = useRoute();
    const isMenuOpen = ref(false);
    
    // Check if the current route matches a navigation link
    const isActivePath = (path) => {
      return route.path === path;
    };
    
    // Toggle mobile menu
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
      
      // If menu is open, prevent body scrolling
      document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
    };
    
    // Close mobile menu
    const closeMenu = () => {
      if (isMenuOpen.value) {
        isMenuOpen.value = false;
        document.body.style.overflow = '';
      }
    };
    
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      const nav = document.querySelector('.main-nav');
      const toggle = document.querySelector('.menu-toggle');
      
      if (isMenuOpen.value && nav && !nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    };
    
    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen.value) {
        closeMenu();
      }
    };
    
    // Add event listeners
    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('resize', handleResize);
    });
    
    // Remove event listeners
    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    });
    
    return {
      isMenuOpen,
      isActivePath,
      toggleMenu,
      closeMenu
    };
  }
}
</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand styles */
.brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.brand-logo {
  height: 32px;
  width: auto;
  margin-right: 10px;
}

.brand-name {
  font-size: 20px;
  font-weight: 600;
  color: #4a6cf7;
}

/* Navigation styles */
.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0 12px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: #4a6cf7;
}

.nav-link.active {
  color: #4a6cf7;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4a6cf7;
}

.nav-icon {
  margin-right: 8px;
  font-size: 16px;
}

/* Action buttons */
.header-actions {
  display: flex;
  align-items: center;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-left: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-button {
  background-color: #f5f5f7;
  color: #333;
}

.save-button:hover {
  background-color: #e0e0e0;
}

.share-button {
  background-color: #4a6cf7;
  color: white;
}

.share-button:hover {
  background-color: #3a5bd9;
}

.button-text {
  margin-left: 6px;
}

/* Mobile menu toggle */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 101;
}

.menu-icon, .menu-icon::before, .menu-icon::after {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #333;
  position: absolute;
  transition: all 0.3s ease;
}

.menu-icon {
  top: 14px;
  left: 3px;
}

.menu-icon::before {
  content: '';
  top: -8px;
}

.menu-icon::after {
  content: '';
  top: 8px;
}

/* Mobile menu open state */
.nav-open .menu-icon {
  background-color: transparent;
}

.nav-open .menu-icon::before {
  transform: rotate(45deg);
  top: 0;
}

.nav-open .menu-icon::after {
  transform: rotate(-45deg);
  top: 0;
}

/* Responsive styles */
@media (max-width: 768px) {
  .main-nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 100;
    justify-content: flex-start;
    padding-top: 70px;
  }
  
  .nav-open {
    transform: translateX(0);
  }
  
  .nav-links {
    flex-direction: column;
    width: 100%;
  }
  
  .nav-item {
    margin: 0;
    width: 100%;
  }
  
  .nav-link {
    padding: 15px 20px;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .nav-link.active::after {
    display: none;
  }
  
  .nav-link.active {
    background-color: #f5f5f7;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .header-actions {
    display: none;
  }
}
</style>
