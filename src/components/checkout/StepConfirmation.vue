<script>
import { cartStore } from "../../store/cartStore.js";

export default {
    name: "StepConfirmation",
    emits: ["continue-shopping", "track-order"],
    data() {
        return {
            isSummaryOpen: true,
        };
    },
    computed: {
        orderNumber() {
            return cartStore.lastOrder.orderNumber || "#TS-88291";
        },
        deliveryEstimate() {
            return cartStore.lastOrder.deliveryEstimate || "Thursday, Oct 26";
        },
        email() {
            return cartStore.lastOrder.email || "user@example.com";
        },
        items() {
            return cartStore.items.length > 0
                ? cartStore.items
                : [
                      {
                          id: "keyboard",
                          name: "Precision Mechanical Keyboard",
                          variant: "Tactile Switch",
                          quantity: 1,
                          price: 149.00,
                          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&auto=format&fit=crop&q=80",
                      },
                      {
                          id: "hub",
                          name: "Pro Multi-Port Hub",
                          variant: "Space Grey",
                          quantity: 2,
                          price: 89.00,
                          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=80",
                      },
                  ];
        },
        subtotal() {
            return this.items.reduce((s, i) => s + i.price * i.quantity, 0);
        },
        shipping() {
            return 0.00;
        },
        tax() {
            return this.subtotal * 0.08;
        },
        total() {
            return this.subtotal + this.shipping + this.tax;
        },
    },
};
</script>

<template>
    <div class="confirmation-view py-5 px-3">
        <div class="confirmation-container mx-auto text-center">
            <!-- Checkmark in Light Blue Rounded Square -->
            <div class="check-badge-box mx-auto mb-3 d-flex align-items-center justify-content-center">
                <i class="bi bi-check-lg text-dark fs-3 fw-bold"></i>
            </div>

            <!-- Title & Subtitle -->
            <h1 class="confirmation-title mb-2">Order Confirmed</h1>
            <p class="confirmation-subtitle text-muted mb-4">
                Thank you for your purchase. We are processing your order.
            </p>

            <!-- Order Details Card -->
            <div class="order-summary-card bg-white rounded border text-start mb-4 shadow-sm overflow-hidden">
                <!-- Top Accent Line -->
                <div class="top-accent-bar"></div>

                <!-- Order Number & Delivery Row -->
                <div class="p-3 p-sm-4 border-bottom d-flex align-items-center justify-content-between">
                    <div>
                        <div class="label-heading text-uppercase text-muted font-monospace">Order Number</div>
                        <div class="order-id font-monospace fw-bold text-dark fs-5">{{ orderNumber }}</div>
                    </div>
                    <div class="text-end">
                        <div class="label-heading text-uppercase text-muted font-monospace">Estimated Delivery</div>
                        <div class="delivery-date fw-bold text-dark">{{ deliveryEstimate }}</div>
                    </div>
                </div>

                <!-- Collapsible Summary Header -->
                <div
                    class="p-3 p-sm-4 d-flex align-items-center justify-content-between cursor-pointer summary-header"
                    @click="isSummaryOpen = !isSummaryOpen"
                >
                    <span class="fw-bold text-dark">Order Summary</span>
                    <i :class="['bi', isSummaryOpen ? 'bi-chevron-up' : 'bi-chevron-down', 'text-muted']"></i>
                </div>

                <!-- Collapsible Summary Body -->
                <div v-show="isSummaryOpen" class="px-3 px-sm-4 pb-4">
                    <!-- Items -->
                    <div class="items-list d-flex flex-column gap-3 mb-3">
                        <div
                            v-for="item in items"
                            :key="item.id"
                            class="d-flex align-items-center justify-content-between gap-3"
                        >
                            <div class="d-flex align-items-center gap-3">
                                <div class="item-img-mini flex-shrink-0">
                                    <img :src="item.image" :alt="item.name" class="img-fluid" />
                                </div>
                                <div>
                                    <div class="fw-semibold text-dark item-name-text">{{ item.name }}</div>
                                    <div class="text-muted small">
                                        Qty: {{ item.quantity }} <span v-if="item.variant">| {{ item.variant }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="font-monospace fw-semibold text-dark text-nowrap">
                                ${{ (item.price * item.quantity).toFixed(2) }}
                            </div>
                        </div>
                    </div>

                    <hr class="my-3 border-secondary-subtle" />

                    <!-- Price Calculations -->
                    <div class="d-flex flex-column gap-2 small mb-3">
                        <div class="d-flex justify-content-between text-muted">
                            <span>Subtotal</span>
                            <span class="font-monospace">${{ subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="d-flex justify-content-between text-muted">
                            <span>Shipping</span>
                            <span class="font-monospace">${{ shipping.toFixed(2) }}</span>
                        </div>
                        <div class="d-flex justify-content-between text-muted">
                            <span>Tax</span>
                            <span class="font-monospace">${{ tax.toFixed(2) }}</span>
                        </div>
                    </div>

                    <hr class="my-3 border-secondary-subtle" />

                    <!-- Grand Total -->
                    <div class="d-flex justify-content-between align-items-baseline">
                        <span class="fw-bold text-dark fs-5">Total</span>
                        <span class="font-monospace fw-bold fs-4 text-dark">${{ total.toFixed(2) }}</span>
                    </div>
                </div>
            </div>

            <!-- Action Buttons Row -->
            <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-4">
                <button
                    class="btn btn-track d-flex align-items-center justify-content-center gap-2 px-4 py-2 text-white fw-semibold w-100 w-sm-auto"
                    @click="$emit('track-order')"
                >
                    <i class="bi bi-truck"></i>
                    <span>Track Order</span>
                </button>
                <RouterLink
                    to="/"
                    class="btn btn-continue-shop d-flex align-items-center justify-content-center gap-2 px-4 py-2 text-dark fw-semibold w-100 w-sm-auto text-decoration-none"
                >
                    <i class="bi bi-bag"></i>
                    <span>Continue Shopping</span>
                </RouterLink>
            </div>

            <!-- Email Notification -->
            <p class="email-note text-muted small">
                A confirmation email has been sent to <span class="text-dark fw-medium">{{ email }}</span>.
            </p>
        </div>
    </div>
</template>

<style scoped>
.confirmation-container {
    max-width: 580px;
}

.check-badge-box {
    width: 56px;
    height: 56px;
    background-color: #dbeafe;
    border-radius: 12px;
}

.confirmation-title {
    font-size: 2rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
}

.confirmation-subtitle {
    font-size: 0.95rem;
}

.top-accent-bar {
    height: 3px;
    background-color: #0c0d0e;
}

.order-summary-card {
    border-color: #e5e7eb;
}

.label-heading {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.delivery-date {
    font-size: 0.95rem;
}

.summary-header {
    user-select: none;
}

.item-img-mini {
    width: 44px;
    height: 44px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    overflow: hidden;
}

.item-img-mini img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
}

.item-name-text {
    font-size: 0.88rem;
    max-width: 260px;
    line-height: 1.3;
}

.btn-track {
    background-color: #0c0d0e;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    height: 42px;
    transition: background-color 0.15s ease;
}

.btn-track:hover {
    background-color: #1e293b;
}

.btn-continue-shop {
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.9rem;
    height: 42px;
    transition: all 0.15s ease;
}

.btn-continue-shop:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
}

.email-note {
    font-size: 0.82rem;
}
</style>
