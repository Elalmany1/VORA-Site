<script>
export default {
    name: "AdminMobileHeader",
    emits: ["toggle-menu"],
};
</script>

<template>
    <header class="mobile-header d-flex d-md-none align-items-center justify-content-between px-3 py-2 bg-white border-bottom">
        <div class="d-flex align-items-center gap-2">
            <button
                class="btn btn-icon p-1 border-0 text-dark"
                @click="$emit('toggle-menu')"
                aria-label="Toggle Menu"
            >
                <i class="bi bi-list fs-3"></i>
            </button>
            <div class="mobile-brand fw-bold fs-5 text-dark">
                VORA Admin
            </div>
        </div>

        <div class="d-flex align-items-center gap-3">
            <RouterLink to="/cart" class="text-dark fs-5 text-decoration-none" title="Store Cart">
                <i class="bi bi-cart3"></i>
            </RouterLink>
            <button class="btn btn-icon p-0 border-0 text-dark fs-5 position-relative" title="Notifications">
                <i class="bi bi-bell"></i>
                <span class="notification-badge"></span>
            </button>
            <div class="avatar-circle">
                <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Admin Profile"
                />
            </div>
        </div>
    </header>
</template>

<style scoped>
.mobile-header {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1020;
    background-color: #ffffff;
}

.mobile-brand {
    letter-spacing: 0.3px;
}

.notification-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 7px;
    height: 7px;
    background-color: #ef4444;
    border-radius: 50%;
    border: 1px solid #ffffff;
}

.avatar-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #e2e8f0;
    flex-shrink: 0;
}

.avatar-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
