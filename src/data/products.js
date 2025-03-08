// src/data/products.js

export const products = [
  {
    id: 'chair',
    name: 'Office Chair',
    description: 'Ergonomic office chair with customizable features',
    basePrice: 199,
    category: 'office',
    image: require('@/assets/images/products/chair-base.png'),
    options: {
      colors: [
        { id: 'black', name: 'Black', price: 0, image: require('@/assets/images/products/chair-black.png') },
        { id: 'blue', name: 'Blue', price: 20, image: require('@/assets/images/products/chair-blue.png') },
        { id: 'red', name: 'Red', price: 20, image: require('@/assets/images/products/chair-red.png') },
      ],
      materials: [
        { id: 'fabric', name: 'Fabric', price: 0 },
        { id: 'leather', name: 'Leather', price: 50 },
        { id: 'mesh', name: 'Mesh', price: 30 },
      ],
      features: [
        { id: 'armrests', name: 'Adjustable Armrests', price: 30 },
        { id: 'headrest', name: 'Headrest', price: 40 },
        { id: 'lumbar', name: 'Lumbar Support', price: 25 },
        { id: 'wheels', name: 'Premium Wheels', price: 15 },
      ]
    }
  },
  {
    id: 'desk',
    name: 'Standing Desk',
    description: 'Adjustable height desk for optimal ergonomics',
    basePrice: 349,
    category: 'office',
    image: require('@/assets/images/products/desk-base.png'),
    options: {
      colors: [
        { id: 'white', name: 'White', price: 0, image: require('@/assets/images/products/desk-white.png') },
        { id: 'black', name: 'Black', price: 0, image: require('@/assets/images/products/desk-black.png') },
        { id: 'walnut', name: 'Walnut', price: 30, image: require('@/assets/images/products/desk-walnut.png') },
      ],
      materials: [
        { id: 'laminate', name: 'Laminate', price: 0 },
        { id: 'bamboo', name: 'Bamboo', price: 100 },
        { id: 'hardwood', name: 'Hardwood', price: 150 },
      ],
      features: [
        { id: 'memory', name: 'Memory Presets', price: 50 },
        { id: 'drawer', name: 'Drawer', price: 75 },
        { id: 'wireless', name: 'Wireless Charger', price: 40 },
        { id: 'cable', name: 'Cable Management', price: 25 },
      ]
    }
  }
];

export default {
  products
};
