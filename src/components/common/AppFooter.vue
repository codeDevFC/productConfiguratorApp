
<!-- src/components/common/AppFooter.vue -->
<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Main footer content -->
      <div class="footer-content">
        <!-- Brand section -->
        <div class="footer-brand">
          <div class="brand-info">
            <img 
              v-if="logoSrc" 
              :src="logoSrc" 
              :alt="logoAlt || brandName" 
              class="footer-logo"
            />
            <h3 class="footer-brand-name">{{ brandName }}</h3>
          </div>
          <p class="brand-description">{{ brandDescription }}</p>
        </div>
        
        <!-- Links section -->
        <div class="footer-links">
          <div 
            v-for="(section, index) in linkSections" 
            :key="index"
            class="link-section"
          >
            <h4 class="section-title">{{ section.title }}</h4>
            <ul class="link-list">
              <li v-for="(link, linkIndex) in section.links" :key="linkIndex" class="link-item">
                <a 
                  :href="link.url" 
                  class="footer-link"
                  :target="link.external ? '_blank' : '_self'"
                  rel="noopener noreferrer"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Contact section -->
        <div class="footer-contact">
          <h4 class="section-title">{{ contactTitle }}</h4>
          
          <div v-if="email" class="contact-item">
            <i class="fas fa-envelope"></i>
            <a :href="`mailto:${email}`" class="contact-link">{{ email }}</a>
          </div>
          
          <div v-if="phone" class="contact-item">
            <i class="fas fa-phone"></i>
            <a :href="`tel:${phone}`" class="contact-link">{{ phone }}</a>
          </div>
          
          <div v-if="address" class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ address }}</span>
          </div>
          
          <!-- Social media links -->
          <div class="social-links">
            <a 
              v-for="(social, socialIndex) in socialLinks" 
              :key="socialIndex"
              :href="social.url"
              :aria-label="social.label"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Bottom bar with copyright -->
      <div class="footer-bottom">
        <div class="copyright">
          &copy; {{ currentYear }} {{ brandName }}. {{ copyrightText }}
        </div>
        
        <!-- Optional bottom links (privacy, terms, etc.) -->
        <div v-if="bottomLinks.length > 0" class="bottom-links">
          <template v-for="(link, index) in bottomLinks" :key="index">
            <a 
              :href="link.url" 
              class="bottom-link"
              :target="link.external ? '_blank' : '_self'"
              rel="noopener noreferrer"
            >
              {{ link.label }}
            </a>
            <span v-if="index < bottomLinks.length - 1" class="link-divider">|</span>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'AppFooter',
  props: {
    // Brand information
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
    brandDescription: {
      type: String,
      default: 'Create and customize your perfect product with our intuitive configurator. Choose colors, materials, and features to match your unique style and needs.'
    },
    
    // Link sections
    linkSections: {
      type: Array,
      default: () => [
        {
          title: 'Quick Links',
          links: [
            { label: 'Home', url: '/' },
            { label: 'Configure', url: '/configurator' },
            { label: 'Saved Designs', url: '/saved' }
          ]
        },
        {
          title: 'Support',
          links: [
            { label: 'FAQ', url: '/faq' },
            { label: 'Contact Us', url: '/contact' },
            { label: 'Help Center', url: '/help' }
          ]
        }
      ]
    },
    
    // Contact information
    contactTitle: {
      type: String,
      default: 'Contact Us'
    },
    email: {
      type: String,
      default: 'felixcobby@gmail.com'
    },
    phone: {
      type: String,
      default: '+447907666278'
    },
    address: {
      type: String,
      default: 'Stockholm, Sweden'
    },
    
    // Social media links
    socialLinks: {
      type: Array,
      default: () => [
        { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com' },
        { label: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
        { label: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' }
      ]
    },
    
    // Copyright information
    copyrightText: {
      type: String,
      default: 'All rights reserved.'
    },
    
    // Bottom links (privacy, terms, etc.)
    bottomLinks: {
      type: Array,
      default: () => [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Cookies', url: '/cookies' }
      ]
    }
  },
  setup() {
    // Get current year for copyright
    const currentYear = computed(() => new Date().getFullYear());
    
    return {
      currentYear
    };
  }
}
</script>

<style scoped>
.app-footer {
  background-color: #f8f9fa;
  color: #333;
  padding: 60px 0 20px;
  margin-top: 60px;
  border-top: 1px solid #e0e0e0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Main footer content */
.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 992px) {
  .footer-content {
    grid-template-columns: 2fr 3fr 2fr;
  }
}

/* Brand section */
.footer-brand {
  display: flex;
  flex-direction: column;
}

.brand-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.footer-logo {
  height: 40px;
  width: auto;
  margin-right: 12px;
}

.footer-brand-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #4a6cf7;
}

.brand-description {
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-size: 14px;
}

/* Links section */
.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 30px;
}

.section-title {
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-item {
  margin-bottom: 10px;
}

.footer-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #4a6cf7;
}

/* Contact section */
.footer-contact {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.contact-item i {
  width: 20px;
  margin-right: 10px;
  color: #4a6cf7;
}

.contact-link {
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: #4a6cf7;
}

/* Social media links */
.social-links {
  display: flex;
  margin-top: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #666;
  margin-right: 12px;
  transition: all 0.2s ease;
}

.social-link:hover {
  background-color: #4a6cf7;
  color: white;
}

/* Footer bottom */
.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.copyright {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .copyright {
    margin-bottom: 0;
  }
}

.bottom-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

@media (min-width: 768px) {
  .bottom-links {
    justify-content: flex-end;
  }
}

.bottom-link {
  font-size: 14px;
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
}

.bottom-link:hover {
  color: #4a6cf7;
}

.link-divider {
  margin: 0 8px;
  color: #ccc;
}
</style>
