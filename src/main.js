import OrderHistory from './views/Orderhistory.vue'
import Overview from './views/Overview.vue'
import CreateAccount from './views/Tech.vue'
import Authenticate from './views/Authenticate.vue'
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
import ProductDetails from "./views/ProductDetails.vue";
import Handler from "./components/handler.vue";
import OrderHistory from './views/Orderhistory.vue';
import Overview from './views/Overview.vue';
import Authenticate from './views/Authenticate.vue';
import Tech from './views/Tech.vue';

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/shop", name: "shop", component: Shop },
    { path: "/categories", name: "categories", component: Categories },
    { path: "/deals", name: "deals", component: Deals },
    { path: "/support", name: "support", component: Support },
{ path: "/search", name: "search", component: Search },
    { path: "/product/:id", name: "product-details", component: ProductDetails },
    { path: "/orders", component: OrderHistory },
    { path: "/overview", component: Overview },
    { path: "/tech", component: Tech },
    { path: "/login", component: Authenticate }

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

createApp(App).use(router).mount("#app");
