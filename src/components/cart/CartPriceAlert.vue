<script>
export default {
    name: "CartPriceAlert",
    props: {
        productName: {
            type: String,
            default: "Samsung 634L SpaceMax Refrigerator",
        },
        oldPrice: {
            type: [Number, String],
            default: "1,899.00",
        },
        newPrice: {
            type: [Number, String],
            default: "1,749.00",
        },
    },
    emits: ["dismiss"],
};
</script>

<template>
    <div class="cart-price-alert d-flex align-items-center justify-content-between p-3 mb-4 rounded">
        <div class="d-flex align-items-center gap-3">
            <div class="alert-icon-wrap text-muted">
                <i class="bi bi-info-circle fs-5"></i>
            </div>
            <p class="alert-message mb-0">
                The price of <strong>{{ productName }}</strong> has decreased from
                <span class="text-decoration-line-through">${{ typeof oldPrice === 'number' ? oldPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }) : oldPrice }}</span>
                to
                <strong class="text-dark">${{ typeof newPrice === 'number' ? newPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }) : newPrice }}</strong>
                since you added it to your cart.
            </p>
        </div>
        <button
            type="button"
            class="btn-close btn-close-sm ms-2"
            @click="$emit('dismiss')"
            aria-label="Close"
        ></button>
    </div>
</template>

<style scoped>
.cart-price-alert {
    background-color: #f1f3f5;
    border: 1px solid #e2e8f0;
}

.alert-icon-wrap {
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
}

.alert-message {
    font-size: 0.88rem;
    color: #334155;
    line-height: 1.4;
}

.btn-close-sm {
    font-size: 0.75rem;
}
</style>
