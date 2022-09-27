import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Discovery from "@/views/Discovery";
import BusinessList from "@/views/BusinessList";
import BusinessInfo from "@/views/BusinessInfo";
import Order from "@/views/Order";
import Login from "@/views/Login";
import Paying from "@/views/Paying";
import Orders from "@/views/Orders";
import Mine from "@/views/Mine";
const routes = [
    {
        path: '/',
        name: 'root',
        component: Home
    },
    {
        path: '/index',
        name: 'Home',
        component: Home
    },
    {
        path: '/discovery',
        name: 'Discovery',
        component: Discovery
    },
    {
        path: '/businessList',
        name: 'BusinessList',
        component: BusinessList
    },
    {
        path: '/businessInfo',
        name: 'BusinessInfo',
        component: BusinessInfo
    },
    {
        path: '/order',
        name: 'Order',
        component: Order
    }, {
        path: '/paying',
        name: 'Paying',
        component: Paying
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/orderList',
        name: 'orderList',
        component: Orders
    },{
        path: '/user',
        name: 'user',
        component: Mine
    }


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
