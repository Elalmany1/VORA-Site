<script>
export default {
    name: "AdminMobileDrawer",
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        activeNav: {
            type: String,
            default: "dashboard",
        },
    },
    emits: ["close", "select-nav"],
    methods: {
        selectNav(nav) {
            this.$emit("select-nav", nav);
            this.$emit("close");
        },
    },
};
</script>

<template>
    <div>
        <!-- Backdrop -->
        <div
            class="mobile-drawer-backdrop"
            v-if="isOpen"
            @click="$emit('close')"
        ></div>

        <!-- Sliding Drawer -->
        <aside
            class="mobile-drawer d-md-none"
            :class="{ open: isOpen }"
        >
            <div class="p-3 border-bottom border-secondary-subtle d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                    <div class="logo-box">
                        <img src="../../assets/Logo SVG.svg" alt="VORA" class="logo-img" />
                    </div>
                    <div>
                        <div class="fw-bold text-white fs-6">VORA</div>
                        <div class="tenant-label">Tenant Administration</div>
                    </div>
                </div>
                <button
                    class="btn-close btn-close-white"
                    @click="$emit('close')"
                    aria-label="Close Menu"
                ></button>
            </div>

            <nav class="p-3">
                <div class="menu-heading">NAVIGATION</div>
                <ul class="nav-list list-unstyled mb-4">
                    <li
                        class="nav-item-custom"
                        :class="{ active: activeNav === 'dashboard' }"
                        @click="selectNav('dashboard')"
                    >
                        <i class="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </li>
                    <li
                        class="nav-item-custom"
                        :class="{ active: activeNav === 'products' }"
                        @click="selectNav('products')"
                    >
                        <i class="bi bi-card-list"></i>
                        <span>Products</span>
                    </li>
                    <li
                        class="nav-item-custom"
                        :class="{ active: activeNav === 'inventory' }"
                        @click="selectNav('inventory')"
                    >
                        <i class="bi bi-archive"></i>
                        <span>Inventory</span>
                    </li>
                    <li
                        class="nav-item-custom"
                        :class="{ active: activeNav === 'orders' }"
                        @click="selectNav('orders')"
                    >
                        <i class="bi bi-cart3"></i>
                        <span>Orders</span>
                    </li>
                    <li
                        class="nav-item-custom"
                        :class="{ active: activeNav === 'customers' }"
                        @click="selectNav('customers')"
                    >
                        <i class="bi bi-people"></i>
                        <span>Customers</span>
                    </li>
                    <li
                        class="nav-item-custom"
                        :class="{ active: activeNav === 'reports' }"
                        @click="selectNav('reports')"
                    >
                        <i class="bi bi-file-earmark-bar-graph"></i>
                        <span>Reports</span>
                    </li>
                </ul>

                <div class="menu-heading">QUICK LINKS</div>
                <ul class="nav-list list-unstyled">
                    <li>
                        <RouterLink to="/" class="nav-item-custom text-decoration-none">
                            <i class="bi bi-shop"></i>
                            <span>View Storefront</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/support" class="nav-item-custom text-decoration-none">
                            <i class="bi bi-question-circle"></i>
                            <span>Help & Support</span>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </aside>
    </div>
</template>

<style scoped>
.mobile-drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1030;
    backdrop-filter: blur(2px);
}

.mobile-drawer {
    position: fixed;
    top: 0;
    left: -280px;
    width: 280px;
    height: 100vh;
    background: #0c0d0e;
    color: #fff;
    z-index: 1040;
    transition: left 0.25s ease;
    overflow-y: auto;
}

.mobile-drawer.open {
    left: 0;
}

.logo-box {
    width: 30px;
    height: 30px;
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

.tenant-label {
    font-size: 0.7rem;
    color: #94a3b8;
}

.menu-heading {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #64748b;
    margin-bottom: 8px;
}

.nav-item-custom {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 6px;
    color: #94a3b8;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
}

.nav-item-custom:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
}

.nav-item-custom.active {
    background-color: #dbeafe;
    color: #0f172a;
    font-weight: 600;
}
</style>
