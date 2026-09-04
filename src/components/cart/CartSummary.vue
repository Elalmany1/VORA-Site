<script>
export default {
    name: "CartSummary",
    props: {
        totalItemsCount: {
            type: Number,
            default: 0,
        },
        subtotal: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        shippingText: {
            type: String,
            default: "Calculated at checkout",
        },
        taxText: {
            type: String,
            default: "Calculated at checkout",
        },
        grandTotal: {
            type: Number,
            default: 0,
        },
    },
    emits: ["proceed-to-checkout"],
};
</script>

<template>
    <div class="cart-summary-card p-4 bg-white rounded border sticky-top">
        <h2 class="summary-title mb-4">Cart Summary</h2>

        <div class="summary-rows d-flex flex-column gap-3 mb-4">
            <!-- Subtotal -->
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">Subtotal ({{ totalItemsCount }} items)</span>
                <span class="fw-semibold text-dark font-monospace">
                    ${{ subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                </span>
            </div>

            <!-- Discount -->
            <div class="d-flex justify-content-between align-items-center" v-if="discount > 0">
                <span class="text-success fw-medium">Discount</span>
                <span class="text-success fw-semibold font-monospace">
                    -${{ discount.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                </span>
            </div>

            <!-- Estimated Shipping -->
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">Estimated Shipping</span>
                <span class="text-muted small">{{ shippingText }}</span>
            </div>

            <!-- Estimated Tax -->
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">Estimated Tax</span>
                <span class="text-muted small">{{ taxText }}</span>
            </div>
        </div>

        <!-- Total Row -->
        <div class="total-row pt-3 mb-4 border-top d-flex justify-content-between align-items-baseline">
            <span class="total-label">Total</span>
            <span class="total-amount font-monospace">
                ${{ grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
            </span>
        </div>

        <!-- Proceed to Checkout Button -->
        <button
            class="btn btn-checkout w-100 d-flex align-items-center justify-content-center gap-2 py-3 mb-3 text-white fw-semibold"
            @click="$emit('proceed-to-checkout')"
            :disabled="totalItemsCount === 0"
        >
            <span>Proceed to Checkout</span>
            <i class="bi bi-arrow-right"></i>
        </button>

        <!-- Secure SSL Badge -->
        <div class="secure-badge d-flex align-items-center justify-content-center gap-2 text-muted small">
            <i class="bi bi-lock-fill"></i>
            <span>Secure SSL Checkout</span>
        </div>
    </div>
</template>

<style scoped>
.cart-summary-card {
    border-color: #e5e7eb !important;
    top: 24px;
    z-index: 10;
}

.summary-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.2px;
}

.summary-rows {
    font-size: 0.92rem;
}

.total-row {
    border-top-color: #f1f5f9 !important;
}

.total-label {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
}

.total-amount {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
}

.btn-checkout {
    background-color: #0f172a;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: background-color 0.15s ease, transform 0.1s ease;
}

.btn-checkout:hover:not(:disabled) {
    background-color: #1e293b;
    transform: translateY(-1px);
}

.btn-checkout:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.secure-badge {
    font-size: 0.78rem;
    color: #64748b;
}
</style>
