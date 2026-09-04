<script>
import HomeFooter from "../components/HomeFooter.vue";

export default {
    name: "Home",
    components: {
        HomeFooter,
    },
};
</script>

<template>
    <main>
        <!-- ================= HERO SECTION ================= -->
        <section class="hero-section">
            <div class="container-fluid px-4 px-lg-5">
                <div class="row align-items-center g-5">
                    <!-- Hero Content -->
                    <div class="col-lg-5">
                        <div class="hero-content">
                            <span class="hero-badge"> NEW ARRIVAL </span>

                            <h1 class="hero-title">
                                Engineered for
                                <br />
                                Ultimate Performance.
                            </h1>

                            <p class="hero-description">
                                Discover the next generation of premium
                                computing. Uncompromising power wrapped in
                                aerospace-grade aluminum. Precision crafted for
                                professionals.
                            </p>

                            <div class="hero-buttons">
                                <RouterLink
                                    to="/shop"
                                    class="btn btn-dark hero-btn-primary"
                                >
                                    Shop Now
                                    <i class="bi bi-arrow-right"></i>
                                </RouterLink>

                                <button
                                    type="button"
                                    class="btn btn-outline-dark hero-btn-secondary"
                                >
                                    View Tech Specs
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Hero Image -->
                    <div class="col-lg-7">
                        <div class="hero-image-wrapper">
                            <img
                                src="../assets/laptop photo.jpg"
                                alt="Premium Laptop"
                                class="hero-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= FEATURES SECTION ================= -->
        <section class="features-section">
            <div class="container-fluid px-4 px-lg-5">
                <div class="row">
                    <!-- Secure Payment -->
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="bi bi-shield-check"></i>
                            </div>

                            <h3>Secure Payment</h3>

                            <p>256-bit encryption</p>
                        </div>
                    </div>

                    <!-- Fast Delivery -->
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="bi bi-truck"></i>
                            </div>

                            <h3>Fast Delivery</h3>

                            <p>Next day available</p>
                        </div>
                    </div>

                    <!-- Authentic Goods -->
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="bi bi-award"></i>
                            </div>

                            <h3>Authentic Goods</h3>

                            <p>100% genuine products</p>
                        </div>
                    </div>

                    <!-- Warranty -->
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="feature-item">
                            <div class="feature-icon">
                                <i class="bi bi-shield"></i>
                            </div>

                            <h3>2-Year Warranty</h3>

                            <p>On all major electronics</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================= FOOTER ================= -->
        <HomeFooter />
    </main>
</template>

<style scoped>
/* ================= HERO ================= */

.hero-section {
    background: #ffffff;
    padding: 170px 0 160px;
    border-bottom: 1px solid #eeeeee;
}

.hero-content {
    max-width: 620px;
}

.hero-badge {
    display: inline-block;
    background: #dfe7ff;
    color: #1e2a4a;
    padding: 5px 13px;
    border-radius: 2px;

    font-size: 12px;
    font-weight: 600;
    letter-spacing: 3px;

    margin-bottom: 25px;
}

.hero-title {
    color: #050505;

    font-size: clamp(42px, 4vw, 64px);
    line-height: 1.08;
    font-weight: 700;

    letter-spacing: -2px;

    margin-bottom: 28px;
}

.hero-description {
    max-width: 600px;

    color: #50535a;

    font-size: 18px;
    line-height: 1.55;

    margin-bottom: 35px;
}

.hero-buttons {
    display: flex;
    align-items: center;
    gap: 15px;
}

.hero-btn-primary,
.hero-btn-secondary {
    min-height: 46px;

    padding: 0 30px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: 12px;

    font-weight: 600;
}

.hero-btn-primary {
    background: #050505;
    border-color: #050505;
}

.hero-btn-primary:hover {
    background: #222222;
    border-color: #222222;
}

.hero-btn-secondary {
    background: white;
}

.hero-btn-secondary:hover {
    background: #f5f5f5;
    color: #000;
}

/* ================= HERO IMAGE ================= */

.hero-image-wrapper {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-image {
    width: 100%;
    max-height: 500px;

    object-fit: cover;
    display: block;
}

/* ================= FEATURES ================= */

.features-section {
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
}

.feature-item {
    min-height: 145px;

    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    position: relative;
}

.feature-item::after {
    content: "";

    position: absolute;

    top: 25%;
    right: 0;

    width: 1px;
    height: 50%;

    background: #e5e5e5;
}

.feature-item:last-child::after {
    display: none;
}

.feature-icon {
    font-size: 27px;
    color: #111;

    margin-bottom: 8px;
}

.feature-item h3 {
    font-size: 17px;
    font-weight: 600;

    margin: 0 0 8px;
}

.feature-item p {
    color: #5c5e64;

    font-size: 14px;

    margin: 0;
}

/* ================= TABLET ================= */

@media (max-width: 991.98px) {
    .hero-section {
        padding: 100px 0 90px;
    }

    .hero-content {
        max-width: 100%;
        text-align: center;
    }

    .hero-description {
        margin-left: auto;
        margin-right: auto;
    }

    .hero-buttons {
        justify-content: center;
    }

    .hero-image-wrapper {
        margin-top: 20px;
    }

    .hero-image {
        max-height: 420px;
    }

    .feature-item:nth-child(2)::after {
        display: none;
    }
}

/* ================= MOBILE ================= */

@media (max-width: 767.98px) {
    .hero-section {
        padding: 70px 0 65px;
    }

    .hero-title {
        font-size: 40px;
        letter-spacing: -1.5px;
    }

    .hero-description {
        font-size: 16px;
    }

    .hero-buttons {
        flex-direction: column;
        width: 100%;
    }

    .hero-btn-primary,
    .hero-btn-secondary {
        width: 100%;
    }

    .hero-image {
        max-height: 300px;
    }

    .feature-item {
        min-height: 130px;
        border-bottom: 1px solid #eeeeee;
    }

    .feature-item::after {
        display: none;
    }
}
</style>
