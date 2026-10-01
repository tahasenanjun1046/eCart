// Get all products
let products = [];

storeData.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
        products.push(...subcategory.products);
    });
});


// Calculate popularity and sort products
function getPopularProducts(number) {

    let result = [...products];

    result.sort((a, b) => {
        return (b.rating * b.reviews) -
               (a.rating * a.reviews);
    });

    return result.slice(0, number);
}


// Display products
function showProducts(number) {

    let result = getPopularProducts(number);

    let container = document.getElementById("products");

    container.innerHTML = "";

    result.forEach((product, index) => {

        let popularity =
            product.rating * product.reviews;

        container.innerHTML += `

            <div class="card">

                <span class="rank">
                    #${index + 1}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <p class="rating">
                    ⭐ ${product.rating}
                </p>

                <p class="reviews">
                    ${product.reviews.toLocaleString("en-IN")}
                    reviews
                </p>

                <p class="popularity">
                    Popularity: ${Math.round(popularity)}
                </p>

            </div>

        `;
    });
}


// Change Top 3 / 5 / 10
document.getElementById("top-k").addEventListener("change", function() {

    showProducts(Number(this.value));

});


// Show Top 3 when page opens
showProducts(3);