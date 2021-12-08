import { createRouter, createWebHistory } from 'vue-router';
import Feed from "@/Pages/feed/Feed";
import MyWishlist from "@/Pages/wishlist/MyWishlist";
import { createRouteManager, createRoute } from "@/router/route-manager";

const routeManager = createRouteManager([
    createRoute('/', Feed).name('feed'),
    createRoute('/my-wishlist', MyWishlist).name('myWishlist').children([
        createRoute('/create', MyWishlist).name('create'),
    ]),
]);

const router = createRouter({
    history: createWebHistory(),
    routes: routeManager.generate(),
});

export default router;
