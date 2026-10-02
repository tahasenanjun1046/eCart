let products = [];
let selected = -1;

storeData.categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
        products.push(...subcategory.products);
    });
});


// Search
document.getElementById("search").addEventListener("input", function () {

    let text = this.value.toLowerCase();
    let box = document.getElementById("suggestions");

    box.innerHTML = "";
    selected = -1;

    if (text === "") return;

    let result = products.filter(product => {

        let name = product.name.toLowerCase();
        let brand = product.brand.toLowerCase();
        let tags = product.tags.join(" ").toLowerCase();

        return name.includes(text) ||
               brand.includes(text) ||
               tags.includes(text);
    });

    result = result.slice(0, 5);

    if (result.length === 0) {
        box.innerHTML = `<div class="empty">No products found</div>`;
        return;
    }

    result.forEach(product => {

        let div = document.createElement("div");
        div.className = "suggestion";

        div.innerHTML = `
            <strong>${product.name}</strong>
            <br>
            <small>${product.brand} • ₹${product.price.toLocaleString("en-IN")}</small>
        `;

        div.onclick = function () {

            document.getElementById("search").value =
                product.name;

            box.innerHTML = "";

            showProduct(product);
        };

        box.appendChild(div);
    });
});


// Show selected product
function showProduct(product) {

    let old = document.getElementById("selected-product");

    if (old) old.remove();

    let div = document.createElement("div");

    div.id = "selected-product";
    div.className = "card";

    div.innerHTML = `
        <h2>${product.name}</h2>

        <p><b>Brand:</b> ${product.brand}</p>

        <p class="price">
            ₹${product.price.toLocaleString("en-IN")}
        </p>

        <p>⭐ ${product.rating}</p>

        <p>
            ${product.reviews.toLocaleString("en-IN")} reviews
        </p>

        <p>
            ${product.description || ""}
        </p>
    `;

    document.querySelector("main").appendChild(div);
}


// Keyboard navigation
document.getElementById("search").addEventListener("keydown", function (e) {

    let items = document.querySelectorAll(".suggestion");

    if (e.key === "ArrowDown") {
        selected++;

        if (selected >= items.length)
            selected = 0;
    }

    if (e.key === "ArrowUp") {
        selected--;

        if (selected < 0)
            selected = items.length - 1;
    }

    if (e.key === "Enter" && selected >= 0) {
        items[selected].click();
    }

    items.forEach(item =>
        item.classList.remove("active")
    );

    if (items[selected])
        items[selected].classList.add("active");
});