<script>
export default {
    name: "AdminSidebar",
    props: {
        activeNav: {
            type: String,
            default: "dashboard",
        },
    },
    emits: ["select-nav"],
    methods: {
        selectNav(nav) {
            this.$emit("select-nav", nav);
        },
    },
};
</script>

<template>
    <aside class="desktop-sidebar d-none d-md-flex flex-column">
        <!-- Brand -->
        <div class="brand-section px-4 pt-4 pb-3">
            <div class="d-flex align-items-center gap-2 mb-1">
                <div class="logo-box">
                    <img src="../../assets/Logo SVG.svg" alt="VORA" class="logo-img" />
                </div>
                <span class="brand-title">VORA</span>
            </div>
            <div class="tenant-label">Tenant Administration</div>
        </div>

        <!-- Navigation Menu -->
        <nav class="sidebar-nav px-3 flex-grow-1">
            <ul class="list-unstyled mb-0 d-flex flex-column gap-1">
                <li>
                    <button
                        class="nav-link-btn"
                        :class="{ active: activeNav === 'dashboard' }"
                        @click="selectNav('dashboard')"
                    >
                        <i class="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </button>
                </li>
                <li>
                    <button
                        class="nav-link-btn"
                        :class="{ active: activeNav === 'products' }"
                        @click="selectNav('products')"
                    >
                        <i class="bi bi-card-list"></i>
                        <span>Products</span>
                    </button>
                </li>
                <li>
                    <button
                        class="nav-link-btn"
                        :class="{ active: activeNav === 'inventory' }"
                        @click="selectNav('inventory')"
                    >
                        <i class="bi bi-archive"></i>
                        <span>Inventory</span>
                    </button>
                </li>
                <li>
                    <button
                        class="nav-link-btn"
                        :class="{ active: activeNav === 'orders' }"
                        @click="selectNav('orders')"
                    >
                        <i class="bi bi-cart3"></i>
                        <span>Orders</span>
                    </button>
                </li>
                <li>
                    <button
                        class="nav-link-btn"
                        :class="{ active: activeNav === 'customers' }"
                        @click="selectNav('customers')"
                    >
                        <i class="bi bi-people"></i>
                        <span>Customers</span>
                    </button>
                </li>
                <li>
                    <button
                        class="nav-link-btn"
                        :class="{ active: activeNav === 'reports' }"
                        @click="selectNav('reports')"
                    >
                        <i class="bi bi-file-earmark-bar-graph"></i>
                        <span>Reports</span>
                    </button>
                </li>
            </ul>
        </nav>

        <!-- Bottom Storefront Switcher -->
        <div class="sidebar-footer px-3 pb-3 pt-2">
            <RouterLink
                to="/"
                class="nav-link-btn text-decoration-none store-link"
                title="Return to user shop"
            >
                <i class="bi bi-shop"></i>
                <span>Back to Store</span>
            </RouterLink>
        </div>
    </aside>
</template>

<style scoped>
.desktop-sidebar {
    width: 240px;
    min-width: 240px;
    background-color: #0c0d0e;
    color: #ffffff;
    height: 100vh;
    max-height: 100vh;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    align-self: flex-start;
    z-index: 100;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid #1f242d;
    flex-shrink: 0;
}

.desktop-sidebar::-webkit-scrollbar {
    width: 4px;
}

.desktop-sidebar::-webkit-scrollbar-thumb {
    background: #27272a;
    border-radius: 4px;
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

.brand-title {
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    color: #ffffff;
}

.tenant-label {
    font-size: 0.72rem;
    color: #94a3b8;
    letter-spacing: 0.3px;
    margin-top: 2px;
}

.nav-link-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 14px;
    border: none;
    background: transparent;
    color: #9ca3af;
    font-size: 0.88rem;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.15s ease-in-out;
    text-align: left;
}

.nav-link-btn i {
    font-size: 1.05rem;
}

.nav-link-btn:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.08);
}

.nav-link-btn.active {
    background-color: #dbeafe;
    color: #0f172a;
    font-weight: 600;
}

.nav-link-btn.active i {
    color: #0f172a;
}

.sidebar-footer {
    margin-top: auto;
    border-top: 1px solid #1f242d !important;
}

.store-link {
    color: #94a3b8;
}

.store-link:hover {
    color: #38bdf8;
}

/* Tablet (768px to 991.98px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .desktop-sidebar {
        width: 200px;
        min-width: 200px;
    }
    .brand-section {
        padding: 18px 14px 12px !important;
    }
    .sidebar-nav {
        padding-left: 8px !important;
        padding-right: 8px !important;
    }
    .nav-link-btn {
        padding: 8px 10px;
        font-size: 0.82rem;
        gap: 8px;
    }
}
</style>
