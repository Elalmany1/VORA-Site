<script>
import AppFooter from "../components/AppFooter.vue";
import { fetchApi } from "../services/fetchApi.js";

export default {
    name: "ProductDetails",

    components: {
        AppFooter,
    },

    data() {
        return {
            product: null,

            loading: true,
            error: null,

            selectedImage: "",
            quantity: 1,
        };
    },

    mounted() {
        this.fetchProduct();
    },

    watch: {
        "$route.params.id"() {
            this.fetchProduct();
        },
    },

    methods: {
        // =====================================================
        // FETCH PRODUCT
        // =====================================================

        async fetchProduct() {
            try {
                this.loading = true;
                this.error = null;
                this.product = null;

                const productId = this.$route.params.id;

                const data = await fetchApi(`/products/${productId}`);

                this.product = data;

                // First image becomes the main image
                this.selectedImage = data.images?.[0] || data.thumbnail || "";
            } catch (error) {
                console.error("Product Details API Error:", error);

                this.error =
                    "Unable to load product details. Please try again later.";
            } finally {
                this.loading = false;
            }
        },

        // =====================================================
        // PRICE
        // =====================================================

        formatPrice(price) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
            }).format(price);
        },

        // =====================================================
        // CATEGORY
        // =====================================================

        formatCategory(category) {
            if (!category) {
                return "Home Appliances";
            }

            return category
                .replaceAll("-", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
        },

        // =====================================================
        // IMAGE
        // =====================================================

        changeImage(image) {
            this.selectedImage = image;
        },

        // =====================================================
        // QUANTITY
        // =====================================================

        increaseQuantity() {
            if (!this.product) {
                return;
            }

            if (this.quantity < this.product.stock) {
                this.quantity++;
            }
        },

        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },

        // =====================================================
        // CART
        // =====================================================

        addToCart() {
            console.log("Added to cart:", {
                product: this.product,
                quantity: this.quantity,
            });

            // Cart logic will be connected later
        },

        buyNow() {
            console.log("Buy now:", {
                product: this.product,
                quantity: this.quantity,
            });

            // Checkout logic will be connected later
        },

        // =====================================================
        // STOCK
        // =====================================================

        isInStock() {
            return this.product && this.product.stock > 0;
        },

        // =====================================================
        // DISCOUNT
        // =====================================================

        discountedOldPrice() {
            if (!this.product || !this.product.discountPercentage) {
                return null;
            }

            const originalPrice =
                this.product.price /
                (1 - this.product.discountPercentage / 100);

            return originalPrice;
        },

        // =====================================================
        // RATING STARS
        // =====================================================

        fullStars() {
            if (!this.product) {
                return 0;
            }

            return Math.floor(this.product.rating);
        },

        hasHalfStar() {
            if (!this.product) {
                return false;
            }

            return this.product.rating % 1 >= 0.5;
        },

        // =====================================================
        // REVIEW DATA
        // =====================================================

        productReviews() {
            if (!this.product?.reviews) {
                return [];
            }

            return this.product.reviews;
        },

        reviewName(review) {
            return (
                review.reviewerName ||
                review.reviewerEmail?.split("@")[0] ||
                "Verified Customer"
            );
        },

        reviewDate(review) {
            if (!review.date) {
                return "";
            }

            return new Date(review.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        },

        reviewStars(review) {
            return Math.round(review.rating || 5);
        },
    },
};
</script>

<template>
    <main class="product-details-page">
        <!-- =====================================================
             LOADING
        ====================================================== -->

        <section v-if="loading" class="loading-section">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

            <p>Loading product...</p>
        </section>

        <!-- =====================================================
             ERROR
        ====================================================== -->

        <section v-else-if="error" class="error-section">
            <i class="bi bi-exclamation-circle"></i>

            <h2>Something went wrong</h2>

            <p>{{ error }}</p>

            <button type="button" class="retry-button" @click="fetchProduct">
                Try Again
            </button>
        </section>

        <!-- =====================================================
             PRODUCT DETAILS
        ====================================================== -->

        <template v-else-if="product">
            <!-- =================================================
                 BREADCRUMB
            ================================================== -->

            <section class="breadcrumb-section">
                <div class="container-fluid px-3 px-lg-4">
                    <div class="breadcrumb-text">
                        <RouterLink to="/"> Home </RouterLink>

                        <span>›</span>

                        <RouterLink to="/shop"> Shop </RouterLink>

                        <span>›</span>

                        <RouterLink to="/categories"> Categories </RouterLink>

                        <span>›</span>

                        <span>
                            {{ formatCategory(product.category) }}
                        </span>

                        <span>›</span>

                        <strong>
                            {{ product.title }}
                        </strong>
                    </div>
                </div>
            </section>

            <!-- =================================================
                 MAIN PRODUCT AREA
            ================================================== -->

            <section class="product-main-section">
                <div class="container-fluid px-3 px-lg-4">
                    <div class="row g-4">
                        <!-- =====================================
                             LEFT - IMAGES
                        ====================================== -->

                        <div class="col-12 col-lg-7">
                            <div class="product-gallery">
                                <!-- Main Image -->

                                <div class="main-image-container">
                                    <img
                                        :src="selectedImage"
                                        :alt="product.title"
                                        class="main-product-image"
                                    />

                                    <button
                                        type="button"
                                        class="zoom-button"
                                        @click="changeImage(selectedImage)"
                                        aria-label="View product image"
                                    >
                                        <i class="bi bi-zoom-in"></i>
                                    </button>
                                </div>

                                <!-- Thumbnails -->

                                <div class="thumbnails-container">
                                    <button
                                        v-for="(image, index) in product.images"
                                        :key="index"
                                        type="button"
                                        class="thumbnail-button"
                                        :class="{
                                            active: selectedImage === image,
                                        }"
                                        @click="changeImage(image)"
                                    >
                                        <img
                                            :src="image"
                                            :alt="`${product.title} ${index + 1}`"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- =====================================
                             RIGHT - PRODUCT INFO
                        ====================================== -->

                        <div class="col-12 col-lg-5">
                            <div class="product-information">
                                <!-- Brand / Category -->

                                <div class="product-top-row">
                                    <span class="product-brand">
                                        {{
                                            product.brand ||
                                            formatCategory(product.category)
                                        }}
                                    </span>

                                    <span class="product-sku">
                                        SKU:
                                        {{ product.id }}
                                    </span>
                                </div>

                                <!-- Title -->

                                <h1 class="product-title">
                                    {{ product.title }}
                                </h1>

                                <!-- Rating -->

                                <div class="rating-row">
                                    <div class="stars">
                                        <i
                                            v-for="star in 5"
                                            :key="star"
                                            class="bi"
                                            :class="
                                                star <= fullStars()
                                                    ? 'bi-star-fill'
                                                    : star ===
                                                            fullStars() + 1 &&
                                                        hasHalfStar()
                                                      ? 'bi-star-half'
                                                      : 'bi-star'
                                            "
                                        ></i>
                                    </div>

                                    <span class="rating-number">
                                        {{ Number(product.rating).toFixed(1) }}
                                    </span>

                                    <span class="review-count">
                                        ({{ product.reviews?.length || 0 }}
                                        reviews)
                                    </span>
                                </div>

                                <div class="product-divider"></div>

                                <!-- Price -->

                                <div class="price-section">
                                    <span class="current-price">
                                        {{ formatPrice(product.price) }}
                                    </span>

                                    <span
                                        v-if="product.discountPercentage"
                                        class="old-price"
                                    >
                                        {{ formatPrice(discountedOldPrice()) }}
                                    </span>
                                </div>

                                <!-- Discount -->

                                <div
                                    v-if="product.discountPercentage"
                                    class="discount-text"
                                >
                                    Save
                                    {{
                                        Number(
                                            product.discountPercentage,
                                        ).toFixed(0)
                                    }}%
                                </div>

                                <!-- Stock -->

                                <div class="stock-row">
                                    <span
                                        class="stock-badge"
                                        :class="{
                                            'out-of-stock': !isInStock(),
                                        }"
                                    >
                                        <i
                                            class="bi"
                                            :class="
                                                isInStock()
                                                    ? 'bi-check-circle-fill'
                                                    : 'bi-x-circle-fill'
                                            "
                                        ></i>

                                        {{
                                            isInStock()
                                                ? "IN STOCK"
                                                : "OUT OF STOCK"
                                        }}
                                    </span>

                                    <span
                                        v-if="isInStock()"
                                        class="shipping-text"
                                    >
                                        Ships within 24 hours
                                    </span>
                                </div>

                                <!-- Description -->

                                <p class="product-description">
                                    {{ product.description }}
                                </p>

                                <!-- Capacity -->

                                <div class="option-section">
                                    <div class="option-title">
                                        <span>CAPACITY</span>
                                    </div>

                                    <div class="capacity-options">
                                        <button
                                            type="button"
                                            class="capacity-option active"
                                        >
                                            {{
                                                product.weight
                                                    ? `${Math.round(
                                                          product.weight,
                                                      )} KG`
                                                    : "Standard"
                                            }}
                                        </button>

                                        <button
                                            type="button"
                                            class="capacity-option"
                                        >
                                            Premium
                                        </button>
                                    </div>
                                </div>

                                <!-- Finish -->

                                <div class="option-section">
                                    <div class="option-title">
                                        <span>FINISH</span>

                                        <span class="finish-name">
                                            {{ product.brand || "Standard" }}
                                        </span>
                                    </div>

                                    <div class="finish-options">
                                        <button
                                            type="button"
                                            class="finish-color finish-light active"
                                            aria-label="Light finish"
                                        ></button>

                                        <button
                                            type="button"
                                            class="finish-color finish-dark"
                                            aria-label="Dark finish"
                                        ></button>
                                    </div>
                                </div>

                                <div class="product-divider"></div>

                                <!-- Quantity + Cart -->

                                <div class="cart-row">
                                    <div class="quantity-control">
                                        <button
                                            type="button"
                                            @click="decreaseQuantity"
                                            :disabled="quantity <= 1"
                                        >
                                            −
                                        </button>

                                        <span>
                                            {{ quantity }}
                                        </span>

                                        <button
                                            type="button"
                                            @click="increaseQuantity"
                                            :disabled="
                                                quantity >= product.stock
                                            "
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        class="add-cart-button"
                                        :disabled="!isInStock()"
                                        @click="addToCart"
                                    >
                                        <i class="bi bi-cart-plus"></i>

                                        {{
                                            isInStock()
                                                ? "Add to Cart"
                                                : "Out of Stock"
                                        }}
                                    </button>
                                </div>

                                <!-- Buy Now -->

                                <button
                                    type="button"
                                    class="buy-now-button"
                                    :disabled="!isInStock()"
                                    @click="buyNow"
                                >
                                    Buy Now
                                </button>

                                <!-- Service Features -->

                                <div class="service-features">
                                    <div class="service-item">
                                        <i class="bi bi-truck"></i>

                                        <span> Free Scheduled Delivery </span>
                                    </div>

                                    <div class="service-item">
                                        <i class="bi bi-shield-check"></i>

                                        <span> 10 Year Warranty </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- =================================================
                 TECHNICAL SPECIFICATIONS
            ================================================== -->

            <section class="specifications-section">
                <div class="container-fluid px-3 px-lg-4">
                    <div class="section-title">
                        <i class="bi bi-gear-wide-connected"></i>

                        <h2>Technical Specifications</h2>
                    </div>

                    <div class="specifications-table">
                        <div class="spec-row">
                            <div class="spec-name">Category</div>

                            <div class="spec-value">
                                {{ formatCategory(product.category) }}
                            </div>
                        </div>

                        <div class="spec-row">
                            <div class="spec-name">Brand</div>

                            <div class="spec-value">
                                {{ product.brand || "VORA" }}
                            </div>
                        </div>

                        <div class="spec-row">
                            <div class="spec-name">Weight</div>

                            <div class="spec-value">
                                {{ product.weight }} kg
                            </div>
                        </div>

                        <div class="spec-row">
                            <div class="spec-name">Dimensions</div>

                            <div class="spec-value">
                                {{ product.dimensions?.width }}
                                ×
                                {{ product.dimensions?.height }}
                                ×
                                {{ product.dimensions?.depth }}
                                cm
                            </div>
                        </div>

                        <div class="spec-row">
                            <div class="spec-name">Warranty</div>

                            <div class="spec-value">
                                {{ product.warrantyInformation }}
                            </div>
                        </div>

                        <div class="spec-row">
                            <div class="spec-name">Shipping</div>

                            <div class="spec-value">
                                {{ product.shippingInformation }}
                            </div>
                        </div>

                        <div class="spec-row">
                            <div class="spec-name">Return Policy</div>

                            <div class="spec-value">
                                {{ product.returnPolicy }}
                            </div>
                        </div>

                        <div class="spec-row">
                            <div class="spec-name">Minimum Order</div>

                            <div class="spec-value">
                                {{ product.minimumOrderQuantity }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- =================================================
                 REVIEWS
            ================================================== -->

            <section class="reviews-section">
                <div class="container-fluid px-3 px-lg-4">
                    <div class="reviews-heading">
                        <h2>Customer Reviews</h2>
                    </div>

                    <div class="row g-4">
                        <!-- =====================================
                             REVIEW SUMMARY
                        ====================================== -->

                        <div class="col-12 col-lg-3">
                            <div class="review-summary">
                                <div class="average-rating">
                                    {{ Number(product.rating).toFixed(1) }}

                                    <span>/ 5</span>
                                </div>

                                <div class="summary-stars">
                                    <i
                                        v-for="star in 5"
                                        :key="star"
                                        class="bi bi-star-fill"
                                    ></i>
                                </div>

                                <p>
                                    Based on
                                    {{ product.reviews?.length || 0 }}
                                    verified reviews
                                </p>

                                <!-- Rating Bars -->

                                <div class="rating-bars">
                                    <div class="rating-bar-row">
                                        <span>5 star</span>

                                        <div class="bar">
                                            <div
                                                class="bar-fill"
                                                style="width: 85%"
                                            ></div>
                                        </div>

                                        <small>85%</small>
                                    </div>

                                    <div class="rating-bar-row">
                                        <span>4 star</span>

                                        <div class="bar">
                                            <div
                                                class="bar-fill"
                                                style="width: 60%"
                                            ></div>
                                        </div>

                                        <small>10%</small>
                                    </div>

                                    <div class="rating-bar-row">
                                        <span>3 star</span>

                                        <div class="bar">
                                            <div
                                                class="bar-fill"
                                                style="width: 30%"
                                            ></div>
                                        </div>

                                        <small>3%</small>
                                    </div>

                                    <div class="rating-bar-row">
                                        <span>2 star</span>

                                        <div class="bar">
                                            <div
                                                class="bar-fill"
                                                style="width: 15%"
                                            ></div>
                                        </div>

                                        <small>1%</small>
                                    </div>

                                    <div class="rating-bar-row">
                                        <span>1 star</span>

                                        <div class="bar">
                                            <div
                                                class="bar-fill"
                                                style="width: 10%"
                                            ></div>
                                        </div>

                                        <small>1%</small>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    class="write-review-button"
                                >
                                    Write a Review
                                </button>
                            </div>
                        </div>

                        <!-- =====================================
                             REVIEWS LIST
                        ====================================== -->

                        <div class="col-12 col-lg-9">
                            <div
                                v-if="productReviews().length"
                                class="reviews-list"
                            >
                                <article
                                    v-for="(review, index) in productReviews()"
                                    :key="index"
                                    class="review-card"
                                >
                                    <div class="review-card-header">
                                        <div class="review-user">
                                            <div class="user-avatar">
                                                {{
                                                    reviewName(review)
                                                        .charAt(0)
                                                        .toUpperCase()
                                                }}
                                            </div>

                                            <div>
                                                <h3>
                                                    {{ reviewName(review) }}
                                                </h3>

                                                <span>
                                                    <i
                                                        class="bi bi-patch-check-fill"
                                                    ></i>

                                                    Verified Purchase
                                                </span>
                                            </div>
                                        </div>

                                        <time>
                                            {{ reviewDate(review) }}
                                        </time>
                                    </div>

                                    <div class="review-stars">
                                        <i
                                            v-for="star in 5"
                                            :key="star"
                                            class="bi"
                                            :class="
                                                star <= reviewStars(review)
                                                    ? 'bi-star-fill'
                                                    : 'bi-star'
                                            "
                                        ></i>
                                    </div>

                                    <h4>
                                        {{ review.title || "Great Product" }}
                                    </h4>

                                    <p>
                                        {{
                                            review.comment ||
                                            "Excellent product. Highly recommended."
                                        }}
                                    </p>
                                </article>
                            </div>

                            <!-- No Reviews -->

                            <div v-else class="no-reviews">
                                <i class="bi bi-chat-square-text"></i>

                                <h3>No reviews yet</h3>

                                <p>
                                    Be the first customer to review this
                                    product.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <!-- =====================================================
             FOOTER
        ====================================================== -->

        <AppFooter />
    </main>
</template>

<style scoped>
/* ============================================================
   GENERAL
============================================================ */

.product-details-page {
    min-height: 100vh;
    background: #faf8f9;
    color: #202020;
}

/* ============================================================
   BREADCRUMB
============================================================ */

.breadcrumb-section {
    border-bottom: 1px solid #e4e1e3;
    background: #faf8f9;
}

.breadcrumb-text {
    min-height: 54px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 9px;

    font-size: 12px;
    color: #6e6a6d;
}

.breadcrumb-text a {
    color: #555;
    text-decoration: none;
}

.breadcrumb-text a:hover {
    color: #111;
}

.breadcrumb-text strong {
    color: #111;
    font-weight: 600;
}

/* ============================================================
   LOADING / ERROR
============================================================ */

.loading-section,
.error-section {
    min-height: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 12px;
}

.loading-section p {
    margin: 0;
    color: #666;
}

.error-section i {
    font-size: 40px;
}

.error-section h2 {
    margin: 0;
}

.error-section p {
    color: #666;
}

.retry-button {
    border: 1px solid #111;
    background: #111;
    color: #fff;
    padding: 10px 25px;
    cursor: pointer;
}

/* ============================================================
   MAIN PRODUCT
============================================================ */

.product-main-section {
    padding: 32px 0;
}

/* ============================================================
   GALLERY
============================================================ */

.product-gallery {
    width: 100%;
}

.main-image-container {
    position: relative;

    width: 100%;
    height: 480px;

    background: #fff;

    border: 1px solid #d9d6d8;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
}

.main-product-image {
    width: 100%;
    height: 100%;

    object-fit: contain;

    padding: 18px;
}

.zoom-button {
    position: absolute;

    top: 12px;
    right: 12px;

    width: 38px;
    height: 38px;

    border: 1px solid #d5d1d3;
    border-radius: 9px;

    background: #fff;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    color: #555;
}

.zoom-button:hover {
    background: #f5f3f4;
    color: #111;
}

/* ============================================================
   THUMBNAILS
============================================================ */

.thumbnails-container {
    display: flex;
    gap: 8px;

    margin-top: 10px;

    overflow-x: auto;
}

.thumbnail-button {
    flex: 0 0 115px;

    height: 115px;

    padding: 7px;

    background: #fff;

    border: 1px solid #d9d6d8;
    border-radius: 4px;

    cursor: pointer;

    overflow: hidden;
}

.thumbnail-button.active {
    border: 2px solid #111;
}

.thumbnail-button img {
    width: 100%;
    height: 100%;

    object-fit: contain;
}

/* ============================================================
   PRODUCT INFORMATION
============================================================ */

.product-information {
    padding: 0 0 0 10px;
}

.product-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 15px;

    margin-bottom: 12px;
}

.product-brand {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.3px;
    text-transform: uppercase;

    color: #777;
}

.product-sku {
    background: #f0edef;

    padding: 6px 9px;

    font-size: 10px;
    font-weight: 600;

    color: #858084;
}

/* ============================================================
   TITLE
============================================================ */

.product-title {
    margin: 0;

    font-size: clamp(25px, 3vw, 34px);
    line-height: 1.15;

    font-weight: 700;

    color: #171717;
}

/* ============================================================
   RATING
============================================================ */

.rating-row {
    display: flex;
    align-items: center;
    gap: 7px;

    margin-top: 13px;
}

.stars,
.summary-stars,
.review-stars {
    color: #a4875c;
}

.stars i {
    font-size: 14px;
}

.rating-number {
    font-size: 13px;
    font-weight: 600;
}

.review-count {
    font-size: 12px;
    color: #666;

    text-decoration: underline;
}

/* ============================================================
   DIVIDER
============================================================ */

.product-divider {
    width: 100%;
    height: 1px;

    background: #ddd9db;

    margin: 16px 0;
}

/* ============================================================
   PRICE
============================================================ */

.price-section {
    display: flex;
    align-items: center;
    gap: 12px;

    flex-wrap: wrap;
}

.current-price {
    font-size: 32px;
    font-weight: 700;

    color: #151515;
}

.old-price {
    color: #858084;

    font-size: 15px;

    text-decoration: line-through;
}

.discount-text {
    margin-top: 3px;

    font-size: 12px;
    font-weight: 600;

    color: #19813d;
}

/* ============================================================
   STOCK
============================================================ */

.stock-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    gap: 12px;

    margin-top: 12px;
}

.stock-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;

    padding: 5px 8px;

    background: #eaf6ec;
    border: 1px solid #c8e4ce;

    color: #24733a;

    font-size: 10px;
    font-weight: 700;

    letter-spacing: 0.7px;
}

.stock-badge.out-of-stock {
    background: #fceaea;
    border-color: #efcccc;

    color: #bd3f3f;
}

.shipping-text {
    font-size: 12px;
    color: #555;
}

/* ============================================================
   DESCRIPTION
============================================================ */

.product-description {
    margin: 15px 0 0;

    color: #666;

    font-size: 13px;
    line-height: 1.65;
}

/* ============================================================
   OPTIONS
============================================================ */

.option-section {
    margin-top: 19px;
}

.option-title {
    display: flex;
    align-items: center;
    gap: 5px;

    margin-bottom: 8px;

    font-size: 10px;
    font-weight: 700;

    letter-spacing: 1px;
}

.finish-name {
    color: #777;
    font-weight: 500;
    letter-spacing: 0;
}

.capacity-options {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 7px;
}

.capacity-option {
    min-height: 39px;

    border: 1px solid #d5d1d3;
    background: #fff;

    border-radius: 4px;

    font-size: 12px;

    cursor: pointer;
}

.capacity-option.active {
    border: 2px solid #111;
    font-weight: 600;
}

.finish-options {
    display: flex;
    align-items: center;
    gap: 12px;
}

.finish-color {
    width: 29px;
    height: 29px;

    border-radius: 8px;

    cursor: pointer;
}

.finish-light {
    background: #e7e7e7;
    border: 1px solid #777;
}

.finish-dark {
    background: #202020;
    border: 1px solid #111;
}

.finish-color.active {
    outline: 2px solid #111;
    outline-offset: 2px;
}

/* ============================================================
   CART
============================================================ */

.cart-row {
    display: flex;
    gap: 7px;
}

.quantity-control {
    width: 88px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border: 1px solid #d5d1d3;
    background: #fff;

    border-radius: 4px;
}

.quantity-control button {
    width: 28px;
    height: 40px;

    border: none;
    background: transparent;

    font-size: 18px;

    cursor: pointer;
}

.quantity-control button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.quantity-control span {
    font-size: 13px;
    font-weight: 600;
}

.add-cart-button {
    flex: 1;

    min-height: 40px;

    border: none;
    border-radius: 4px;

    background: #050505;
    color: #fff;

    font-size: 12px;
    font-weight: 600;

    cursor: pointer;

    transition: 0.2s ease;
}

.add-cart-button:hover:not(:disabled) {
    background: #2d2d2d;
}

.add-cart-button:disabled {
    background: #aaa;
    cursor: not-allowed;
}

/* ============================================================
   BUY NOW
============================================================ */

.buy-now-button {
    width: 100%;

    height: 40px;

    margin-top: 7px;

    background: #fff;
    border: 1px solid #cfcacd;

    border-radius: 4px;

    color: #222;

    font-size: 12px;
    font-weight: 600;

    cursor: pointer;
}

.buy-now-button:hover:not(:disabled) {
    background: #f3f1f2;
}

.buy-now-button:disabled {
    color: #aaa;
    cursor: not-allowed;
}

/* ============================================================
   SERVICE FEATURES
============================================================ */

.service-features {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 10px;

    margin-top: 20px;
}

.service-item {
    display: flex;
    align-items: center;
    gap: 7px;

    color: #666;

    font-size: 10px;
}

.service-item i {
    font-size: 14px;
    color: #444;
}

/* ============================================================
   SPECIFICATIONS
============================================================ */

.specifications-section {
    padding: 30px 0;

    border-top: 1px solid #dedadc;
    border-bottom: 1px solid #dedadc;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 8px;

    margin-bottom: 18px;
}

.section-title i {
    font-size: 17px;
}

.section-title h2 {
    margin: 0;

    font-size: 20px;
    font-weight: 700;
}

.specifications-table {
    width: 100%;

    border: 1px solid #d8d4d6;
    border-radius: 4px;

    overflow: hidden;
}

.spec-row {
    display: grid;
    grid-template-columns: 34% 66%;

    min-height: 48px;

    border-bottom: 1px solid #dedadc;
}

.spec-row:last-child {
    border-bottom: none;
}

.spec-row:nth-child(even) {
    background: #f6f3f4;
}

.spec-name,
.spec-value {
    display: flex;
    align-items: center;

    padding: 10px 16px;

    font-size: 12px;
}

.spec-name {
    font-weight: 600;
}

.spec-value {
    color: #666;
}

/* ============================================================
   REVIEWS
============================================================ */

.reviews-section {
    padding: 38px 0 50px;
}

.reviews-heading {
    margin-bottom: 20px;
}

.reviews-heading h2 {
    margin: 0;

    font-size: 21px;
}

/* ============================================================
   REVIEW SUMMARY
============================================================ */

.review-summary {
    padding-right: 25px;
}

.average-rating {
    font-size: 42px;
    font-weight: 700;
    line-height: 1;
}

.average-rating span {
    font-size: 14px;
    font-weight: 500;
    color: #666;
}

.summary-stars {
    margin-top: 9px;
}

.summary-stars i {
    font-size: 14px;
}

.review-summary p {
    margin: 7px 0 18px;

    font-size: 11px;
    color: #777;
}

/* ============================================================
   RATING BARS
============================================================ */

.rating-bars {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.rating-bar-row {
    display: grid;
    grid-template-columns: 35px 1fr 28px;

    align-items: center;

    gap: 6px;

    font-size: 9px;
}

.rating-bar-row small {
    color: #777;
}

.bar {
    height: 5px;

    border-radius: 10px;

    background: #e4e1e3;

    overflow: hidden;
}

.bar-fill {
    height: 100%;

    background: #111;
}

/* ============================================================
   WRITE REVIEW
============================================================ */

.write-review-button {
    width: 100%;

    min-height: 36px;

    margin-top: 20px;

    background: #fff;
    border: 1px solid #777;

    font-size: 11px;
    font-weight: 600;

    cursor: pointer;
}

/* ============================================================
   REVIEWS LIST
============================================================ */

.reviews-list {
    display: flex;
    flex-direction: column;

    gap: 15px;
}

.review-card {
    background: #fff;

    border: 1px solid #d8d4d6;
    border-radius: 4px;

    padding: 18px;
}

.review-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    gap: 15px;
}

.review-user {
    display: flex;
    align-items: center;
    gap: 9px;
}

.user-avatar {
    width: 38px;
    height: 38px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #dce4ee;

    color: #34495e;

    font-size: 13px;
    font-weight: 700;
}

.review-user h3 {
    margin: 0;

    font-size: 13px;
    font-weight: 700;
}

.review-user span {
    display: flex;
    align-items: center;
    gap: 3px;

    margin-top: 3px;

    font-size: 9px;
    color: #777;
}

.review-user span i {
    color: #2a8a48;
}

.review-card-header time {
    font-size: 10px;
    color: #777;
}

.review-stars {
    margin-top: 12px;
}

.review-stars i {
    font-size: 12px;
}

.review-card h4 {
    margin: 8px 0 5px;

    font-size: 14px;
}

.review-card p {
    margin: 0;

    color: #666;

    font-size: 12px;
    line-height: 1.6;
}

/* ============================================================
   NO REVIEWS
============================================================ */

.no-reviews {
    min-height: 200px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid #ddd;

    background: #fff;

    text-align: center;
}

.no-reviews i {
    font-size: 30px;
    margin-bottom: 10px;
}

.no-reviews h3 {
    font-size: 17px;
}

.no-reviews p {
    color: #777;
    font-size: 12px;
}

/* ============================================================
   RESPONSIVE
============================================================ */

@media (max-width: 991.98px) {
    .product-information {
        padding: 0;
    }

    .main-image-container {
        height: 420px;
    }

    .product-main-section {
        padding-top: 20px;
    }

    .review-summary {
        padding-right: 0;
    }
}

@media (max-width: 767.98px) {
    .breadcrumb-text {
        min-height: 48px;
        font-size: 10px;
    }

    .main-image-container {
        height: 350px;
    }

    .thumbnail-button {
        flex-basis: 85px;
        height: 85px;
    }

    .product-title {
        font-size: 26px;
    }

    .current-price {
        font-size: 28px;
    }

    .spec-row {
        grid-template-columns: 40% 60%;
    }

    .spec-name,
    .spec-value {
        padding: 9px 10px;
        font-size: 10px;
    }

    .review-card-header {
        flex-direction: column;
    }
}

@media (max-width: 575.98px) {
    .product-main-section {
        padding: 15px 0;
    }

    .main-image-container {
        height: 290px;
    }

    .product-top-row {
        align-items: flex-start;
        flex-direction: column;
    }

    .product-sku {
        align-self: flex-start;
    }

    .product-title {
        font-size: 23px;
    }

    .current-price {
        font-size: 25px;
    }

    .service-features {
        grid-template-columns: 1fr;
    }

    .cart-row {
        flex-direction: column;
    }

    .quantity-control {
        width: 100%;
    }

    .add-cart-button {
        width: 100%;
    }

    .spec-row {
        grid-template-columns: 1fr;
    }

    .spec-name {
        background: #f0edef;
        font-weight: 700;
    }

    .review-summary {
        margin-bottom: 10px;
    }
}
</style>
