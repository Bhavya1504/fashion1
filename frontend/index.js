document.getElementById("apply-filters").addEventListener("click", async () => {
    const category = document.getElementById("category").value;
    const minPrice = document.getElementById("min-price").value;
    const maxPrice = document.getElementById("max-price").value;
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    const filters = {};
    if (category) filters.category = category;
    if (minPrice && maxPrice) filters.priceRange = [parseFloat(minPrice), parseFloat(maxPrice)];
    else if (minPrice) filters.priceRange = [parseFloat(minPrice), Infinity];
    else if (maxPrice) filters.priceRange = [0, parseFloat(maxPrice)];
    if (size) filters.size = size;
    if (color) filters.color = color;

    localStorage.setItem("filters", JSON.stringify(filters));

    try {
        const response = await fetch("http://localhost:5000/api/items/filter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filters),
        });

        if (response.ok) {
            const data = await response.json();
            displayItems(data.items);
            setupPagination(data.totalPages);
        } else {
            console.error(`Error: Failed to fetch filtered items. Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching filtered items:", error);
    }
});

function displayItems(items) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (items.length === 0) {
        resultsContainer.innerHTML = "<p>No items found matching the filters.</p>";
        return;
    }

    items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image"/>
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p>Price: $${item.price}</p>
            <p>Size: ${item.size}</p>
            <p>Color: ${item.color}</p>
            <p>Rating: ${getStarRating(item.rating)}</p>
        `;
        resultsContainer.appendChild(itemElement);
    });
}

function getStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;

    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }

    
    if (halfStars) {
        stars += '🌗'; 
    }

    
    const emptyStars = 5 - (fullStars + halfStars);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }

    return stars;
}

function setupPagination(totalPages) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; 

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", async () => {
            const filters = JSON.parse(localStorage.getItem("filters")) || {};
            filters.page = i;
            try {
                const response = await fetch("http://localhost:5000/api/items/filter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(filters),
                });

                if (response.ok) {
                    const data = await response.json();
                    displayItems(data.items);
                }
            } catch (error) {
                console.error("Error fetching filtered items:", error);
            }
        });
        paginationContainer.appendChild(pageButton);
    }
}
