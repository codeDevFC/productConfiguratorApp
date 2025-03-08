
// src/data/products.js - Updated version

export const products = [
  {
    id: 'chair',
    name: 'Office Chair',
    description: 'Ergonomic office chair with customizable features',
    basePrice: 199,
    category: 'office',
    // Use relative paths instead of require statements
    image: './images/products/chair-base.png',
    options: {
      colors: [
        { id: 'black', name: 'Black', price: 0, image: './images/products/chair-black.png' },
        { id: 'blue', name: 'Blue', price: 20, image: './images/products/chair-blue.png' },
        { id: 'red', name: 'Red', price: 20, image: './images/products/chair-red.png' },
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
  // Second product similar changes...
];
