const fs = require('fs');
const files = [
  'src/components/ProductModal.jsx',
  'src/components/CartSidebar.jsx',
  'src/components/CheckoutModal.jsx',
  'src/components/Products.jsx',
  'src/components/Header.jsx'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
  fs.writeFileSync(f, content);
});
