<script></script>

<template>
    <nav class="navbar navbar-expand-lg bg-black">
        <div class="container-fluid">
            <!-- Logo -->
            <a class="navbar-brand" href="#">
                <img src="" alt="Bootstrap" width="30" height="24" />
            </a>

            <!-- Mobile Icons -->
            <div class="d-flex align-items-center gap-3 order-lg-3">
                <!-- Search Icon - Mobile -->
                <a href="#" class="text-white fs-5 d-lg-none">
                    <i class="bi bi-search"></i>
                </a>

                <!-- Wishlist -->
                <a href="#" class="text-white fs-5">
                    <i class="bi bi-heart"></i>
                </a>

                <!-- Profile -->
                <a href="#" class="text-white fs-5">
                    <i class="bi bi-person"></i>
                </a>

                <!-- Cart -->
                <a href="#" class="text-white fs-5 position-relative">
                    <i class="bi bi-cart3"></i>

                    <div
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >
                        0
                    </div>
                </a>
            </div>

            <!-- Burger -->
            <button
                class="navbar-toggler ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <div class="navbar-toggler-icon"></div>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Links -->
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active text-white" href="Shop.vue"> Shop </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link text-white" href="Categories.vue">
                            Categories
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link text-white" href="Deals.vue"> Deals </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link text-white" href="Support.vue"> Support </a>
                    </li>
                </ul>

                <!-- Search Box - Desktop -->
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

                        <button class="btn btn-outline-secondary" type="submit">
                            <i class="bi bi-search text-white"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<style>
.search-form {
    width: 100%;
    max-width: 450px;
}

@media (max-width: 991.98px) {
    .search-form {
        display: none !important;
    }
}
</style>
