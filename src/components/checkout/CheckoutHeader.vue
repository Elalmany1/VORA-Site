<script>
export default {
    name: "CheckoutHeader",
};
</script>

<template>
    <header class="checkout-header px-3 px-sm-4 py-3 bg-dark-header border-bottom">
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <!-- Brand Logo -->
            <RouterLink to="/" class="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
                <div class="logo-box">
                    <img src="../../assets/Logo SVG.svg" alt="VORA" class="logo-img" />
                </div>
                <span class="brand-name fw-bold text-white fs-5">VORA</span>
            </RouterLink>

            <!-- Secure Checkout Notice -->
            <div class="d-flex align-items-center gap-2 text-light-muted secure-text text-uppercase">
                <i class="bi bi-shield-lock-fill"></i>
                <span>Secure Checkout</span>
            </div>
        </div>
    </header>
</template>

<style scoped>
.bg-dark-header {
    background-color: #0c0d0e;
}

.logo-box {
    width: 32px;
    height: 32px;
    background: #ffffff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
}

.logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.brand-name {
    letter-spacing: 0.5px;
}

.secure-text {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: #94a3b8;
}

.secure-text i {
    font-size: 0.95rem;
    color: #94a3b8;
}
</style>
