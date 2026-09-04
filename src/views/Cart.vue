<script>
import { cartStore } from "../store/cartStore.js";
import CartPriceAlert from "../components/cart/CartPriceAlert.vue";
import CartItem from "../components/cart/CartItem.vue";
import CartSummary from "../components/cart/CartSummary.vue";
import CheckoutFooter from "../components/common/CheckoutFooter.vue";

export default {
    name: "CartView",
    components: {
        CartPriceAlert,
        CartItem,
        CartSummary,
        CheckoutFooter,
    },
    computed: {
        cart() {
            return cartStore;
        },
    },
    methods: {
        handleProceed() {
            this.$router.push("/checkout");
        },
    },
};
</script>

<template>
    <div class="cart-page-wrapper d-flex flex-column min-vh-100 bg-page">
        <main class="container-fluid px-3 px-sm-4 px-lg-5 py-4 py-lg-5 flex-grow-1">
            <!-- Breadcrumbs -->
            <nav aria-label="breadcrumb" class="mb-3">
                <ol class="breadcrumb mb-0 small">
                    <li class="breadcrumb-item">
                        <RouterLink to="/" class="text-decoration-none text-muted">Home</RouterLink>
                    </li>
                    <li class="breadcrumb-item active text-dark fw-semibold" aria-current="page">
                        Cart
                    </li>
                </ol>
            </nav>

            <!-- Page Title -->
            <div class="cart-header mb-4">
                <h1 class="cart-title mb-1">Shopping Cart</h1>
                <p class="cart-subtitle text-muted mb-0">
                    Review your selected items before checking out.
                </p>
            </div>

            <!-- Empty Cart State -->
            <div v-if="cart.items.length === 0" class="empty-cart-box p-5 text-center bg-white rounded border my-4">
                <i class="bi bi-cart-x text-muted display-4 mb-3 d-block"></i>
                <h3 class="fs-5 fw-bold text-dark mb-2">Your Shopping Cart is empty</h3>
                <p class="text-muted small mb-4">Looks like you haven't added any items to your cart yet.</p>
                <RouterLink to="/shop" class="btn btn-dark px-4 py-2 fw-semibold">
                    Start Shopping
                </RouterLink>
            </div>

            <!-- Cart Content Layout -->
            <div v-else class="row g-4 g-xl-5">
                <!-- Left Column: Price Alert + Cart Items -->
                <div class="col-12 col-lg-8 col-xl-8">
                    <!-- Price Decrease Alert -->
                    <CartPriceAlert
                        v-if="cart.priceAlert.active"
                        :productName="cart.priceAlert.productName"
                        :oldPrice="cart.priceAlert.oldPrice"
                        :newPrice="cart.priceAlert.newPrice"
                        @dismiss="cart.dismissPriceAlert"
                    />

                    <!-- Cart Items List -->
                    <div class="cart-items-list">
                        <CartItem
                            v-for="item in cart.items"
                            :key="item.id"
                            :item="item"
                            @update-quantity="cart.updateQuantity"
                            @remove="cart.removeItem"
                            @save-for-later="cart.saveForLater"
                        />
                    </div>
                </div>

                <!-- Right Column: Cart Summary -->
                <div class="col-12 col-lg-4 col-xl-4">
                    <CartSummary
                        :totalItemsCount="cart.totalItemsCount"
                        :subtotal="cart.subtotal"
                        :discount="cart.discount"
                        :grandTotal="cart.grandTotal"
                        @proceed-to-checkout="handleProceed"
                    />
                </div>
            </div>
        </main>

        <!-- Standard VORA Footer -->
        <CheckoutFooter />
    </div>
</template>

<style scoped>
.bg-page {
    background-color: #f7f7f8;
}

.cart-title {
    font-size: 2.3rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
}

.cart-subtitle {
    font-size: 0.95rem;
}

.breadcrumb-item + .breadcrumb-item::before {
    content: "›";
    color: #94a3b8;
}

@media (max-width: 767.98px) {
    .cart-title {
        font-size: 1.75rem;
    }
}
</style>
