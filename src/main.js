import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Shop from "./views/Shop.vue";
import Categories from "./views/Categories.vue";
import Deals from "./views/Deals.vue";
import Support from "./views/Support.vue";
import Search from "./views/Search.vue";
import Handler from "./components/handler.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
import Cart from "./views/Cart.vue";
import Checkout from "./views/Checkout.vue";

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/shop", name: "shop", component: Shop },
    { path: "/categories", name: "categories", component: Categories },
    { path: "/deals", name: "deals", component: Deals },
    { path: "/support", name: "support", component: Support },
    { path: "/search", name: "search", component: Search },
    { path: "/cart", name: "cart", component: Cart },
    {
        path: "/checkout",
        name: "checkout",
        component: Checkout,
        meta: { hideHeader: true },
    },
    {
        path: "/checkout/:step",
        name: "checkout-step",
        component: Checkout,
        meta: { hideHeader: true },
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminDashboard,
        meta: { hideHeader: true },
    },
    {
        path: "/admin/dashboard",
        redirect: "/admin",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
