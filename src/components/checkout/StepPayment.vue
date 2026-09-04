<script>
import { cartStore } from "../../store/cartStore.js";

export default {
    name: "StepPayment",
    emits: ["continue", "back-to-shipping"],
    data() {
        return {
            selectedMethod: cartStore.paymentMethod || "card",
            cardData: { ...cartStore.cardDetails },
            billingSameAsShipping: cartStore.billingSameAsShipping,
            differentBilling: { ...cartStore.differentBillingAddress },
        };
    },
    computed: {
        shippingAddress() {
            return (
                cartStore.addresses.find((a) => a.id === cartStore.selectedAddressId) ||
                cartStore.addresses[0]
            );
        },
    },
    methods: {
        handleSelectMethod(method) {
            this.selectedMethod = method;
            cartStore.paymentMethod = method;
        },
        handleContinue() {
            cartStore.paymentMethod = this.selectedMethod;
            cartStore.cardDetails = { ...this.cardData };
            cartStore.billingSameAsShipping = this.billingSameAsShipping;
            cartStore.differentBillingAddress = { ...this.differentBilling };
            this.$emit("continue");
        },
    },
};
</script>

<template>
    <div class="step-payment">
        <!-- Protocol Header -->
        <div class="protocol-tag font-monospace text-uppercase mb-1">
            Protocol 03 / Transaction
        </div>
        <h1 class="page-title mb-2">Payment Method</h1>
        <p class="page-subtitle text-muted mb-4">
            Select your payment authorization channel. All telemetry and transaction payloads are cryptographically end-to-end encrypted.
        </p>

        <!-- Payment Options Card Box -->
        <div class="card-section p-3 p-sm-4 bg-white rounded border mb-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-credit-card fs-5 text-dark"></i>
                    <h2 class="section-title mb-0">Payment Options</h2>
                </div>
                <span class="badge ssl-badge font-monospace text-uppercase">
                    &bull; 256-Bit SSL Ready
                </span>
            </div>

            <div class="payment-methods-list d-flex flex-column gap-3">
                <!-- Option 1: Credit / Debit Card -->
                <div
                    class="payment-option-box rounded border transition-all"
                    :class="{ 'is-active': selectedMethod === 'card' }"
                >
                    <div
                        class="option-header p-3 d-flex align-items-center justify-content-between cursor-pointer"
                        @click="handleSelectMethod('card')"
                    >
                        <div class="d-flex align-items-center gap-3">
                            <div class="radio-indicator">
                                <span class="radio-dot" v-if="selectedMethod === 'card'"></span>
                            </div>
                            <div>
                                <div class="option-name fw-bold text-dark">Credit / Debit Card</div>
                                <div class="option-subtext text-muted small">Instant processing via secured gateway</div>
                            </div>
                        </div>

                        <!-- Card Logos -->
                        <div class="d-flex align-items-center gap-1">
                            <span class="card-badge">VISA</span>
                            <span class="card-badge">MC</span>
                            <span class="card-badge">AMEX</span>
                        </div>
                    </div>

                    <!-- Nested Card Form (Expanded when selected) -->
                    <div v-if="selectedMethod === 'card'" class="card-form-wrapper p-3 pt-0 border-top bg-light-subtle">
                        <div class="row g-3 pt-3">
                            <!-- Card Number -->
                            <div class="col-12">
                                <label class="form-label field-label text-uppercase">Card Number</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white border-end-0 text-muted">
                                        <i class="bi bi-credit-card-2-front"></i>
                                    </span>
                                    <input
                                        v-model="cardData.number"
                                        type="text"
                                        class="form-control border-start-0 border-end-0 font-monospace"
                                        placeholder="4532 9012 3456 7890"
                                    />
                                    <span class="input-group-text bg-white border-start-0">
                                        <span class="card-type-chip">VISA</span>
                                    </span>
                                </div>
                            </div>

                            <!-- Cardholder Name -->
                            <div class="col-12">
                                <label class="form-label field-label text-uppercase">Cardholder Name</label>
                                <input
                                    v-model="cardData.name"
                                    type="text"
                                    class="form-control text-uppercase"
                                    placeholder="ALEX MERCER"
                                />
                            </div>

                            <!-- Expiration Date & CVC -->
                            <div class="col-12 col-sm-6">
                                <label class="form-label field-label text-uppercase">Expiration Date</label>
                                <input
                                    v-model="cardData.expiry"
                                    type="text"
                                    class="form-control font-monospace text-center"
                                    placeholder="MM / YY"
                                />
                            </div>

                            <div class="col-12 col-sm-6">
                                <div class="d-flex justify-content-between align-items-center">
                                    <label class="form-label field-label text-uppercase mb-0">CVC / CVV</label>
                                    <span class="text-muted digits-hint"><i class="bi bi-info-circle me-1"></i>3 digits</span>
                                </div>
                                <div class="input-group mt-1">
                                    <input
                                        v-model="cardData.cvv"
                                        type="password"
                                        maxlength="4"
                                        class="form-control font-monospace text-center"
                                        placeholder="842"
                                    />
                                    <span class="input-group-text bg-white text-muted">
                                        <i class="bi bi-lock-fill"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- Save Card Vault Checkbox -->
                            <div class="col-12">
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="saveCardCheck"
                                        v-model="cardData.saveCard"
                                    />
                                    <label class="form-check-label small text-muted cursor-pointer" for="saveCardCheck">
                                        Save card securely in VORA Hardware Vault for expedited checkout
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Option 2: Digital Wallets (Apple Pay / Google Pay) -->
                <div
                    class="payment-option-box rounded border p-3 d-flex align-items-center justify-content-between cursor-pointer"
                    :class="{ 'is-active': selectedMethod === 'wallet' }"
                    @click="handleSelectMethod('wallet')"
                >
                    <div class="d-flex align-items-center gap-3">
                        <div class="radio-indicator">
                            <span class="radio-dot" v-if="selectedMethod === 'wallet'"></span>
                        </div>
                        <div>
                            <div class="option-name fw-bold text-dark">Digital Wallets (Apple Pay / Google Pay)</div>
                            <div class="option-subtext text-muted small">Single-touch cryptographic biometric confirmation</div>
                        </div>
                    </div>
                    <i class="bi bi-wallet2 fs-5 text-muted"></i>
                </div>

                <!-- Option 3: PayPal -->
                <div
                    class="payment-option-box rounded border p-3 d-flex align-items-center justify-content-between cursor-pointer"
                    :class="{ 'is-active': selectedMethod === 'paypal' }"
                    @click="handleSelectMethod('paypal')"
                >
                    <div class="d-flex align-items-center gap-3">
                        <div class="radio-indicator">
                            <span class="radio-dot" v-if="selectedMethod === 'paypal'"></span>
                        </div>
                        <div>
                            <div class="option-name fw-bold text-dark">PayPal</div>
                            <div class="option-subtext text-muted small">Redirect to PayPal to authenticate transaction</div>
                        </div>
                    </div>
                    <span class="fw-bold font-monospace text-primary">PayPal</span>
                </div>

                <!-- Option 4: Enterprise Wire Transfer / Net 30 -->
                <div
                    class="payment-option-box rounded border p-3 d-flex align-items-center justify-content-between cursor-pointer"
                    :class="{ 'is-active': selectedMethod === 'wire' }"
                    @click="handleSelectMethod('wire')"
                >
                    <div class="d-flex align-items-center gap-3">
                        <div class="radio-indicator">
                            <span class="radio-dot" v-if="selectedMethod === 'wire'"></span>
                        </div>
                        <div>
                            <div class="option-name fw-bold text-dark">Enterprise Wire Transfer / Net 30 Terms</div>
                            <div class="option-subtext text-muted small">Invoice provided upon system spec verification</div>
                        </div>
                    </div>
                    <i class="bi bi-bank fs-5 text-muted"></i>
                </div>
            </div>
        </div>

        <!-- Billing Address Section -->
        <div class="card-section p-3 p-sm-4 bg-white rounded border mb-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-geo-alt fs-5 text-dark"></i>
                    <h2 class="section-title mb-0">Billing Address</h2>
                </div>
                <span class="badge verified-badge font-monospace text-uppercase">
                    Verified
                </span>
            </div>

            <!-- Option 1: Same as shipping address -->
            <div
                class="billing-choice-box p-3 rounded border mb-2 cursor-pointer"
                :class="{ 'is-selected': billingSameAsShipping }"
                @click="billingSameAsShipping = true"
            >
                <div class="d-flex align-items-start gap-3">
                    <div class="radio-indicator mt-1">
                        <span class="radio-dot" v-if="billingSameAsShipping"></span>
                    </div>
                    <div>
                        <div class="fw-bold text-dark">Same as shipping address</div>
                        <div class="text-muted small mt-1">
                            {{ shippingAddress.name }} &mdash; {{ shippingAddress.line1 }}, {{ shippingAddress.city }}, {{ shippingAddress.postalCode }}, {{ shippingAddress.country }}
                        </div>
                        <div class="text-muted small mt-1">
                            {{ shippingAddress.phone }} &bull; Dispatch via Express Standard
                        </div>
                    </div>
                </div>
            </div>

            <!-- Option 2: Use different billing address -->
            <div
                class="billing-choice-box p-3 rounded border cursor-pointer"
                :class="{ 'is-selected': !billingSameAsShipping }"
                @click="billingSameAsShipping = false"
            >
                <div class="d-flex align-items-start gap-3">
                    <div class="radio-indicator mt-1">
                        <span class="radio-dot" v-if="!billingSameAsShipping"></span>
                    </div>
                    <div>
                        <div class="fw-bold text-dark">Use a different billing address</div>
                        <div class="text-muted small">Specify alternate corporate or individual tax entity</div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="my-4 border-secondary-subtle" />

        <!-- Bottom Actions Row -->
        <div class="d-flex align-items-center justify-content-between pt-2">
            <button
                class="btn btn-link text-decoration-none text-dark fw-semibold p-0 d-flex align-items-center gap-2"
                @click="$emit('back-to-shipping')"
            >
                <i class="bi bi-arrow-left"></i>
                <span>Back to Shipping</span>
            </button>

            <button
                class="btn btn-continue px-4 py-2 text-white fw-bold d-flex align-items-center gap-2"
                @click="handleContinue"
            >
                <span>Continue to Review</span>
                <i class="bi bi-arrow-right"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
.protocol-tag {
    font-size: 0.72rem;
    color: #64748b;
    letter-spacing: 0.8px;
}

.page-title {
    font-size: 1.95rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
}

.page-subtitle {
    font-size: 0.88rem;
    line-height: 1.45;
}

.card-section {
    border-color: #e5e7eb !important;
}

.section-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
}

.ssl-badge {
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
    font-size: 0.68rem;
}

.verified-badge {
    background-color: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
    font-size: 0.68rem;
}

.payment-option-box {
    border-color: #e2e8f0;
    transition: all 0.15s ease;
}

.payment-option-box.is-active {
    border-color: #0f172a;
}

.radio-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.is-active .radio-indicator,
.is-selected .radio-indicator {
    border-color: #0f172a;
}

.radio-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #0f172a;
}

.card-badge {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 3px;
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #e2e8f0;
}

.card-type-chip {
    font-size: 0.7rem;
    font-weight: 800;
    color: #1d4ed8;
    letter-spacing: 0.5px;
}

.field-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #475569;
}

.digits-hint {
    font-size: 0.7rem;
}

.billing-choice-box {
    border-color: #e2e8f0;
    transition: all 0.15s ease;
}

.billing-choice-box.is-selected {
    border: 1.5px solid #0f172a;
}

.btn-continue {
    background-color: #000000;
    border: none;
    border-radius: 4px;
    font-size: 0.92rem;
    padding: 12px 24px;
    transition: background-color 0.15s ease;
}

.btn-continue:hover {
    background-color: #1e293b;
}
</style>
