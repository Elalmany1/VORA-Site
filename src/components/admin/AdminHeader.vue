<script>
export default {
    name: "AdminHeader",
    props: {
        searchQuery: {
            type: String,
            default: "",
        },
    },
    emits: ["update:searchQuery"],
};
</script>

<template>
    <header class="desktop-header d-none d-md-flex align-items-center justify-content-between px-3 px-lg-4 py-3 bg-white border-bottom">
        <!-- Search Box -->
        <div class="search-input-wrapper">
            <i class="bi bi-search search-icon"></i>
            <input
                type="text"
                :value="searchQuery"
                @input="$emit('update:searchQuery', $event.target.value)"
                placeholder="Search orders, products, customers..."
                class="search-field"
            />
            <button
                v-if="searchQuery"
                class="btn-clear p-0 border-0 bg-transparent text-muted"
                @click="$emit('update:searchQuery', '')"
                title="Clear search"
            >
                <i class="bi bi-x"></i>
            </button>
        </div>

        <!-- Right Header Actions -->
        <div class="d-flex align-items-center gap-3">
            <button class="header-icon-btn position-relative" title="Notifications">
                <i class="bi bi-bell"></i>
                <span class="notification-badge"></span>
            </button>
            <button class="header-icon-btn" title="Settings">
                <i class="bi bi-gear"></i>
            </button>
            <button class="header-icon-btn" title="Tenant Applications">
                <i class="bi bi-grid-3x3-gap"></i>
            </button>

            <div class="vr mx-1 my-1 text-muted opacity-25"></div>

            <!-- User Profile Card -->
            <div class="d-flex align-items-center gap-2 user-pill">
                <div class="text-end lh-1">
                    <div class="user-name">Admin User</div>
                    <div class="user-role">Superuser</div>
                </div>
                <div class="avatar-circle">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Admin User"
                    />
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.desktop-header {
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 90;
}

.search-input-wrapper {
    position: relative;
    width: 360px;
    max-width: 100%;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 0.88rem;
}

.search-field {
    width: 100%;
    padding: 8px 32px 8px 36px;
    background-color: #f1f3f5;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.84rem;
    color: #1e293b;
    outline: none;
    transition: all 0.15s ease;
}

.search-field:focus {
    background-color: #ffffff;
    border-color: #94a3b8;
    box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.05);
}

.btn-clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.1rem;
    line-height: 1;
}

.header-icon-btn {
    background: transparent;
    border: none;
    color: #64748b;
    font-size: 1.1rem;
    padding: 6px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
}

.header-icon-btn:hover {
    color: #0f172a;
    background-color: #f1f5f9;
}

.notification-badge {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 7px;
    height: 7px;
    background-color: #ef4444;
    border-radius: 50%;
    border: 1px solid #ffffff;
}

.user-pill {
    padding: 4px 6px;
    border-radius: 6px;
    cursor: pointer;
}

.user-name {
    font-size: 0.84rem;
    font-weight: 600;
    color: #0f172a;
}

.user-role {
    font-size: 0.72rem;
    color: #64748b;
    margin-top: 2px;
}

.avatar-circle {
    width: 34px;
    height: 34px;
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

/* Tablet (768px to 991.98px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .search-input-wrapper {
        width: 220px;
    }
    .desktop-header {
        padding-left: 16px !important;
        padding-right: 16px !important;
    }
}
</style>
