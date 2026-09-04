<script>
export default {
    name: "CheckoutFooter",
};
</script>

<template>
    <footer class="checkout-footer mt-auto py-5 bg-light-subtle border-top">
        <div class="container-fluid px-4 px-lg-5">
            <div class="row gy-4 gx-lg-5">
                <!-- Brand & Slogan -->
                <div class="col-12 col-md-4">
                    <div class="footer-brand fw-bold fs-4 mb-2">VORA</div>
                    <p class="text-muted small mb-4 slogan-text">
                        Engineered for performance. Designed for precision.
                    </p>
                    <div class="text-muted copyright-text small d-none d-md-block">
                        &copy; 2024 VORA Precision Engineering. All rights reserved.
                    </div>
                </div>

                <!-- Links Columns -->
                <div class="col-6 col-md-2 col-lg-2 offset-lg-1">
                    <div class="footer-col-title text-uppercase mb-3">Resources</div>
                    <ul class="list-unstyled mb-0 d-flex flex-column gap-2 small">
                        <li>
                            <RouterLink to="/support" class="footer-link">Technical Specifications</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/support" class="footer-link">Driver Downloads</RouterLink>
                        </li>
                    </ul>
                </div>

                <div class="col-6 col-md-2 col-lg-2">
                    <div class="footer-col-title text-uppercase mb-3">Company</div>
                    <ul class="list-unstyled mb-0 d-flex flex-column gap-2 small">
                        <li>
                            <RouterLink to="/support" class="footer-link">Warranty Policy</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/support" class="footer-link">Sustainability</RouterLink>
                        </li>
                    </ul>
                </div>

                <div class="col-12 col-md-3 col-lg-3">
                    <div class="footer-col-title text-uppercase mb-3">Investors</div>
                    <ul class="list-unstyled mb-0 d-flex flex-column gap-2 small">
                        <li>
                            <RouterLink to="/support" class="footer-link">Corporate Governance</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/support" class="footer-link">Investor Relations</RouterLink>
                        </li>
                    </ul>
                </div>

                <!-- Mobile Copyright -->
                <div class="col-12 text-muted copyright-text small d-block d-md-none pt-2">
                    &copy; 2024 VORA Precision Engineering. All rights reserved.
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.checkout-footer {
    background-color: #f1f3f5;
    color: #1e293b;
    font-size: 0.86rem;
}

.footer-brand {
    letter-spacing: 0.5px;
    color: #0f172a;
}

.slogan-text {
    max-width: 260px;
    line-height: 1.5;
}

.footer-col-title {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #475569;
}

.footer-link {
    color: #64748b;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.15s ease;
}

.footer-link:hover {
    color: #0f172a;
}

.copyright-text {
    font-size: 0.78rem;
}
</style>
