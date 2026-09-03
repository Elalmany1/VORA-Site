```vue
<script>
export default {
    name: "AppHeader",
};
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-black navbar-dark">
        <div class="container-fluid px-3 px-lg-4">
            <!-- Logo -->
            <RouterLink to="/" class="navbar-brand">
                <img src="" alt="Logo" width="30" height="24" />
            </RouterLink>

            <!-- Right Side Icons -->
            <div class="d-flex align-items-center gap-3 order-lg-3">
                <!-- Search - Mobile -->
                <RouterLink
                    to="/"
                    class="text-white fs-5 d-lg-none text-decoration-none"
                    aria-label="Search"
                >
                    <i class="bi bi-search"></i>
                </RouterLink>

                <!-- Wishlist -->
                <RouterLink
                    to="/wishlist"
                    class="text-white fs-5 text-decoration-none"
                    aria-label="Wishlist"
                >
                    <i class="bi bi-heart"></i>
                </RouterLink>

                <!-- Profile -->
                <RouterLink
                    to="/profile"
                    class="text-white fs-5 text-decoration-none"
                    aria-label="Profile"
                >
                    <i class="bi bi-person"></i>
                </RouterLink>

                <!-- Cart -->
                <RouterLink
                    to="/cart"
                    class="text-white fs-5 position-relative text-decoration-none"
                    aria-label="Shopping Cart"
                >
                    <i class="bi bi-cart3"></i>

                    <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >
                        0
                    </span>
                </RouterLink>
            </div>

            <!-- Mobile Burger -->
            <button
                class="navbar-toggler ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navigation -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Navigation Links -->
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link"> Shop </RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/categories" class="nav-link">
                            Categories
                        </RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/deals" class="nav-link">
                            Deals
                        </RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/support" class="nav-link">
                            Support
                        </RouterLink>
                    </li>
                </ul>

                <!-- Desktop Search -->
                <form
                    class="d-flex search-form mx-lg-auto my-3 my-lg-0"
                    role="search"
                >
                    <div class="input-group">
                        <input
                            class="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />

                        <button
                            class="btn btn-outline-secondary"
                            type="submit"
                            aria-label="Search"
                        >
                            <i class="bi bi-search text-white"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.search-form {
    width: 100%;
    max-width: 450px;
}

.navbar .nav-link {
    color: white !important;
    transition: 0.2s ease;
}

.navbar .nav-link:hover {
    opacity: 0.75;
}

/* Active RouterLink */
.navbar .nav-link.router-link-exact-active {
    color: white !important;
    font-weight: 600;
}

/* Search */
.search-form .form-control {
    border-right: 0;
}

.search-form .btn {
    border-left: 0;
}

@media (max-width: 991.98px) {
    .search-form {
        display: none !important;
    }

    .navbar-nav {
        margin-top: 15px;
    }
}
</style>
