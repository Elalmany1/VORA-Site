<script>
export default {
    name: "ProductDetailsComponent",

    props: {
        product: {
            type: Object,
            required: true,
        },
    },

    emits: ["add-to-cart", "view-details"],

    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(price);
        },

        getProductCategory() {
            if (!this.product.category) {
                return "Electronics";
            }

            return this.product.category
                .replaceAll("-", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
        },

        getProductFeature() {
            if (this.product.brand) {
                return this.product.brand;
            }

            if (this.product.category) {
                return this.getProductCategory();
            }

            return "High Performance";
        },

        addToCart() {
            this.$emit("add-to-cart", this.product);
        },

        viewDetails() {
            this.$emit("view-details", this.product);
        },
    },
};
</script>

<template>
    <article
        class="product-card"
        @click="viewDetails"
        role="button"
        tabindex="0"
    >
        <!-- Product Image -->
        <div class="product-image-wrapper">
            <img
                :src="product.thumbnail"
                :alt="product.title"
                class="product-image"
            />

            <!-- Sale Badge -->
            <span v-if="product.discountPercentage > 15" class="sale-badge">
                SALE
            </span>
        </div>

        <!-- Product Content -->
        <div class="product-content">
            <!-- Category -->
            <span class="product-category">
                {{ getProductCategory() }}
            </span>

            <!-- Title -->
            <h3 class="product-title">
                {{ product.title }}
            </h3>

            <!-- Feature -->
            <p class="product-feature">
                {{ getProductFeature() }}
            </p>

            <!-- Rating -->
            <div class="product-rating">
                <span class="stars">★</span>
                <span>{{ Number(product.rating).toFixed(1) }}</span>
            </div>

            <!-- Bottom -->
            <div class="product-bottom">
                <span class="product-price">
                    {{ formatPrice(product.price) }}
                </span>

                <button type="button" class="add-cart-btn" @click.stop="addToCart">
                    Add to Cart
                </button>
            </div>
        </div>
    </article>
</template>

<style scoped>
.product-card {
    height: 100%;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    overflow: hidden;
    transition: 0.25s ease;
    display: flex;
    flex-direction: column;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.product-image-wrapper {
    position: relative;
    width: 100%;
    height: 220px;
    background: #f7f7f7;
    overflow: hidden;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sale-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: #e53935;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    padding: 5px 9px;
    border-radius: 5px;
}

.product-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.product-category {
    font-size: 12px;
    color: #777;
    margin-bottom: 7px;
}

.product-title {
    font-size: 17px;
    font-weight: 600;
    margin: 0 0 8px;
    color: #222;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.product-feature {
    font-size: 13px;
    color: #666;
    margin: 0 0 10px;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: #555;
    margin-bottom: 15px;
}

.stars {
    color: #f5b301;
}

.product-bottom {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.product-price {
    font-size: 17px;
    font-weight: 700;
    color: #111;
}

.add-cart-btn {
    border: none;
    background: #111;
    color: #fff;
    padding: 9px 12px;
    border-radius: 7px;
    font-size: 12px;
    cursor: pointer;
    transition: 0.2s;
}

.add-cart-btn:hover {
    background: #333;
}

@media (max-width: 575.98px) {
    .product-image-wrapper {
        height: 200px;
    }

    .product-bottom {
        flex-direction: column;
        align-items: stretch;
    }

    .product-price {
        text-align: center;
    }

    .add-cart-btn {
        width: 100%;
    }
}
</style>
