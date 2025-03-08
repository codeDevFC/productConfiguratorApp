
<!-- src/App.vue -->
<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">Product Configurator</router-link>
        </div>
        <nav class="main-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/configurator" class="nav-link">Configure</router-link>
        </nav>
      </div>
    </header>

    <main class="app-content">
      <router-view/>
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2025 Product Configurator | Created by Felix Cobbinah</p>
      </div>
    </footer>
  </div>
</template>

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

.app-header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: 700;
}

.logo a {
  color: var(--primary-color);
}

.main-nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  padding: 5px 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link.router-link-active {
  color: var(--primary-color);
}

.nav-link.router-link-active:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

.app-content {
  min-height: calc(100vh - 130px);
}

.app-footer {
  background-color: var(--secondary-color);
  padding: 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-light);
  font-size: 14px;
}
</style>
