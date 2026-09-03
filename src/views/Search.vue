<script>
import AppFooter from "../components/AppFooter.vue";

export default {
    name: "Search",

    components: {
        AppFooter,
    },

    data() {
        return {
            products: [],
            searchQuery: "",
            loading: false,
            error: "",

            currentPage: 1,
            productsPerPage: 12,
            totalProducts: 0,

            // ================= FILTERS =================

            selectedCategories: [],
            selectedBrands: [],
            selectedRating: 0,

            minPrice: "",
            maxPrice: "",

            productTypeOpen: true,
            brandOpen: true,
            ratingOpen: true,

            // ================= SORT =================

            sortBy: "relevance",
        };
    },

    computed: {
        // ================= PAGINATION =================

        totalPages() {
            return Math.ceil(this.totalProducts / this.productsPerPage);
        },

        visiblePages() {
            const pages = [];

            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }

            return pages;
        },

        // ================= CATEGORIES =================

        availableCategories() {
            const categories = this.products
                .map((product) => product.category)
                .filter(Boolean);

            return [...new Set(categories)];
        },

        // ================= BRANDS =================

        availableBrands() {
            const brands = this.products
                .map((product) => product.brand)
                .filter(Boolean);

            return [...new Set(brands)].sort();
        },

        // ================= FILTERED PRODUCTS =================

        filteredProducts() {
            let result = [...this.products];

            // Product Type
            if (this.selectedCategories.length > 0) {
                result = result.filter((product) =>
                    this.selectedCategories.includes(product.category),
                );
            }

            // Brand
            if (this.selectedBrands.length > 0) {
                result = result.filter((product) =>
                    this.selectedBrands.includes(product.brand),
                );
            }

            // Minimum Price
            if (this.minPrice !== "") {
                result = result.filter(
                    (product) => Number(product.price) >= Number(this.minPrice),
                );
            }

            // Maximum Price
            if (this.maxPrice !== "") {
                result = result.filter(
                    (product) => Number(product.price) <= Number(this.maxPrice),
                );
            }

            // Rating
            if (this.selectedRating > 0) {
                result = result.filter(
                    (product) =>
                        Number(product.rating) >= Number(this.selectedRating),
                );
            }

            return result;
        },
    },

    watch: {
        "$route.query.q": {
            immediate: true,

            handler(newQuery) {
                this.searchQuery = newQuery || "";
                this.currentPage = 1;

                // Reset filters when searching for something new
                this.resetFilters();

                if (this.searchQuery.trim()) {
                    this.fetchProducts();
                } else {
                    this.products = [];
                    this.totalProducts = 0;
                }
            },
        },
    },

    methods: {
        // ================= FETCH PRODUCTS =================

        async fetchProducts() {
            this.loading = true;
            this.error = "";

            try {
                const skip = (this.currentPage - 1) * this.productsPerPage;

                const url =
                    `https://dummyjson.com/products/search` +
                    `?q=${encodeURIComponent(this.searchQuery)}` +
                    `&limit=${this.productsPerPage}` +
                    `&skip=${skip}`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                this.products = data.products || [];
                this.totalProducts = data.total || 0;

                this.applySorting();
            } catch (error) {
                console.error(error);

                this.error = "Something went wrong while loading the products.";

                this.products = [];
                this.totalProducts = 0;
            } finally {
                this.loading = false;
            }
        },

        // ================= PAGINATION =================

        goToPage(page) {
            if (page < 1 || page > this.totalPages) {
                return;
            }

            this.currentPage = page;

            this.fetchProducts();

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.goToPage(this.currentPage + 1);
            }
        },

        previousPage() {
            if (this.currentPage > 1) {
                this.goToPage(this.currentPage - 1);
            }
        },

        // ================= SORT =================

        changeSort() {
            this.applySorting();
        },

        applySorting() {
            if (this.sortBy === "price-low") {
                this.products.sort((a, b) => a.price - b.price);
            }

            if (this.sortBy === "price-high") {
                this.products.sort((a, b) => b.price - a.price);
            }

            if (this.sortBy === "rating") {
                this.products.sort((a, b) => b.rating - a.rating);
            }
        },

        // ================= RESET FILTERS =================

        resetFilters() {
            this.selectedCategories = [];
            this.selectedBrands = [];
            this.selectedRating = 0;

            this.minPrice = "";
            this.maxPrice = "";
        },

        // ================= CART =================

        addToCart(product) {
            console.log("Added to cart:", product);

            // Later we can connect this with the real cart.
        },

        // ================= FORMAT PRICE =================

        formatPrice(price) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);
        },

        // ================= PRODUCT CATEGORY =================

        getProductCategory(product) {
            if (!product.category) {
                return "Electronics";
            }

            return product.category
                .replaceAll("-", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
        },

        // ================= PRODUCT FEATURE =================

        getProductFeature(product) {
            if (product.brand) {
                return product.brand;
            }

            if (product.category) {
                return this.getProductCategory(product);
            }

            return "High Performance";
        },
    },
};
</script>

<template>
    <main class="search-page">
        <!-- ================= SEARCH CONTENT ================= -->

        <section class="search-section">
            <div class="container-fluid px-4 px-lg-5">
                <div class="row g-4">
                    <!-- ================= FILTERS ================= -->

                    <aside class="col-lg-3 col-xl-3">
                        <div class="filters-card">
                            <div class="filters-header">
                                <h2>Filters</h2>
                            </div>

                            <!-- ================= PRODUCT TYPE ================= -->

                            <!-- ================= PRODUCT TYPE ================= -->

                            <div class="filter-group">
                                <div
                                    class="filter-title"
                                    @click="productTypeOpen = !productTypeOpen"
                                >
                                    <span>Product Type</span>

                                    <i
                                        class="bi"
                                        :class="
                                            productTypeOpen
                                                ? 'bi-chevron-up'
                                                : 'bi-chevron-down'
                                        "
                                    ></i>
                                </div>

                                <div v-show="productTypeOpen">
                                    <!-- All Products -->
                                    <label class="filter-option">
                                        <input
                                            type="checkbox"
                                            :checked="
                                                selectedCategories.length === 0
                                            "
                                            @change="selectedCategories = []"
                                        />

                                        <span>All Products</span>
                                    </label>

                                    <!-- Dynamic Categories -->
                                    <label
                                        v-for="category in availableCategories"
                                        :key="category"
                                        class="filter-option"
                                    >
                                        <input
                                            type="checkbox"
                                            :value="category"
                                            v-model="selectedCategories"
                                        />

                                        <span>
                                            {{
                                                category
                                                    .replaceAll("-", " ")
                                                    .replace(/\b\w/g, (char) =>
                                                        char.toUpperCase(),
                                                    )
                                            }}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <!-- ================= BRAND ================= -->

                            <!-- ================= BRAND ================= -->

                            <div
                                v-if="availableBrands.length > 0"
                                class="filter-group"
                            >
                                <div
                                    class="filter-title"
                                    @click="brandOpen = !brandOpen"
                                >
                                    <span>Brand</span>

                                    <i
                                        class="bi"
                                        :class="
                                            brandOpen
                                                ? 'bi-chevron-up'
                                                : 'bi-chevron-down'
                                        "
                                    ></i>
                                </div>

                                <div v-show="brandOpen">
                                    <!-- All Brands -->
                                    <label class="filter-option">
                                        <input
                                            type="checkbox"
                                            :checked="
                                                selectedBrands.length === 0
                                            "
                                            @change="selectedBrands = []"
                                        />

                                        <span>All Brands</span>
                                    </label>

                                    <!-- Dynamic Brands -->
                                    <label
                                        v-for="brand in availableBrands"
                                        :key="brand"
                                        class="filter-option"
                                    >
                                        <input
                                            type="checkbox"
                                            :value="brand"
                                            v-model="selectedBrands"
                                        />

                                        <span>{{ brand }}</span>
                                    </label>
                                </div>
                            </div>
                            <!-- ================= RATING ================= -->

                            <div class="filter-group">
                                <div
                                    class="filter-title"
                                    @click="ratingOpen = !ratingOpen"
                                >
                                    <span>Rating</span>

                                    <i
                                        class="bi"
                                        :class="
                                            ratingOpen
                                                ? 'bi-chevron-up'
                                                : 'bi-chevron-down'
                                        "
                                    ></i>
                                </div>

                                <div v-show="ratingOpen">
                                    <label class="filter-option">
                                        <input
                                            type="radio"
                                            name="rating"
                                            :value="0"
                                            v-model="selectedRating"
                                        />

                                        <span>All Ratings</span>
                                    </label>

                                    <label class="filter-option">
                                        <input
                                            type="radio"
                                            name="rating"
                                            :value="4"
                                            v-model="selectedRating"
                                        />

                                        <span>4+ Stars</span>
                                    </label>

                                    <label class="filter-option">
                                        <input
                                            type="radio"
                                            name="rating"
                                            :value="3"
                                            v-model="selectedRating"
                                        />

                                        <span>3+ Stars</span>
                                    </label>

                                    <label class="filter-option">
                                        <input
                                            type="radio"
                                            name="rating"
                                            :value="2"
                                            v-model="selectedRating"
                                        />

                                        <span>2+ Stars</span>
                                    </label>

                                    <label class="filter-option">
                                        <input
                                            type="radio"
                                            name="rating"
                                            :value="1"
                                            v-model="selectedRating"
                                        />

                                        <span>1+ Stars</span>
                                    </label>
                                </div>
                            </div>
                            <!-- ================= CLEAR FILTERS ================= -->

                            <div class="filter-group">
                                <button
                                    type="button"
                                    class="btn btn-dark w-100"
                                    @click="resetFilters"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    <!-- ================= PRODUCTS ================= -->

                    <div class="col-lg-9 col-xl-9">
                        <!-- Header -->
                        <div class="results-header">
                            <div>
                                <h1>Search results for: "{{ searchQuery }}"</h1>

                                <span class="results-count">
                                    SHOWING
                                    {{ totalProducts }}
                                    ITEMS
                                </span>
                            </div>

                            <select
                                v-model="sortBy"
                                class="sort-select"
                                @change="changeSort"
                            >
                                <option value="relevance">Relevance</option>

                                <option value="price-low">
                                    Price: Low to High
                                </option>

                                <option value="price-high">
                                    Price: High to Low
                                </option>

                                <option value="rating">Rating</option>
                            </select>
                        </div>

                        <!-- Loading -->
                        <div v-if="loading" class="loading-state">
                            <div class="spinner-border" role="status"></div>

                            <p>Loading products...</p>
                        </div>

                        <!-- Error -->
                        <div v-else-if="error" class="error-state">
                            <i class="bi bi-exclamation-circle"></i>

                            <p>{{ error }}</p>

                            <button class="retry-button" @click="fetchProducts">
                                Try Again
                            </button>
                        </div>

                        <!-- No Results -->
                        <div
                            v-else-if="products.length === 0"
                            class="empty-state"
                        >
                            <i class="bi bi-search"></i>

                            <h3>No products found</h3>

                            <p>Try searching for another product.</p>
                        </div>

                        <!-- Product Grid -->
                        <div v-else class="products-grid">
                            <article
                                v-for="product in filteredProducts"
                                :key="product.id"
                                class="product-card"
                            >
                                <!-- Product Image -->
                                <div class="product-image-wrapper">
                                    <img
                                        :src="product.thumbnail"
                                        :alt="product.title"
                                        class="product-image"
                                    />

                                    <span
                                        v-if="product.discountPercentage > 15"
                                        class="product-badge"
                                    >
                                        SALE
                                    </span>
                                </div>

                                <!-- Product Content -->
                                <div class="product-content">
                                    <span class="product-category">
                                        {{ getProductCategory(product) }}
                                    </span>

                                    <h2 class="product-title">
                                        {{ product.title }}
                                    </h2>

                                    <div class="product-feature">
                                        <i class="bi bi-cpu"></i>

                                        <span>
                                            {{ getProductFeature(product) }}
                                        </span>
                                    </div>

                                    <div class="product-bottom">
                                        <strong class="product-price">
                                            {{ formatPrice(product.price) }}
                                        </strong>

                                        <button
                                            class="add-cart-button"
                                            type="button"
                                            @click="addToCart(product)"
                                            aria-label="Add to cart"
                                        >
                                            <i class="bi bi-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <!-- Pagination -->
                        <div v-if="totalPages > 1" class="pagination">
                            <button
                                class="pagination-arrow"
                                :disabled="currentPage === 1"
                                @click="previousPage"
                            >
                                <i class="bi bi-chevron-left"></i>
                            </button>

                            <button
                                v-for="page in visiblePages"
                                :key="page"
                                class="pagination-number"
                                :class="{
                                    active: currentPage === page,
                                }"
                                @click="goToPage(page)"
                            >
                                {{ page }}
                            </button>

                            <button
                                class="pagination-arrow"
                                :disabled="currentPage === totalPages"
                                @click="nextPage"
                            >
                                <i class="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= GLOBAL FOOTER ================= -->

        <AppFooter />
    </main>
</template>

<style scoped>
/* ================= PAGE ================= */

.search-page {
    min-height: 100vh;
    background: #faf8fa;
    color: #202020;
}

/* ================= SEARCH SECTION ================= */

.search-section {
    padding: 30px 0 85px;
}

/* ================= FILTERS ================= */

.filters-card {
    background: #ffffff;
    border: 1px solid #cfcfd3;
    border-radius: 4px;
    overflow: hidden;
}

.filters-header {
    padding: 20px 16px 15px;
}

.filters-header h2 {
    margin: 0;
    font-size: 21px;
    font-weight: 700;
}

.filters-header::after {
    content: "";
    display: block;
    height: 1px;
    background: #c9c9cd;
    margin-top: 12px;
}

.filter-group {
    margin: 0 16px;
    padding: 18px 0;
    border-bottom: 1px solid #cfcfd3;
}

.filter-group:last-child {
    border-bottom: none;
}

.filter-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 15px;

    font-size: 17px;
    font-weight: 700;
}

.filter-title i {
    font-size: 12px;
    color: #aaa;
}

.filter-option {
    display: flex;
    align-items: center;
    gap: 9px;

    margin-bottom: 12px;

    color: #5b5c62;
    font-size: 14px;

    cursor: pointer;
}

.filter-option:last-child {
    margin-bottom: 0;
}

.filter-option input {
    appearance: none;

    width: 16px;
    height: 16px;

    border: 1px solid #c8c9ce;
    border-radius: 2px;

    background: #ffffff;

    cursor: pointer;
}

.filter-option input:checked {
    background: #111;
    border-color: #111;

    position: relative;
}

.filter-option input:checked::after {
    content: "✓";

    position: absolute;

    left: 2px;
    top: -2px;

    color: white;

    font-size: 12px;
    font-weight: 700;
}

/* ================= RESULTS HEADER ================= */

.results-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    gap: 25px;

    border-bottom: 1px solid #cfcfd3;

    padding: 0 0 15px;
    margin-bottom: 22px;
}

.results-header h1 {
    margin: 0 0 8px;

    font-size: clamp(30px, 3vw, 40px);
    line-height: 1.1;

    font-weight: 700;
    letter-spacing: -1px;
}

.results-count {
    color: #5f6470;

    font-family: monospace;
    font-size: 11px;
    font-weight: 600;

    letter-spacing: 2px;
}

.sort-select {
    width: 162px;
    height: 38px;

    padding: 0 12px;

    border: 1px solid #c8c8cd;
    border-radius: 2px;

    background: #ffffff;

    color: #333;

    font-size: 13px;

    cursor: pointer;
}

/* ================= PRODUCT GRID ================= */

.products-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 16px;
}

/* ================= PRODUCT CARD ================= */

.product-card {
    background: #ffffff;

    border: 1px solid #c8c9cd;
    border-radius: 4px;

    overflow: hidden;

    min-width: 0;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.product-card:hover {
    transform: translateY(-2px);

    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.06);
}

/* ================= IMAGE ================= */

.product-image-wrapper {
    position: relative;

    height: 155px;

    margin: 15px 15px 0;

    background: #f3f4f5;

    overflow: hidden;
}

.product-image {
    width: 100%;
    height: 100%;

    object-fit: contain;

    display: block;
}

.product-badge {
    position: absolute;

    top: 8px;
    left: 8px;

    padding: 5px 8px;

    background: #111;
    color: #fff;

    font-size: 10px;
    font-weight: 700;

    letter-spacing: 1px;
}

/* ================= PRODUCT CONTENT ================= */

.product-content {
    padding: 14px 15px 15px;
}

.product-category {
    display: block;

    margin-bottom: 5px;

    color: #60636a;

    font-family: monospace;
    font-size: 11px;
    font-weight: 600;

    letter-spacing: 1.5px;
}

.product-title {
    min-height: 46px;

    margin: 0 0 10px;

    color: #222;

    font-size: 18px;
    line-height: 1.2;

    font-weight: 700;
}

.product-feature {
    display: flex;
    align-items: center;
    gap: 6px;

    min-height: 28px;

    color: #586a84;

    font-family: monospace;
    font-size: 10px;
    font-weight: 600;

    text-transform: uppercase;
    letter-spacing: 1px;
}

.product-feature i {
    font-size: 12px;
}

.product-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 12px;
}

.product-price {
    color: #202020;

    font-size: 20px;
    font-weight: 700;
}

.add-cart-button {
    width: 36px;
    height: 36px;

    border: none;
    border-radius: 2px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #050505;
    color: #ffffff;

    font-size: 17px;

    cursor: pointer;

    transition: 0.2s ease;
}

.add-cart-button:hover {
    background: #333;
    transform: translateY(-1px);
}

/* ================= PAGINATION ================= */

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 8px;

    margin-top: 32px;
}

.pagination-number,
.pagination-arrow {
    width: 34px;
    height: 34px;

    border: none;

    background: transparent;

    color: #222;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    font-size: 14px;
}

.pagination-number.active {
    background: #050505;
    color: #ffffff;
}

.pagination-arrow:disabled {
    color: #c7c7c7;
    cursor: not-allowed;
}

.pagination-arrow:hover:not(:disabled),
.pagination-number:hover:not(.active) {
    background: #eeeeee;
}

/* ================= LOADING ================= */

.loading-state {
    min-height: 350px;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    gap: 15px;
}

.loading-state p {
    margin: 0;

    color: #666;

    font-size: 14px;
}

/* ================= ERROR ================= */

.error-state,
.empty-state {
    min-height: 350px;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    text-align: center;
}

.error-state i,
.empty-state i {
    font-size: 38px;
    margin-bottom: 15px;
}

.error-state p,
.empty-state p {
    color: #666;
    margin: 0 0 15px;
}

.empty-state h3 {
    margin-bottom: 8px;
}

.retry-button {
    border: none;

    background: #111;
    color: white;

    padding: 10px 20px;

    cursor: pointer;
}

/* ================= TABLET ================= */

@media (max-width: 991.98px) {
    .products-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .results-header {
        align-items: center;
    }

    .results-header h1 {
        font-size: 30px;
    }
}

/* ================= MOBILE ================= */

@media (max-width: 767.98px) {
    .search-section {
        padding: 20px 0 50px;
    }

    .filters-card {
        margin-bottom: 10px;
    }

    .results-header {
        flex-direction: column;
        align-items: stretch;
    }

    .results-header h1 {
        font-size: 28px;
    }

    .sort-select {
        width: 100%;
    }

    .products-grid {
        grid-template-columns: 1fr;
    }

    .product-image-wrapper {
        height: 220px;
    }

    .product-title {
        font-size: 19px;
    }

    .pagination {
        margin-top: 25px;
    }
}
</style>
