<script>
export default {
    name: "AppFooter",
};
</script>

<template>
    <footer class="footer">
        <!-- Footer Main -->
        <div class="footer-main">
            <div class="container-fluid px-4 px-lg-5">
                <div class="row g-5">
                    <!-- Brand -->
                    <div class="col-lg-4 col-md-6">
                        <RouterLink to="/" class="footer-logo">
                            <img src="../assets/Logo SVG.svg" alt="VORA Electronics" />
                        </RouterLink>

                        <p class="footer-description">
                            Engineered for Excellence. Providing premium
                            electronic components and devices to professionals
                            worldwide.
                        </p>

                        <div class="footer-contact-icons">
                            <a
                                href="mailto:contact@vora.com"
                                aria-label="Email"
                            >
                                <i class="bi bi-envelope"></i>
                            </a>

                            <a href="tel:+1234567890" aria-label="Phone">
                                <i class="bi bi-telephone"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Shop -->
                    <div class="col-lg-2 col-md-6">
                        <h3 class="footer-title">Shop</h3>

                        <ul class="footer-links">
                            <li>
                                <RouterLink to="/categories">
                                    Laptops
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink to="/categories">
                                    Components
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink to="/categories">
                                    Networking
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <!-- Support -->
                    <div class="col-lg-2 col-md-6">
                        <h3 class="footer-title">Support</h3>

                        <ul class="footer-links">
                            <li>
                                <RouterLink to="/support">
                                    Customer Service
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink to="/support">
                                    Warranty Info
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink to="/support"> Returns </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <!-- Company -->
                    <div class="col-lg-2 col-md-6">
                        <h3 class="footer-title">Company</h3>

                        <ul class="footer-links">
                            <li>
                                <a href="#"> About </a>
                            </li>

                            <li>
                                <a href="#"> Policies </a>
                            </li>

                            <li>
                                <a href="#"> Contact </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <div class="container-fluid px-4 px-lg-5">
                <p>© 2024 VORA Electronics. Engineered for Excellence.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background: #e7e5e8;
    color: #111;
}

/* ================= FOOTER MAIN ================= */

.footer-main {
    padding: 55px 0 50px;
}

.footer-logo {
    display: inline-flex;

    width: 30px;
    height: 30px;

    margin-bottom: 20px;
}

.footer-logo img {
    width: 100%;
    height: 100%;

    object-fit: contain;
}

.footer-description {
    max-width: 330px;

    color: #5b718f;

    font-size: 15px;
    line-height: 1.5;

    margin-bottom: 25px;
}

/* ================= CONTACT ================= */

.footer-contact-icons {
    display: flex;
    gap: 18px;
}

.footer-contact-icons a {
    color: #687d99;

    font-size: 19px;

    text-decoration: none;

    transition: 0.2s ease;
}

.footer-contact-icons a:hover {
    color: #111;
}

/* ================= FOOTER LINKS ================= */

.footer-title {
    font-size: 18px;
    font-weight: 700;

    margin-bottom: 22px;
}

.footer-links {
    list-style: none;

    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: 16px;
}

.footer-links a {
    color: #5b718f;

    text-decoration: none;

    font-size: 13px;
    font-weight: 500;

    letter-spacing: 2px;

    transition: 0.2s ease;
}

.footer-links a:hover {
    color: #111;
}

/* ================= FOOTER BOTTOM ================= */

.footer-bottom {
    border-top: 1px solid #d0cfd1;

    padding: 24px 0;
}

.footer-bottom p {
    color: #5b718f;

    font-size: 14px;

    margin: 0;
}

/* ================= MOBILE ================= */

@media (max-width: 767.98px) {
    .footer-main {
        padding: 45px 0;
    }

    .footer-description {
        max-width: 100%;
    }

    .footer-title {
        margin-bottom: 15px;
    }

    .footer-links li {
        margin-bottom: 12px;
    }

    .footer-bottom {
        text-align: center;
    }
}
</style>
