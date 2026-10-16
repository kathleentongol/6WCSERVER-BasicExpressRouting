// Student Name: WRITE YOUR FULL NAME HERE
// Activity: WCServer - Basic Express Routing

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, 'public');

// Serve CSS, client-side JavaScript, and image files from /public.
app.use(express.static(publicDirectory));

// Sample menu data for the GET API route.
const menuItems = [
  { id: 1, name: 'Classic Latte', category: 'coffee', price: 140, description: 'Smooth espresso with steamed milk.' },
  { id: 2, name: 'Caramel Macchiato', category: 'coffee', price: 165, description: 'Espresso, milk, and sweet caramel.' },
  { id: 3, name: 'Iced Americano', category: 'coffee', price: 120, description: 'Bold espresso served over ice.' },
  { id: 4, name: 'Butter Croissant', category: 'pastry', price: 95, description: 'A flaky, buttery pastry.' },
  { id: 5, name: 'Cinnamon Roll', category: 'pastry', price: 110, description: 'Soft roll with cinnamon sugar.' },
  { id: 6, name: 'Mocha', category: 'coffee', price: 155, description: 'Espresso blended with chocolate and milk.' }
];

// Log each requested page in the VS Code terminal.
function logPageVisit(pageName) {
  console.log(`[PAGE VISIT] ${pageName} - ${new Date().toLocaleString()}`);
}

// Custom GET routes that serve individual HTML files.
app.get('/', (req, res) => {
  logPageVisit('Home');
  res.sendFile(path.join(publicDirectory, 'index.html'));
});

app.get('/menu', (req, res) => {
  logPageVisit('Menu');
  res.sendFile(path.join(publicDirectory, 'menu.html'));
});

app.get('/about', (req, res) => {
  logPageVisit('About');
  res.sendFile(path.join(publicDirectory, 'about.html'));
});

app.get('/contact', (req, res) => {
  logPageVisit('Contact');
  res.sendFile(path.join(publicDirectory, 'contact.html'));
});

// GET route returning menu data as JSON.
// Example: /api/menu?category=coffee
app.get('/api/menu', (req, res) => {
  const category = String(req.query.category || '').toLowerCase();
  const filteredItems = category
    ? menuItems.filter(item => item.category === category)
    : menuItems;

  res.json(filteredItems);
});

// GET route demonstrating a URL parameter.
// Example: /api/menu/1
app.get('/api/menu/:id', (req, res) => {
  const item = menuItems.find(menuItem => menuItem.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ error: 'Menu item not found.' });
  }

  res.json(item);
});

// A clear 404 response for pages/routes that do not exist.
app.use((req, res) => {
  console.log(`[404 NOT FOUND] ${req.method} ${req.originalUrl}`);
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found</title><link rel="stylesheet" href="/css/style.css"></head>
    <body class="not-found"><main><p class="eyebrow">404 ERROR</p><h1>Oops, this page is off the menu.</h1>
    <p>We couldn't find the page you were looking for.</p><a class="button" href="/">Back to Home</a></main></body></html>
  `);
});

app.listen(PORT, () => {
  console.log(`Sunrise Sip Cafe is running at http://localhost:${PORT}`);
  console.log('Press Ctrl + C to stop the server.');
});
