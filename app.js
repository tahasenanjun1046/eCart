// ==========================================
// 1. GET ALL PRODUCTS
// ==========================================

const allProducts = [];

storeData.categories.forEach(category => {

    category.subcategories.forEach(subcategory => {

        subcategory.products.forEach(product => {

            allProducts.push(product);

        });

    });

});


// ==========================================
// 2. SORT PRODUCTS BY PRICE
// ==========================================

// We sort the products once.
//
// After sorting, binary search can be used
// to quickly find products near a target price.

const productsByPrice = [...allProducts].sort(
    (a, b) => a.price - b.price
);


// ==========================================
// 3. DISPLAY RESULTS
// ==========================================

function displayProducts(products, title) {

    const container =
        document.getElementById("results-container");

    const resultsTitle =
        document.getElementById("results-title");


    container.innerHTML = "";

    resultsTitle.textContent = title;


    // No results

    if (products.length === 0) {

        container.innerHTML = `

            <div class="empty">

                <h3>No products found</h3>

                <p>
                    Try another price or price range.
                </p>

            </div>

        `;

        return;
    }


    // Create product cards

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <p class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </p>

            <p>
                <strong>Brand:</strong>
                ${product.brand}
            </p>

            <p>
                ⭐ ${product.rating}
            </p>

            <button
                class="view-btn"
                onclick="viewProduct('${product.id}')">

                View Product

            </button>

        `;


        container.appendChild(card);

    });

}


// ==========================================
// 4. BINARY SEARCH
// ==========================================

// Find the first product whose price
// is greater than or equal to target.

function findFirstGreaterOrEqual(target) {

    let left = 0;

    let right = productsByPrice.length - 1;

    let answer = productsByPrice.length;


    while (left <= right) {

        const mid =
            Math.floor((left + right) / 2);


        if (productsByPrice[mid].price >= target) {

            answer = mid;

            right = mid - 1;

        } else {

            left = mid + 1;

        }

    }


    return answer;

}


// ==========================================
// 5. FIND CLOSEST PRODUCTS
// ==========================================

function findClosestProducts(targetPrice) {

    const index =
        findFirstGreaterOrEqual(targetPrice);


    const candidates = [];


    // Product at or after target

    if (index < productsByPrice.length) {

        candidates.push(
            productsByPrice[index]
        );

    }


    // Product before target

    if (index > 0) {

        candidates.push(
            productsByPrice[index - 1]
        );

    }


    // Sort candidates by distance
    // from target price.

    candidates.sort((a, b) => {

        return (
            Math.abs(a.price - targetPrice)
            -
            Math.abs(b.price - targetPrice)
        );

    });


    // We need 3 closest products.
    //
    // To get more than two candidates,
    // expand around the binary-search position.

    let left = index - 2;

    let right = index + 1;


    while (
        candidates.length < 3 &&
        (left >= 0 || right < productsByPrice.length)
    ) {

        if (left >= 0) {

            candidates.push(
                productsByPrice[left]
            );

            left--;

        }


        if (
            candidates.length < 3 &&
            right < productsByPrice.length
        ) {

            candidates.push(
                productsByPrice[right]
            );

            right++;

        }

    }


    // Remove duplicate products.

    const uniqueProducts = [];

    const usedIds = new Set();


    candidates
        .sort((a, b) => {

            return (
                Math.abs(a.price - targetPrice)
                -
                Math.abs(b.price - targetPrice)
            );

        })
        .forEach(product => {

            if (!usedIds.has(product.id)) {

                usedIds.add(product.id);

                uniqueProducts.push(product);

            }

        });


    return uniqueProducts.slice(0, 3);

}


// ==========================================
// 6. SEARCH BY TARGET PRICE
// ==========================================

document
    .getElementById("search-btn")
    .addEventListener("click", () => {

        const input =
            document.getElementById("target-price");


        const targetPrice =
            Number(input.value);


        if (!targetPrice || targetPrice < 0) {

            alert("Please enter a valid price.");

            return;
        }


        const results =
            findClosestProducts(targetPrice);


        displayProducts(
            results,
            `Closest Products to ₹${targetPrice.toLocaleString("en-IN")}`
        );

    });


// ==========================================
// 7. SEARCH BY PRICE RANGE
// ==========================================

document
    .getElementById("range-btn")
    .addEventListener("click", () => {

        const minInput =
            document.getElementById("min-price");


        const maxInput =
            document.getElementById("max-price");


        const minPrice =
            Number(minInput.value);


        const maxPrice =
            Number(maxInput.value);


        // Validate input

        if (
            !minInput.value ||
            !maxInput.value ||
            minPrice < 0 ||
            maxPrice < 0
        ) {

            alert(
                "Please enter both minimum and maximum prices."
            );

            return;
        }


        if (minPrice > maxPrice) {

            alert(
                "Minimum price cannot be greater than maximum price."
            );

            return;
        }


        // Find products in range.

        const results =
            productsByPrice.filter(product => {

                return (
                    product.price >= minPrice &&
                    product.price <= maxPrice
                );

            });


        displayProducts(
            results,
            `Products from ₹${minPrice.toLocaleString("en-IN")} to ₹${maxPrice.toLocaleString("en-IN")}`
        );

    });


// ==========================================
// 8. VIEW PRODUCT
// ==========================================

function viewProduct(productId) {

    const product =
        allProducts.find(
            product => product.id === productId
        );


    if (!product) {
        return;
    }

    alert(
        `${product.name}\n\n` +
        `Brand: ${product.brand}\n` +
        `Price: ₹${product.price.toLocaleString("en-IN")}\n` +
        `Rating: ⭐ ${product.rating}`
    );

}