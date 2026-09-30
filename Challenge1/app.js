// Get all products from data.js
const products = [];

storeData.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
        subcategory.products.forEach(product => {
            products.push(product);
        });
    });
});


// Display products
function showProducts(list, title) {

    document.getElementById("result-title").textContent = title;

    const container = document.getElementById("products-container");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <h3>No products found</h3>
                <p>Try another price.</p>
            </div>
        `;
        return;
    }

    list.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Rating:</strong> ⭐ ${product.rating}</p>

            <button
                class="view-btn"
                onclick="viewProduct('${product.id}')">
                View Product
            </button>
        `;

        container.appendChild(card);
    });
}


// Find 3 closest products
function findClosest(target) {

    const result = [...products];

    result.sort((a, b) => {
        return Math.abs(a.price - target)
             - Math.abs(b.price - target);
    });

    return result.slice(0, 3);
}


// Target price search
document.getElementById("search-btn").addEventListener("click", () => {

    const input = document.getElementById("target-price");
    const target = Number(input.value);

    if (input.value === "" || target < 0) {
        alert("Please enter a valid price.");
        return;
    }

    const result = findClosest(target);

    showProducts(result, "Closest Products");
});


// Price range search
document.getElementById("range-btn").addEventListener("click", () => {

    const min = Number(document.getElementById("min-price").value);
    const max = Number(document.getElementById("max-price").value);

    if (min < 0 || max < 0 || min > max) {
        alert("Please enter a valid price range.");
        return;
    }

    const result = products.filter(product =>
        product.price >= min && product.price <= max
    );

    showProducts(result, "Products in This Price Range");
});


// View product
function viewProduct(id) {

    const product = products.find(product => product.id === id);

    if (product) {
        alert(
            "Product: " + product.name +
            "\nBrand: " + product.brand +
            "\nPrice: ₹" + product.price.toLocaleString("en-IN") +
            "\nRating: ⭐ " + product.rating
        );
    }
}