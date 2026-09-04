<script>
import AppFooter from "../components/AppFooter.vue";
import ProductsComponent from "../components/ProductsComponent.vue";
import { fetchApi } from "../services/fetchApi.js";

export default {
    name: "Categories",

    components: {
        AppFooter,
        ProductsComponent,
    },

    data() {
        return {
            products: [],
            loading: true,
            error: null,

            selectedCategory: "Refrigeration",

            categories: [
                {
                    name: "Refrigeration",
                    title: "Refrigerators",
                    search: "refrigerator",
                },
                {
                    name: "Laundry",
                    title: "Laundry",
                    search: "washing machine",
                },
                {
                    name: "Dishwashers",
                    title: "Dishwashers",
                    search: "dishwasher",
                },
                {
                    name: "Ovens & Ranges",
                    title: "Ovens & Ranges",
                    search: "oven",
                },
                {
                    name: "Microwaves",
                    title: "Microwaves",
                    search: "microwave",
                },
            ],

            showCategoryMenu: false,

            sortBy: "featured",

            minPrice: 0,
            maxPrice: 3000,

            selectedBrands: [],

            currentPage: 1,
            productsPerPage: 9,
        };
    },

    computed: {
        currentCategory() {
            return (
                this.categories.find(
                    (category) => category.name === this.selectedCategory,
                ) || this.categories[0]
            );
        },

        filteredProducts() {
            let filtered = [...this.products];

            // Brand Filter
            if (this.selectedBrands.length > 0) {
                filtered = filtered.filter((product) =>
                    this.selectedBrands.includes(product.brand),
                );
            }

            // Price Filter
            filtered = filtered.filter(
                (product) =>
                    product.price >= this.minPrice &&
                    product.price <= this.maxPrice,
            );

            // Sorting
            if (this.sortBy === "price-low") {
                filtered.sort((a, b) => a.price - b.price);
            }

            if (this.sortBy === "price-high") {
                filtered.sort((a, b) => b.price - a.price);
            }

            if (this.sortBy === "rating") {
                filtered.sort((a, b) => b.rating - a.rating);
            }

            return filtered;
        },

        availableBrands() {
            const brands = this.products
                .map((product) => product.brand)
                .filter((brand) => brand);

            return [...new Set(brands)];
        },

        paginatedProducts() {
            const start = (this.currentPage - 1) * this.productsPerPage;

            const end = start + this.productsPerPage;

            return this.filteredProducts.slice(start, end);
        },

        totalPages() {
            return Math.max(
                1,
                Math.ceil(this.filteredProducts.length / this.productsPerPage),
            );
        },

        pageNumbers() {
            const pages = [];

            for (let page = 1; page <= this.totalPages; page++) {
                pages.push(page);
            }

            return pages;
        },

        hasActiveFilters() {
            return (
                this.selectedBrands.length > 0 ||
                this.minPrice > 0 ||
                this.maxPrice < 3000
            );
        },
    },

    watch: {
        "$route.query.category": {
            immediate: true,

            handler(category) {
                if (!category) {
                    this.selectedCategory = "Refrigeration";
                    this.fetchProducts();
                    return;
                }

                const matchedCategory = this.categories.find(
                    (item) =>
                        item.name.toLowerCase() ===
                        String(category).toLowerCase(),
                );

                if (matchedCategory) {
                    this.selectedCategory = matchedCategory.name;
                    this.currentPage = 1;
                    this.fetchProducts();
                }
            },
        },

        minPrice() {
            this.currentPage = 1;
        },

        maxPrice() {
            this.currentPage = 1;
        },

        selectedBrands() {
            this.currentPage = 1;
        },

        sortBy() {
            this.currentPage = 1;
        },
    },

    methods: {
        async fetchProducts() {
            try {
                this.loading = true;
                this.error = null;

                const category = this.currentCategory;

                /*
                 * DummyJSON does not contain the appliance categories
                 * used by the project.
                 *
                 * We use the search endpoint temporarily.
                 */

                const data = await fetchApi(
                    `/products/search?q=${encodeURIComponent(
                        category.search,
                    )}&limit=0`,
                );

                this.products = data.products || [];

                /*
                 * Temporary fallback:
                 * DummyJSON may not contain products for some
                 * appliance search terms.
                 *
                 * In that case we use kitchen-accessories products
                 * so the category page does not appear empty.
                 */

                if (this.products.length === 0) {
                    const fallbackData = await fetchApi(
                        "/products/category/kitchen-accessories?limit=0",
                    );

                    this.products = fallbackData.products || [];
                }

                this.currentPage = 1;
            } catch (error) {
                console.error("Categories API Error:", error);

                this.error = "Unable to load products. Please try again later.";
            } finally {
                this.loading = false;
            }
        },

        changeCategory(category) {
            this.showCategoryMenu = false;

            this.selectedCategory = category.name;

            this.$router.push({
                name: "categories",
                query: {
                    category: category.name,
                },
            });
        },

        toggleBrand(brand) {
            if (this.selectedBrands.includes(brand)) {
                this.selectedBrands = this.selectedBrands.filter(
                    (item) => item !== brand,
                );
            } else {
                this.selectedBrands.push(brand);
            }
        },

        clearFilters() {
            this.selectedBrands = [];
            this.minPrice = 0;
            this.maxPrice = 3000;
            this.currentPage = 1;
        },

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

        addToCart(product) {
            console.log("Product added to cart:", product);

            // هنربط الـ Cart هنا بعدين
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
    <main class="categories-page">
        <!-- =====================================================
             BREADCRUMB
        ====================================================== -->

        <section class="breadcrumb-section">
            <div class="container-fluid px-4 px-lg-5">
                <div class="breadcrumb-text">
                    <RouterLink to="/"> HOME </RouterLink>

                    <span>&gt;</span>

                    <RouterLink to="/shop"> SHOP </RouterLink>

                    <span>&gt;</span>

                    <span> CATEGORIES </span>

                    <span>&gt;</span>

                    <strong>
                        {{ currentCategory.title }}
                    </strong>
                </div>
            </div>
        </section>

        <!-- =====================================================
             PAGE HEADER
        ====================================================== -->

        <section class="categories-header">
            <div class="container-fluid px-4 px-lg-5">
                <div
                    class="categories-header-content d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3"
                >
                    <div>
                        <h1>
                            {{ currentCategory.title }}
                        </h1>

                        <p>
                            {{ filteredProducts.length }}
                            precision-engineered models found.
                        </p>
                    </div>

                    <!-- Category Selector -->

                    <div class="category-selector-wrapper">
                        <button
                            type="button"
                            class="category-selector"
                            @click="showCategoryMenu = !showCategoryMenu"
                        >
                            <span>
                                {{ selectedCategory }}
                            </span>

                            <i
                                class="bi"
                                :class="
                                    showCategoryMenu
                                        ? 'bi-chevron-up'
                                        : 'bi-chevron-down'
                                "
                            ></i>
                        </button>

                        <div v-if="showCategoryMenu" class="category-menu">
                            <button
                                v-for="category in categories"
                                :key="category.name"
                                type="button"
                                class="category-option"
                                :class="{
                                    active: category.name === selectedCategory,
                                }"
                                @click="changeCategory(category)"
                            >
                                {{ category.name }}

                                <i
                                    v-if="category.name === selectedCategory"
                                    class="bi bi-check"
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- =====================================================
             PRODUCTS AREA
        ====================================================== -->

        <section class="products-area">
            <div class="container-fluid px-4 px-lg-5">
                <div class="row g-4">
                    <!-- =================================================
                         FILTERS
                    ================================================== -->

                    <aside class="col-3 col-lg-3">
                        <div class="filters-card">
                            <!-- Header -->

                            <div class="filters-header">
                                <h2>Active Filters</h2>

                                <button type="button" @click="clearFilters">
                                    Clear All
                                </button>
                            </div>

                            <!-- Active Filter Tags -->

                            <div v-if="hasActiveFilters" class="active-filters">
                                <span
                                    v-for="brand in selectedBrands"
                                    :key="brand"
                                    class="filter-tag"
                                >
                                    {{ brand }}

                                    <button
                                        type="button"
                                        @click="toggleBrand(brand)"
                                    >
                                        ×
                                    </button>
                                </span>

                                <span v-if="minPrice > 0" class="filter-tag">
                                    Min ${{ minPrice }}
                                </span>

                                <span v-if="maxPrice < 3000" class="filter-tag">
                                    Max ${{ maxPrice }}
                                </span>
                            </div>

                            <!-- Category -->

                            <div class="filter-group">
                                <div class="filter-title">
                                    <span>Category</span>

                                    <i class="bi bi-chevron-up"></i>
                                </div>

                                <div class="category-filter-list">
                                    <button
                                        v-for="category in categories"
                                        :key="category.name"
                                        type="button"
                                        class="category-filter-option"
                                        :class="{
                                            active:
                                                category.name ===
                                                selectedCategory,
                                        }"
                                        @click="changeCategory(category)"
                                    >
                                        <span>
                                            {{ category.name }}
                                        </span>

                                        <i
                                            v-if="
                                                category.name ===
                                                selectedCategory
                                            "
                                            class="bi bi-check"
                                        ></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Price -->

                            <div class="filter-group">
                                <div class="filter-title">
                                    <span>Price Range</span>

                                    <i class="bi bi-chevron-up"></i>
                                </div>

                                <div class="price-inputs">
                                    <div class="price-input">
                                        <span>$</span>

                                        <input
                                            v-model.number="minPrice"
                                            type="number"
                                            min="0"
                                            max="3000"
                                        />
                                    </div>

                                    <span class="price-separator">-</span>

                                    <div class="price-input">
                                        <span>$</span>

                                        <input
                                            v-model.number="maxPrice"
                                            type="number"
                                            min="0"
                                            max="3000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- Brand -->

                            <div class="filter-group">
                                <div class="filter-title">
                                    <span>Brand</span>

                                    <i class="bi bi-chevron-up"></i>
                                </div>

                                <div
                                    v-if="availableBrands.length > 0"
                                    class="brand-list"
                                >
                                    <label
                                        v-for="brand in availableBrands"
                                        :key="brand"
                                        class="brand-option"
                                    >
                                        <input
                                            type="checkbox"
                                            :checked="
                                                selectedBrands.includes(brand)
                                            "
                                            @change="toggleBrand(brand)"
                                        />

                                        <span>
                                            {{ brand }}
                                        </span>

                                        <small>
                                            {{
                                                products.filter(
                                                    (product) =>
                                                        product.brand === brand,
                                                ).length
                                            }}
                                        </small>
                                    </label>
                                </div>

                                <p v-else class="no-filter-data">
                                    No brand data available.
                                </p>
                            </div>

                            <!-- Energy Rating -->

                            <div class="filter-group collapsed">
                                <div class="filter-title">
                                    <span>Energy Rating</span>

                                    <i class="bi bi-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <!-- =================================================
                         PRODUCTS
                    ================================================== -->

                    <div class="col-9 col-lg-9">
                        <!-- Sort -->

                        <div class="products-toolbar">
                            <span>
                                {{ filteredProducts.length }}
                                products
                            </span>

                            <div class="sort-wrapper">
                                <label for="sortProducts"> Sort by: </label>

                                <select id="sortProducts" v-model="sortBy">
                                    <option value="featured">Featured</option>

                                    <option value="price-low">
                                        Price: Low to High
                                    </option>

                                    <option value="price-high">
                                        Price: High to Low
                                    </option>

                                    <option value="rating">Rating</option>
                                </select>

                                <i class="bi bi-chevron-down"></i>
                            </div>
                        </div>

                        <!-- Loading -->

                        <div v-if="loading" class="loading-container">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">
                                    Loading...
                                </span>
                            </div>

                            <p>Loading products...</p>
                        </div>

                        <!-- Error -->

                        <div v-else-if="error" class="error-container">
                            <i class="bi bi-exclamation-circle"></i>

                            <p>
                                {{ error }}
                            </p>

                            <button
                                type="button"
                                class="retry-btn"
                                @click="fetchProducts"
                            >
                                Try Again
                            </button>
                        </div>

                        <!-- No Products -->

                        <div
                            v-else-if="paginatedProducts.length === 0"
                            class="empty-products"
                        >
                            <i class="bi bi-box-seam"></i>

                            <h3>No products found</h3>

                            <p>Try changing your filters.</p>

                            <button type="button" @click="clearFilters">
                                Clear Filters
                            </button>
                        </div>

                        <!-- Products -->

                        <ProductsComponent
                            v-else
                            :products="paginatedProducts"
                            @add-to-cart="addToCart"
                            @view-details="viewDetails"
                        />

                        <!-- Pagination -->

                        <div
                            v-if="
                                !loading &&
                                !error &&
                                filteredProducts.length > 0
                            "
                            class="pagination-wrapper"
                        >
                            <button
                                type="button"
                                class="pagination-btn"
                                :disabled="currentPage === 1"
                                @click="goToPage(currentPage - 1)"
                            >
                                <i class="bi bi-chevron-left"></i>
                            </button>

                            <button
                                v-for="page in pageNumbers"
                                :key="page"
                                type="button"
                                class="pagination-btn"
                                :class="{
                                    active: page === currentPage,
                                }"
                                @click="goToPage(page)"
                            >
                                {{ page }}
                            </button>

                            <button
                                type="button"
                                class="pagination-btn"
                                :disabled="currentPage === totalPages"
                                @click="goToPage(currentPage + 1)"
                            >
                                <i class="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- =====================================================
             FOOTER
        ====================================================== -->

        <AppFooter />
    </main>
</template>

<style scoped>
/* =========================================================
   PAGE
========================================================= */

.categories-page {
    background: #faf8f9;
    min-height: 100vh;
}

/* =========================================================
   BREADCRUMB
========================================================= */

.breadcrumb-section {
    padding: 22px 0 10px;
}

.breadcrumb-text {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 9px;
    font-size: 13px;
    color: #777;
}

.breadcrumb-text a {
    color: #777;
    text-decoration: none;
}

.breadcrumb-text a:hover {
    color: #111;
}

.breadcrumb-text strong {
    color: #111;
    font-weight: 600;
}

/* =========================================================
   HEADER
========================================================= */

.categories-header {
    padding: 0 0 22px;
    border-bottom: 1px solid #e5e2e3;
}

.categories-header-content {
    position: relative;
}

.categories-header h1 {
    margin: 0;
    color: #111;
    font-size: 30px;
    font-weight: 700;
}

.categories-header p {
    margin: 6px 0 0;
    color: #555;
    font-size: 15px;
}

/* =========================================================
   CATEGORY SELECTOR
========================================================= */

.category-selector-wrapper {
    position: relative;
    width: 230px;
}

.category-selector {
    width: 100%;
    min-height: 40px;
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #222;
    cursor: pointer;
}

.category-menu {
    position: absolute;
    z-index: 20;
    top: calc(100% + 5px);
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.category-option {
    width: 100%;
    border: none;
    background: #fff;
    padding: 11px 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-size: 13px;
    cursor: pointer;
}

.category-option:hover,
.category-option.active {
    background: #f1f1f1;
}

.category-option.active {
    font-weight: 600;
}

/* =========================================================
   PRODUCTS AREA
========================================================= */

.products-area {
    padding: 20px 0 55px;
}

/* =========================================================
   FILTERS
========================================================= */

.filters-card {
    background: #fff;
    border: 1px solid #e2dfe0;
}

.filters-header {
    padding: 18px 16px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.filters-header h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
}

.filters-header button {
    border: none;
    background: transparent;
    color: #b00000;
    font-size: 12px;
    cursor: pointer;
}

.active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 16px 14px;
}

.filter-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 8px;
    background: #e8e6e7;
    color: #333;
    font-size: 11px;
}

.filter-tag button {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
}

.filter-group {
    padding: 14px 16px;
    border-top: 1px solid #e5e2e3;
}

.filter-group.collapsed {
    padding-bottom: 16px;
}

.filter-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 13px;
    font-size: 14px;
    font-weight: 500;
}

.filter-title i {
    font-size: 12px;
}

.category-filter-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.category-filter-option {
    width: 100%;
    padding: 7px 5px;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    color: #555;
    font-size: 12px;
    cursor: pointer;
}

.category-filter-option:hover {
    background: #f5f5f5;
}

.category-filter-option.active {
    color: #111;
    font-weight: 700;
}

/* =========================================================
   PRICE
========================================================= */

.price-inputs {
    display: flex;
    align-items: center;
    gap: 8px;
}

.price-input {
    flex: 1;
    height: 36px;
    border: 1px solid #d5d2d3;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 8px;
}

.price-input span {
    font-size: 12px;
    color: #777;
}

.price-input input {
    width: 100%;
    border: none;
    outline: none;
    padding-left: 6px;
    font-size: 12px;
}

.price-separator {
    color: #777;
}

/* =========================================================
   BRAND
========================================================= */

.brand-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.brand-option {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    cursor: pointer;
}

.brand-option input {
    width: 15px;
    height: 15px;
}

.brand-option small {
    margin-left: auto;
    color: #777;
    font-size: 11px;
}

.no-filter-data {
    margin: 0;
    color: #888;
    font-size: 12px;
}

/* =========================================================
   TOOLBAR
========================================================= */

.products-toolbar {
    min-height: 42px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}

.products-toolbar > span {
    color: #777;
    font-size: 13px;
}

.sort-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    background: #fff;
    padding: 0 10px;
}

.sort-wrapper label {
    font-size: 13px;
    color: #333;
    white-space: nowrap;
}

.sort-wrapper select {
    min-width: 110px;
    padding: 8px 25px 8px 5px;
    border: none;
    outline: none;
    appearance: none;
    background: transparent;
    font-size: 13px;
    cursor: pointer;
}

.sort-wrapper i {
    pointer-events: none;
    font-size: 11px;
}

/* =========================================================
   LOADING
========================================================= */

.loading-container {
    min-height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.loading-container p {
    margin: 0;
    color: #777;
    font-size: 14px;
}

/* =========================================================
   ERROR
========================================================= */

.error-container {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.error-container i {
    font-size: 30px;
    margin-bottom: 12px;
}

.error-container p {
    color: #666;
}

.retry-btn,
.empty-products button {
    border: none;
    background: #111;
    color: #fff;
    padding: 9px 16px;
    font-size: 12px;
    cursor: pointer;
}

/* =========================================================
   EMPTY
========================================================= */

.empty-products {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.empty-products i {
    font-size: 38px;
    margin-bottom: 10px;
}

.empty-products h3 {
    margin: 0 0 5px;
    font-size: 18px;
}

.empty-products p {
    color: #777;
    font-size: 13px;
}

/* =========================================================
   PAGINATION
========================================================= */

.pagination-wrapper {
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid #e3e0e1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
}

.pagination-btn {
    min-width: 34px;
    height: 34px;
    border: 1px solid #ddd;
    background: #fff;
    color: #222;
    font-size: 13px;
    cursor: pointer;
}

.pagination-btn:hover:not(:disabled) {
    background: #f0f0f0;
}

.pagination-btn.active {
    background: #111;
    color: #fff;
    border-color: #111;
}

.pagination-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 991.98px) {
    .category-selector-wrapper {
        width: 100%;
        max-width: 300px;
    }

    .filters-card {
        margin-bottom: 5px;
    }
}

@media (max-width: 575.98px) {
    .breadcrumb-section {
        padding-top: 15px;
    }

    .categories-header h1 {
        font-size: 25px;
    }

    .categories-header p {
        font-size: 13px;
    }

    .category-selector-wrapper {
        max-width: none;
    }

    .products-toolbar {
        align-items: stretch;
        flex-direction: column;
    }

    .sort-wrapper {
        width: 100%;
        justify-content: space-between;
    }

    .sort-wrapper select {
        flex: 1;
    }

    .price-inputs {
        gap: 5px;
    }
}
</style>
