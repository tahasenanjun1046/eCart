// Get all products
let products = [];

storeData.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
        products.push(...subcategory.products);
    });
});


// Search products
function search() {
    let min = Number(document.getElementById("min").value);
    let max = Number(document.getElementById("max").value);
    if (min > max) {
        alert("Minimum price cannot be greater than maximum price");
        return;
    }

    showProducts(min, max);
}


// Show products
function showProducts(min, max) {
    let result = products.filter(product =>
        product.price >= min && product.price <= max
    );
    let total = 0;

    document.getElementById("products").innerHTML = "";
    result.forEach(product => {
        total += product.price * product.stock;
        document.getElementById("products").innerHTML += `
            <div class="card">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
                <p>Brand: ${product.brand}</p>
                <p>Rating: ⭐ ${product.rating}</p>
                <p>Stock: ${product.stock}</p>
            </div>
        `;
    });

    document.getElementById("count").innerText = result.length;
    document.getElementById("value").innerText =
        "₹" + total.toLocaleString("en-IN");
}


// Slider
function sliderSearch() {
    let min = Number(document.getElementById("minSlider").value);
    let max = Number(document.getElementById("maxSlider").value);
    if (min > max) return;
    document.getElementById("minValue").innerText =
        min.toLocaleString("en-IN");
    document.getElementById("maxValue").innerText =
        max.toLocaleString("en-IN");

    showProducts(min, max);
}


// Show all products when page opens
showProducts(0, 150000);