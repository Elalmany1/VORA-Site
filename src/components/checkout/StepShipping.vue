<script>
import { cartStore } from "../../store/cartStore.js";

export default {
    name: "StepShipping",
    emits: ["continue", "back-to-cart"],
    data() {
        return {
            showNewAddressForm: false,
            newAddress: {
                name: "",
                line1: "",
                city: "",
                postalCode: "",
                country: "United States",
                phone: "",
            },
        };
    },
    computed: {
        addresses() {
            return cartStore.addresses;
        },
        selectedAddressId() {
            return cartStore.selectedAddressId;
        },
    },
    methods: {
        selectAddress(id) {
            cartStore.selectedAddressId = id;
        },
        handleAddNewAddress() {
            if (!this.newAddress.name || !this.newAddress.line1) return;
            cartStore.addAddress({ ...this.newAddress });
            this.showNewAddressForm = false;
            this.newAddress = {
                name: "",
                line1: "",
                city: "",
                postalCode: "",
                country: "United States",
                phone: "",
            };
        },
    },
};
</script>

<template>
    <div class="step-shipping">
        <h1 class="page-title mb-4">Shipping Address</h1>

        <div class="section-subheading mb-3">Saved Addresses</div>

        <!-- Addresses Grid -->
        <div class="row g-3 mb-3">
            <div
                v-for="addr in addresses"
                :key="addr.id"
                class="col-12 col-md-6"
            >
                <div
                    class="address-card p-3 p-sm-4 bg-white rounded cursor-pointer h-100 position-relative"
                    :class="{ 'is-selected': addr.id === selectedAddressId }"
                    @click="selectAddress(addr.id)"
                >
                    <div class="d-flex align-items-start gap-3">
                        <!-- Custom Radio Circle -->
                        <div class="radio-indicator mt-1">
                            <span class="radio-dot" v-if="addr.id === selectedAddressId"></span>
                        </div>

                        <!-- Address Info -->
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <span class="recipient-name fw-bold text-dark">{{ addr.name }}</span>
                                <span v-if="addr.isDefault" class="badge-default font-monospace">DEFAULT</span>
                            </div>
                            <div class="address-lines text-muted small">
                                <div>{{ addr.line1 }}</div>
                                <div>{{ addr.city }}, {{ addr.postalCode }}</div>
                                <div>{{ addr.country }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add New Address Button Card -->
        <div class="mb-4">
            <button
                v-if="!showNewAddressForm"
                class="btn-add-address-card w-100 p-3 bg-white rounded border d-flex align-items-center justify-content-start gap-2"
                @click="showNewAddressForm = true"
            >
                <i class="bi bi-plus-lg text-dark fw-bold"></i>
                <span class="fw-bold text-dark">Add New Address</span>
            </button>

            <!-- Inline New Address Form -->
            <div v-else class="new-address-form-box p-4 bg-white rounded border">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fs-6 fw-bold mb-0">Enter New Shipping Address</h4>
                    <button class="btn btn-sm btn-link text-muted" @click="showNewAddressForm = false">Cancel</button>
                </div>
                <div class="row g-3">
                    <div class="col-12 col-sm-6">
                        <label class="form-label small text-muted">Full Name</label>
                        <input v-model="newAddress.name" type="text" class="form-control form-control-sm" placeholder="e.g. Alex Mercer" />
                    </div>
                    <div class="col-12 col-sm-6">
                        <label class="form-label small text-muted">Phone Number</label>
                        <input v-model="newAddress.phone" type="text" class="form-control form-control-sm" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div class="col-12">
                        <label class="form-label small text-muted">Address Line</label>
                        <input v-model="newAddress.line1" type="text" class="form-control form-control-sm" placeholder="Street address or P.O. Box" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="form-label small text-muted">City</label>
                        <input v-model="newAddress.city" type="text" class="form-control form-control-sm" placeholder="City" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="form-label small text-muted">Postal / ZIP Code</label>
                        <input v-model="newAddress.postalCode" type="text" class="form-control form-control-sm" placeholder="Postal Code" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <label class="form-label small text-muted">Country</label>
                        <input v-model="newAddress.country" type="text" class="form-control form-control-sm" placeholder="Country" />
                    </div>
                    <div class="col-12">
                        <button class="btn btn-dark btn-sm px-4" @click="handleAddNewAddress">Save Address</button>
                    </div>
                </div>
            </div>
        </div>

        <hr class="my-4 border-secondary-subtle" />

        <!-- Bottom Action Buttons -->
        <div class="d-flex align-items-center justify-content-between pt-2">
            <RouterLink to="/cart" class="btn-back d-flex align-items-center gap-2 text-decoration-none text-dark fw-semibold">
                <i class="bi bi-arrow-left"></i>
                <span>Back to Cart</span>
            </RouterLink>

            <button
                class="btn btn-continue px-4 py-2 text-white fw-bold"
                @click="$emit('continue')"
            >
                Continue to Payment
            </button>
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

.section-subheading {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
}

.address-card {
    border: 1px solid #e2e8f0;
    transition: all 0.15s ease;
    cursor: pointer;
}

.address-card:hover {
    border-color: #cbd5e1;
}

.address-card.is-selected {
    border: 2px solid #0f172a !important;
    background-color: #ffffff;
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
    transition: border-color 0.15s ease;
}

.address-card.is-selected .radio-indicator {
    border-color: #0f172a;
}

.radio-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #0f172a;
}

.recipient-name {
    font-size: 0.95rem;
}

.badge-default {
    font-size: 0.65rem;
    font-weight: 700;
    color: #475569;
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 2px 6px;
    border-radius: 3px;
    letter-spacing: 0.5px;
}

.address-lines {
    line-height: 1.45;
}

.btn-add-address-card {
    border: 1px solid #e2e8f0 !important;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.btn-add-address-card:hover {
    background-color: #f8fafc;
}

.new-address-form-box {
    border: 1px solid #e2e8f0;
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

.btn-back {
    font-size: 0.9rem;
    color: #334155;
    transition: color 0.15s ease;
}

.btn-back:hover {
    color: #000000;
}
</style>
