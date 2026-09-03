<script>
export default {
    name: "AppFooter",
};
</script>

<template>
    <footer class="global-footer">
        <div class="footer-main">
            <div class="container-fluid px-4 px-lg-5">
                <div class="row g-5">
                    <!-- ================= BRAND ================= -->

                    <div class="col-lg-3 col-md-6">
                        <RouterLink to="/" class="footer-brand">
                            VORA
                        </RouterLink>

                        <p class="footer-description">
                            Engineered for high performance and absolute
                            reliability.
                        </p>

                        <p class="footer-copyright">
                            © 2024 VORA Engineered Electronics.
                            <br />
                            All rights reserved.
                        </p>
                    </div>

                    <!-- ================= SUPPORT ================= -->

                    <div class="col-lg-3 col-md-6">
                        <h3 class="footer-title">Support</h3>

                        <ul class="footer-links">
                            <li>
                                <RouterLink to="/support">
                                    Technical Support
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink to="/support">
                                    Warranty Info
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink to="/support">
                                    Contact Engineering
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <!-- ================= BUSINESS ================= -->

                    <div class="col-lg-3 col-md-6">
                        <h3 class="footer-title">Business</h3>

                        <ul class="footer-links">
                            <li>
                                <RouterLink to="/bulk-orders">
                                    Bulk Orders
                                </RouterLink>
                            </li>

                            <li>
                                <RouterLink to="/shipping">
                                    Shipping Policy
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <!-- ================= LEGAL ================= -->

                    <div class="col-lg-3 col-md-6">
                        <h3 class="footer-title">Legal</h3>

                        <ul class="footer-links">
                            <li>
                                <RouterLink to="/privacy">
                                    Privacy Policy
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
/* ================= FOOTER ================= */

.global-footer {
    background: #2d2d2f;
    color: #ffffff;
}

/* ================= MAIN ================= */

.footer-main {
    padding: 48px 0 45px;
}

/* ================= BRAND ================= */

.footer-brand {
    display: inline-block;

    margin-bottom: 18px;

    color: #ffffff;

    font-size: 20px;
    font-weight: 700;

    letter-spacing: 1px;

    text-decoration: none;
}

.footer-description {
    max-width: 290px;

    margin: 0 0 22px;

    color: #c1c1c5;

    font-size: 14px;
    line-height: 1.55;
}

.footer-copyright {
    margin: 0;

    color: #b5b5ba;

    font-family: monospace;

    font-size: 11px;
    line-height: 1.5;

    letter-spacing: 1px;
}

/* ================= TITLES ================= */

.footer-title {
    margin: 0 0 18px;

    color: #ffffff;

    font-size: 18px;
    font-weight: 700;
}

/* ================= LINKS ================= */

.footer-links {
    list-style: none;

    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: 10px;
}

.footer-links li:last-child {
    margin-bottom: 0;
}

.footer-links a {
    color: #bdbdc2;

    text-decoration: none;

    font-family: monospace;

    font-size: 12px;

    letter-spacing: 1px;

    transition: color 0.2s ease;
}

.footer-links a:hover {
    color: #ffffff;
}

/* ================= MOBILE ================= */

@media (max-width: 767.98px) {
    .footer-main {
        padding: 40px 0;
    }

    .footer-description {
        max-width: 100%;
    }

    .footer-title {
        margin-bottom: 12px;
    }
}
</style>
