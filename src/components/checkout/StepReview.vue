<script>
import { cartStore } from "../../store/cartStore.js";

export default {
    name: "StepReview",
    emits: ["edit-step", "place-order"],
    computed: {
        shippingAddress() {
            return (
                cartStore.addresses.find((a) => a.id === cartStore.selectedAddressId) ||
                cartStore.addresses[0]
            );
        },
        shippingMethod() {
            return (
                cartStore.shippingMethods.find((m) => m.id === cartStore.selectedShippingMethodId) ||
                cartStore.shippingMethods[0]
            );
        },
        cardDetails() {
            return cartStore.cardDetails;
        },
        cardLastFour() {
            const num = this.cardDetails.number || "4532901234564242";
            return num.slice(-4);
        },
        items() {
            return cartStore.items;
        },
    },
};
</script>

<template>
    <div class="step-review">
        <h1 class="page-title mb-2">Review Your Order</h1>
        <p class="page-subtitle text-muted mb-4">
            Please confirm your details before placing the order.
        </p>

        <!-- 3 Summary Cards Row -->
        <div class="row g-3 mb-4">
            <!-- 1. Shipping Address -->
            <div class="col-12 col-md-4">
                <div class="review-box p-3 bg-white rounded border h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class="bi bi-geo-alt text-dark"></i>
                            <span class="box-heading fw-bold text-dark">Shipping Address</span>
                        </div>
                        <div class="box-content text-muted small">
                            <div class="fw-semibold text-dark">{{ shippingAddress.name }}</div>
                            <div>{{ shippingAddress.line1 }}</div>
                            <div>{{ shippingAddress.city }}, {{ shippingAddress.postalCode }}</div>
                            <div>{{ shippingAddress.country }}</div>
                        </div>
                    </div>
                    <div class="pt-2 mt-2 border-top">
                        <button
                            class="btn btn-link text-decoration-none p-0 edit-link"
                            @click="$emit('edit-step', 2)"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            <!-- 2. Shipping Method -->
            <div class="col-12 col-md-4">
                <div class="review-box p-3 bg-white rounded border h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class="bi bi-truck text-dark"></i>
                            <span class="box-heading fw-bold text-dark">Shipping Method</span>
                        </div>
                        <div class="box-content text-muted small">
                            <div class="fw-semibold text-dark">{{ shippingMethod.name }}</div>
                            <div>Estimated: {{ shippingMethod.deliveryDate }}</div>
                        </div>
                    </div>
                    <div class="pt-2 mt-2 border-top">
                        <button
                            class="btn btn-link text-decoration-none p-0 edit-link"
                            @click="$emit('edit-step', 2)"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            <!-- 3. Payment Method -->
            <div class="col-12 col-md-4">
                <div class="review-box p-3 bg-white rounded border h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class="bi bi-credit-card text-dark"></i>
                            <span class="box-heading fw-bold text-dark">Payment Method</span>
                        </div>
                        <div class="box-content text-muted small">
                            <div class="d-flex align-items-center gap-1">
                                <span class="card-chip">VISA</span>
                                <span class="fw-semibold text-dark font-monospace">Ending in {{ cardLastFour }}</span>
                            </div>
                            <div class="mt-1">Billing address same as shipping</div>
                        </div>
                    </div>
                    <div class="pt-2 mt-2 border-top">
                        <button
                            class="btn btn-link text-decoration-none p-0 edit-link"
                            @click="$emit('edit-step', 3)"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Items in Order Card -->
        <div class="items-card p-4 bg-white rounded border mb-4">
            <h3 class="items-card-title mb-3">Items in Order ({{ items.length }})</h3>

            <div class="items-list d-flex flex-column gap-3">
                <div
                    v-for="(item, idx) in items"
                    :key="item.id"
                    class="item-row d-flex align-items-center justify-content-between py-2"
                    :class="{ 'border-bottom': idx < items.length - 1 }"
                >
                    <div class="d-flex align-items-center gap-3">
                        <div class="item-img-wrap flex-shrink-0">
                            <img :src="item.image" :alt="item.name" class="img-fluid" />
                        </div>
                        <div>
                            <div class="item-title fw-bold text-dark">{{ item.name }}</div>
                            <div class="item-spec text-muted small text-uppercase">
                                <span v-if="item.variant">{{ item.variant }} &bull; </span>
                                <span>Qty: {{ item.quantity }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="item-total-price font-monospace fw-bold text-dark fs-6">
                        ${{ (item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-title {
    font-size: 1.95rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
}

.page-subtitle {
    font-size: 0.88rem;
}

.review-box {
    border-color: #e2e8f0;
}

.box-heading {
    font-size: 0.88rem;
}

.box-content {
    line-height: 1.4;
}

.edit-link {
    font-size: 0.78rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
}

.edit-link:hover {
    color: #0f172a;
}

.card-chip {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 1px 4px;
    border-radius: 2px;
    background-color: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
}

.items-card {
    border-color: #e5e7eb;
}

.items-card-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
}

.item-img-wrap {
    width: 64px;
    height: 64px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    overflow: hidden;
}

.item-img-wrap img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
}

.item-title {
    font-size: 0.95rem;
}

.item-spec {
    font-size: 0.75rem;
    letter-spacing: 0.3px;
}
</style>
