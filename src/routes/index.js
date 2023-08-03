import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import Information from '../views/Information.vue';
import Cart from '../views/Cart.vue';
import Success from '../views/Success.vue';
import Admin from '../views/Admin.vue';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/information', component: Information },
  { path: '/shop', component: Order },
  { path: '/cart', component: Cart },
  { path: '/success/:orderid', name: 'success', component: Success },
  { path: '/admin', component: Admin },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router