<script>
export default {
    name: "CartItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    emits: ["update-quantity", "remove", "save-for-later"],
    methods: {
        increment() {
            this.$emit("update-quantity", this.item.id, this.item.quantity + 1);
        },
        decrement() {
            if (this.item.quantity > 1) {
                this.$emit("update-quantity", this.item.id, this.item.quantity - 1);
            } else {
                this.$emit("remove", this.item.id);
            }
        },
    },
};
</script>

<template>
    <div class="cart-item-card p-3 p-sm-4 mb-3 bg-white rounded border">
        <div class="d-flex flex-column flex-sm-row gap-3 gap-sm-4">
            <!-- Product Thumbnail -->
            <div class="product-thumb-box flex-shrink-0">
                <img :src="item.image" :alt="item.name" class="product-img" />
            </div>

            <!-- Product Details & Price -->
            <div class="flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-2 mb-1">
                        <h3 class="product-title mb-0">{{ item.name }}</h3>
                        <div class="product-price-box text-sm-end">
                            <div class="product-price">${{ item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</div>
                            <div v-if="item.originalPrice" class="original-price">
                                ${{ item.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                            </div>
                        </div>
                    </div>

                    <!-- Meta specs -->
                    <div class="product-meta mt-1">
                        <div class="sku-text">SKU: <span class="font-monospace">{{ item.sku }}</span></div>
                        <div class="variant-text" v-if="item.variant">
                            {{ item.sku.includes('SSD') ? 'Capacity' : 'Finish' }}: {{ item.variant }}
                        </div>
                        <div class="stock-status mt-2 d-flex align-items-center gap-2">
                            <span class="stock-dot"></span>
                            <span class="stock-label">IN STOCK</span>
                        </div>
                    </div>
                </div>

                <!-- Bottom Actions Row -->
                <div class="item-actions-row d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 mt-3 border-top">
                    <!-- Remove & Save for Later -->
                    <div class="d-flex align-items-center gap-3">
                        <button
                            class="btn-action d-flex align-items-center gap-1 border-0 bg-transparent p-0 text-muted"
                            @click="$emit('remove', item.id)"
                            title="Remove item"
                        >
                            <i class="bi bi-trash"></i>
                            <span>Remove</span>
                        </button>
                        <button
                            class="btn-action d-flex align-items-center gap-1 border-0 bg-transparent p-0 text-muted"
                            @click="$emit('save-for-later', item.id)"
                            title="Save for later"
                        >
                            <i class="bi bi-bookmark"></i>
                            <span>Save for later</span>
                        </button>
                    </div>

                    <!-- Quantity Stepper -->
                    <div class="quantity-stepper d-flex align-items-center">
                        <button
                            class="btn-stepper btn-minus"
                            @click="decrement"
                            aria-label="Decrease quantity"
                        >
                            <i class="bi bi-dash"></i>
                        </button>
                        <div class="stepper-value text-center font-monospace">
                            {{ item.quantity }}
                        </div>
                        <button
                            class="btn-stepper btn-plus"
                            @click="increment"
                            aria-label="Increase quantity"
                        >
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-item-card {
    border-color: #e5e7eb !important;
    transition: box-shadow 0.15s ease;
}

.cart-item-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.product-thumb-box {
    width: 96px;
    height: 96px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 6px;
}

.product-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.product-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.35;
}

.product-price {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    white-space: nowrap;
}

.original-price {
    font-size: 0.85rem;
    color: #94a3b8;
    text-decoration: line-through;
}

.product-meta {
    font-size: 0.82rem;
    color: #475569;
}

.sku-text {
    color: #64748b;
}

.stock-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #16a34a;
    display: inline-block;
}

.stock-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.6px;
    color: #16a34a;
}

.btn-action {
    font-size: 0.82rem;
    cursor: pointer;
    transition: color 0.15s ease;
}

.btn-action:hover {
    color: #0f172a !important;
}

.quantity-stepper {
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
    height: 32px;
}

.btn-stepper {
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
}

.btn-stepper:hover {
    background: #f1f5f9;
    color: #0f172a;
}

.stepper-value {
    width: 36px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #0f172a;
    border-left: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    line-height: 32px;
}

@media (max-width: 575.98px) {
    .product-thumb-box {
        width: 72px;
        height: 72px;
    }
    .product-title {
        font-size: 0.95rem;
    }
    .product-price {
        font-size: 1.1rem;
    }
}
</style>
