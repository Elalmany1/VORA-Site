<script>
import AppFooter from "../components/AppFooter.vue";
import ProductsComponent from "../components/ProductsComponent.vue";
import { fetchApi } from "../services/fetchApi";

export default {
    name: "Search",

    components: {
        AppFooter,
        ProductsComponent,
    },

    data() {
        return {
            allProducts: [],

            searchQuery: "",

            loading: false,
            error: "",

            currentPage: 1,
            productsPerPage: 12,

            selectedCategories: [],
            selectedBrands: [],
            selectedRating: 0,

            minPrice: "",
            maxPrice: "",

            productTypeOpen: false,
            brandOpen: false,
            ratingOpen: false,

            sortBy: "relevance",
        };
    },

    computed: {
        /*
        |--------------------------------------------------------------------------
        | Available Categories
        |--------------------------------------------------------------------------
        */

        availableCategories() {
            const categories = this.allProducts
                .map((product) => product.category)
                .filter(Boolean);

            return [...new Set(categories)].sort();
        },

        /*
        |--------------------------------------------------------------------------
        | Available Brands
        |--------------------------------------------------------------------------
        */

        availableBrands() {
            const brands = this.allProducts
                .map((product) => product.brand)
                .filter(Boolean);

            return [...new Set(brands)].sort();
        },

        /*
        |--------------------------------------------------------------------------
        | Filter Products
        |--------------------------------------------------------------------------
        */

        filteredProducts() {
            let result = [...this.allProducts];

            // Category
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

        /*
        |--------------------------------------------------------------------------
        | Sorted Products
        |--------------------------------------------------------------------------
        */

        sortedProducts() {
            const result = [...this.filteredProducts];

            if (this.sortBy === "price-low") {
                result.sort((a, b) => Number(a.price) - Number(b.price));
            }

            if (this.sortBy === "price-high") {
                result.sort((a, b) => Number(b.price) - Number(a.price));
            }

            if (this.sortBy === "rating") {
                result.sort((a, b) => Number(b.rating) - Number(a.rating));
            }

            return result;
        },

        /*
        |--------------------------------------------------------------------------
        | Total Products
        |--------------------------------------------------------------------------
        */

        totalProducts() {
            return this.sortedProducts.length;
        },

        /*
        |--------------------------------------------------------------------------
        | Total Pages
        |--------------------------------------------------------------------------
        */

        totalPages() {
            return Math.ceil(this.totalProducts / this.productsPerPage);
        },

        /*
        |--------------------------------------------------------------------------
        | Pagination
        |--------------------------------------------------------------------------
        */

        paginatedProducts() {
            const start = (this.currentPage - 1) * this.productsPerPage;

            const end = start + this.productsPerPage;

            return this.sortedProducts.slice(start, end);
        },

        /*
        |--------------------------------------------------------------------------
        | Visible Pages
        |--------------------------------------------------------------------------
        */

        visiblePages() {
            const pages = [];

            let start = Math.max(1, this.currentPage - 1);
            let end = Math.min(this.totalPages, start + 2);

            if (end - start < 2) {
                start = Math.max(1, end - 2);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;
        },
    },

    watch: {
        /*
        |--------------------------------------------------------------------------
        | Search Query
        |--------------------------------------------------------------------------
        */

        "$route.query.q": {
            immediate: true,

            handler(newQuery) {
                this.searchQuery = newQuery || "";

                this.currentPage = 1;

                this.resetFilters();

                this.fetchProducts();
            },
        },

        /*
        |--------------------------------------------------------------------------
        | Filters
        |--------------------------------------------------------------------------
        */

        selectedCategories: {
            deep: true,

            handler() {
                this.currentPage = 1;
            },
        },

        selectedBrands: {
            deep: true,

            handler() {
                this.currentPage = 1;
            },
        },

        selectedRating() {
            this.currentPage = 1;
        },

        minPrice() {
            this.currentPage = 1;
        },

        maxPrice() {
            this.currentPage = 1;
        },

        sortBy() {
            this.currentPage = 1;
        },
    },

    methods: {
        /*
        |--------------------------------------------------------------------------
        | Fetch All Search Results
        |--------------------------------------------------------------------------
        */

        async fetchProducts() {
            this.loading = true;
            this.error = "";

            try {
                let endpoint;

                if (this.searchQuery.trim()) {
                    endpoint =
                        `/products/search` +
                        `?q=${encodeURIComponent(this.searchQuery)}` +
                        `&limit=0`;
                } else {
                    endpoint = `/products?limit=0`;
                }

                const data = await fetchApi(endpoint);

                this.allProducts = data.products || [];
            } catch (error) {
                console.error(error);

                this.error = "Something went wrong while loading the products.";

                this.allProducts = [];
            } finally {
                this.loading = false;
            }
        },

        /*
        |--------------------------------------------------------------------------
        | Pagination
        |--------------------------------------------------------------------------
        */

        goToPage(page) {
            if (page < 1 || page > this.totalPages) {
                return;
            }

            this.currentPage = page;

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

        /*
        |--------------------------------------------------------------------------
        | Filters
        |--------------------------------------------------------------------------
        */

        resetFilters() {
            this.selectedCategories = [];
            this.selectedBrands = [];
            this.selectedRating = 0;

            this.minPrice = "";
            this.maxPrice = "";

            this.sortBy = "relevance";
        },

        clearAllFilters() {
            this.resetFilters();
        },

        /*
        |--------------------------------------------------------------------------
        | Cart
        |--------------------------------------------------------------------------
        */

        addToCart(product) {
            console.log("Added to cart:", product);

            // Later:
            // cart logic
        },

        /*
        |--------------------------------------------------------------------------
        | Product Details
        |--------------------------------------------------------------------------
        */

        viewProductDetails(product) {
            console.log("View product:", product);

            // Later:
            // this.$router.push(...)
        },

        /*
        |--------------------------------------------------------------------------
        | Retry
        |--------------------------------------------------------------------------
        */

        retryFetch() {
            this.fetchProducts();
        },

        viewDetails(product) {
            this.$router.push({
                name: "product-details",
                params: {
                    id: product.id,
                },
            });
        },
    },
};
</script>

<template>
    <main class="search-page">
        <section class="search-section">
            <div class="container-fluid">
                <div class="row g-4">
                    <!-- ================================================= -->
                    <!-- FILTERS -->
                    <!-- ================================================= -->

                    <aside class="col-4 col-md-4 col-lg-3">
                        <div class="filters-card">
                            <!-- Header -->

                            <div class="filters-header">
                                <h2>Filters</h2>

                                <button
                                    type="button"
                                    class="clear-filter-btn"
                                    @click="clearAllFilters"
                                >
                                    Clear
                                </button>
                            </div>

                            <!-- ================================================= -->
                            <!-- PRODUCT TYPE -->
                            <!-- ================================================= -->

                            <div class="filter-group">
                                <button
                                    type="button"
                                    class="filter-title"
                                    @click="productTypeOpen = !productTypeOpen"
                                >
                                    <span> Product Type </span>

                                    <span>
                                        {{ productTypeOpen ? "−" : "+" }}
                                    </span>
                                </button>

                                <div
                                    v-show="productTypeOpen"
                                    class="filter-options"
                                >
                                    <!-- All Products -->

                                    <label class="filter-option">
                                        <input
                                            type="checkbox"
                                            :checked="
                                                selectedCategories.length === 0
                                            "
                                            @change="selectedCategories = []"
                                        />

                                        <span> All Products </span>
                                    </label>

                                    <!-- Categories -->

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
                                            {{ category.replaceAll("-", " ") }}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <!-- ================================================= -->
                            <!-- BRAND -->
                            <!-- ================================================= -->

                            <div
                                v-if="availableBrands.length"
                                class="filter-group"
                            >
                                <button
                                    type="button"
                                    class="filter-title"
                                    @click="brandOpen = !brandOpen"
                                >
                                    <span> Brand </span>

                                    <span>
                                        {{ brandOpen ? "−" : "+" }}
                                    </span>
                                </button>

                                <div v-show="brandOpen" class="filter-options">
                                    <!-- All Brands -->

                                    <label class="filter-option">
                                        <input
                                            type="checkbox"
                                            :checked="
                                                selectedBrands.length === 0
                                            "
                                            @change="selectedBrands = []"
                                        />

                                        <span> All Brands </span>
                                    </label>

                                    <!-- Brands -->

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

                                        <span>
                                            {{ brand }}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <!-- ================================================= -->
                            <!-- RATING -->
                            <!-- ================================================= -->

                            <div class="filter-group">
                                <button
                                    type="button"
                                    class="filter-title"
                                    @click="ratingOpen = !ratingOpen"
                                >
                                    <span> Rating </span>

                                    <span>
                                        {{ ratingOpen ? "−" : "+" }}
                                    </span>
                                </button>

                                <div v-show="ratingOpen" class="filter-options">
                                    <label class="filter-option">
                                        <input
                                            type="radio"
                                            :value="0"
                                            v-model="selectedRating"
                                        />

                                        <span> All Ratings </span>
                                    </label>

                                    <label
                                        v-for="rating in [4, 3, 2, 1]"
                                        :key="rating"
                                        class="filter-option"
                                    >
                                        <input
                                            type="radio"
                                            :value="rating"
                                            v-model="selectedRating"
                                        />

                                        <span> {{ rating }}+ Stars </span>
                                    </label>
                                </div>
                            </div>

                            <!-- ================================================= -->
                            <!-- PRICE -->
                            <!-- ================================================= -->

                            <div class="filter-group">
                                <div class="filter-title static">
                                    <span> Price </span>
                                </div>

                                <div class="price-inputs">
                                    <input
                                        v-model="minPrice"
                                        type="number"
                                        min="0"
                                        placeholder="Min"
                                    />

                                    <input
                                        v-model="maxPrice"
                                        type="number"
                                        min="0"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    <!-- ================================================= -->
                    <!-- PRODUCTS -->
                    <!-- ================================================= -->

                    <div class="col-8 col-md-8 col-lg-9">
                        <!-- Results Header -->

                        <div class="results-header">
                            <div>
                                <h1>
                                    {{
                                        searchQuery.trim()
                                            ? `Search results for "${searchQuery}"`
                                            : "All Products"
                                    }}
                                </h1>

                                <p>
                                    {{ totalProducts }}
                                    products found
                                </p>
                            </div>

                            <select v-model="sortBy" class="sort-select">
                                <option value="relevance">Relevance</option>

                                <option value="price-low">
                                    Price: Low to High
                                </option>

                                <option value="price-high">
                                    Price: High to Low
                                </option>

                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        <!-- ================================================= -->
                        <!-- LOADING -->
                        <!-- ================================================= -->

                        <div v-if="loading" class="loading-state">
                            <div class="spinner"></div>

                            <p>Loading products...</p>
                        </div>

                        <!-- ================================================= -->
                        <!-- ERROR -->
                        <!-- ================================================= -->

                        <div v-else-if="error" class="error-state">
                            <h3>Something went wrong</h3>

                            <p>
                                {{ error }}
                            </p>

                            <button type="button" @click="retryFetch">
                                Try Again
                            </button>
                        </div>

                        <!-- ================================================= -->
                        <!-- EMPTY -->
                        <!-- ================================================= -->

                        <div
                            v-else-if="totalProducts === 0"
                            class="empty-state"
                        >
                            <h3>No products found</h3>

                            <p>Try changing your search or filters.</p>
                        </div>

                        <!-- ================================================= -->
                        <!-- PRODUCTS COMPONENT -->
                        <!-- ================================================= -->

                        <ProductsComponent
                            v-else
                            :products="paginatedProducts"
                            @add-to-cart="addToCart"
                            @view-details="viewDetails"
                        />

                        <!-- ================================================= -->
                        <!-- PAGINATION -->
                        <!-- ================================================= -->

                        <nav
                            v-if="!loading && !error && totalPages > 1"
                            class="pagination"
                            aria-label="Product pagination"
                        >
                            <button
                                type="button"
                                :disabled="currentPage === 1"
                                @click="previousPage"
                            >
                                Previous
                            </button>

                            <button
                                v-for="page in visiblePages"
                                :key="page"
                                type="button"
                                :class="{
                                    active: currentPage === page,
                                }"
                                @click="goToPage(page)"
                            >
                                {{ page }}
                            </button>

                            <button
                                type="button"
                                :disabled="currentPage === totalPages"
                                @click="nextPage"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </section>

        <AppFooter />
    </main>
</template>

<style scoped>
.search-page {
    width: 100%;
    min-height: 100vh;
    background: #fff;
}

.search-section {
    padding: 40px 0 60px;
}

/* ================= FILTERS ================= */

.filters-card {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 20px;
}

.filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.filters-header h2 {
    margin: 0;
    font-size: 22px;
}

.clear-filter-btn {
    border: none;
    background: transparent;
    color: #777;
    cursor: pointer;
    font-size: 13px;
}

.filter-group {
    padding: 18px 0;
    border-top: 1px solid #eee;
}

.filter-title {
    width: 100%;
    border: none;
    background: transparent;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    color: #222;
}

.filter-title.static {
    cursor: default;
}

.filter-options {
    margin-top: 14px;
}

.filter-option {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 11px;
    font-size: 13px;
    color: #555;
    cursor: pointer;
}

.filter-option input {
    cursor: pointer;
}

.price-inputs {
    display: flex;
    gap: 8px;
    margin-top: 14px;
}

.price-inputs input {
    width: 50%;
    padding: 9px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
}

/* ================= RESULTS ================= */

.results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 25px;
}

.results-header h1 {
    margin: 0 0 5px;
    font-size: 24px;
}

.results-header p {
    margin: 0;
    color: #777;
    font-size: 14px;
}

.sort-select {
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 7px;
    background: #fff;
    cursor: pointer;
    outline: none;
}

/* ================= STATES ================= */

.loading-state,
.error-state,
.empty-state {
    text-align: center;
    padding: 80px 20px;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #eee;
    border-top-color: #111;
    border-radius: 50%;
    margin: 0 auto 15px;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.error-state button {
    border: none;
    background: #111;
    color: #fff;
    padding: 10px 18px;
    border-radius: 7px;
    cursor: pointer;
}

/* ================= PAGINATION ================= */

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 35px;
    flex-wrap: wrap;
}

.pagination button {
    min-width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
}

.pagination button:hover:not(:disabled) {
    background: #f5f5f5;
}

.pagination button.active {
    background: #111;
    color: #fff;
    border-color: #111;
}

.pagination button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

/* ================= RESPONSIVE ================= */

@media (max-width: 767.98px) {
    .search-section {
        padding: 25px 0 40px;
    }

    .results-header {
        flex-direction: column;
        align-items: stretch;
    }

    .results-header h1 {
        font-size: 20px;
    }

    .sort-select {
        width: 100%;
    }

    .filters-card {
        margin-bottom: 10px;
    }
}
</style>
