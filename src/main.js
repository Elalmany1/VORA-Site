import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createRouter, createWebHistory } from "vue-router";

import Shop from "./views/Shop.vue";
import Categories from "./views/Categories.vue";
import Deals from "./views/Deals.vue";
import Support from "./views/Support.vue";
import Handler from "./components/handler.vue";

import orderHistoryView from './views/orderHistoryView.vue'
import orderDetailsView from './views/orderDetailsView.vue'
import returnRequestView from './views/returnRequestView.vue'


const routes = [

    { path: "/", component: Shop },
    { path: "/categories", component: Categories },
    { path: "/deals", component: Deals },
    { path: "/support", component: Support },

    { path: '/orders', component: orderHistoryView },
    { path: '/orders/:id', component: orderDetailsView },
    { path: '/orders/return', component: returnRequestView },


    
];





const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
