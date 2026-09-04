<script>
import AppFooter from "../components/AppFooter.vue";
import { fetchApi } from "../services/fetchApi.js";

export default {
    name: "Shop",

    components: {
        AppFooter,
    },

    data() {
        return {
            products: [],
            loading: true,
            error: null,

            categories: [
                {
                    name: "Refrigeration",
                    icon: "refrigeration",
                },
                {
                    name: "Laundry",
                    icon: "laundry",
                },
                {
                    name: "Dishwashers",
                    icon: "dishwasher",
                },
                {
                    name: "Ovens & Ranges",
                    icon: "oven",
                },
                {
                    name: "Microwaves",
                    icon: "microwave",
                },
            ],
        };
    },

    mounted() {
        this.fetchProducts();
    },

    methods: {
        async fetchProducts() {
            try {
                this.loading = true;
                this.error = null;

                const data = await fetchApi(
                    "/products/category/kitchen-accessories?limit=4",
                );

                this.products = data.products;
            } catch (error) {
                console.error("Products API Error:", error);

                this.error = "Unable to load products. Please try again later.";
            } finally {
                this.loading = false;
            }
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
    <main class="shop-page">
        <!-- =====================================================
             BREADCRUMB
        ====================================================== -->

        <section class="breadcrumb-section">
            <div class="container-fluid px-4 px-lg-5">
                <div class="breadcrumb-text">
                    <RouterLink to="/"> HOME </RouterLink>

                    <span> &gt; </span>

                    <span> SHOP </span>
                </div>
            </div>
        </section>

        <!-- =====================================================
             HERO SECTION
        ====================================================== -->

        <section class="shop-hero">
            <div class="shop-hero-overlay"></div>

            <div class="shop-hero-content">
                <h1>Home Appliances</h1>

                <p>
                    Engineered precision for the modern habitat. Explore our
                    curated selection of high-performance cooling, cooking, and
                    cleaning solutions designed for uncompromising reliability
                    and aesthetic integration.
                </p>

                <button type="button" class="specifications-btn">
                    View Specifications
                    <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </section>

        <!-- =====================================================
             APPLIANCE CATEGORIES
        ====================================================== -->

        <section class="categories-section">
            <div class="section-heading">
                <h2>Appliance Categories</h2>
            </div>

            <div class="categories-grid">
                <RouterLink
                    v-for="category in categories"
                    :key="category.name"
                    :to="{
                        name: 'categories',
                        query: { category: category.name },
                    }"
                    class="category-card"
                >
                    <div class="category-icon">
                        <!-- Refrigeration -->
                        <svg
                            v-if="category.icon === 'refrigeration'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="5" y="2" width="14" height="20" rx="2" />
                            <line x1="5" y1="10" x2="19" y2="10" />
                            <line x1="9" y1="6" x2="9" y2="8" />
                            <line x1="9" y1="13" x2="9" y2="17" />
                        </svg>

                        <!-- Laundry -->
                        <svg
                            v-else-if="category.icon === 'laundry'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="12" cy="13" r="5" />
                            <circle cx="8" cy="7" r="0.7" fill="currentColor" />
                            <circle
                                cx="11"
                                cy="7"
                                r="0.7"
                                fill="currentColor"
                            />
                        </svg>

                        <!-- Dishwasher -->
                        <svg
                            v-else-if="category.icon === 'dishwasher'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <circle
                                cx="8"
                                cy="4.5"
                                r="0.7"
                                fill="currentColor"
                            />
                            <circle
                                cx="11"
                                cy="4.5"
                                r="0.7"
                                fill="currentColor"
                            />
                            <path d="M8 12h8" />
                            <path d="M8 15h8" />
                            <path d="M8 18h8" />
                        </svg>

                        <!-- Oven -->
                        <svg
                            v-else-if="category.icon === 'oven'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="3" y="2" width="18" height="20" rx="2" />
                            <circle cx="8" cy="6" r="1" />
                            <circle cx="12" cy="6" r="1" />
                            <circle cx="16" cy="6" r="1" />
                            <rect x="6" y="10" width="12" height="8" rx="1" />
                            <path d="M9 14c1-2 2-2 3 0s2 2 3 0" />
                        </svg>

                        <!-- Microwave -->
                        <svg
                            v-else-if="category.icon === 'microwave'"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <rect
                                x="4.5"
                                y="7.5"
                                width="11"
                                height="9"
                                rx="1"
                            />
                            <circle cx="19" cy="9" r="0.8" />
                            <circle cx="19" cy="12" r="0.8" />
                            <circle cx="19" cy="15" r="0.8" />
                            <path d="M7 12h6" />
                        </svg>
                    </div>

                    <h3>
                        {{ category.name }}
                    </h3>
                </RouterLink>
            </div>
        </section>

        <!-- =====================================================
             HIGH PERFORMANCE MODELS
        ====================================================== -->

        <section class="products-section">
            <!-- Section Header -->

            <div class="section-heading products-heading">
                <h2>High-Performance Models</h2>

                <RouterLink to="/search" class="view-all-link">
                    View All
                    <i class="bi bi-arrow-right"></i>
                </RouterLink>
            </div>

            <!-- ================= LOADING ================= -->

            <div v-if="loading" class="loading-container">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden"> Loading... </span>
                </div>

                <p>Loading products...</p>
            </div>

            <!-- ================= ERROR ================= -->

            <div v-else-if="error" class="error-container">
                <i class="bi bi-exclamation-circle"></i>

                <p>
                    {{ error }}
                </p>

                <button class="retry-btn" type="button" @click="fetchProducts">
                    Try Again
                </button>
            </div>

            <!-- ================= PRODUCTS ================= -->

            <div v-else class="row g-3">
                <div
                    v-for="product in products"
                    :key="product.id"
                    class="col-12 col-sm-6 col-lg-3"
                >
                    <article class="product-card" @click="viewDetails(product)">
                        <!-- Product Image -->

                        <div class="product-image-wrapper">
                            <img
                                :src="product.thumbnail"
                                :alt="product.title"
                                class="product-image"
                            />

                            <!-- Rating -->

                            <div class="rating-badge">
                                <i class="bi bi-star-fill"></i>

                                <span>
                                    {{ product.rating }}
                                </span>
                            </div>
                        </div>

                        <!-- Product Information -->

                        <div class="product-info">
                            <!-- Brand -->

                            <span class="product-brand">
                                {{ product.brand || "VORA" }}
                            </span>

                            <!-- Product Name -->

                            <h3 class="product-title">
                                {{ product.title }}
                            </h3>

                            <!-- Product Description -->

                            <p class="product-description">
                                {{ product.description }}
                            </p>

                            <!-- Price + Cart -->

                            <div class="product-footer">
                                <span class="product-price">
                                    $
                                    {{
                                        product.price.toLocaleString("en-US", {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 2,
                                        })
                                    }}
                                </span>

                                <button
                                    type="button"
                                    class="cart-button"
                                    @click="addToCart(product)"
                                    :aria-label="`Add ${product.title} to cart`"
                                >
                                    <i class="bi bi-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </article>
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

.shop-page {
    background: #faf8f9;
    min-height: 100vh;
    color: #171717;
}

/* =========================================================
   BREADCRUMB
========================================================= */

.breadcrumb-section {
    padding: 25px 0 26px;
}

.breadcrumb-text {
    display: flex;
    align-items: center;
    gap: 7px;

    font-size: 10px;
    font-weight: 500;

    letter-spacing: 1px;

    color: #777;
}

.breadcrumb-text a {
    color: #555;
    text-decoration: none;
}

.breadcrumb-text a:hover {
    color: #000;
}

/* =========================================================
   HERO
========================================================= */

.shop-hero {
    position: relative;

    margin: 0 20px;

    min-height: 410px;

    display: flex;
    align-items: center;

    overflow: hidden;

    background-image: url("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85");

    background-size: cover;
    background-position: center;
}

/* Dark overlay */

.shop-hero-overlay {
    position: absolute;

    inset: 0;

    background: rgba(0, 0, 0, 0.55);
}

/* Hero Content */

.shop-hero-content {
    position: relative;

    z-index: 2;

    max-width: 570px;

    margin-left: 27px;

    padding: 40px 0;
}

.shop-hero-content h1 {
    color: #ffffff;

    font-size: clamp(38px, 4vw, 52px);

    line-height: 1.1;

    font-weight: 700;

    margin-bottom: 18px;

    letter-spacing: -1.5px;
}

.shop-hero-content p {
    color: #d9dce3;

    font-size: 16px;

    line-height: 1.45;

    max-width: 540px;

    margin-bottom: 22px;
}

/* Specifications Button */

.specifications-btn {
    border: none;

    background: #dce8ff;

    color: #17243a;

    padding: 9px 20px;

    min-height: 40px;

    font-size: 13px;

    font-weight: 600;

    display: inline-flex;

    align-items: center;

    gap: 5px;

    cursor: pointer;

    transition: 0.2s ease;
}

.specifications-btn:hover {
    background: #ffffff;
}

.specifications-btn i {
    font-size: 14px;
}

/* =========================================================
   COMMON SECTION
========================================================= */

.categories-section,
.products-section {
    margin: 0 20px;
}

/* =========================================================
   SECTION HEADING
========================================================= */

.section-heading {
    display: flex;

    align-items: center;

    justify-content: space-between;

    border-bottom: 1px solid #cfcfd3;

    padding-bottom: 7px;

    margin-top: 28px;

    margin-bottom: 13px;
}

.section-heading h2 {
    font-size: 22px;

    font-weight: 600;

    margin: 0;
}

/* =========================================================
   CATEGORIES
========================================================= */

.categories-grid {
    display: grid;

    grid-template-columns: repeat(5, 1fr);

    gap: 13px;
}

.category-card {
    text-decoration: none;
    color: inherit;
    min-height: 101px;

    border: 1px solid #d1d0d3;

    background: #fbf9fa;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    gap: 8px;

    transition:
        transform 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease;
}

.category-card:hover {
    transform: translateY(-2px);

    background: #ffffff;

    border-color: #aeb0b5;
}

.category-icon {
    font-size: 29px;

    color: #52647e;

    height: 33px;

    display: flex;

    align-items: center;

    justify-content: center;
}

.category-card h3 {
    font-size: 15px;

    font-weight: 600;

    margin: 0;

    text-align: center;
}

/* =========================================================
   PRODUCTS HEADER
========================================================= */

.products-heading {
    margin-top: 27px;
}

.view-all-link {
    color: #52647e;

    font-size: 12px;

    text-decoration: none;

    display: flex;

    align-items: center;

    gap: 4px;
}

.view-all-link:hover {
    color: #000000;
}

/* =========================================================
   PRODUCT CARD
========================================================= */

.product-card {
    height: 100%;

    background: #fbf9fa;

    border: 1px solid #cfd0d3;

    overflow: hidden;

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.product-card:hover {
    transform: translateY(-3px);

    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
}

/* =========================================================
   PRODUCT IMAGE
========================================================= */

.product-image-wrapper {
    height: 158px;

    position: relative;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #f1f0f1;

    border-bottom: 1px solid #d4d3d5;
}

.product-image {
    width: 100%;

    height: 100%;

    object-fit: contain;

    padding: 14px;
}

/* =========================================================
   RATING
========================================================= */

.rating-badge {
    position: absolute;

    top: 7px;

    right: 7px;

    background: #ffffff;

    border: 1px solid #d2d2d2;

    padding: 3px 7px;

    display: flex;

    align-items: center;

    gap: 4px;

    font-size: 11px;

    color: #4a4a4a;
}

.rating-badge i {
    font-size: 9px;

    color: #687992;
}

/* =========================================================
   PRODUCT INFORMATION
========================================================= */

.product-info {
    padding: 13px 14px 13px;
}

.product-brand {
    display: block;

    color: #77777b;

    font-size: 9px;

    font-weight: 500;

    letter-spacing: 1.7px;

    text-transform: uppercase;

    margin-bottom: 6px;
}

.product-title {
    font-size: 15px;

    line-height: 1.35;

    font-weight: 600;

    margin: 0 0 10px;

    min-height: 40px;
}

.product-description {
    background: #eeeeef;

    color: #595a60;

    font-size: 10px;

    line-height: 1.35;

    padding: 7px 8px;

    margin: 0 0 13px;

    min-height: 31px;

    display: -webkit-box;

    -webkit-line-clamp: 2;

    -webkit-box-orient: vertical;

    overflow: hidden;
}

/* =========================================================
   PRODUCT FOOTER
========================================================= */

.product-footer {
    display: flex;

    align-items: center;

    justify-content: space-between;
}

.product-price {
    color: #111111;

    font-size: 18px;

    font-weight: 700;
}

/* =========================================================
   CART BUTTON
========================================================= */

.cart-button {
    width: 34px;

    height: 34px;

    border: none;

    background: #050505;

    color: #ffffff;

    display: flex;

    align-items: center;

    justify-content: center;

    cursor: pointer;

    transition: background 0.2s ease;
}

.cart-button:hover {
    background: #333333;
}

.cart-button i {
    font-size: 17px;
}

/* =========================================================
   LOADING
========================================================= */

.loading-container {
    min-height: 260px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    gap: 15px;
}

.loading-container .spinner-border {
    width: 32px;

    height: 32px;

    color: #52647e;
}

.loading-container p {
    color: #666;

    font-size: 14px;

    margin: 0;
}

/* =========================================================
   ERROR
========================================================= */

.error-container {
    min-height: 260px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

    gap: 10px;
}

.error-container > i {
    font-size: 35px;

    color: #777;
}

.error-container p {
    margin: 0;

    color: #555;
}

.retry-btn {
    border: none;

    background: #050505;

    color: #ffffff;

    padding: 8px 18px;

    font-size: 13px;

    cursor: pointer;
}

.retry-btn:hover {
    background: #333;
}

/* =========================================================
   TABLET
========================================================= */

@media (max-width: 991.98px) {
    .shop-hero {
        min-height: 390px;

        margin: 0 16px;
    }

    .shop-hero-content {
        max-width: 520px;

        margin-left: 24px;

        margin-right: 24px;
    }

    .categories-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 767.98px) {
    .breadcrumb-section {
        padding: 18px 0;
    }

    .categories-section,
    .products-section {
        margin-left: 14px;

        margin-right: 14px;
    }

    /* Hero */

    .shop-hero {
        margin: 0 14px;

        min-height: 430px;

        background-position: center;
    }

    .shop-hero-content {
        margin-left: 20px;

        margin-right: 20px;

        padding: 30px 0;
    }

    .shop-hero-content h1 {
        font-size: 38px;
    }

    .shop-hero-content p {
        font-size: 15px;
    }

    /* Categories */

    .categories-grid {
        grid-template-columns: repeat(2, 1fr);

        gap: 10px;
    }

    .category-card {
        min-height: 95px;
    }

    /* Section Heading */

    .section-heading h2 {
        font-size: 19px;
    }

    /* Product */

    .product-image-wrapper {
        height: 190px;
    }

    .product-title {
        font-size: 16px;
    }
}

/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 420px) {
    .categories-grid {
        grid-template-columns: 1fr;
    }

    .category-card {
        min-height: 80px;

        flex-direction: row;

        justify-content: flex-start;

        padding: 0 25px;
    }
}

.category-icon svg {
    width: 42px;
    height: 42px;
    display: block;
}
</style>
