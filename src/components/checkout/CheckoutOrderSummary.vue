<script>
import { cartStore } from "../../store/cartStore.js";

export default {
    name: "CheckoutOrderSummary",
    props: {
        step: {
            type: Number,
            default: 2, // 2: Shipping, 3: Payment, 4: Review
        },
        showPlaceOrderButton: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["place-order"],
    computed: {
        items() {
            return cartStore.items;
        },
        itemsCount() {
            return cartStore.totalItemsCount;
        },
        subtotal() {
            return cartStore.subtotal;
        },
        shippingText() {
            if (this.step === 2) return "Calculated next step";
            return "Free";
        },
        shippingBadge() {
            if (this.step >= 3) return "EXPRESS";
            return null;
        },
        taxText() {
            if (this.step === 2) return "Calculated next step";
            return "$" + cartStore.estimatedTax.toFixed(2);
        },
        grandTotal() {
            if (this.step === 2) {
                return cartStore.subtotal;
            }
            return cartStore.subtotal - cartStore.discount + cartStore.estimatedTax;
        },
    },
};
</script>

<template>
    <div class="checkout-summary-card p-4 bg-white rounded border sticky-top">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h3 class="summary-title mb-0">Order Summary</h3>
            <span class="badge text-bg-light border text-uppercase font-monospace items-badge" v-if="itemsCount > 0">
                {{ itemsCount }} Items
            </span>
        </div>

        <!-- Items Preview List -->
        <div class="summary-items-list mb-3 d-flex flex-column gap-3">
            <div
                v-for="item in items"
                :key="item.id"
                class="summary-item-row d-flex align-items-center justify-content-between gap-3"
            >
                <div class="d-flex align-items-center gap-3">
                    <div class="item-thumb flex-shrink-0">
                        <img :src="item.image" :alt="item.name" class="img-fluid" />
                    </div>
                    <div class="item-info">
                        <div class="item-name fw-semibold text-dark text-truncate" :title="item.name">
                            {{ item.name }}
                        </div>
                        <div class="item-meta text-muted small">
                            <span v-if="item.sku" class="font-monospace">SKU: {{ item.sku }} &bull; </span>
                            <span>Qty: {{ item.quantity }}</span>
                        </div>
                        <div v-if="step >= 3" class="in-stock-tag text-success small fw-medium">
                            In Stock
                        </div>
                    </div>
                </div>

                <div class="item-price text-end font-monospace fw-semibold text-dark">
                    ${{ (item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                </div>
            </div>
        </div>

        <hr class="my-3 border-secondary-subtle" />

        <!-- Calculations Rows -->
        <div class="summary-calculations d-flex flex-column gap-2 mb-3">
            <div class="d-flex justify-content-between align-items-center small">
                <span class="text-muted">Subtotal ({{ itemsCount }} items)</span>
                <span class="font-monospace fw-semibold text-dark">
                    ${{ subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                </span>
            </div>

            <div class="d-flex justify-content-between align-items-center small">
                <div class="d-flex align-items-center gap-2">
                    <span class="text-muted">Shipping</span>
                    <span v-if="shippingBadge" class="badge text-bg-primary-subtle text-primary border border-primary-subtle font-monospace badge-xs">
                        {{ shippingBadge }}
                    </span>
                </div>
                <span :class="['font-monospace', step >= 3 ? 'text-dark fw-semibold' : 'text-muted']">
                    {{ shippingText }}
                </span>
            </div>

            <div class="d-flex justify-content-between align-items-center small">
                <span class="text-muted">
                    {{ step >= 3 ? 'Estimated Tax' : 'Taxes' }}
                </span>
                <span :class="['font-monospace', step >= 3 ? 'text-dark fw-semibold' : 'text-muted']">
                    {{ taxText }}
                </span>
            </div>
        </div>

        <hr class="my-3 border-secondary-subtle" />

        <!-- Grand Total -->
        <div class="d-flex justify-content-between align-items-baseline mb-3">
            <div>
                <span class="total-title fw-bold text-dark fs-5">
                    {{ step >= 3 ? 'Total Due' : 'Total' }}
                </span>
                <div v-if="step >= 3" class="text-muted fees-note">
                    Includes all duties &amp; environmental fees
                </div>
            </div>
            <div class="text-end">
                <span class="total-amount font-monospace fw-bold fs-4 text-dark">
                    ${{ grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                </span>
                <span v-if="step >= 3" class="currency-label ms-1 small text-muted">USD</span>
            </div>
        </div>

        <!-- Place Order Button (for Step 4) -->
        <div v-if="showPlaceOrderButton" class="mt-3 mb-3">
            <button
                class="btn btn-place-order w-100 py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                @click="$emit('place-order')"
            >
                <span>Place Order</span>
                <i class="bi bi-arrow-right"></i>
            </button>
        </div>

        <!-- Trust Badges & Guarantee Shield -->
        <!-- Step 3 Guarantee Card (Image 3) -->
        <div v-if="step === 3" class="shield-box p-3 rounded mt-3">
            <div class="d-flex align-items-center gap-2 mb-1">
                <i class="bi bi-shield-check text-dark fs-5"></i>
                <span class="shield-title fw-bold text-dark">VORA Hardware Shield Included</span>
            </div>
            <p class="shield-desc text-muted mb-2">
                3-Year comprehensive replacement warranty and dedicated tier-3 technical dispatch included on all enterprise components.
            </p>
            <div class="d-flex align-items-center gap-3 pt-1 border-top border-secondary-subtle cipher-row">
                <div class="d-flex align-items-center gap-1 text-muted">
                    <i class="bi bi-lock"></i>
                    <span>TLS 1.3 Strict Cipher</span>
                </div>
                <div class="d-flex align-items-center gap-1 text-muted">
                    <i class="bi bi-arrow-repeat"></i>
                    <span>Zero-Knowledge Vault</span>
                </div>
            </div>
        </div>

        <!-- Step 4 Review Trust Badges (Image 4) -->
        <div v-if="step === 4" class="trust-box p-3 rounded mt-3 bg-light-subtle">
            <div class="d-flex align-items-start gap-2 mb-3">
                <i class="bi bi-shield-check text-dark fs-5 mt-1"></i>
                <div>
                    <div class="trust-heading fw-bold text-dark">Secure Checkout</div>
                    <div class="trust-desc text-muted">
                        Your payment information is encrypted and securely processed.
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-start gap-2">
                <i class="bi bi-shield text-dark fs-5 mt-1"></i>
                <div>
                    <div class="trust-heading fw-bold text-dark">VORA Warranty</div>
                    <div class="trust-desc text-muted">
                        All products include a standard 1-year limited warranty.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.checkout-summary-card {
    border-color: #e5e7eb !important;
    top: 24px;
    z-index: 10;
}

.summary-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
}

.items-badge {
    font-size: 0.72rem;
    color: #64748b;
    padding: 3px 6px;
}

.item-thumb {
    width: 48px;
    height: 48px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    overflow: hidden;
}

.item-thumb img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
}

.item-name {
    font-size: 0.88rem;
    max-width: 170px;
}

.item-meta {
    font-size: 0.75rem;
}

.item-price {
    font-size: 0.92rem;
}

.badge-xs {
    font-size: 0.65rem;
    padding: 2px 5px;
}

.fees-note {
    font-size: 0.72rem;
}

.btn-place-order {
    background-color: #0f172a;
    border: none;
    border-radius: 6px;
    font-size: 0.95rem;
    letter-spacing: 0.3px;
    transition: background-color 0.15s ease;
}

.btn-place-order:hover {
    background-color: #1e293b;
}

.shield-box {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
}

.shield-title {
    font-size: 0.82rem;
}

.shield-desc {
    font-size: 0.74rem;
    line-height: 1.4;
}

.cipher-row {
    font-size: 0.68rem;
}

.trust-box {
    border: 1px solid #e2e8f0;
}

.trust-heading {
    font-size: 0.82rem;
}

.trust-desc {
    font-size: 0.75rem;
    line-height: 1.35;
}
</style>
