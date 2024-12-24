const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// Sample dataset with image URLs
const items = [
    { name: "T-shirt", category: "Tops", price: 250, size: "M", color: "Blue", rating: 4, image: "images/blue-tshirt.png" },
    { name: "Jeans", category: "Bottoms", price: 800, size: "L", color: "Blue", rating: 5, image: "images/jeans.png" },
    { name: "Sweater", category: "Tops", price: 600, size: "M", color: "Purple", rating: 3, image: "images/sweater.png" },
    { name: "shoe", category: "Shoes", price: 1000, size: "L", color: "Ash", rating: 4.5, image: "images/menshoe.png" },
    { name: "Pant", category: "Bottom", price: 1000, size: "M", color: "Blue", rating: 4.5, image: "images/kidopant.png" },
    { name: "shoe", category: "Shoes", price: 500, size: "L", color: "pink", rating: 4.5, image: "images/girlshoe.png" },
    { name: "jean", category: "Bottom", price: 1600, size: "L", color: "Blue", rating: 4.5, image: "images/girljean.png" },
    { name: "sweat shirt", category: "Tops", price: 700, size: "L", color: "pink,white", rating: 4.5, image: "images/girl.png" },
    { name: "frock", category: "Tops", price: 1400, size: "L", color: "Red", rating: 4.5, image: "images/babytop.png" },
    { name: "Shoe", category: "shoes", price: 1400, size: "L", color: "pink", rating: 5, image: "images/babyshoe.png" },
    { name: "Sweatshirt", category: "Tops", price: 1400, size: "L", color: "pink", rating: 4.5, image: "images/baby.png" },
    { name: "bag", category: "Bag", price: 1400, size: "M", color: "purple", rating: 5, image: "images/kbag1.png" },
    { name: "bag", category: "Bag", price: 1500, size: "L", color: "pink", rating: 4.5, image: "images/kbag2.png" },
    { name: "bag", category: "Bag", price: 400, size: "L", color: "pink", rating: 2, image: "images/wbag3.png" },
    { name: "Bag", category: "Bag", price: 1400, size: "L", color: "brown", rating: 4.5, image: "images/wbag1.png" },
    { name: "bag", category: "bag", price: 140, size: "L", color: "pink", rating: 4, image: "images/wbag2.png" },
    { name: "bag", category: "Bags", price: 1600, size: "s", color: "Green", rating: 4, image: "images/wbag4.png" },

    { name: "bag", category: "Bags", price: 1600, size: "s", color: "brown", rating: 3, image: "images/mbag1.png" },
    { name: "bag", category: "Bags", price: 1600, size: "s", color: "blue", rating: 4, image: "images/mbag2.png" },
    { name: "bag", category: "Bags", price: 1600, size: "s", color: "black", rating: 4, image: "images/mbag3.png" },
    
    
    
    
    
    // Add 40 more items here...
];

// Pagination setup
const ITEMS_PER_PAGE = 4;

// Handle GET requests to the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the Item Filter API");
});

// Route to handle filter requests with pagination
app.post("/api/items/filter", (req, res) => {
    const { category, priceRange, size, color, page = 1 } = req.body;
    let filteredItems = items;

    // Filter by category
    if (category) {
        filteredItems = filteredItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by price range
    if (priceRange && priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange;
        filteredItems = filteredItems.filter(item => item.price >= minPrice && item.price <= maxPrice);
    }

    // Filter by size
    if (size) {
        filteredItems = filteredItems.filter(item => item.size.toLowerCase() === size.toLowerCase());
    }

    // Filter by color
    if (color) {
        filteredItems = filteredItems.filter(item => item.color.toLowerCase() === color.toLowerCase());
    }

    // Pagination logic
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const currentPageItems = filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    res.json({ items: currentPageItems, totalPages });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
