import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import BreweryList from '../views/BreweryList.vue'
import Brewery from '../views/Brewery.vue'
import Beer from '../views/Beer.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store/index'
import Beers from '../views/Beers.vue'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/brewerylist",
      name: "brewerylist",
      component: BreweryList,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/brewerylist/:breweryId",
      name: "brewery",
      component: Brewery,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/brewerylist/:breweryId/:beerId",
      name: "beer",
      component: Beer, 
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/beers', 
      component: Beers,
      name: 'beers'
    },
    { 
      path: '/:catchAll(.*)', 
      component: NotFound,
      name: 'NotFound'
    },

  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
